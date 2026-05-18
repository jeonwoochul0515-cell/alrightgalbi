import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { Button } from "../atoms/Button";

const stats = [
  { v: "1,100만", l: "최초 가맹금" },
  { v: "0원", l: "보증금" },
  { v: "1.65%", l: "월 매출 로열티" },
  { v: "0건", l: "공정위 시정조치 (3년)" },
];

export function FranchiseTeaserSection() {
  return (
    <Section id="franchise-teaser" spacing="lg" bg="ember" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: "url(/hero-1920.jpg)", backgroundSize: "cover" }}
      />
      <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase opacity-75 mb-3">
              Franchise · 가맹모집
            </span>
            <Heading level={2} display="md" className="text-[var(--color-ivory-50)]">
              부산 본사가 직접 전수합니다.
              <br />
              같이 가요, <span className="italic">올바로</span>.
            </Heading>
            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.85] opacity-90 max-w-[58ch]">
              가맹비 550만 + 교육비 550만, 보증금 없이 시작하는 부산 한식 갈비 본사 가맹.
              로열티는 매월 매출의 1.65% — 정보공개서 2025.0854로 모두 공개되어 있습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="primary" href="/franchise" className="!bg-[var(--color-charcoal-900)] !text-[var(--color-ivory-50)] hover:!bg-[var(--color-charcoal-800)]">
                가맹모집 자세히 →
              </Button>
              <Button size="lg" variant="outline" href="tel:01057224929" className="!border-[var(--color-ivory-50)] !text-[var(--color-ivory-50)]">
                010-5722-4929
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <dl className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="bg-[rgba(11,9,7,0.45)] backdrop-blur-sm border border-[rgba(244,236,216,0.2)] rounded-lg p-5"
                >
                  <dt className="text-[10px] font-bold uppercase tracking-[0.12em] opacity-80">
                    {s.l}
                  </dt>
                  <dd className="mt-2 text-[clamp(24px,2.6vw,34px)] font-extrabold leading-[1] text-[var(--color-ivory-50)]">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
