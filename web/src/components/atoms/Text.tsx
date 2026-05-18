import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type Size = "xs" | "sm" | "base" | "lg" | "xl";
type Tone = "default" | "muted" | "soft" | "accent" | "brass";

const sizeMap: Record<Size, string> = {
  xs: "text-[12px] leading-[1.6]",
  sm: "text-[14px] leading-[1.65]",
  base: "text-[16px] leading-[1.75]",
  lg: "text-[18px] leading-[1.7]",
  xl: "text-[20px] leading-[1.65]",
};

const toneMap: Record<Tone, string> = {
  default: "text-[var(--color-fg)]",
  muted: "text-[var(--color-fg-muted)]",
  soft: "text-[var(--color-fg-soft)]",
  accent: "text-[var(--color-ember-500)]",
  brass: "text-[var(--color-brass-400)]",
};

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  size?: Size;
  tone?: Tone;
  weight?: 400 | 500 | 600 | 700;
  children: ReactNode;
}

export function Text({ size = "base", tone = "default", weight = 400, children, className, ...rest }: Props) {
  const weightClass = `font-[${weight}]`;
  return (
    <p
      className={cn(sizeMap[size], toneMap[tone], weightClass, className)}
      style={{ fontWeight: weight }}
      {...rest}
    >
      {children}
    </p>
  );
}
