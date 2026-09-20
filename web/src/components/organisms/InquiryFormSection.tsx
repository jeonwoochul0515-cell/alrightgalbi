import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { TrustBadge } from "../molecules/TrustBadge";
import { InquiryForm } from "../../features/inquiry/InquiryForm";
import { useContent } from "../../content/context";

export function InquiryFormSection() {
  const { safetyBadges } = useContent();
  return (
    <Section id="inquiry" spacing="lg" bg="default">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
              Inquiry · 창업 상담 신청
            </span>
            <Heading level={2} display="md">
              본사 대표가
              <br />
              직접 회신합니다.
            </Heading>
            <p className="mt-6 text-[15px] text-[var(--color-fg-muted)] leading-[1.85] max-w-[44ch]">
              접수 후 영업일 기준 24시간 내에 본사에서 직접 연락드립니다.
              급하신 분은 010-5722-4929로 바로 전화 주세요.
            </p>

            <div className="mt-8 grid gap-3">
              {safetyBadges.map((b) => (
                <TrustBadge key={b.id} badge={b} />
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="surface-elev p-6 md:p-10">
              <InquiryForm />
              <p className="mt-8 pt-6 border-t border-[var(--color-border)] text-[11px] text-[var(--color-fg-soft)] leading-[1.7]">
                ※ 만 14세 이상만 접수 가능합니다. 만 14세 미만의 개인정보는 수집하지 않습니다.
                <br />
                ※ 본 사이트는 가맹희망자에게 정보공개서를 요청 시 즉시 제공합니다.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
