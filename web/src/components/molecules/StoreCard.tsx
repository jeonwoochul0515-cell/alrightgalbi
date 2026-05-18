import { Link } from "react-router-dom";
import type { Store } from "../../types/domain";
import { Badge } from "../atoms/Badge";
import { cn } from "../../utils/cn";

interface Props {
  store: Store;
  compact?: boolean;
  className?: string;
}

export function StoreCard({ store, compact, className }: Props) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 p-6 md:p-7 surface-elev hover:border-[var(--color-brass-400)] transition-colors",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[20px] md:text-[22px] font-bold text-[var(--color-fg-strong)]">
            {store.shortName}
          </h3>
          <p className="text-[12px] text-[var(--color-fg-soft)] mt-0.5">
            {store.district}
          </p>
        </div>
        {store.isFlagship && <Badge tone="brass">FLAGSHIP</Badge>}
      </div>

      <p className="text-[13px] text-[var(--color-fg-muted)] leading-[1.7]">
        {store.address}
      </p>

      {!compact && (
        <>
          <dl className="grid grid-cols-[64px_1fr] gap-y-1 text-[13px] mt-1">
            <dt className="text-[var(--color-brass-400)] font-semibold">영업</dt>
            <dd className="text-[var(--color-fg)]">
              {store.hours.open}–{store.hours.close}
              {store.hours.lastOrder && (
                <span className="text-[var(--color-fg-soft)]"> (LO {store.hours.lastOrder})</span>
              )}
            </dd>
            {store.hours.closedDays && store.hours.closedDays.length > 0 && (
              <>
                <dt className="text-[var(--color-brass-400)] font-semibold">휴무</dt>
                <dd className="text-[var(--color-fg)]">{store.hours.closedDays.join(", ")}요일</dd>
              </>
            )}
            <dt className="text-[var(--color-brass-400)] font-semibold">교통</dt>
            <dd className="text-[var(--color-fg-muted)]">{store.access}</dd>
          </dl>

          <div className="flex flex-wrap gap-1.5 mt-1">
            {store.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="text-[11px] px-2 py-0.5 rounded-[4px] bg-[var(--color-charcoal-700)] text-[var(--color-fg-muted)]"
              >
                {f}
              </span>
            ))}
          </div>
        </>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between gap-2">
        <a
          href={`tel:${store.phone.replace(/-/g, "")}`}
          className="text-[14px] font-bold text-[var(--color-ember-400)] hover:text-[var(--color-ember-500)] transition-colors min-h-[44px] inline-flex items-center"
        >
          {store.phone}
        </a>
        <Link
          to={`/stores/${store.id}`}
          className="text-[13px] font-semibold text-[var(--color-brass-400)] hover:text-[var(--color-brass-300)] transition-colors min-h-[44px] inline-flex items-center px-2"
        >
          상세 →
        </Link>
      </div>
    </article>
  );
}
