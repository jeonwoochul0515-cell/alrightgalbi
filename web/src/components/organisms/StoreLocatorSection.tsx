import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { StoreCard } from "../molecules/StoreCard";
import { stores } from "../../data/stores";

const partnerStores: { name: string; address: string }[] = [
  { name: "연산점", address: "부산광역시 연제구 쌍미천로161번길 27, 1층" },
  { name: "덕천점", address: "부산광역시 북구 만덕대로16번길 41, 1층" },
  { name: "경성대·부경대점", address: "부산광역시 남구 용소로13번길 42, 1층" },
  { name: "하단점", address: "부산광역시 사하구 낙동대로519번길 25, 1층" },
  { name: "기장 일광점", address: "부산광역시 기장군 일광읍 해송1로 17, 1층" },
  { name: "진해 용원점", address: "경상남도 창원시 진해구 용재로35번길 3, 1층" },
  { name: "대구 계명대점", address: "대구광역시 달서구 서당로7길 50, 1층" },
];

export function StoreLocatorSection() {
  return (
    <Section id="stores" spacing="lg" bg="elev">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          Stores · 10개 매장 운영 중
        </span>
        <Heading level={2} display="md" className="max-w-[24ch]">
          부산·경남·대구,
          <br />
          10개 매장에서 만나요.
        </Heading>
        <p className="mt-4 text-[15px] text-[var(--color-fg-muted)] max-w-[56ch] leading-[1.85]">
          부산진구 부전 본사 직영 3개 매장에서 시작해 부산·경남·대구 10개 매장까지
          확장됐습니다. 모든 매장은 시그니처 메뉴 4종을 동일한 단가로 운영합니다.
        </p>
      </Reveal>

      <Reveal>
        <h3 className="mt-12 md:mt-16 text-[12px] font-bold tracking-[0.2em] text-[var(--color-brass-400)] uppercase">
          Direct · 본사 직영점 3
        </h3>
      </Reveal>
      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {stores.map((s, i) => (
          <Reveal key={s.id} delay={0.08 * i}>
            <StoreCard store={s} className="h-full" />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-14 md:mt-20 text-[12px] font-bold tracking-[0.2em] text-[var(--color-brass-400)] uppercase">
          Partner · 가맹점 {partnerStores.length}
        </h3>
      </Reveal>
      <ul className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {partnerStores.map((p, i) => (
          <Reveal key={p.name} delay={0.05 * i}>
            <li className="surface-elev p-5 md:p-6 h-full flex flex-col gap-1">
              <strong className="text-[16px] md:text-[17px] font-bold text-[var(--color-fg-strong)]">
                {p.name}
              </strong>
              <span className="text-[13px] text-[var(--color-fg-muted)] leading-[1.7]">
                {p.address}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
