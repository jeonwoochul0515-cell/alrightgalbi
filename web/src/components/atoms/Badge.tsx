import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Tone = "ember" | "brass" | "ivory" | "outline";

interface Props {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

const toneMap: Record<Tone, string> = {
  ember: "bg-[var(--color-ember-500)] text-[var(--color-ivory-50)]",
  brass: "bg-[var(--color-brass-500)] text-[var(--color-charcoal-900)]",
  ivory: "bg-[var(--color-ivory-100)] text-[var(--color-charcoal-900)]",
  outline: "bg-transparent text-[var(--color-brass-400)] border border-[var(--color-brass-500)]",
};

export function Badge({ tone = "ember", children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-[6px] text-[11px] font-bold uppercase tracking-[0.06em]",
        toneMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
