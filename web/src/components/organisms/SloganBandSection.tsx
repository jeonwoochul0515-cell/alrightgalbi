// 브랜드 슬로건 4종 — Hero 직후 브랜드 톤을 한 호흡 짚어주는 띠 섹션
import { Section } from "../atoms/Section";
import { Reveal } from "../atoms/Reveal";

const slogans = [
  "좋은 고기를 더 합리적으로",
  "부담 없이 즐기는 진짜 갈비",
  "가격은 낮추고 만족은 올리다",
];

export function SloganBandSection() {
  return (
    <Section spacing="md" bg="default" className="overflow-hidden">
      <div className="text-center max-w-[820px] mx-auto">
        <Reveal>
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-6">
            Brand Promise
          </span>
        </Reveal>
        <ul className="space-y-3 md:space-y-4">
          {slogans.map((s, i) => (
            <Reveal key={s} delay={0.08 * i}>
              <li className="text-[clamp(20px,3vw,30px)] font-bold text-[var(--color-fg-strong)] leading-[1.5] tracking-[-0.01em]">
                <span className="text-[var(--color-brass-300)] mr-2">“</span>
                {s}
                <span className="text-[var(--color-brass-300)] ml-1">”</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.3}>
          <p className="mt-10 text-[clamp(18px,2.4vw,24px)] font-extrabold italic text-[var(--color-brass-300)] tracking-[-0.01em]">
            올바르게 모시겠습니다.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
