import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { Button } from "../atoms/Button";
import { MenuCard } from "../molecules/MenuCard";
import { signatureMenu, tableCharge } from "../../data/menu";

export function SignatureMenuSection() {
  const handleScrollToStores = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector("#stores");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#stores");
    }
  };

  return (
    <Section id="menu" spacing="lg" bg="default">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <Reveal>
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
            Signature Menu
          </span>
          <Heading level={2} display="md">
            본사 통일 단가
            <br />
            시그니처 4종.
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Button variant="outline" href="#stores" onClick={handleScrollToStores}>
            매장별 전체 메뉴 →
          </Button>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {signatureMenu.map((item, i) => (
          <Reveal key={item.id} delay={0.06 * i}>
            <MenuCard item={item} className="h-full" />
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-[12px] text-[var(--color-fg-soft)] text-center md:text-left">
        ※ {tableCharge.label} {tableCharge.amount.toLocaleString()}원 ({tableCharge.note}) 별도 ·
        가격은 매장 사정에 따라 변동될 수 있습니다 · 사이드 메뉴는 매장별로 일부 차이가 있습니다
      </p>
    </Section>
  );
}
