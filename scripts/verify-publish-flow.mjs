// 관리자 "지금 반영하기" → 재배포 → 검색엔진용 정적 HTML 갱신까지 전 구간 확인.
// 안내 문구를 잠시 바꿨다가 마지막에 원래대로 되돌린다.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
const require = createRequire("file:///C:/Users/jeonw/tools/headless-tools/");
const puppeteer = require("puppeteer");

const BASE = "https://olbarogalbi.com";
const REPO = "jeonwoochul0515-cell/alrightgalbi";
const PIN = "0070";
const PROBE = "불편을 드려 죄송합니다";

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const gh = (...args) => execFileSync("gh", args, { encoding: "utf-8" }).trim();

async function staticHtml() {
  return fetch(`${BASE}/?nocache=${Date.now()}`).then((r) => r.text());
}

// ---- 시작 상태: 정적 HTML 에 표식이 없어야 한다 ----
check("시작 시 정적 HTML 에 표식 없음", !(await staticHtml()).includes(PROBE));

const browser = await puppeteer.launch({ headless: "new" });
const admin = await browser.newPage();
await admin.goto(`${BASE}/admin`, { waitUntil: "networkidle2" });
await admin.waitForSelector('input[type="password"]', { timeout: 30000 });
await admin.type('input[type="password"]', PIN);
await admin.click('button[type="submit"]');
await admin.waitForSelector("main textarea", { timeout: 60000 });

const original = await admin.$eval("main textarea", (el) => el.value);

async function setBodyAndSave(text) {
  await admin.$eval(
    "main textarea",
    (el, v) => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
      ).set;
      setter.call(el, v);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    },
    text
  );
  await sleep(400);
  await admin.evaluate(() =>
    [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "저장")?.click()
  );
  await admin
    .waitForFunction(() => /저장 완료|저장 실패/.test(document.body.innerText), { timeout: 60000 })
    .catch(() => {});
  return admin.evaluate(
    () => document.body.innerText.match(/저장 (완료|실패)[^\n]*/)?.[0] ?? "(응답 없음)"
  );
}

async function clickPublish() {
  await admin.evaluate(() =>
    [...document.querySelectorAll("button")]
      .find((b) => b.innerText.trim().startsWith("지금 반영하기"))
      ?.click()
  );
  await sleep(2500);
  return admin.evaluate(() => document.body.innerText);
}

async function runPipelineAndWait(label) {
  // cron(5분 주기)이 하는 일과 같은 경로를 수동으로 즉시 실행한다.
  gh("workflow", "run", "publish.yml", "--repo", REPO, "--ref", "main");
  await sleep(12000);
  const id = gh(
    "run", "list", "--repo", REPO, "--workflow", "publish.yml",
    "--limit", "1", "--json", "databaseId", "--jq", ".[0].databaseId"
  );
  console.log(`   [${label}] 실행 ${id} 대기 중…`);
  try {
    execFileSync("gh", ["run", "watch", id, "--repo", REPO, "--exit-status"], {
      stdio: "ignore",
      timeout: 15 * 60 * 1000,
    });
    return true;
  } catch {
    return false;
  }
}

// ---- 1) 문구 변경 + 저장 ----
const saveMsg = await setBodyAndSave(`${original} ${PROBE}`);
check("문구 저장", /저장 완료/.test(saveMsg), saveMsg);

// ---- 2) 저장 직후에는 아직 미반영 경고가 떠야 한다 ----
const panelText = await admin.evaluate(() => document.body.innerText);
check(
  "미반영 안내 노출",
  /아직 검색엔진에 반영되지 않았습니다/.test(panelText),
  panelText.match(/검색엔진[^\n]*\n[^\n]*/)?.[0]?.replace(/\n/g, " ") ?? ""
);

// ---- 3) 반영 요청 ----
const afterClick = await clickPublish();
check("반영 요청 접수", /요청 접수됨|반영 중/.test(afterClick));

// ---- 4) 파이프라인 실행 ----
const ok1 = await runPipelineAndWait("반영");
check("배포 파이프라인 성공", ok1);

// ---- 5) 정적 HTML 에 반영되었는지 ----
await sleep(5000);
const html = await staticHtml();
check("검색엔진용 정적 HTML 갱신", html.includes(PROBE));

// ---- 6) 관리자 화면 상태가 완료로 바뀌는지 ----
await admin.reload({ waitUntil: "networkidle2" });
await admin.waitForSelector("main textarea", { timeout: 60000 }).catch(() => {});
await sleep(3000);
const doneText = await admin.evaluate(() => document.body.innerText);
check("관리자 화면 '반영됨' 표시", /최신 내용이 반영돼 있습니다/.test(doneText));

// ---- 7) 원복 ----
console.log("\n원래 문구로 되돌리는 중…");
await setBodyAndSave(original);
await clickPublish();
const ok2 = await runPipelineAndWait("원복");
check("원복 배포 성공", ok2);
await sleep(5000);
const finalHtml = await staticHtml();
check("정적 HTML 원복 확인", !finalHtml.includes(PROBE));

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n결과: ${results.length - failed.length} PASS / ${failed.length} FAIL`);
if (failed.length) {
  failed.forEach((f) => console.log(" -", f.name));
  process.exit(1);
}
