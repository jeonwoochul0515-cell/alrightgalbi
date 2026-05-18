import { Section } from "../atoms/Section";
import { Heading } from "../atoms/Heading";
import { Reveal } from "../atoms/Reveal";
import { StatCard } from "../molecules/StatCard";
import { valueProps } from "../../data/franchise";

export function ValuePropsSection() {
  return (
    <Section spacing="lg" bg="default">
      <Reveal>
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
          Value Propositions
        </span>
        <Heading level={2} display="md" className="max-w-[24ch]">
          숫자로 검증되는 차이.
        </Heading>
      </Reveal>

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {valueProps.map((vp, i) => (
          <Reveal key={vp.id} delay={0.08 * i}>
            <StatCard
              metric={vp.metric}
              label={vp.label}
              description={vp.description}
              source={vp.source}
              emphasized={vp.id === "saved"}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
