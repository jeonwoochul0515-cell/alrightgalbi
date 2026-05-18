// 가맹 의사결정용 비교 섹션 — 일반 프랜차이즈 통상 사례 vs 올바로갈비 (투명성·앵커링)
import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";

interface ComparisonRow {
  id: string;
  label: string;
  typical: string;
  olbaro: string;
  source?: string;
}

const rows: ComparisonRow[] = [
  {
    id: "deposit",
    label: "보증금",
    typical: "수백만~수천만 원",
    olbaro: "0원",
    source: "정보공개서 2025.0854 IV-1",
  },
  {
    id: "intermediate-margin",
    label: "차액가맹금 (식자재 마진)",
    typical: "통상 발생",
    olbaro: "0원 (2024년 가맹점당 평균)",
    source: "정보공개서 2025.0854 IV-2",
  },
  {
    id: "royalty",
    label: "로열티 산정",
    typical: "매출 % 일괄",
    olbaro: "매출 1.65% 또는 월 44만 (부가세 포함)",
    source: "정보공개서 2025.0854 IV-2",
  },
  {
    id: "ad-share",
    label: "광고분담금",
    typical: "전액 점주 부담 사례 多",
    olbaro: "본사 50 / 점주 50",
    source: "정보공개서 2025.0854 IV-2",
  },
  {
    id: "deposit-protection",
    label: "가맹금 예치",
    typical: "본부 정책에 따라 상이",
    olbaro: "신한은행 예치 (가맹사업법 §6의5)",
  },
  {
    id: "insurance",
    label: "피해보상보험",
    typical: "선택 (가입 안 한 본부 多)",
    olbaro: "서울보증보험(주) 가입",
  },
  {
    id: "registration",
    label: "정보공개서 등록",
    typical: "필수",
    olbaro: "2025.0854 (공정거래위원회)",
  },
  {
    id: "compliance",
    label: "최근 3년 시정조치",
    typical: "본부별 상이",
    olbaro: "0건",
    source: "정보공개서 2025.0854 III장",
  },
];

export function ComparisonSection() {
  return (
    <Section spacing="lg" bg="default">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          Compare · 다른 본사와 비교
        </span>
        <Heading level={2} display="md" className="max-w-[24ch]">
          비교는 정직이
          <br />
          기본입니다.
        </Heading>
        <p className="mt-5 text-[14px] text-[var(--color-fg-muted)] max-w-[58ch] leading-[1.85]">
          가맹 의사결정 전, 다른 본부와 동일한 기준으로 비교해보세요. 좌측은 일반 한식 프랜차이즈에서 통상 발생하는 비용 구조이며, 우측은 정보공개서 2025.0854에 등재된 올바로갈비의 실제 조건입니다.
        </p>
      </Reveal>

      <div className="mt-10 md:mt-14 surface-elev overflow-hidden">
        <header className="grid grid-cols-[1.2fr_1fr_1.4fr] gap-2 md:gap-4 px-4 md:px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-charcoal-700)] text-[11px] md:text-[12px] font-bold tracking-[0.18em] uppercase">
          <span className="text-[var(--color-fg-soft)]">항목</span>
          <span className="text-[var(--color-fg-soft)]">일반 프랜차이즈 통상</span>
          <span className="text-[var(--color-brass-300)]">올바로갈비</span>
        </header>
        <ul>
          {rows.map((r, i) => (
            <Reveal key={r.id} delay={0.04 * i}>
              <li
                className={`grid grid-cols-[1.2fr_1fr_1.4fr] gap-2 md:gap-4 px-4 md:px-6 py-4 md:py-5 border-b border-[var(--color-border)] last:border-b-0 ${
                  i % 2 === 0 ? "" : "bg-[rgba(176,133,69,0.03)]"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <strong className="text-[14px] md:text-[15px] font-bold text-[var(--color-fg-strong)] leading-[1.4]">
                    {r.label}
                  </strong>
                  {r.source && (
                    <span className="text-[10px] text-[var(--color-fg-soft)] leading-[1.5]">
                      ※ {r.source}
                    </span>
                  )}
                </div>
                <div className="text-[13px] md:text-[14px] text-[var(--color-fg-muted)] leading-[1.6] line-through decoration-[var(--color-fg-soft)] decoration-1 underline-offset-2">
                  {r.typical}
                </div>
                <div className="text-[14px] md:text-[15px] font-bold text-[var(--color-brass-300)] leading-[1.5]">
                  {r.olbaro}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal>
        <div className="mt-8 md:mt-10 surface-elev p-5 md:p-6 border-l-4 border-[var(--color-brass-500)]">
          <p className="text-[13px] md:text-[14px] text-[var(--color-fg)] leading-[1.85]">
            <strong className="text-[var(--color-fg-strong)] font-bold">직접 비교해보세요.</strong>{" "}
            공정거래위원회 가맹사업거래 정보공개서 통합검색{" "}
            <a
              href="https://franchise.ftc.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brass-300)] underline underline-offset-2 hover:text-[var(--color-brass-200)] transition-colors"
            >
              franchise.ftc.go.kr
            </a>
            에서 다른 본부의 정보공개서를 동일 기준으로 열람할 수 있습니다. 비용 구조·최근 3년 시정조치·평균 차액가맹금 등 핵심 항목을 본사가 일방적으로 가공하지 않은 공식 자료로 비교해보시기를 권장드립니다.
          </p>
          <p className="mt-3 text-[11px] text-[var(--color-fg-soft)] leading-[1.7]">
            ※ 좌측 "일반 프랜차이즈 통상" 항목은 한식·외식 프랜차이즈 업계에서 자주 관찰되는 비용 구조를 일반화한 표현이며, 본사별 실제 조건은 각자의 정보공개서로 확인하셔야 합니다.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
