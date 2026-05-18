import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { StatCard } from "../molecules/StatCard";

const cards = [
  {
    metric: "0",
    unit: "원",
    label: "보증금 없음",
    description: "별도 보증금 없이 시작하는 부산 한식 갈비 본사 가맹.",
    source: "정보공개서 2025.0854",
  },
  {
    metric: "1.65",
    unit: "%",
    label: "월 매출 로열티",
    description: "매월 매출의 1.65% (또는 월 44만원, 부가세 포함).",
    source: "정보공개서 2025.0854",
    emphasized: true,
  },
  {
    metric: "3,500",
    unit: "원",
    label: "시그니처 100g",
    description: "양념돼지갈비 100g 본사 통일 단가. 1인 200g 권장.",
    source: "본사 통일 단가 · 상차림비 3,000원/테이블 별도",
  },
  {
    metric: "3",
    unit: "개",
    label: "본사 직영매장",
    description: "부산 부전·화명 + 김해 외동 본사 직영. 2025-03 부전 1호점 개시.",
    source: "본사 직영 운영 기준",
  },
];

export function WhyOlbaroSection() {
  return (
    <Section id="why" spacing="lg" bg="elev">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          Why Olbaro
        </span>
        <Heading level={2} display="md" className="max-w-[20ch]">
          숫자가 말하는 차이.
        </Heading>
      </Reveal>

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={0.08 * i}>
            <StatCard {...c} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
