import { Reveal } from "../atoms/Reveal";
import { TrustBadge } from "../molecules/TrustBadge";
import { useContent } from "../../content/context";

interface Props {
  variant?: "authority" | "safety";
}

export function TrustBarSection({ variant = "authority" }: Props) {
  const { authorityBadges, safetyBadges } = useContent();
  const badges = variant === "authority" ? authorityBadges : safetyBadges;
  return (
    <div className="bg-[var(--color-charcoal-950)] border-y border-[var(--color-border)]">
      <div className="container-page py-6">
        <Reveal>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-between items-center">
            {badges.map((b) => (
              <TrustBadge key={b.id} badge={b} className="flex-1 min-w-[220px] max-w-[320px]" />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
