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
        row.emphasized && "bg-[rgba(176,133,69,0.06)]"
      )}
    >
      <td className="py-4 px-4 align-top">
        <div
          className={cn(
            "font-bold text-[15px]",
            row.emphasized
              ? "text-[var(--color-brass-300)]"
              : "text-[var(--color-fg-strong)]"
          )}
        >
          {row.label}
        </div>
        {row.note && (
          <div className="text-[12px] text-[var(--color-fg-muted)] mt-1 leading-[1.6]">
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
      </td>
    </tr>
  );
}
