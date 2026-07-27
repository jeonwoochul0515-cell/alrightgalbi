// 네이버 플레이스 리뷰 진입 섹션. 매장별 네이버 검색 페이지로 외부 이동.
import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { stores } from "../../data/stores";
import type { Store } from "../../types/domain";

const NAVER_SEARCH_BASE = "https://map.naver.com/p/search/";

function naverUrl(query: string) {
  return `${NAVER_SEARCH_BASE}${encodeURIComponent(query)}`;
}

function StoreReviewCard({ store }: { store: Store }) {
  const query = `올바로갈비 ${store.shortName}`;
  return (
    <a
      href={naverUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${store.name} 네이버 플레이스 리뷰 보기 (새 탭)`}
      className="group relative block surface-elev overflow-hidden hover:border-[#03C75A] transition-colors h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-charcoal-800)]">
        {store.heroImage && (
          <img
            src={store.heroImage}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,9,7,0.9)] via-[rgba(11,9,7,0.35)] to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-[4px] bg-[#03C75A] text-[#ffffff] text-[10px] font-extrabold tracking-[0.06em]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727z" />
          </svg>
          NAVER
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[15px] md:text-[16px] font-bold text-[var(--color-ivory-50)] leading-tight">
            {store.shortName}
          </p>
          <p className="text-[11px] text-[var(--color-ivory-100)] opacity-85 mt-0.5">
            {store.district}
          </p>
        </div>
      </div>
      <div className="p-3.5 md:p-4 flex items-center justify-between gap-2">
        <span className="text-[12.5px] text-[var(--color-fg-muted)]">
          네이버에서 방문자 리뷰 보기
        </span>
        <span
          aria-hidden="true"
          className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-charcoal-700)] text-[var(--color-fg-muted)] group-hover:bg-[#03C75A] group-hover:text-white transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export function NaverReviewsSection() {
  return (
    <Section id="reviews" spacing="lg" bg="elev">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
        <Reveal>
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
            Naver Reviews · 네이버 리뷰
          </span>
          <Heading level={2} display="md" className="max-w-[26ch]">
            네이버 플레이스에서
            <br />
            매장 리뷰를 확인하세요.
          </Heading>
          <p className="mt-4 text-[14px] text-[var(--color-fg-muted)] max-w-[60ch] leading-[1.85]">
            올바로갈비 {stores.length}개 매장은 모두 네이버 플레이스에 등록되어 있어
            실제 방문자가 남긴 사진 리뷰·평점·재방문 의향을 직접 보실 수 있습니다.
            본 사이트는 리뷰를 가공하지 않습니다 — 원문 그대로 네이버에서 확인하세요.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={naverUrl("올바로갈비")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#03C75A] text-white text-[14px] font-bold hover:bg-[#02b350] transition-colors min-h-[48px]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727z" />
            </svg>
            네이버에서 통합 검색
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {stores.map((s, i) => (
          <Reveal key={s.id} delay={0.04 * i}>
            <StoreReviewCard store={s} />
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-[11.5px] text-[var(--color-fg-soft)] leading-[1.7]">
        ※ 네이버 플레이스 리뷰는 작성자에게 저작권이 있으며, 본 사이트는 외부 링크만
        제공합니다. 카드 클릭 시 네이버 지도에서 해당 매장 검색 결과로 새 탭이 열립니다.
      </p>
    </Section>
  );
}
