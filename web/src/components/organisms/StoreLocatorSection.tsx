import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { StoreCard } from "../molecules/StoreCard";
import { directStores, partnerStores } from "../../data/stores";

export function StoreLocatorSection() {
  return (
    <Section id="stores" spacing="lg" bg="elev">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          Stores · {directStores.length + partnerStores.length}개 매장 운영 중
        </span>
        <Heading level={2} display="md" className="max-w-[24ch]">
          부산·경남·대구,
          <br />
          {directStores.length + partnerStores.length}개 매장에서 만나요.
        </Heading>
        <p className="mt-4 text-[15px] text-[var(--color-fg-muted)] max-w-[56ch] leading-[1.85]">
          부산진구 부전 본사 직영 {directStores.length}개 매장에서 시작해 부산·경남·대구
          {" "}{directStores.length + partnerStores.length}개 매장까지 확장됐습니다. 모든 매장은
          시그니처 메뉴 4종을 동일한 단가로 운영합니다.
        </p>
      </Reveal>

      <Reveal>
        <h3 className="mt-12 md:mt-16 text-[12px] font-bold tracking-[0.2em] text-[var(--color-brass-400)] uppercase">
          Direct · 본사 직영점 {directStores.length}
        </h3>
      </Reveal>
      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {directStores.map((s, i) => (
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
      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {partnerStores.map((s, i) => (
          <Reveal key={s.id} delay={0.05 * i}>
            <StoreCard store={s} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
