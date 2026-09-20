import { Helmet } from "react-helmet-async";

/**
 * 리뉴얼 안내 페이지.
 * 리뉴얼 기간 동안 모든 라우트가 이 화면만 노출한다 (router.tsx의 MAINTENANCE 스위치).
 * 복구: web/src/app/router.tsx 의 MAINTENANCE 를 false 로 되돌린다.
 */
export function MaintenancePage() {
  return (
    <div className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-fg)] flex items-center justify-center px-[var(--spacing-gutter)] py-16">
      <Helmet>
        <html lang="ko" />
        <title>올바로갈비 · 홈페이지 리뉴얼 중</title>
        <meta
          name="description"
          content="올바로갈비 홈페이지가 리뉴얼 중입니다. 매장 이용과 가맹 문의는 본사 010-5722-4929로 연락해 주세요."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://olbarogalbi.com/" />
      </Helmet>

      <main id="main" className="w-full max-w-[640px] text-center">
        <p className="text-[var(--text-xs)] tracking-[0.35em] uppercase text-[var(--color-fg-soft)]">
          olbaroGALBI
        </p>

        <h1 className="mt-4 text-[clamp(2rem,7vw,3.25rem)] leading-[1.15] font-extrabold text-[var(--color-fg-strong)]">
          홈페이지
          <br />
          <span className="accent-chip">리뉴얼 중</span>
          입니다
        </h1>

        <p className="mt-7 text-[var(--color-fg-muted)]">
          더 나은 모습으로 찾아뵙기 위해 올바로갈비 홈페이지를 새로 단장하고 있습니다.
          <br />
          공사 기간에도 <strong className="text-[var(--color-fg-strong)]">전 매장은 정상 영업</strong>합니다.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:01057224929"
            className="rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-[#FFFFF0] font-bold px-7 py-3.5 shadow-[var(--shadow-ember)]"
          >
            본사 010-5722-4929
          </a>
          <a
            href="mailto:frasier2015@naver.com"
            className="rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)] font-bold px-7 py-3.5"
          >
            가맹·제휴 문의 메일
          </a>
        </div>

        <p className="mt-10 text-[var(--text-small)] text-[var(--color-fg-soft)]">
          매장 위치·영업시간은 네이버 지도에서 &lsquo;올바로갈비&rsquo;로 검색해 주세요.
        </p>

        <hr className="my-10 border-0 border-t border-[var(--color-border)]" />

        <p className="text-[var(--text-xs)] leading-[1.9] text-[var(--color-fg-soft)]">
          상호 올바로갈비 · 대표 유종우 · 사업자등록번호 728-38-01319
          <br />
          부산광역시 부산진구 중앙대로680번가길 81, 1층
          <br />© 2026 올바로갈비 · olbaroGALBI
        </p>
      </main>
    </div>
  );
}
