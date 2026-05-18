import type { ReactNode, ElementType } from "react";
import { cn } from "../../utils/cn";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  level: Level;
  children: ReactNode;
  className?: string;
  display?: "xl" | "lg" | "md";
  serif?: boolean;
  id?: string;
}

const sizeMap: Record<NonNullable<Props["display"]>, string> = {
  xl: "text-[clamp(48px,9vw,128px)] leading-[0.95] tracking-[-0.035em]",
  lg: "text-[clamp(40px,6vw,72px)] leading-[1.02] tracking-[-0.03em]",
  md: "text-[clamp(28px,3.6vw,42px)] leading-[1.15] tracking-[-0.02em]",
};

const defaultMap: Record<Level, string> = {
  1: "text-[clamp(28px,3.6vw,42px)] leading-[1.2] tracking-[-0.02em] font-bold",
  2: "text-[clamp(22px,2.6vw,32px)] leading-[1.25] tracking-[-0.015em] font-bold",
  3: "text-[clamp(18px,2vw,22px)] leading-[1.35] tracking-[-0.01em] font-bold",
  4: "text-[17px] leading-[1.4] font-bold",
  5: "text-[15px] leading-[1.4] font-bold",
  6: "text-[13px] leading-[1.4] font-bold uppercase tracking-[0.1em]",
};

export function Heading({ level, display, serif, children, className, id }: Props) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      id={id}
      className={cn(
        display ? sizeMap[display] : defaultMap[level],
        display && "font-extrabold",
        serif && "font-[var(--font-serif)]",
        "text-[var(--color-fg-strong)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
