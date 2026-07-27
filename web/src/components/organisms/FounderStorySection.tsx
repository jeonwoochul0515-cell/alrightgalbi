// 대표 메시지 — 가맹 의사결정 단계의 정서적 신뢰 연결 (사실 기반)
import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";

const keywords = ["직영 검증 1년", "단일 가격", "정보공개서 공개"];

export function FounderStorySection() {
  return (
    <Section spacing="lg" bg="elev" id="founder">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
              Founder · 대표 메시지
            </span>
            <Heading level={2} display="md">
              검증하지 않은 모델로
              <br />
              <span className="text-[var(--color-brass-300)]">가맹을 시작하지</span>
              <br />
              않았습니다.
            </Heading>
            <div className="mt-8 flex flex-col gap-1.5">
              <span className="text-[12px] tracking-[0.18em] text-[var(--color-fg-soft)] uppercase">
                Olbaro Galbi
              </span>
              <strong className="text-[20px] md:text-[22px] font-bold text-[var(--color-fg-strong)] tracking-[-0.01em]">
                유종우
              </strong>
              <span className="text-[13px] text-[var(--color-fg-muted)]">
                올바로갈비 대표 · 사업자등록 2023.12.10
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <div className="surface-elev p-7 md:p-10 border-l-4 border-[var(--color-brass-500)]">
              <div className="space-y-6 text-[15px] md:text-[16px] leading-[2] text-[var(--color-fg)] max-w-[58ch]">
                <p>
                  2023년 12월 처음 사업자등록을 한 그 날부터 한 가지만 정해두었습니다. 본사가 직접 매장을 운영해서 매뉴얼을 검증하기 전에는 가맹사업을 시작하지 않는다.
                </p>
                <p>
                  2025년 3월 부산 부전동에서 1호점을 열었습니다. 북구 화명·김해 외동까지 직영 3개점을 1년 동안 직접 운영하면서, 양념돼지갈비 100g <strong className="text-[var(--color-brass-300)]">3,500원</strong>이라는 단가가 마케팅 슬로건이 아니라 본사 직매입과 통일된 화덕·숯불직화기 시스템으로 유지 가능하다는 사실을 데이터로 확인했습니다.
                </p>
                <p>
                  현재 부산·경남·대구 10개 매장이 같은 단가, 같은 매뉴얼로 운영되고 있습니다. 가맹점주가 의사결정을 내리기 전에 알아야 할 모든 비용과 리스크는 정보공개서에 그대로 적혀 있고, 본사는 그 외의 어떤 비용도 따로 만들지 않습니다.
                </p>
                <p className="text-[var(--color-fg-strong)] font-bold text-[17px] md:text-[19px] leading-[1.7]">
                  같이 가요, <span className="text-[var(--color-brass-300)] italic">올바로</span>.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1.5 rounded-full border border-[var(--color-border-strong)] text-[12px] text-[var(--color-fg-muted)] font-semibold tracking-[0.02em]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-[11px] text-[var(--color-fg-soft)] leading-[1.7] max-w-[60ch]">
              ※ 본 메시지의 모든 수치·기일은 정보공개서 2025.0854 III·IV장에 등재된 공식 자료와 일치합니다. 정확한 가맹 조건은 본사 상담을 통해 정보공개서를 직접 받아보신 뒤 14일 숙려기간 동안 검토해주시기 바랍니다 (가맹사업법 §7③).
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
