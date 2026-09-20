// Firestore 보안 규칙을 에뮬레이터 REST 로 직접 때려서 확인한다.
// 인증 없는 요청은 unauthenticated 로 평가된다.
const BASE =
  "http://127.0.0.1:8080/v1/projects/olbarogalbi/databases/(default)/documents";

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name} — ${detail}`);
}

async function write(path, body) {
  const res = await fetch(`${BASE}/${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: body }),
  });
  return res.status;
}

async function read(path) {
  const res = await fetch(`${BASE}/${path}`);
  return res.status;
}

// 1) 콘텐츠 읽기는 누구나 가능해야 한다 (사이트가 렌더돼야 하므로)
const readSettings = await read("site_content/settings");
check(
  "site_content 공개 읽기 허용",
  readSettings === 200 || readSettings === 404,
  `HTTP ${readSettings}`
);

// 2) 콘텐츠 쓰기는 비로그인 상태에서 차단돼야 한다
const writeSettings = await write("site_content/settings", {
  hacked: { booleanValue: true },
});
check("site_content 비인증 쓰기 차단", writeSettings === 403, `HTTP ${writeSettings}`);

// 3) 새 콘텐츠 문서 생성도 차단
const writeNew = await write("site_content/evil", { x: { booleanValue: true } });
check("site_content 비인증 문서 생성 차단", writeNew === 403, `HTTP ${writeNew}`);

// 4) 가맹 문의는 비로그인 읽기 차단 (개인정보)
const readInquiry = await read("inquiries/anything");
check("inquiries 비인증 읽기 차단", readInquiry === 403, `HTTP ${readInquiry}`);

// 5) 가맹 문의 직접 생성 차단 (Functions 만 가능)
const writeInquiry = await write("inquiries/fake", { name: { stringValue: "x" } });
check("inquiries 비인증 쓰기 차단", writeInquiry === 403, `HTTP ${writeInquiry}`);

// 6) 레이트리밋 문서 접근 차단 (로그인 시도 횟수 조작 방지)
const readRl = await read("rate_limits/admin_x");
check("rate_limits 접근 차단", readRl === 403, `HTTP ${readRl}`);

// 7) 이력 문서 비인증 읽기 차단
const readHistory = await read("site_content_history/x");
check("site_content_history 비인증 읽기 차단", readHistory === 403, `HTTP ${readHistory}`);

const failed = results.filter((r) => !r.ok);
console.log(`\n결과: ${results.length - failed.length} PASS / ${failed.length} FAIL`);
if (failed.length) process.exit(1);
