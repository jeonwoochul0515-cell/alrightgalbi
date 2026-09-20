import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { ProcessStepItem } from "../molecules/ProcessStepItem";
import { useContent } from "../../content/context";

export function ProcessTimelineSection() {
  const { processSteps } = useContent();
  return (
    <Section id="process" spacing="lg" bg="default">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          Process · 창업 절차
        </span>
        <Heading level={2} display="md" className="max-w-[26ch]">
          상담부터 오픈까지,
          <br />
          <span className="text-[var(--color-brass-300)]">평균 6–8주.</span>
        </Heading>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[var(--color-fg-muted)]">
          <span>
            <strong className="text-[var(--color-brass-300)] font-bold mr-1.5">14일</strong>
            정보공개서 숙려기간 (가맹사업법 §7③)
          </span>
          <span>
            <strong className="text-[var(--color-brass-300)] font-bold mr-1.5">3–5주</strong>
            인테리어·기기 설치
          </span>
          <span>
            <strong className="text-[var(--color-brass-300)] font-bold mr-1.5">1주</strong>
            오픈 교육·SC 지원
          </span>
        </div>
      </Reveal>

      <ol className="mt-12 md:mt-16 max-w-[820px]">
        {processSteps.map((s, i) => (
          <Reveal key={s.id} delay={0.05 * i}>
            <ProcessStepItem step={s} isLast={i === processSteps.length - 1} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
