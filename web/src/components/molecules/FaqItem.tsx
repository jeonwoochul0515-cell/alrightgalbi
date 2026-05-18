import { useState, useId } from "react";
import type { FAQItem } from "../../types/domain";
import { cn } from "../../utils/cn";

interface Props {
  item: FAQItem;
  defaultOpen?: boolean;
}

export function FaqItem({ item, defaultOpen }: Props) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const id = useId();
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div className="border-b border-[var(--color-border)]">
      <h3>
        <button
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left transition-colors hover:text-[var(--color-brass-400)] min-h-[60px]"
        >
          <span className="text-[16px] md:text-[18px] font-bold text-[var(--color-fg-strong)] flex-1">
            Q. {item.question}
          </span>
          <span
            className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full border border-[var(--color-brass-500)] flex items-center justify-center text-[var(--color-brass-400)] transition-transform duration-300",
              open && "rotate-45 bg-[var(--color-brass-500)] text-[var(--color-charcoal-900)]"
            )}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-6 md:pb-8"
      >
        <p className="text-[14px] md:text-[15px] leading-[1.85] text-[var(--color-fg-muted)] pl-1 max-w-[68ch]">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
