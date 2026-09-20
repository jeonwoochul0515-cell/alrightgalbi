// 명지첫집 스타일 미니멀 FAQ — 단일 컬럼, 카테고리 없이 10문항 아코디언
import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { FaqItem } from "../molecules/FaqItem";
import { useContent } from "../../content/context";

export function FaqSection() {
  const { faqItems } = useContent();
  return (
    <Section spacing="lg" bg="elev">
      <div className="max-w-[760px] mx-auto">
        <Reveal>
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-4">
            자주 묻는 질문
          </span>
          <Heading level={2} display="md" className="max-w-[20ch]">
            궁금하실 만한
            <br />
            열 가지.
          </Heading>
          <p className="mt-5 text-[14px] md:text-[15px] text-[var(--color-fg-muted)] leading-[1.85] max-w-[44ch]">
            더 자세한 사항은 1차 상담에서 안내드립니다. 부담 없이 질문해 주세요.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 md:mt-14">
            {faqItems.map((item, i) => (
              <FaqItem key={item.id} item={item} defaultOpen={i === 0} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-[13px] text-[var(--color-fg-soft)] leading-[1.85] text-center">
            여기에 없는 질문은 본사 010-5722-4929 또는 창업 상담 신청 폼으로 연락 주시면
            <br className="hidden md:block" />
            24시간 내에 직접 회신드립니다.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
