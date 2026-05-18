import type { MenuItem } from "../../types/domain";
import { formatThousand } from "../../utils/format";
import { Badge } from "../atoms/Badge";
import { cn } from "../../utils/cn";

interface Props {
  item: MenuItem;
  className?: string;
}

export function MenuCard({ item, className }: Props) {
  const recommended =
    item.recommendedServing &&
    `1인 ${item.recommendedServing.grams}g 권장 ≈ ${formatThousand(item.price * (item.recommendedServing.grams / 100))}원`;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 surface-elev hover:border-[var(--color-brass-400)] transition-colors duration-300 overflow-hidden",
        className
      )}
    >
      {item.image && (
        <div className="aspect-[4/3] overflow-hidden bg-[var(--color-charcoal-900)] -mt-px -mx-px">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-6 md:p-7 pt-4 md:pt-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-[18px] md:text-[20px] font-bold text-[var(--color-fg-strong)] mb-1">
              {item.name}
            </h3>
            {item.nameEn && (
              <p className="text-[12px] text-[var(--color-fg-soft)] tracking-[0.05em]">
                {item.nameEn}
              </p>
            )}
          </div>
          {item.badge === "signature" && <Badge tone="ember">Signature</Badge>}
          {item.badge === "limited" && <Badge tone="brass">한정</Badge>}
          {item.badge === "new" && <Badge tone="ivory">NEW</Badge>}
        </div>

      {item.description && (
        <p className="text-[14px] text-[var(--color-fg-muted)] leading-[1.65]">
          {item.description}
        </p>
      )}

      <div className="mt-auto pt-3 border-t border-[var(--color-border)]">
        <div className="flex items-baseline gap-2">
          <span className="text-[clamp(28px,3.6vw,40px)] font-extrabold text-[var(--color-fg-strong)] tracking-[-0.02em]">
            {formatThousand(item.price)}
            <span className="text-[0.5em] font-bold ml-0.5">원</span>
          </span>
          {item.unit && (
            <span className="text-[12px] text-[var(--color-fg-muted)] font-semibold">
              / {item.unit}
            </span>
          )}
        </div>
        {recommended && (
          <p className="text-[11px] text-[var(--color-fg-soft)] mt-1.5">
            {recommended}
          </p>
        )}
      </div>
      </div>
    </article>
  );
}
