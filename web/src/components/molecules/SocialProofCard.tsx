import type { SocialProofItem } from "../../types/domain";
import { cn } from "../../utils/cn";

interface Props {
  item: SocialProofItem;
}

const sourceLabel: Record<SocialProofItem["source"], string> = {
  diningcode: "DININGCODE",
  siksin: "식신 매거진",
  instagram: "INSTAGRAM",
  facebook: "FACEBOOK",
};

export function SocialProofCard({ item }: Props) {
  const content = (
    <div className="relative flex flex-col gap-3 p-6 md:p-7 surface-elev h-full transition-colors hover:border-[var(--color-brass-400)]">
      <span className="text-[10px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.14em]">
        {sourceLabel[item.source]}
      </span>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-[clamp(36px,5vw,56px)] font-extrabold leading-[0.95] text-[var(--color-fg-strong)] tracking-[-0.03em]")}>
          {item.metric}
        </span>
        <span className="text-[14px] font-semibold text-[var(--color-fg-muted)]">
          {item.label}
        </span>
      </div>
      {item.quote && (
        <blockquote className="text-[13px] text-[var(--color-fg-muted)] italic leading-[1.7] border-l-2 border-[var(--color-brass-500)] pl-3">
          "{item.quote}"
        </blockquote>
      )}
      {item.href && (
        <span className="text-[11px] text-[var(--color-fg-soft)] mt-auto pt-2">
          출처 보기 →
        </span>
      )}
    </div>
  );

  return item.href ? (
    <a href={item.href} target="_blank" rel="noopener" className="block h-full">
      {content}
    </a>
  ) : (
    content
  );
}
