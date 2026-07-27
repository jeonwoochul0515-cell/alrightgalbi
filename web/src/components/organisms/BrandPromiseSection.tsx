// 5가지 브랜드 약속(좋은 재료·참숯·양념·가격·운영) 카드 섹션. Hero 바로 밑에 배치.
import type { ReactNode } from "react";
import { Section } from "../atoms/Section";
import { Reveal } from "../atoms/Reveal";

interface Promise {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const promises: Promise[] = [
  {
    id: "ingredient",
    title: "좋은 재료",
    description: "엄선한 국내산 돼지고기\n정직하게 선별합니다",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 13c0-3.3 2.7-6 6-6 2.6 0 4.8 1.7 5.6 4 .7-.6 1.5-1 2.4-1a3 3 0 0 1 3 3c0 1.5-1 2.7-2.4 3l-3.6.8c-.4.1-.8.4-1 .8L13 21l-3-5-5 1 0-4z" />
        <circle cx="9" cy="11" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "charcoal",
    title: "참숯 직화",
    description: "참숯의 강한 화력으로\n맛과 향을 살렸습니다",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1.5-3 2-5" />
        <path d="M9 14a3 3 0 0 0 6 0c0-1.5-1-2.5-1.5-3.5" />
      </svg>
    ),
  },
  {
    id: "sauce",
    title: "특제 양념",
    description: "올바로갈비만의 비법으로\n깊은 맛을 완성합니다",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11h18l-2 7H5z" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        <path d="M12 4v-2" />
      </svg>
    ),
  },
  {
    id: "price",
    title: "부담 없는 가격",
    description: "합리적인 가격으로\n누구나 즐길 수 있습니다",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="9" r="3" />
        <circle cx="17" cy="11" r="2.5" />
        <path d="M3 19c0-2.5 2.7-4 6-4s6 1.5 6 4" />
        <path d="M13 19c0-1.8 1.8-3 4-3s4 1.2 4 3" />
      </svg>
    ),
  },
  {
    id: "system",
    title: "안정적인 운영",
    description: "체계적인 시스템으로\n든든한 창업을 지원합니다",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export function BrandPromiseSection() {
  return (
    <Section id="promise" spacing="md" bg="default">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {promises.map((p, i) => (
          <Reveal key={p.id} delay={0.06 * i}>
            <li className="surface-elev p-5 md:p-6 h-full flex flex-col items-start gap-3">
              <span className="text-[var(--color-brass-400)]">{p.icon}</span>
              <h3 className="text-[15px] md:text-[16px] font-bold text-[var(--color-fg-strong)]">
                {p.title}
              </h3>
              <p className="text-[12.5px] md:text-[13px] text-[var(--color-fg-muted)] leading-[1.7] whitespace-pre-line">
                {p.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
