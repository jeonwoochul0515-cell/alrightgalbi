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
