import type { ReactNode } from "react";
import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { SocialProofCard } from "../molecules/SocialProofCard";
import { useContent } from "../../content/context";

interface Props {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
}

export function SocialProofMosaic({
  eyebrow = "Social Proof",
  title = "부산이 먼저 알아본 가성비.",
  intro,
}: Props = {}) {
  const { socialProofItems } = useContent();
  return (
    <Section spacing="md" bg="default">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          {eyebrow}
        </span>
        <Heading level={2} display="md" className="max-w-[26ch]">
          {title}
        </Heading>
        {intro && (
          <p className="mt-5 text-[14px] text-[var(--color-fg-muted)] leading-[1.85] max-w-[58ch]">
            {intro}
          </p>
        )}
      </Reveal>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {socialProofItems.map((item, i) => (
          <Reveal key={item.id} delay={0.08 * i}>
            <SocialProofCard item={item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
