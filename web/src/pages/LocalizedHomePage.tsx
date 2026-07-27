// 영어·일본어 단일 랜딩 페이지 (한국어 메인 페이지를 요약·번역한 버전).
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Section } from "../components/atoms/Section";
import { Heading } from "../components/atoms/Heading";
import { Reveal } from "../components/atoms/Reveal";
import { Wordmark } from "../components/atoms/Wordmark";
import { Badge } from "../components/atoms/Badge";
import { directStores, partnerStores } from "../data/stores";
import { menuItems, tableCharge } from "../data/menu";
import { translations, type Locale } from "../i18n/translations";
import type { MenuItem, Store } from "../types/domain";

interface Props {
  locale: Locale;
}

function pickName(item: MenuItem, locale: Locale): string {
  return locale === "en"
    ? item.nameEn ?? item.name
    : item.nameJa ?? item.name;
}

function pickDesc(item: MenuItem, locale: Locale): string | undefined {
  return locale === "en"
    ? item.descriptionEn ?? item.description
    : item.descriptionJa ?? item.description;
}

function pickStoreName(s: Store, locale: Locale): string {
  return locale === "en"
    ? s.shortNameEn ?? s.shortName
    : s.shortNameJa ?? s.shortName;
}

function pickDistrict(s: Store, locale: Locale): string {
  return locale === "en"
    ? s.districtEn ?? s.district
    : s.districtJa ?? s.district;
}

function MenuCard({ item, locale }: { item: MenuItem; locale: Locale }) {
  const name = pickName(item, locale);
  const desc = pickDesc(item, locale);
  return (
    <article className="surface-elev overflow-hidden h-full flex flex-col">
      {item.image && (
        <div className="aspect-[4/3] overflow-hidden bg-[var(--color-bg-elev2)]">
          <img src={item.image} alt={name} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] md:text-[16px] font-bold text-[var(--color-fg-strong)] leading-tight">
            {name}
          </h3>
          {item.badge === "signature" && <Badge tone="brass">SIGNATURE</Badge>}
          {item.badge === "new" && <Badge tone="ember">NEW</Badge>}
        </div>
        <p className="text-[11.5px] text-[var(--color-fg-soft)]">{item.name}</p>
        {desc && (
          <p className="text-[12.5px] text-[var(--color-fg-muted)] leading-[1.7] line-clamp-3">
            {desc}
          </p>
        )}
        <div className="mt-auto pt-2 flex items-baseline gap-1">
          <span className="text-[18px] md:text-[20px] font-extrabold text-[var(--color-ember-500)]">
            ₩{item.price.toLocaleString()}
          </span>
          {item.unit && (
            <span className="text-[11px] text-[var(--color-fg-soft)] font-bold">/ {item.unit}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function StoreCard({ s, locale, copy }: { s: Store; locale: Locale; copy: typeof translations["en"] }) {
  const name = pickStoreName(s, locale);
  const district = pickDistrict(s, locale);
  return (
    <Link
      to={`/stores/${s.id}`}
      className="group block surface-elev overflow-hidden hover:border-[var(--color-brass-400)] transition-colors h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-bg-elev2)]">
        {s.heroImage && (
          <img
            src={s.heroImage}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,17,14,0.85)] via-[rgba(21,17,14,0.2)] to-transparent" />
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
          {s.isFlagship && <Badge tone="brass">{copy.stores.flagshipBadge}</Badge>}
          {!s.isDirect && <Badge tone="outline">PARTNER</Badge>}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[14px] md:text-[15px] font-bold text-[var(--color-ivory-50)] leading-tight">
            {name}
          </p>
          <p className="text-[10.5px] text-[var(--color-ivory-100)] opacity-85 mt-0.5">
            {district}
          </p>
        </div>
      </div>
      <div className="p-3 md:p-3.5 flex items-center justify-between gap-2">
        <a
          href={`tel:${s.phone.replace(/-/g, "")}`}
          onClick={(e) => e.stopPropagation()}
          className="text-[12.5px] font-bold text-[var(--color-ember-500)]"
        >
          {s.phone}
        </a>
        <span className="text-[11.5px] text-[var(--color-fg-muted)] font-semibold">
          {copy.stores.detailLink} →
        </span>
      </div>
    </Link>
  );
}

export function LocalizedHomePage({ locale }: Props) {
  const copy = translations[locale];
  const signatureMenu = menuItems.filter((m) => m.badge === "signature" || m.badge === "new");
  const sideMenu = menuItems.filter((m) => m.category === "side" && m.badge !== "new");
  const mealMenu = menuItems.filter((m) => m.category === "meal");

  return (
    <>
      <Helmet>
        <html lang={locale} />
        <title>{copy.meta.title}</title>
        <meta name="description" content={copy.meta.description} />
        <link rel="canonical" href={`https://olbarogalbi.com/${locale}`} />
        <link rel="alternate" hrefLang="ko" href="https://olbarogalbi.com/" />
        <link rel="alternate" hrefLang="en" href="https://olbarogalbi.com/en" />
        <link rel="alternate" hrefLang="ja" href="https://olbarogalbi.com/ja" />
        <link rel="alternate" hrefLang="x-default" href="https://olbarogalbi.com/" />
        <meta property="og:url" content={`https://olbarogalbi.com/${locale}`} />
      </Helmet>

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-[88svh] flex items-center overflow-hidden grain pt-[100px] md:pt-[120px] pb-16 bg-[var(--color-bg)]"
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
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[rgba(255,255,240,0.85)] to-[rgba(255,255,240,0.1)]"
        />

        <div className="relative container-page max-w-[1320px] z-10">
          <Wordmark size="xl" showKor />

          <span className="mt-8 md:mt-10 inline-block text-[11px] md:text-[12px] font-bold tracking-[0.22em] text-[var(--color-brass-400)] uppercase">
            {copy.hero.eyebrow}
          </span>

          <h1 className="mt-3 text-[clamp(28px,4.4vw,52px)] font-extrabold text-[var(--color-fg-strong)] leading-[1.18] tracking-[-0.025em] max-w-[22ch] break-keep">
            {copy.hero.headline}
            <br />
            <span className="text-[var(--color-ember-500)]">{copy.hero.headlineAccent}</span>
          </h1>

          <p className="mt-5 md:mt-6 text-[15px] md:text-[17px] font-semibold text-[var(--color-fg)] leading-[1.6] max-w-[42ch]">
            {copy.hero.sub}
          </p>

          <div className="mt-7 md:mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[14px] md:text-[15px] font-semibold text-[var(--color-fg-muted)]">
              {copy.hero.priceLabel}
            </span>
            <span className="inline-block bg-[var(--color-ember-500)] text-white px-2.5 py-1 rounded-md text-[22px] md:text-[28px] font-extrabold align-baseline">
              ₩3,500
            </span>
            <span className="text-[13px] md:text-[14px] font-bold text-[var(--color-fg-muted)]">
              {copy.hero.priceUnit}
            </span>
          </div>
          <p className="mt-3 text-[11.5px] md:text-[12.5px] text-[var(--color-fg-soft)] max-w-[60ch]">
            {copy.hero.priceNote}
          </p>

          <div className="mt-9 md:mt-10 flex flex-wrap gap-3">
            <a
              href="tel:01057224929"
              className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-md bg-[var(--color-ember-500)] text-white text-[15px] font-bold hover:bg-[var(--color-ember-400)] transition-colors"
            >
              {copy.hero.primaryCta}
            </a>
            <a
              href="#stores"
              className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-md border border-[var(--color-border-strong)] text-[var(--color-fg-strong)] text-[15px] font-bold hover:border-[var(--color-brass-400)] hover:bg-[rgba(176,133,69,0.08)] transition-colors"
            >
              {copy.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* Brand Promise */}
      <Section spacing="md" bg="default">
        <Reveal>
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-6">
            {copy.promises.eyebrow}
          </span>
        </Reveal>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {copy.promises.items.map((p, i) => (
            <Reveal key={p.title} delay={0.06 * i}>
              <li className="surface-elev p-5 md:p-6 h-full flex flex-col items-start gap-2">
                <h3 className="text-[15px] md:text-[16px] font-bold text-[var(--color-fg-strong)]">
                  {p.title}
                </h3>
                <p className="text-[12.5px] md:text-[13px] text-[var(--color-fg-muted)] leading-[1.7] whitespace-pre-line">
                  {p.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Menu */}
      <Section id="menu" spacing="lg" bg="elev">
        <Reveal>
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
            {copy.menu.eyebrow}
          </span>
          <Heading level={2} display="md" className="max-w-[28ch] whitespace-pre-line">
            {copy.menu.headline}
          </Heading>
        </Reveal>

        <h3 className="mt-12 mb-4 text-[12px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase">
          {copy.menu.signatureLabel}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {signatureMenu.map((m, i) => (
            <Reveal key={m.id} delay={0.05 * i}>
              <MenuCard item={m} locale={locale} />
            </Reveal>
          ))}
        </div>

        <h3 className="mt-12 mb-4 text-[12px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase">
          {copy.menu.sideLabel}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {sideMenu.map((m, i) => (
            <Reveal key={m.id} delay={0.04 * i}>
              <MenuCard item={m} locale={locale} />
            </Reveal>
          ))}
        </div>

        <h3 className="mt-12 mb-4 text-[12px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase">
          {copy.menu.mealLabel}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {mealMenu.map((m, i) => (
            <Reveal key={m.id} delay={0.04 * i}>
              <div className="surface-elev p-4 md:p-5 h-full flex flex-col gap-1.5">
                <h4 className="text-[14px] font-bold text-[var(--color-fg-strong)]">
                  {pickName(m, locale)}
                </h4>
                <p className="text-[11px] text-[var(--color-fg-soft)]">{m.name}</p>
                <p className="text-[16px] font-extrabold text-[var(--color-ember-500)] mt-auto pt-1">
                  ₩{m.price.toLocaleString()}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-[11.5px] text-[var(--color-fg-soft)]">{copy.menu.tableNote}</p>
      </Section>

      {/* Stores */}
      <Section id="stores" spacing="lg" bg="default">
        <Reveal>
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
            {copy.stores.eyebrow} · {directStores.length + partnerStores.length} locations
          </span>
          <Heading level={2} display="md" className="max-w-[26ch] whitespace-pre-line">
            {copy.stores.headline}
          </Heading>
          <p className="mt-4 text-[14px] text-[var(--color-fg-muted)] max-w-[60ch] leading-[1.85]">
            {copy.stores.intro}
          </p>
        </Reveal>

        <h3 className="mt-12 mb-4 text-[12px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase">
          {copy.stores.directLabel} {directStores.length}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {directStores.map((s, i) => (
            <Reveal key={s.id} delay={0.06 * i}>
              <StoreCard s={s} locale={locale} copy={copy} />
            </Reveal>
          ))}
        </div>

        <h3 className="mt-12 mb-4 text-[12px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase">
          {copy.stores.partnerLabel} {partnerStores.length}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {partnerStores.map((s, i) => (
            <Reveal key={s.id} delay={0.04 * i}>
              <StoreCard s={s} locale={locale} copy={copy} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Franchise */}
      <Section spacing="lg" bg="elev">
        <div className="max-w-[760px]">
          <Reveal>
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-[var(--color-brass-400)] uppercase mb-3">
              {copy.franchise.eyebrow}
            </span>
            <Heading level={2} display="md" className="max-w-[24ch] whitespace-pre-line">
              {copy.franchise.headline}
            </Heading>
            <p className="mt-5 text-[14.5px] md:text-[15px] text-[var(--color-fg-muted)] leading-[1.9]">
              {copy.franchise.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="tel:01057224929"
                className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-md bg-[var(--color-ember-500)] text-white text-[15px] font-bold hover:bg-[var(--color-ember-400)] transition-colors"
              >
                {copy.franchise.cta}
              </a>
              <a
                href="mailto:frasier2015@naver.com"
                className="inline-flex items-center justify-center min-h-[52px] px-7 rounded-md border border-[var(--color-border-strong)] text-[var(--color-fg-strong)] text-[15px] font-bold hover:border-[var(--color-brass-400)] hover:bg-[rgba(176,133,69,0.08)] transition-colors"
              >
                frasier2015@naver.com
              </a>
            </div>
            <p className="mt-6 text-[12px] text-[var(--color-fg-soft)] leading-[1.85] border-l-2 border-[var(--color-brass-500)] pl-4">
              {copy.franchise.note}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Footer note */}
      <Section spacing="sm" bg="default">
        <p className="text-[11.5px] text-[var(--color-fg-soft)] leading-[1.8]">
          {copy.footer.legalLine}
        </p>
        <p className="mt-2 text-[11px] text-[var(--color-fg-soft)] leading-[1.8]">
          {copy.footer.sourceLabel}
        </p>
        <p className="mt-3 text-[11px] text-[var(--color-fg-soft)]">
          Table charge: ₩{tableCharge.amount.toLocaleString()} per table ·
          frasier2015@naver.com · +82-10-5722-4929
        </p>
      </Section>
    </>
  );
}

export function HomeEnPage() {
  return <LocalizedHomePage locale="en" />;
}

export function HomeJaPage() {
  return <LocalizedHomePage locale="ja" />;
}
