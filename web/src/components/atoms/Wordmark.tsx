import { cn } from "../../utils/cn";

interface Props {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showKor?: boolean;
}

const sizeMap = {
  sm: "text-[22px]",
  md: "text-[clamp(28px,4vw,34px)]",
  lg: "text-[clamp(40px,6.5vw,80px)]",
  xl: "text-[clamp(40px,10.5vw,140px)]",
};

export function Wordmark({ size = "md", className, showKor = false }: Props) {
  return (
    <div className={cn("inline-flex flex-col max-w-full", className)}>
      <span
        aria-label="OLBARO GALBI · 올바로갈비"
        className={cn(
          "inline-flex flex-wrap items-baseline font-black leading-[0.95] tracking-[-0.025em]",
          sizeMap[size]
        )}
      >
        <span className="text-[#1A3FD9] [text-shadow:0_2px_18px_rgba(26,63,217,0.35)]">OLBARO</span>
        <span className="text-[#E5301E] ml-[0.18em] [text-shadow:0_2px_18px_rgba(229,48,30,0.35)]">GALBI</span>
      </span>
      {showKor && (
        <span className="mt-2 text-[var(--color-fg-muted)] tracking-[0.32em] text-[12px] font-semibold">
          올바로갈비
        </span>
      )}
    </div>
  );
}
