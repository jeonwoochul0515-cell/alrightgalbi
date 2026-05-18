import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-bold rounded-md transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

const sizeClass: Record<Size, string> = {
  sm: "min-h-[40px] px-4 text-[14px]",
  md: "min-h-[48px] px-6 text-[15px]",
  lg: "min-h-[56px] px-8 text-[16px]",
};

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--color-ember-500)] text-[var(--color-ivory-50)] shadow-[0_12px_32px_-14px_rgba(192,57,43,0.7)] hover:bg-[var(--color-ember-400)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(192,57,43,0.85)]",
  secondary:
    "bg-[var(--color-charcoal-800)] text-[var(--color-ivory-100)] border border-[var(--color-border-strong)] hover:border-[var(--color-brass-400)] hover:bg-[var(--color-charcoal-700)]",
  outline:
    "bg-transparent text-[var(--color-ivory-100)] border border-[var(--color-border-strong)] hover:border-[var(--color-brass-400)] hover:bg-[rgba(176,133,69,0.08)]",
  ghost:
    "bg-transparent text-[var(--color-ivory-100)] hover:bg-[var(--color-charcoal-800)]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: never };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children, className, fullWidth, ...rest } = props;
  const cls = cn(base, sizeClass[size], variantClass[variant], fullWidth && "w-full", className);

  if ("href" in rest && rest.href) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
