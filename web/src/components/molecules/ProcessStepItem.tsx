import type { ProcessStep } from "../../types/domain";

interface Props {
  step: ProcessStep;
  isLast?: boolean;
}

export function ProcessStepItem({ step, isLast }: Props) {
  return (
    <li className="relative flex gap-4 md:gap-6 pb-8 md:pb-12 last:pb-0">
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[19px] md:left-[23px] top-12 bottom-0 w-px bg-[var(--color-border-strong)]"
        />
      )}
      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[var(--color-brass-500)] bg-[var(--color-charcoal-900)] flex items-center justify-center font-extrabold text-[var(--color-brass-400)] text-[16px] md:text-[18px] z-10">
        {step.order}
      </div>
      <div className="flex-1 pt-1.5 md:pt-2">
        <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
          <h3 className="text-[18px] md:text-[20px] font-bold text-[var(--color-fg-strong)]">
            {step.title}
          </h3>
          {step.durationDays && (
            <span className="text-[11px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.08em]">
              {step.durationDays}
            </span>
          )}
        </div>
        <p className="text-[14px] text-[var(--color-fg-muted)] leading-[1.75] max-w-[60ch]">
          {step.description}
        </p>
      </div>
    </li>
  );
}
