import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface Props {
  id?: string;
  children: ReactNode;
  className?: string;
  bg?: "default" | "elev" | "ember" | "ivory";
  spacing?: "sm" | "md" | "lg";
}

const bgMap = {
  default: "bg-[var(--color-bg)]",
  elev: "bg-[var(--color-bg-elev)]",
  ember: "bg-[var(--color-ember-600)] text-[var(--color-ivory-50)]",
  ivory: "bg-[var(--color-ivory-100)] text-[var(--color-charcoal-900)]",
};

const spacingMap = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

export function Section({ id, children, className, bg = "default", spacing = "md" }: Props) {
  return (
    <section id={id} className={cn("relative", bgMap[bg], spacingMap[spacing], className)}>
      <div className="container-page relative">{children}</div>
    </section>
  );
}
