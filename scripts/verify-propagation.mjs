// 관리자에서 저장한 내용이 실제 방문자 화면에 반영되는지, 그리고
// 검색봇이 받는 정적 HTML 과는 어떻게 다른지를 운영 사이트에서 확인한다.
// 마지막에 원래 문구로 되돌리므로 운영 데이터는 바뀌지 않는다.
import { createRequire } from "node:module";
const require = createRequire("file:///C:/Users/jeonw/tools/headless-tools/");
const puppeteer = require("puppeteer");

const BASE = "https://olbarogalbi.com";
const PIN = "0070";
const MARK = `반영확인-${Date.now().toString().slice(-6)}`;

const log = (s) => console.log(s);

const browser = await puppeteer.launch({ headless: "new" });

// ---- 관리자 로그인 ----
const admin = await browser.newPage();
await admin.goto(`${BASE}/admin`, { waitUntil: "networkidle2" });
await admin.waitForSelector('input[type="password"]', { timeout: 30000 });
await admin.type('input[type="password"]', PIN);
await admin.click('button[type="submit"]');
await admin.waitForSelector("main textarea", { timeout: 60000 });
log("관리자 로그인 완료");

// 리뉴얼 안내 본문(textarea)을 표식이 든 문구로 바꾼다
const original = await admin.$eval("main textarea", (el) => el.value);
log(`원래 본문: "${original.slice(0, 40)}…"`);

async function setBodyAndSave(page, text) {
  await page.$eval(
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
  await new Promise((r) => setTimeout(r, 400));
  await page.evaluate(() =>
    [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "저장")?.click()
  );
  await page
    .waitForFunction(() => /저장 완료|저장 실패/.test(document.body.innerText), { timeout: 60000 })
    .catch(() => {});
  return page.evaluate(
    () => document.body.innerText.match(/저장 (완료|실패)[^\n]*/)?.[0] ?? "(응답 없음)"
  );
}

const saveMsg = await setBodyAndSave(admin, `${MARK} · 이 문구가 보이면 반영된 것입니다.`);
log(`저장 결과: ${saveMsg}`);

// ---- 1) 방문자 브라우저에서 확인 ----
const visitor = await browser.newPage();
await visitor.goto(BASE, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 3500));
const visitorText = await visitor.evaluate(() => document.body.innerText);
const reflectedInBrowser = visitorText.includes(MARK);
log(`\n[1] 방문자 브라우저 반영: ${reflectedInBrowser ? "됨 ✓" : "안 됨 ✗"}`);

// ---- 2) 검색봇이 받는 원본 HTML(프리렌더) 확인 ----
const rawHtml = await fetch(`${BASE}/?nocache=${Date.now()}`).then((r) => r.text());
const reflectedInHtml = rawHtml.includes(MARK);
log(`[2] 서버가 주는 정적 HTML 반영: ${reflectedInHtml ? "됨" : "안 됨 (빌드 시점 내용)"}`);

// ---- 3) 반영까지 걸린 시간 측정 ----
const t0 = Date.now();
const fresh = await browser.newPage();
await fresh.goto(BASE, { waitUntil: "domcontentloaded" });
await fresh
  .waitForFunction((m) => document.body.innerText.includes(m), { timeout: 30000 }, MARK)
  .then(() => log(`[3] 페이지 열고 반영까지: ${((Date.now() - t0) / 1000).toFixed(1)}초`))
  .catch(() => log("[3] 30초 내 반영 실패"));

// ---- 원복 ----
await admin.bringToFront();
const restoreMsg = await setBodyAndSave(admin, original);
log(`\n원복 결과: ${restoreMsg}`);

await visitor.reload({ waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 3500));
const backText = await visitor.evaluate(() => document.body.innerText);
log(
  `원복 확인: ${!backText.includes(MARK) && backText.includes(original.slice(0, 20)) ? "원래 문구 복귀 ✓" : "확인 필요 ✗"}`
);

await browser.close();
