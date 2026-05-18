import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface Props {
  metric: string;
  unit?: string;
  label: string;
  description?: string;
  source?: string;
  icon?: ReactNode;
  emphasized?: boolean;
  className?: string;
}

export function StatCard({
  metric,
  unit,
  label,
  description,
  source,
  icon,
  emphasized,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "relative flex flex-col gap-3 p-6 md:p-8 surface-elev",
        emphasized && "border-[var(--color-brass-400)] bg-[var(--color-charcoal-800)]",
        className
      )}
    >
      {icon && (
        <div className="text-[var(--color-brass-400)] mb-1">{icon}</div>
      )}

      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "text-[clamp(40px,6vw,72px)] font-extrabold leading-[0.95] tracking-[-0.03em]",
            emphasized ? "text-[var(--color-brass-300)]" : "text-[var(--color-fg-strong)]"
          )}
        >
          {metric}
        </span>
        {unit && (
          <span className="text-[var(--color-fg-muted)] font-bold text-[clamp(16px,1.6vw,20px)]">
            {unit}
          </span>
        )}
      </div>

      <h3 className="text-[16px] md:text-[18px] font-bold text-[var(--color-fg-strong)] mt-1">
        {label}
      </h3>

      {description && (
        <p className="text-[13px] text-[var(--color-fg-muted)] leading-[1.7]">
          {description}
        </p>
      )}

      {source && (
        <p className="text-[10px] text-[var(--color-fg-soft)] mt-auto pt-2 border-t border-[var(--color-border)] tracking-[0.02em]">
          ※ {source}
        </p>
      )}
    </article>
  );
}
