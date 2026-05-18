import { cn } from "../../utils/cn";
import { formatThousand } from "../../utils/format";

interface Props {
  value: number;
  unit?: string;
  size?: "md" | "lg" | "xl" | "display";
  emphasized?: boolean;
  className?: string;
}

const sizeMap = {
  md: "text-[20px]",
  lg: "text-[28px]",
  xl: "text-[40px]",
  display: "text-[clamp(48px,7vw,96px)]",
};

export function Price({ value, unit, size = "lg", emphasized, className }: Props) {
  return (
    <span className={cn("inline-flex items-baseline gap-1", className)}>
      <span
        className={cn(
          "font-extrabold tracking-[-0.02em] leading-[1]",
          sizeMap[size],
          emphasized
            ? "text-[var(--color-ivory-50)] bg-[var(--color-ember-500)] px-2 py-0.5 rounded-[6px]"
            : "text-[var(--color-fg-strong)]"
        )}
      >
        {formatThousand(value)}
        <span className="text-[0.55em] font-bold ml-0.5">원</span>
      </span>
      {unit && (
        <span className="text-[0.42em] text-[var(--color-fg-muted)] font-semibold tracking-[0.04em]">
          / {unit}
        </span>
      )}
    </span>
  );
}
