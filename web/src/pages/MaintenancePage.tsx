import { Helmet } from "react-helmet-async";
import { useContent } from "../content/context";

/**
 * 리뉴얼 안내 페이지.
 * 리뉴얼 기간 동안 모든 공개 라우트가 이 화면만 노출한다.
 * 스위치와 문구는 /admin → 사이트 설정에서 바꾼다.
 */
export function MaintenancePage() {
  const { settings } = useContent();
  const telHref = `tel:${settings.hqPhone.replace(/[^0-9+]/g, "")}`;

  return (
    <div className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-fg)] flex items-center justify-center px-[var(--spacing-gutter)] py-16">
      <Helmet>
        <html lang="ko" />
        <title>{settings.companyName} · 홈페이지 리뉴얼 중</title>
        <meta
          name="description"
          content={`${settings.companyName} 홈페이지가 리뉴얼 중입니다. 매장 이용과 가맹 문의는 본사 ${settings.hqPhone}로 연락해 주세요.`}
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://olbarogalbi.com/" />
      </Helmet>

      <main id="main" className="w-full max-w-[640px] text-center">
        <p className="text-[var(--text-xs)] tracking-[0.35em] uppercase text-[var(--color-fg-soft)]">
          olbaroGALBI
        </p>

        <h1 className="mt-4 text-[clamp(2rem,7vw,3.25rem)] leading-[1.15] font-extrabold text-[var(--color-fg-strong)]">
          {settings.maintenanceTitle}
        </h1>

        <p className="mt-7 whitespace-pre-line text-[var(--color-fg-muted)]">
          {settings.maintenanceBody}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={telHref}
            className="rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-[#FFFFF0] font-bold px-7 py-3.5 shadow-[var(--shadow-ember)]"
          >
            본사 {settings.hqPhone}
          </a>
          <a
            href={`mailto:${settings.hqEmail}`}
            className="rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)] font-bold px-7 py-3.5"
          >
            가맹·제휴 문의 메일
          </a>
        </div>

        <p className="mt-10 text-[var(--text-small)] text-[var(--color-fg-soft)]">
          매장 위치·영업시간은 네이버 지도에서 &lsquo;{settings.companyName}&rsquo;로 검색해 주세요.
        </p>

        <hr className="my-10 border-0 border-t border-[var(--color-border)]" />

        <p className="text-[var(--text-xs)] leading-[1.9] text-[var(--color-fg-soft)]">
          상호 {settings.companyName} · 대표 {settings.ceoName} · 사업자등록번호{" "}
          {settings.bizNumber}
          <br />
          {settings.hqAddress}
          <br />© 2026 {settings.companyName} · olbaroGALBI
        </p>
      </main>
    </div>
  );
}
