// 1호점에서 10호점까지 — 운영 검증 타임라인 (스토리텔링)
import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { cn } from "../../utils/cn";

interface Milestone {
  id: string;
  period: string;
  title: string;
  description: string;
  emphasis?: boolean;
}

const milestones: Milestone[] = [
  {
    id: "founding",
    period: "2025.03",
    title: "본사 직영 1호점, 부산 부전(서면)",
    description:
      "양념돼지갈비 100g 3,500원 단일 가격으로 시작. 본사 직매입·화덕·숯불직화기 통일 시스템을 직접 운영하며 검증.",
  },
  {
    id: "scale-direct",
    period: "2025",
    title: "본사 직영 3개점 운영 안정화",
    description:
      "북구 화명직영점, 김해 외동점까지. 부산·경남에서 본사가 직접 동일 단가·메뉴·서비스를 운영하며 매뉴얼을 다듬은 시기.",
  },
  {
    id: "registration",
    period: "2025",
    title: "공정거래위원회 정보공개서 등록",
    description:
      "정보공개서 2025.0854 등록. 가맹비·교육비·로열티·차액가맹금·운영 중 부담까지 모든 비용을 공식 공개.",
    emphasis: true,
  },
  {
    id: "franchise-expansion",
    period: "2025–2026",
    title: "부산·경남·대구 가맹 7개점 확장",
    description:
      "연산·덕천·경성대부경대·기장 일광 (부산), 진해 용원·김해 외동 (경남), 대구 계명대. 직영에서 검증한 모델 그대로 확장.",
  },
  {
    id: "current",
    period: "2026.05",
    title: "전국 10개 매장 운영, 차액가맹금 0원 유지",
    description:
      "직영 3 + 가맹 7 = 10개 매장. 2024년 가맹점당 평균 차액가맹금 0원, 평균매출액 대비 0%로 정보공개서에 공식 등재.",
    emphasis: true,
  },
];

export function JourneySection() {
  return (
    <Section spacing="lg" bg="elev" id="journey">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
              Journey · 1년 4개월
            </span>
            <Heading level={2} display="md">
              직영부터 시작해,
              <br />
              <span className="text-[var(--color-brass-300)]">검증된</span> 모델로
              <br />
              확장했습니다.
            </Heading>
            <p className="mt-5 text-[14px] text-[var(--color-fg-muted)] leading-[1.85] max-w-[36ch]">
              가맹사업은 본사가 직접 운영해서 검증한 매뉴얼이 있을 때만 안전합니다. 올바로갈비는 본사 직영 3개점을 1년 운영한 뒤 가맹을 시작했습니다.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <ol className="relative space-y-6 md:space-y-8">
            <span
              aria-hidden="true"
              className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--color-border)]"
            />
            {milestones.map((m, i) => (
              <Reveal key={m.id} delay={0.06 * i}>
                <li className="relative pl-10">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-2 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center",
                      m.emphasis
                        ? "border-[var(--color-brass-400)] bg-[var(--color-brass-500)]"
                        : "border-[var(--color-border-strong)] bg-[var(--color-charcoal-800)]"
                    )}
                  >
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        m.emphasis ? "bg-[var(--color-ivory-50)]" : "bg-[var(--color-brass-400)]"
                      )}
                    />
                  </span>
                  <div
                    className={cn(
                      "surface-elev p-5 md:p-6",
                      m.emphasis && "border-[var(--color-brass-400)]"
                    )}
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-[12px] font-bold tracking-[0.14em] text-[var(--color-brass-300)]">
                        {m.period}
                      </span>
                    </div>
                    <h3 className="text-[16px] md:text-[18px] font-bold text-[var(--color-fg-strong)] leading-[1.4]">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-[13px] md:text-[14px] text-[var(--color-fg-muted)] leading-[1.85]">
                      {m.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
