import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";

export function BrandStorySection() {
  return (
    <Section id="story" spacing="lg" bg="default">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-4">
              Brand Story
            </span>
            <Heading level={2} display="md" className="text-[var(--color-fg-strong)]">
              부산, 숯불,
              <br />
              그리고 <span className="text-[var(--color-brass-300)]">올바름</span>.
            </Heading>
          </Reveal>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-[16px] md:text-[17px] leading-[2] text-[var(--color-fg)] max-w-[58ch]">
              2025년 3월, 부산진구 부전동에서 본사 직영 1호점이 시작되었습니다. 부전·화명·김해외동 직영 매뉴얼이 검증된 뒤, 1년 4개월 만에 부산·경남·대구 10개 매장으로 확장된 한식 갈비 본사가 여기 있습니다.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[15px] md:text-[16px] leading-[2] text-[var(--color-fg-muted)] max-w-[58ch]">
              <strong className="text-[var(--color-fg)]">올바른 원육</strong>을 <strong className="text-[var(--color-fg)]">올바른 가격</strong>에. 양념돼지갈비 100g 3,500원이라는 단가는 마진을 줄여서가 아니라, 본사 직매입과 화덕·숯불직화기 통일 시스템에서 나옵니다.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-2 mt-6">
              {["부산 본사 직영", "숯불 직화", "본사 통일 단가", "100g 3,500원", "보증금 0원"].map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1.5 rounded-full border border-[var(--color-border-strong)] text-[12px] text-[var(--color-fg-muted)] font-semibold"
                >
                  {kw}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
