// 운영 사이트에서 관리자 로그인·저장·공개 반영이 실제로 동작하는지 확인한다.
import { createRequire } from "node:module";
const require = createRequire("file:///C:/Users/jeonw/tools/headless-tools/");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE ?? "https://olbarogalbi.com";
const PIN = process.env.PIN ?? "0070";
const pass = [];
const fail = [];
const check = (name, ok, detail = "") => {
  (ok ? pass : fail).push(`${name}${detail ? ` — ${detail}` : ""}`);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("   [pageerror]", String(e).slice(0, 200)));

// 1) 방문자에게는 리뉴얼 안내만 보인다
await page.goto(BASE, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 3000));
const homeText = await page.evaluate(() => document.body.innerText);
check("공개 사이트 = 리뉴얼 안내", /리뉴얼 중/.test(homeText));

// 2) /admin 로그인 화면이 열린다 (리뉴얼 모드와 무관)
await page.goto(`${BASE}/admin`, { waitUntil: "networkidle2" });
const hasPinInput = await page
  .waitForSelector('input[type="password"]', { timeout: 30000 })
  .then(() => true)
  .catch(() => false);
check("리뉴얼 모드에서도 /admin 접근 가능", hasPinInput);
if (!hasPinInput) {
  console.log(await page.evaluate(() => document.body.innerText.slice(0, 500)));
  await browser.close();
  process.exit(1);
}

// 3) PIN 로그인 → 관리 화면 진입
await page.type('input[type="password"]', PIN);
await page.click('button[type="submit"]');
const loggedIn = await page
  .waitForSelector('input[type="checkbox"]', { timeout: 60000 })
  .then(() => true)
  .catch(() => false);
check(
  "PIN 로그인 성공",
  loggedIn,
  loggedIn ? "" : await page.evaluate(() => document.body.innerText.slice(0, 300))
);
if (!loggedIn) {
  await browser.close();
  process.exit(1);
}

// 4) 실데이터가 관리 화면에 올라온다
await page.evaluate(() =>
  [...document.querySelectorAll("nav button")]
    .find((b) => b.innerText.trim().startsWith("매장"))
    ?.click()
);
await new Promise((r) => setTimeout(r, 2000));
const storeCount = await page.evaluate(
  () => document.querySelectorAll("main .rounded-lg.border.border-zinc-800").length
);
check("매장 10개 로드", storeCount >= 10, `${storeCount}개`);

// 5) 저장 경로 확인 — 값을 바꿨다가 그대로 되돌린다 (운영 데이터 불변)
await page.evaluate(() =>
  [...document.querySelectorAll("nav button")]
    .find((b) => b.innerText.trim().startsWith("사이트 설정"))
    ?.click()
);
await page.waitForSelector("main textarea", { timeout: 20000 });
const originalTitle = await page.$eval('main input[type="text"]', (el) => el.value);

await page.$eval('main input[type="text"]', (el) => {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  setter.call(el, "저장 경로 점검");
  el.dispatchEvent(new Event("input", { bubbles: true }));
});
await new Promise((r) => setTimeout(r, 500));
await page.evaluate(() =>
  [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "저장")?.click()
);
await page
  .waitForFunction(() => /저장 완료|저장 실패/.test(document.body.innerText), {
    timeout: 60000,
  })
  .catch(() => {});
const toast = await page.evaluate(
  () => document.body.innerText.match(/저장 (완료|실패)[^\n]*/)?.[0] ?? "(응답 없음)"
);
check("Firestore 저장 성공", /저장 완료/.test(toast), toast);

// 원래 문구로 복구
await page.$eval(
  'main input[type="text"]',
  (el, v) => {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    setter.call(el, v);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  },
  originalTitle
);
await new Promise((r) => setTimeout(r, 500));
await page.evaluate(() =>
  [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "저장")?.click()
);
await page
  .waitForFunction(() => /저장 완료/.test(document.body.innerText), { timeout: 60000 })
  .catch(() => {});

const restored = await page.$eval('main input[type="text"]', (el) => el.value);
check("원래 문구로 복구", restored === originalTitle, `"${restored}"`);

// 6) 리뉴얼 모드가 여전히 켜져 있는지 (운영 상태 보존)
const stillMaintenance = await page.$eval(
  'main input[type="checkbox"]',
  (el) => el.checked
);
check("리뉴얼 모드 유지", stillMaintenance === true);

await browser.close();
console.log(`\n결과: ${pass.length} PASS / ${fail.length} FAIL`);
if (fail.length) {
  fail.forEach((f) => console.log(" -", f));
  process.exit(1);
}
