// Instagram 큐레이션 섹션. 외부 인플루언서·방문자 게시물 3장 + 해시태그 진입 CTA.
import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { useContent } from "../../content/context";
import type { InstagramPost } from "../../types/domain";

function KindBadge({ kind }: { kind: InstagramPost["kind"] }) {
  const label = kind === "reel" ? "REEL" : kind === "carousel" ? "FEED" : "POST";
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[rgba(0,0,0,0.55)] text-[var(--color-ivory-50)] text-[10px] font-bold tracking-[0.08em] backdrop-blur-sm">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
      {label}
    </span>
  );
}

function InstagramCard({ post }: { post: InstagramPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${post.author} - ${post.caption} (Instagram 새 탭에서 열기)`}
      className="group block surface-elev overflow-hidden hover:border-[var(--color-brass-400)] transition-colors h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-charcoal-800)]">
        <img
          src={post.thumbnail}
          alt={`${post.author} 게시물 썸네일`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,9,7,0.85)] via-[rgba(11,9,7,0.1)] to-transparent" />
        <div className="absolute top-3 left-3">
          <KindBadge kind={post.kind} />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-[13px] font-bold text-[var(--color-ivory-50)] leading-tight">
              {post.author}
            </p>
            {post.authorRole && (
              <p className="text-[10.5px] text-[var(--color-ivory-100)] opacity-80 mt-0.5">
                {post.authorRole}
              </p>
            )}
          </div>
          <span
            aria-hidden="true"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.15)] text-[var(--color-ivory-50)] backdrop-blur-sm group-hover:bg-[var(--color-ember-500)] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5 flex flex-col gap-3">
        <p className="text-[13px] text-[var(--color-fg-muted)] leading-[1.75] line-clamp-3">
          {post.caption}
        </p>
        {post.metrics && post.metrics.length > 0 && (
          <dl className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-[var(--color-border)]">
            {post.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-1">
                <dt className="text-[10.5px] text-[var(--color-fg-soft)] uppercase tracking-[0.04em]">
                  {m.label}
                </dt>
                <dd className="text-[13px] font-bold text-[var(--color-fg-strong)]">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </a>
  );
}

export function InstagramShowcaseSection() {
  const { instagramPosts, instagramHashtagUrl } = useContent();
  return (
    <Section id="instagram" spacing="lg" bg="default">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
        <Reveal>
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
            Instagram · 인스타그램
          </span>
          <Heading level={2} display="md" className="max-w-[24ch]">
            인플루언서·방문자가
            <br />
            기록한 올바로갈비.
          </Heading>
          <p className="mt-4 text-[14px] text-[var(--color-fg-muted)] max-w-[58ch] leading-[1.85]">
            본사 공식 채널 대신, 부산 맛집 인플루언서와 실제 방문자가 직접
            올린 영상·게시물로 올바로갈비를 만나보세요. 카드를 누르면 Instagram에서
            바로 열립니다.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={instagramHashtagUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[var(--color-border-strong)] text-[14px] font-bold text-[var(--color-ivory-100)] hover:border-[var(--color-brass-400)] hover:bg-[rgba(176,133,69,0.08)] transition-colors min-h-[48px]"
          >
            #올바로갈비 전체 보기
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {instagramPosts.map((post, i) => (
          <Reveal key={post.id} delay={0.08 * i}>
            <InstagramCard post={post} />
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-[11.5px] text-[var(--color-fg-soft)] leading-[1.7]">
        ※ 게시물 저작권은 각 작성자에게 있으며, 클릭 시 Instagram으로 새 탭에서 이동합니다.
        본사 공식 인스타그램 계정 운영 시 본 섹션 컨텐츠가 교체됩니다.
      </p>
    </Section>
  );
}
