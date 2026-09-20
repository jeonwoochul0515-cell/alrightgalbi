// 빌드 후 전 라우트를 정적 HTML로 스냅샷 — SPA를 검색봇·AI봇이 1차 수집에서 읽게 한다 (전역 puppeteer 재사용, devDep 추가 금지)
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

// puppeteer 는 프로젝트 devDep 으로 넣지 않고 밖에서 빌려 쓴다.
// 로컬은 전역 도구 폴더, CI 는 PUPPETEER_RESOLVE_ROOT 가 가리키는 임시 설치 폴더를 쓴다.
const RESOLVE_ROOTS = [
  process.env.PUPPETEER_RESOLVE_ROOT,
  "C:/Users/jeonw/tools/headless-tools/",
].filter(Boolean);

function loadPuppeteer() {
  const errors = [];
  for (const root of RESOLVE_ROOTS) {
    const base = root.endsWith("/") ? root : `${root}/`;
    try {
      return createRequire(base.startsWith("file://") ? base : `file:///${base.replace(/^\/+/, "")}`)(
        "puppeteer"
      );
    } catch (e) {
      errors.push(`${base}: ${e.message}`);
    }
  }
  throw new Error(`puppeteer 를 찾지 못했습니다.\n${errors.join("\n")}`);
}

const puppeteer = loadPuppeteer();

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = 4573;

const ROUTES = [
  "/",
  "/franchise",
  "/en",
  "/ja",
  "/stores/bujeon",
  "/stores/hwamyeong",
  "/stores/gimhae-oedong",
  "/stores/yeonsan",
  "/stores/deokcheon",
  "/stores/gyeongsung-pukyong",
  "/stores/hadan",
  "/stores/gijang-ilgwang",
  "/stores/jinhae-yongwon",
  "/stores/daegu-keimyung",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};

// dist 정적 서버 + SPA 폴백
const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let filePath = join(DIST, urlPath);
  if (!existsSync(filePath) || extname(filePath) === "") {
    filePath = join(DIST, "index.html");
  }
  try {
    const body = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({
  headless: "new",
  args: process.env.CI ? ["--no-sandbox", "--disable-dev-shm-usage"] : [],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

let ok = 0;
for (const route of ROUTES) {
  const url = `http://localhost:${PORT}${route}`;
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  } catch {
    // 외부 리소스(카카오맵 등) 타임아웃은 무시하고 현재 DOM을 저장
  }
  await page.waitForSelector("#root h1", { timeout: 10000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 500));
  const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);

  const outDir = route === "/" ? DIST : join(DIST, route.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf-8");
  ok += 1;
  console.log(`prerendered ${route}`);
}

await browser.close();
server.close();

if (ok !== ROUTES.length) {
  console.error(`prerender incomplete: ${ok}/${ROUTES.length}`);
  process.exit(1);
}
console.log(`prerender done: ${ok}/${ROUTES.length} routes`);
