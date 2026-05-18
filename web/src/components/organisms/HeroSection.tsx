import { motion, useReducedMotion } from "motion/react";
import { Button } from "../atoms/Button";
import { Wordmark } from "../atoms/Wordmark";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden grain pt-[68px] md:pt-[80px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center md:bg-right"
        style={{ backgroundImage: "url(/hero-main.jpg)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[rgba(11,9,7,0.92)] via-[rgba(11,9,7,0.55)] to-[rgba(11,9,7,0.15)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[rgba(11,9,7,0.7)] via-transparent to-[rgba(11,9,7,0.4)]"
      />

      <div className="relative container-page py-20 md:py-32 max-w-[1320px] z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Wordmark size="xl" showKor />
        </motion.div>

        <motion.h1
          className="mt-10 md:mt-14 text-[clamp(22px,3.4vw,44px)] font-bold text-[var(--color-fg-strong)] leading-[1.3] tracking-[-0.02em] max-w-[24ch] break-keep"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          부산이 길러낸 가성비 숯불 갈비.
          <br />
          양념돼지갈비{" "}
          <span className="inline-block bg-[var(--color-ember-500)] text-[var(--color-ivory-50)] px-2 py-0.5 rounded-md font-extrabold align-baseline">
            3,500원
          </span>
          <span className="text-[0.55em] text-[var(--color-fg-muted)] font-bold ml-2 align-baseline">
            / 100g
          </span>
        </motion.h1>

        <motion.p
          className="mt-3 text-[12px] md:text-[13px] text-[var(--color-fg-muted)] max-w-[60ch]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.35 }}
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
