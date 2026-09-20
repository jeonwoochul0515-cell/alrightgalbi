# 컨텍스트 노트 — SEO·GEO·AEO 적용 (2026-07-27)

## 배경
- 2026-07-27 카페24에서 olbarogalbi.com 구매, Firebase Hosting(olbarogalbi 프로젝트) 연결 완료.
  - 카페24 DNS: A(olbarogalbi.com→199.36.158.100), TXT("hosting-site=olbarogalbi"), CNAME(www→olbarogalbi.web.app)
  - www는 Firebase에서 본 도메인으로 리디렉션 설정. DNS 반영 30분~1시간, SSL 발급 최대 24시간.
- 이후 SEO·GEO·AEO 전역 가이드 전체 적용 작업 착수.

## 결정 사항과 이유
1. **대표 URL = https://olbarogalbi.com** (www 아님). Firebase 리디렉션도 www→apex 방향으로 설정했기 때문. web.app 주소는 canonical로 커버(별도 리디렉션 불가, Firebase 기본 도메인은 항상 살아 있음).
2. **JSON-LD 이원화 제거**: index.html 정적 블록과 src/lib/jsonld.ts가 따로 놀고 있었음(정적 블록은 매장 3곳·FAQ 1문항으로 구식, jsonld.ts는 어디서도 import 안 됨). → vite plugin(transformIndexHtml)이 jsonld.ts를 import해 빌드 시 index.html에 주입. 단일 소스 = jsonld.ts.
3. **FAQPage 스키마는 /franchise로 이동**: 가이드 원칙 "화면에 보이는 콘텐츠와 1:1". FAQ 아코디언은 FranchisePage에만 렌더되므로 전역 그래프에서 빼고 FranchisePage Helmet으로 주입. faq.ts 10문항 전체와 자동 동기화.
4. **sameAs 생략**: 공식 인스타그램·블로그·스마트플레이스 URL이 코드 어디에도 없음(인스타는 해시태그 검색 링크뿐 = 소유 채널 아님). 공식 채널 확정되면 jsonld.ts의 restaurant.sameAs에 추가할 것.
5. **프리렌더는 puppeteer 스냅샷 방식**: vite-react-ssg 같은 SSG 도입은 React 19 + rolldown-vite 8 호환 리스크가 커서 배제. 전역 도구(C:\Users\jeonw\tools\headless-tools)의 puppeteer를 createRequire로 빌려 씀 — CLAUDE.md 규칙(프로젝트에 puppeteer devDep 추가 금지) 준수.
   - dist를 로컬 정적 서버로 띄우고 라우트별 렌더 후 HTML 저장 → dist/franchise/index.html 형태. Firebase는 디렉터리 index.html을 rewrites보다 먼저 서빙하므로 라우트별 정적 HTML이 그대로 나감.
6. **네이버/구글 소유확인 메타는 placeholder 유지**: 등록은 사용자가 서치어드바이저/서치콘솔에서 진행해야 하는 수동 절차.

## 주의
- 카페24 hosting.cafe24.com의 dnsXxxPop 팝업 페이지는 CDP(자동화 도구) 연결 시 렌더러가 얼어붙는 문제 있음. DNS 레코드 추가는 팝업 UI 대신 `POST /?controller=myservice_domain_vservice&method=dns_txt_add|dns_cname_add` (body: mode=add, subName, txt|realDomain, domain, controller, serverMode) 방식이 안전. 응답 JSON의 bResult로 성공 판정.
- `POST` 라우팅 파라미터(controller/method)는 **URL 쿼리에** 있어야 함. body에 넣으면 무시되고 전체 페이지 HTML이 반환됨.

## 2026-07-28 추가 — olbarogalbi.com 인증서 발급 완료 (해결 기록)
- 증상: 카페24 네임서버 상태에서 Firebase 인증서 발급이 DNS_SERVFAIL로 무한 반복 (공개 리졸버 조회는 전부 정상).
- 해결: DNS를 클라우드플레어로 이전(무료 플랜, 등록기관은 카페24 유지). 레코드 A/TXT/CNAME(www) DNS 전용(프록시 OFF), 카페24 시스템 와일드카드(*.domain→apex CNAME)는 이전하지 않음.
- 카페24 네임서버 변경은 본인인증(사용자) 후 `POST /?controller=myservice_domain_info&method=nameserver_change`로 처리. **nameserver_ip1/2까지 채워야 성공** (호스트명만 넣으면 bResult:false).
- NS 이전 후에도 구글 내부 캐시로 몇 시간 SERVFAIL 지속 → 이전 약 5시간 후 자동 해소, https 발급 완료.
- Firebase 커스텀 도메인 재평가 강제: `PATCH v1beta1/.../customDomains/{domain}?updateMask=certPreference` (firebase-tools refresh_token으로 토큰 발급). 삭제는 소프트 삭제(30일 보관)라 즉시 재생성 불가 — :undelete로 복원 가능.

## 2026-08-05 추가 — 크롬에서만 "Site Not Found" (CDN 캐시 오염, 해결 기록)
- 증상: 크롬에서 https://olbarogalbi.com/ 접속 시 Firebase "Site Not Found"(404). curl 기본 요청은 200 정상. DNS·도메인 연결·인증서 모두 정상이었음.
- 원인: Fastly ICN 엣지 캐시에 **br/zstd 인코딩 변형의 `/` 응답이 404로 오염**되어 있었음 (`Vary: accept-encoding`이라 인코딩별로 캐시가 분리됨). 크롬은 `Accept-Encoding: br, zstd`를 보내므로 오염된 변형에 걸리고, 압축 없는 curl은 정상 변형(200)에 걸림. 같은 페이지의 favicon.ico는 200이라 도메인 매핑 문제가 아님을 판별.
- 판별법: ① `curl -H "Accept-Encoding: gzip, deflate, br, zstd" -sI <URL>` → 404 + `X-Cache: HIT` ② 고유 쿼리(`?cachebust=랜덤`)로 캐시 우회 → 200이면 원본 정상 = 캐시 오염 확정.
- 해결: `npx firebase-tools deploy --only hosting` 재배포 — Firebase는 배포 시 CDN 캐시를 전량 퍼지함. 배포 직후 br 변형도 200(X-Cache: MISS) 복구 확인. Firebase에는 수동 캐시 퍼지 API가 없으므로 재배포가 유일한 즉효약입니다.

## 2026-09-20 추가 — 관리자 페이지(/admin) 구축
- **목적**: 코드 수정·재배포 없이 사이트 콘텐츠(매장·메뉴·FAQ·가맹비용·인스타·소식·배지·회사정보)와 리뉴얼 공사 스위치를 웹에서 직접 관리.
- **데이터 구조**: `web/src/data/*.ts` 는 이제 **기본값(seed)** 이고, Firestore `site_content/{섹션}` 문서가 런타임에 이를 덮어쓴다(`web/src/content/`). 문서가 없으면 seed 그대로 나가므로 Firestore가 비어 있어도 사이트는 정상 동작한다.
- **인증**: PIN을 클라이언트에서 비교하면 JS만 열어봐도 뚫리므로, `adminLogin` Function이 서버에서 PIN을 검증하고 `admin` 클레임이 담긴 custom token을 발급한다. Firestore 쓰기 권한은 오직 이 클레임에서 나온다(firestore.rules). 세션은 `browserSessionPersistence` — 탭 닫으면 로그아웃.
- **PIN 변경**: `functions/.env` 의 `ADMIN_PIN` 수정 후 `firebase deploy --only functions`. (.env 는 커밋 제외) 코드 기본값은 `functions/src/admin.ts` 의 `FALLBACK_PIN`.
- **무차별 대입 방어**: 4자리 PIN이라 레이트리밋이 실질적 방어선. IP당 10분에 5회 실패 시 잠금, 잠금 판정이 PIN 검증보다 먼저 실행된다(잠긴 동안은 올바른 PIN도 거부).
- **리뉴얼 스위치**: `/admin → 사이트 설정 → 리뉴얼(공사) 모드`. 켜면 `PublicGate`(web/src/app/PublicGate.tsx)가 모든 공개 라우트를 안내 화면으로 덮는다. `/admin` 은 이 스위치와 무관하게 항상 열린다.
- **번들 분리**: 관리자 코드와 `firebase/auth`(85kB)는 `/admin` 진입 시에만 로드되도록 lazy + manualChunks 분리. 일반 방문자 번들은 오히려 285→215kB로 감소.

### 배포 시 한 번만 필요했던 두 가지 (재발 시 참고)
1. **`auth/insufficient-permission` (custom token 발급 실패)**: Gen2 함수 런타임 SA(`516800442035-compute@developer.gserviceaccount.com`)에 signBlob 권한이 없어서 발생.
   `gcloud iam service-accounts add-iam-policy-binding 516800442035-compute@developer.gserviceaccount.com --member="serviceAccount:516800442035-compute@developer.gserviceaccount.com" --role="roles/iam.serviceAccountTokenCreator" --project=olbarogalbi`
   (프로젝트 레벨 바인딩만으로는 부족했고, SA 리소스에 직접 바인딩해야 통했다. 반영까지 1분 내외.)
2. **`auth/configuration-not-found` (로그인 화면에서 실패)**: 프로젝트에 Firebase Authentication이 프로비저닝된 적이 없어서 발생.
   `curl -X POST "https://identitytoolkit.googleapis.com/v2/projects/olbarogalbi/identityPlatform:initializeAuth" -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "x-goog-user-project: olbarogalbi" -d '{}'`
   (`x-goog-user-project` 헤더 없으면 quota project 미지정으로 403.)

### 검증 스크립트
- `scripts/verify-rules.mjs` — 에뮬레이터 기동 후 실행. 비인증 쓰기 차단·문의 읽기 차단 등 보안 규칙 7종 확인.
- `scripts/verify-prod-admin.mjs` — 운영 사이트 대상. 로그인→저장→복구까지 확인하며 값을 원복하므로 운영 데이터를 바꾸지 않는다.

## 2026-09-20 추가 — 검색엔진용 정적 HTML 재배포 파이프라인

### 왜 필요했나
관리자에서 저장하면 **방문자 화면은 1.4초 만에 바뀌지만**(실측), 검색봇·카카오톡 미리보기가 읽는 프리렌더된 정적 HTML은 빌드 시점에 고정돼 있다. 즉 콘텐츠를 바꿔도 재배포 전까지 구글·네이버·카톡에는 옛 내용이 나간다.

### 구조 (GitHub PAT 없이 동작)
1. 관리자가 `/admin` 상단 패널에서 "지금 반영하기" → Firestore `site_publish/state` 에 `status: requested` 기록
2. GitHub Actions(`.github/workflows/publish.yml`)가 **5분 간격 cron** 으로 요청을 확인
3. 요청이 있으면 `building` 기록 → `npm ci` → 프리렌더 빌드 → `firebase deploy --only hosting` → `done` + `publishedAt` 기록
4. 관리자 화면은 이 문서를 실시간 구독해 진행 상태와 실행 로그 링크를 보여준다

**Cloud Function 을 거치지 않는 이유**: 서버에서 GitHub API 를 호출하려면 PAT 가 필요한데, fine-grained PAT 는 브라우저로만 만들 수 있고 기존 gh CLI 토큰은 권한이 과도하다. 저장소가 public 이라 Actions 사용량이 무제한이므로 cron 폴링이 더 단순하고 안전하다. 검색엔진 크롤링 주기가 수 시간~수일이라 5분 지연은 실질적 의미가 없다.

**권한 분리**: 규칙상 관리자는 `status: 'requested'` 만 쓸 수 있고, `building`/`done`/`failed` 기록은 Admin SDK(배포 파이프라인) 전용이다. 관리자가 "배포 완료"를 위조할 수 없다.

### 배포 자격증명
- 전용 서비스 계정 `github-deployer@olbarogalbi.iam.gserviceaccount.com`
- 역할: `roles/firebasehosting.admin`, `roles/datastore.user`, `roles/firebase.viewer`
- JSON 키를 `gh secret set FIREBASE_SERVICE_ACCOUNT` 로 등록하고 **로컬 키 파일은 즉시 삭제**. `.gitignore` 에 `sa-key*.json` 차단 추가.

### 구축 중 막혔던 것 (재발 시 참고)
1. **`ERR_MODULE_NOT_FOUND` — CI 에서 firebase-admin 해석 실패**: ESM `import` 는 `NODE_PATH` 를 보지 않는다. `prerender.mjs` 와 동일하게 `createRequire(pathToFileURL(경로 + "/"))` 로 외부 설치 경로를 직접 해석해야 한다.
2. **`npm ci` peer 충돌**: `react-helmet-async@2.0.5` 의 peer 범위가 React 19 를 포함하지 않아 CI 가 거부했다. `web/.npmrc` 에 `legacy-peer-deps=true` 로 로컬·CI 설치 조건을 통일. **근본 해결은 react-helmet-async 교체** — React 19 는 `<title>`·`<meta>` 를 컴포넌트에서 직접 렌더하면 head 로 자동 호이스팅하므로 이 의존성 자체를 뺄 수 있다.
3. **임시 폴더 npm install 이 루트를 오염**: `npm init -y` 가 실패한 상태에서 `npm install` 하면 상위 `package.json` 을 찾아 거기에 설치된다. 루트 `package.json` 에 firebase-admin 이 잘못 추가돼 되돌렸다. 임시 설치는 반드시 `package.json` 생성 성공을 확인한 뒤에.

### 검증 스크립트 (추가분)
- `scripts/verify-propagation.mjs` — 저장이 방문자 화면에 반영되는 시간과, 정적 HTML 과의 차이를 실측. 값을 원복한다.
- `scripts/verify-publish-flow.mjs` — "지금 반영하기" → 배포 → 정적 HTML 갱신 → 원복까지 전 구간 9종 확인. cron 을 기다리지 않도록 `gh workflow run` 으로 같은 경로를 즉시 실행한다.
