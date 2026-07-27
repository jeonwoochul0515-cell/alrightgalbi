import type { FranchiseCost } from "../../types/domain";
import { formatThousand } from "../../utils/format";
import { cn } from "../../utils/cn";

interface Props {
  row: FranchiseCost;
}

export function CostRow({ row }: Props) {
  const isPercent = row.unit === "PERCENT";
  const display =
    row.displayOverride ??
    (isPercent
      ? `${(row.amount / 100).toFixed(2)}%`
      : `${formatThousand(row.amount * 1000)}원`);

  return (
    <tr
      className={cn(
        "border-b border-[var(--color-border)]",
        row.emphasized && "bg-[rgba(176,133,69,0.06)]",
        row.flexible && "bg-[rgba(74,122,89,0.04)]"
      )}
    >
      <td className="py-4 px-4 align-top">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={cn(
              "font-bold text-[15px]",
              row.emphasized
                ? "text-[var(--color-brass-300)]"
                : "text-[var(--color-fg-strong)]"
            )}
          >
            {row.label}
          </span>
          {row.flexible && (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-bold tracking-[0.04em] px-1.5 py-0.5 rounded-[4px] bg-[rgba(74,122,89,0.18)] text-[#7BB591] border border-[rgba(74,122,89,0.4)] uppercase">
              조정 가능
            </span>
          )}
        </div>
        {row.note && (
          <div className="text-[12px] text-[var(--color-fg-muted)] mt-1.5 leading-[1.7]">
            {row.note}
          </div>
        )}
        {row.supplier && (
          <div className="text-[11px] text-[var(--color-fg-soft)] mt-1">
            공급: {row.supplier}
          </div>
        )}
      </td>
      <td className="py-4 px-4 text-right align-top whitespace-nowrap">
        <span
          className={cn(
            "font-extrabold text-[18px] md:text-[22px]",
            row.emphasized
              ? "text-[var(--color-brass-300)]"
              : "text-[var(--color-fg-strong)]"
          )}
        >
          {display}
        </span>
        {row.flexible && (
          <div className="text-[10.5px] text-[#7BB591] font-semibold mt-0.5 tracking-[0.02em]">
            상한 견적 · 상담 시 조정
          </div>
        )}
      </td>
    </tr>
  );
}
