import { motion, useReducedMotion } from "motion/react";
import { Button } from "../atoms/Button";
import { Wordmark } from "../atoms/Wordmark";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden grain pt-[68px] md:pt-[80px] bg-[var(--color-bg)]"
    >
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-[-4%] top-1/2 -translate-y-1/2 w-[58%] lg:w-[52%] aspect-[16/11] bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url(/hero-main.jpg)",
          filter: "saturate(0.9) brightness(1.02)",
          opacity: 0.75,
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 70% at 60% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 80%)",
          maskImage:
            "radial-gradient(ellipse 65% 70% at 60% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="md:hidden absolute inset-x-0 top-[40%] bottom-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url(/hero-main.jpg)",
          filter: "saturate(0.9) brightness(1.02)",
          opacity: 0.55,
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[rgba(255,255,240,0.85)] to-[rgba(255,255,240,0.1)]"
      />

      <div className="relative container-page py-20 md:py-32 max-w-[1320px] z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Wordmark size="xl" showKor />
        </motion.div>

        <motion.span
          className="mt-8 md:mt-10 inline-block text-[11px] md:text-[12px] font-bold tracking-[0.22em] text-[var(--color-brass-400)] uppercase"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.15 }}
        >
          Brand Promise
        </motion.span>

        <motion.h1
          className="mt-3 text-[clamp(28px,4.4vw,56px)] font-extrabold text-[var(--color-fg-strong)] leading-[1.18] tracking-[-0.025em] max-w-[18ch] break-keep"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          부담 없이 즐기는
          <br />
          제대로 된
          <br />
          <span className="text-[var(--color-ember-500)]">숯불갈비.</span>
        </motion.h1>

        <motion.p
          className="mt-5 md:mt-6 text-[15px] md:text-[17px] font-semibold text-[var(--color-fg)] leading-[1.6] max-w-[34ch]"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.32 }}
        >
          부산이 길러낸 정직한 맛, 올바로갈비.
        </motion.p>

        <motion.div
          className="mt-7 md:mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.4 }}
        >
          <span className="text-[15px] md:text-[16px] font-semibold text-[var(--color-fg-muted)]">
            양념돼지갈비
          </span>
          <span className="inline-block bg-[var(--color-ember-500)] text-white px-2.5 py-1 rounded-md text-[22px] md:text-[28px] font-extrabold align-baseline">
            3,500원
          </span>
          <span className="text-[13px] md:text-[14px] font-bold text-[var(--color-fg-muted)]">
            / 100g
          </span>
        </motion.div>

        <motion.p
          className="mt-3 text-[11.5px] md:text-[12.5px] text-[var(--color-fg-soft)] max-w-[60ch]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.5 }}
        >
          상차림비 3,000원 별도 (테이블당) · 가격은 매장 사정에 따라 변동될 수 있습니다
        </motion.p>

        <motion.div
          className="mt-10 md:mt-14 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.45 }}
        >
          <Button size="lg" href="/franchise">
            창업 상담 신청 — 24시간 내 본사 직접 회신
          </Button>
          <Button size="lg" variant="outline" href="/#stores">
            전국 10개 매장 보기
          </Button>
        </motion.div>

        <motion.p
          className="mt-12 text-[11px] text-[var(--color-fg-soft)] leading-[1.7] max-w-[60ch] border-l-2 border-[var(--color-brass-500)] pl-3 py-1 bg-[rgba(176,133,69,0.05)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.6 }}
        >
          ※ 정보공개서를 제공받은 날부터 14일이 경과한 후에 가맹계약을 체결하거나
          가맹금을 수령합니다 (가맹사업거래의 공정화에 관한 법률 §7③).
        </motion.p>
      </div>
    </section>
  );
}
