import { motion, useReducedMotion } from "motion/react";
import { Button } from "../atoms/Button";

export function HeroFranchiseSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative pt-[120px] md:pt-[160px] pb-20 md:pb-28 overflow-hidden grain">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/hero-1920.jpg)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal-950)] via-[rgba(11,9,7,0.85)] to-[var(--color-charcoal-900)]"
      />

      <div className="relative container-page max-w-[1100px]">
        <motion.span
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7 }}
          className="inline-block text-[11px] font-bold tracking-[0.2em] text-[var(--color-brass-400)] uppercase mb-5"
        >
          Franchise · 가맹모집
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: 0.1 }}
          className="text-[clamp(40px,7vw,86px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--color-fg-strong)]"
        >
          보증금 0원,
          <br />
          1,100만원으로 시작하는
          <br />
          <span className="text-[var(--color-brass-300)]">부산·경남·대구 10개 매장 본부의 한식 갈비 가맹</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: 0.25 }}
          className="mt-8 text-[16px] md:text-[18px] leading-[1.85] text-[var(--color-fg-muted)] max-w-[60ch]"
        >
          가맹비 550만 + 교육비 550만, 보증금은 받지 않습니다. 매월 매출의 1.65% 또는 매월 44만원 (부가세 포함) 로열티 — 전 비용 정보공개서 2025.0854로 공개되어 있습니다.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button size="lg" href="#inquiry">
            24시간 내 본사 직접 회신 →
          </Button>
          <Button size="lg" variant="outline" href="tel:01057224929">
            본사 010-5722-4929
          </Button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: 0.5 }}
          className="mt-10 text-[12px] text-[var(--color-fg-soft)] leading-[1.7] border-l-2 border-[var(--color-brass-500)] pl-3 max-w-[64ch] py-1"
        >
          ※ 정보공개서를 제공받은 날부터 14일이 경과한 후에 가맹계약을 체결하거나
          가맹금을 수령합니다 (가맹사업거래의 공정화에 관한 법률 §7③).
          본 사이트는 가맹희망자에게 정보공개서를 요청 시 즉시 제공합니다.
        </motion.p>
      </div>
    </section>
  );
}
