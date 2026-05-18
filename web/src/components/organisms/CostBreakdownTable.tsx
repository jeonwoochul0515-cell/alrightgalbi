import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { CostRow } from "../molecules/CostRow";
import {
  franchiseCosts,
  totalInitialFee,
  totalOtherCost,
} from "../../data/franchise";
import { formatThousand } from "../../utils/format";

export function CostBreakdownTable() {
  const groups = [
    { key: "최초가맹금" as const, label: "최초 가맹금", total: totalInitialFee },
    { key: "기타비용" as const, label: "기타 비용 (30평 기준 추정)", total: totalOtherCost },
    { key: "운영부담" as const, label: "운영 중 부담", total: 0 },
  ];

  return (
    <Section spacing="lg" bg="elev">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          Cost Breakdown
        </span>
        <Heading level={2} display="md" className="max-w-[24ch]">
          모든 비용,
          <br />
          숨김 없이.
        </Heading>
        <p className="mt-5 text-[14px] text-[var(--color-fg-muted)] max-w-[58ch] leading-[1.85]">
          정보공개서 2025.0854 발췌. 실제 금액은 매장 위치·면적·내부 설비에 따라 차이가 있으며,
          점포 임대비용은 별도입니다.
        </p>
      </Reveal>

      <div className="mt-10 md:mt-14 space-y-10">
        {groups.map((g) => {
          const rows = franchiseCosts.filter((c) => c.category === g.key);
          if (rows.length === 0) return null;
          return (
            <Reveal key={g.key}>
              <div className="surface-elev overflow-hidden">
                <header className="flex items-baseline justify-between gap-3 px-4 md:px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-charcoal-700)]">
                  <h3 className="text-[14px] md:text-[16px] font-bold text-[var(--color-brass-300)]">
                    {g.label}
                  </h3>
                  {g.total > 0 && (
                    <span className="text-[14px] md:text-[16px] font-extrabold text-[var(--color-fg-strong)]">
                      합계 {formatThousand(g.total * 1000)}원
                    </span>
                  )}
                </header>
                <table className="w-full">
                  <tbody>
                    {rows.map((r) => (
                      <CostRow key={r.id} row={r} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="mt-10 text-[12px] text-[var(--color-fg-soft)] leading-[1.7] border-l-2 border-[var(--color-brass-500)] pl-4">
          ※ 본 표는 정보공개서 2025.0854 IV장 발췌이며, 실제 시공 견적·매장 사정에 따라 변동될 수 있습니다.
          정식 견적은 본사 상담을 통해 안내됩니다.
        </p>
      </Reveal>
    </Section>
  );
}
