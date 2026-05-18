import type { TrustBadgeData } from "../../types/domain";
import { cn } from "../../utils/cn";

interface Props {
  badge: TrustBadgeData;
  className?: string;
}

export function TrustBadge({ badge, className }: Props) {
  const content = (
    <div
      className={cn(
        "flex flex-col gap-0.5 px-4 py-3 rounded-[8px] border min-h-[60px] justify-center",
        badge.variant === "authority"
          ? "border-[var(--color-brass-500)] bg-[rgba(176,133,69,0.06)]"
          : "border-[var(--color-border-strong)] bg-[var(--color-charcoal-800)]",
        className
      )}
    >
      <span className="text-[10px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.12em]">
        {badge.label}
      </span>
      {badge.value && (
        <span className="text-[14px] font-bold text-[var(--color-fg-strong)]">
          {badge.value}
        </span>
      )}
      {badge.source && (
        <span className="text-[10px] text-[var(--color-fg-soft)] mt-0.5">
          {badge.source}
        </span>
      )}
    </div>
  );

  return badge.href ? (
    <a href={badge.href} target="_blank" rel="noopener" className="block">
      {content}
    </a>
  ) : (
    content
  );
}
