# SEO·GEO·AEO 적용 체크리스트 (2026-07-27)

기준 문서: `~/.claude/NAVER_SEO_최적화_가이드.md`, `~/.claude/SEO_GEO_AEO_통합가이드.md`
대표 도메인: **https://olbarogalbi.com** (2026-07-27 카페24 구매·Firebase 연결 완료)

## A. 기술 토대
- [x] 전체 URL을 olbarogalbi.web.app → **olbarogalbi.com** 으로 통일 (index.html, jsonld.ts, 페이지별 canonical, robots.txt, sitemap.xml)
- [x] robots.txt — Yeti·구글·빙 + **AI 검색봇(OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot 등) 허용**, Sitemap 주소 갱신
- [x] sitemap.xml — 전체 14개 URL (/, /franchise, /en, /ja, 매장 10곳), lastmod 2026-07-27
- [x] llms.txt 추가 (보조 수단, 과신 금지)
- [x] 404 페이지 noindex 유지 확인 (기존 반영됨)

## B. 라우트별 메타
- [x] HomePage — canonical 갱신 + hreflang(ko/en/ja/x-default)
- [x] LocalizedHomePage(en·ja) — canonical 갱신 + hreflang + og:url
- [x] FranchisePage — canonical 갱신 + OG 태그
- [x] StoreDetailPage — canonical 갱신 + 매장별 OG 이미지 + BreadcrumbList JSON-LD

## C. 구조화 데이터 (JSON-LD)
- [x] jsonld.ts — SITE 상수 신규 도메인, WebSite 엔티티 추가
- [x] FAQPage를 faq.ts 10문항과 **1:1 동기화**, 노출 위치(가맹 페이지)로 이동
- [x] index.html의 정적 JSON-LD를 **빌드타임 자동 주입**(vite plugin)으로 전환 — 데이터 이원화 제거

## D. 프리렌더 (SPA → 정적 HTML)
- [x] scripts/prerender.mjs — 빌드 후 전 라우트(14개)를 정적 HTML로 스냅샷 (전역 puppeteer 재사용, devDep 추가 금지)
- [x] build 스크립트에 프리렌더 연결
- [x] dist/franchise/index.html 등에 라우트별 title·canonical 반영 확인

## E. 검증·배포
- [x] npm run build 성공
- [x] 프리렌더 산출물 스팟 체크 (title/canonical/JSON-LD)
- [x] Firebase 배포
- [x] 배포 후 curl로 라우트별 HTML 확인

## F. 수동 후속 작업 (사용자)
- [ ] 네이버 서치어드바이저에 olbarogalbi.com 등록 → 소유확인 코드 발급 → index.html 교체
- [ ] 구글 서치콘솔 등록 → 코드 교체 → 사이트맵 제출
- [ ] 빙 웹마스터 등록(구글에서 가져오기 가능)
