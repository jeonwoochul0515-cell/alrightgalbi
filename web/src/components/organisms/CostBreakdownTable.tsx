import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { CostRow } from "../molecules/CostRow";
import { formatThousand } from "../../utils/format";
import { useContent } from "../../content/context";

export function CostBreakdownTable() {
  const { franchiseCosts, totalInitialFee, totalOtherCost } = useContent();
  const groups = [
    { key: "최초가맹금" as const, label: "최초 가맹금", total: totalInitialFee },
    { key: "기타비용" as const, label: "기타 비용 (30평 기준 추정)", total: totalOtherCost },
    { key: "운영부담" as const, label: "운영 중 부담", total: 0 },
  ];

  return (
    <Section id="cost" spacing="lg" bg="elev">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          Cost Breakdown
        </span>
        <Heading level={2} display="md" className="max-w-[26ch]">
          모든 비용, 숨김 없이.
          <br />
          <span className="text-[var(--color-brass-300)]">상한은 공개, 부담은 조정 가능.</span>
        </Heading>
        <p className="mt-5 text-[14px] md:text-[15px] text-[var(--color-fg-muted)] max-w-[60ch] leading-[1.85]">
          정보공개서 2025.0854 IV장 발췌. 표의 금액은 <strong className="text-[var(--color-fg)]">30평 신규 올공사 기준 상한 견적</strong>이며,
          기존 시설·집기 활용, 부분 시공, 매장 면적·입지 등에 따라 실제 부담은
          <strong className="text-[var(--color-fg)]"> 더 낮아질 수 있습니다</strong>. 점포 임대비용은 별도.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-[11.5px]">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[rgba(74,122,89,0.16)] text-[#7BB591] border border-[rgba(74,122,89,0.35)] font-bold tracking-[0.04em] uppercase">
            조정 가능
          </span>
          <span className="text-[var(--color-fg-soft)]">
            표기된 항목은 매장 상황에 따라 비용을 낮출 수 있는 항목입니다.
          </span>
        </div>
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
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="surface-elev p-4 md:p-5 border-l-2 border-[var(--color-brass-500)]">
            <h4 className="text-[12px] font-bold tracking-[0.06em] text-[var(--color-brass-300)] uppercase mb-2">
              점주 선택 항목 · 표에서 제외
            </h4>
            <ul className="text-[12.5px] text-[var(--color-fg-muted)] leading-[1.85] space-y-0.5">
              <li>· 초도물품 — 필요 수량에 따라 변동, 선택 구매 가능 (별도 정산)</li>
              <li>· 점포 임대 보증금·권리금 — 입지에 따라 별도</li>
              <li>· 철거·간판·냉난방·소방 공사 — 매장 상태에 따라 별도</li>
            </ul>
          </div>
          <div className="surface-elev p-4 md:p-5 border-l-2 border-[#4A7A59]">
            <h4 className="text-[12px] font-bold tracking-[0.06em] text-[#7BB591] uppercase mb-2">
              부담을 낮추는 방법
            </h4>
            <ul className="text-[12.5px] text-[var(--color-fg-muted)] leading-[1.85] space-y-0.5">
              <li>· 기존 매장 설비·집기 재활용 → 주방·홀집기 항목 절감</li>
              <li>· 부분 인테리어로 진행 → 신규 올공사 대비 평당 단가 인하</li>
              <li>· 24시간 내 본사 직접 상담 시 매장별 맞춤 견적 제공</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-[11.5px] text-[var(--color-fg-soft)] leading-[1.75] border-l-2 border-[var(--color-border)] pl-4">
          ※ 본 표는 정보공개서 2025.0854 IV장 발췌입니다. 표의 금액은 신규 올공사 기준 상한 견적으로,
          실제 시공 견적·매장 사정에 따라 변동되며 정식 견적은 본사 상담 시 안내됩니다.
        </p>
      </Reveal>
    </Section>
  );
}
