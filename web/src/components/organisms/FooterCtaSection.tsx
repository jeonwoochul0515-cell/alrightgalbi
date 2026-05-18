import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { Button } from "../atoms/Button";
import { Wordmark } from "../atoms/Wordmark";

export function FooterCtaSection() {
  return (
    <Section spacing="lg" bg="default" className="text-center overflow-hidden grain">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-1920.jpg)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-950)] via-[rgba(11,9,7,0.7)] to-[rgba(11,9,7,0.85)]"
      />

      <div className="relative max-w-[720px] mx-auto py-8 md:py-12">
        <Reveal>
          <div className="flex justify-center mb-8">
            <Wordmark size="lg" />
          </div>
          <Heading level={2} display="md" className="text-[var(--color-fg-strong)]">
            같이 가요, <span className="italic text-[var(--color-brass-300)]">올바로</span>.
          </Heading>
          <p className="mt-6 text-[15px] md:text-[16px] text-[var(--color-fg-muted)] leading-[1.85] max-w-[44ch] mx-auto">
            오늘 문의하시면 본사 대표가 직접 24시간 내 회신드립니다.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button size="lg" href="tel:01057224929">
              본사 010-5722-4929
            </Button>
            <Button size="lg" variant="outline" href="/franchise">
              창업 상담 신청
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
