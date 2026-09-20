import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Section } from "../components/atoms/Section";
import { Heading } from "../components/atoms/Heading";
import { Button } from "../components/atoms/Button";
import { Badge } from "../components/atoms/Badge";
import { MenuCard } from "../components/molecules/MenuCard";
import { storeBreadcrumbJsonLd } from "../lib/jsonld";
import { useContent } from "../content/context";
import type { Slug } from "../types/domain";

export function StoreDetailPage() {
  const { slug } = useParams<{ slug: Slug }>();
  const { getStoreBySlug, menuItems, tableCharge } = useContent();
  const store = slug ? getStoreBySlug(slug) : undefined;

  if (!store) return <Navigate to="/" replace />;

  const storeMenu = menuItems.filter((m) => m.availableAt.includes(store.id));

  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>{store.name} | olbaroGALBI</title>
        <meta
          name="description"
          content={`${store.name} - ${store.address}.${store.access ? ` ${store.access}.` : ""}${store.hours ? ` 영업 ${store.hours.open}-${store.hours.close}.` : ""}`}
        />
        <link rel="canonical" href={`https://olbarogalbi.com/stores/${store.id}`} />
        <meta property="og:url" content={`https://olbarogalbi.com/stores/${store.id}`} />
        <meta property="og:title" content={`${store.name} | olbaroGALBI`} />
        <meta
          property="og:description"
          content={`${store.name} - ${store.address}.${store.access ? ` ${store.access}.` : ""}`}
        />
        {store.heroImage && (
          <meta property="og:image" content={`https://olbarogalbi.com${store.heroImage}`} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(storeBreadcrumbJsonLd(store.id, store.name))}
        </script>
      </Helmet>

      <section className="relative pt-[140px] md:pt-[200px] pb-20 md:pb-28 overflow-hidden grain min-h-[420px] md:min-h-[520px]">
        {store.heroImage && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${store.heroImage})`,
              filter: "saturate(0.9) brightness(0.78)",
            }}
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[rgba(11,9,7,0.78)] via-[rgba(11,9,7,0.4)] to-[var(--color-charcoal-900)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[rgba(11,9,7,0.85)] via-[rgba(11,9,7,0.4)] to-[rgba(11,9,7,0.15)]"
        />
        <div className="relative container-page max-w-[1100px]">
          <Link
            to="/#stores"
            className="inline-block text-[12px] text-[var(--color-fg-muted)] hover:text-[var(--color-brass-300)] mb-6"
          >
            ← 매장 전체 보기
          </Link>
          <div className="flex items-center gap-3 mb-3">
            {store.isFlagship && <Badge tone="brass">FLAGSHIP</Badge>}
            {store.isDirect ? (
              <Badge tone="ember">DIRECT 직영</Badge>
            ) : (
              <Badge tone="outline">PARTNER 가맹</Badge>
            )}
          </div>
          <Heading level={1} display="lg">
            {store.name}
          </Heading>
          <p className="mt-4 text-[16px] text-[var(--color-fg-muted)]">{store.district}</p>
        </div>
      </section>

      <Section spacing="md" bg="elev">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-[11px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.16em] mb-4">
              매장 정보
            </h2>
            <dl className="space-y-4 text-[15px]">
              <div>
                <dt className="text-[12px] text-[var(--color-fg-soft)] font-semibold uppercase tracking-[0.08em] mb-1">
                  주소
                </dt>
                <dd className="text-[var(--color-fg)] leading-[1.7]">
                  {store.address}
                  {store.addressDetail && (
                    <span className="block text-[13px] text-[var(--color-fg-muted)]">
                      ({store.addressDetail})
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] text-[var(--color-fg-soft)] font-semibold uppercase tracking-[0.08em] mb-1">
                  전화
                </dt>
                <dd>
                  <a
                    href={`tel:${store.phone.replace(/-/g, "")}`}
                    className="text-[18px] font-bold text-[var(--color-ember-400)]"
                  >
                    {store.phone}
                  </a>
                </dd>
              </div>
              {store.hours && (
                <div>
                  <dt className="text-[12px] text-[var(--color-fg-soft)] font-semibold uppercase tracking-[0.08em] mb-1">
                    영업시간
                  </dt>
                  <dd className="text-[var(--color-fg)]">
                    {store.hours.open} – {store.hours.close}
                    {store.hours.lastOrder && (
                      <span className="text-[13px] text-[var(--color-fg-muted)]">
                        {" "}
                        (LO {store.hours.lastOrder})
                      </span>
                    )}
                    {store.hours.closedDays && store.hours.closedDays.length > 0 && (
                      <div className="text-[13px] text-[var(--color-fg-muted)] mt-1">
                        휴무: 매주 {store.hours.closedDays.join(", ")}요일
                      </div>
                    )}
                  </dd>
                </div>
              )}
              {store.access && (
                <div>
                  <dt className="text-[12px] text-[var(--color-fg-soft)] font-semibold uppercase tracking-[0.08em] mb-1">
                    교통
                  </dt>
                  <dd className="text-[var(--color-fg)]">{store.access}</dd>
                </div>
              )}
              {!store.isDirect && (
                <div>
                  <dt className="text-[12px] text-[var(--color-fg-soft)] font-semibold uppercase tracking-[0.08em] mb-1">
                    영업시간·휴무
                  </dt>
                  <dd className="text-[13px] text-[var(--color-fg-muted)] leading-[1.7]">
                    가맹점은 매장별로 운영 시간이 다를 수 있습니다. 정확한 영업시간·휴무는
                    매장 전화로 확인해 주세요.
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`tel:${store.phone.replace(/-/g, "")}`}>전화 걸기</Button>
              <Button
                variant="outline"
                href={`https://map.kakao.com/link/search/${encodeURIComponent(store.name)}`}
                target="_blank"
                rel="noopener"
              >
                카카오맵에서 보기
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.16em] mb-4">
              매장 특징
            </h2>
            <ul className="space-y-3">
              {(store.features ?? []).map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-[15px] text-[var(--color-fg)]"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-ember-500)] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section spacing="md" bg="default">
        <h2 className="text-[11px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.16em] mb-3">
          매장 메뉴
        </h2>
        <Heading level={2} display="md" className="mb-10">
          이 매장의 메뉴.
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {storeMenu.map((m) => (
            <MenuCard key={m.id} item={m} className="h-full" />
          ))}
        </div>
        <p className="mt-8 text-[12px] text-[var(--color-fg-soft)]">
          ※ {tableCharge.label} {tableCharge.amount.toLocaleString()}원 ({tableCharge.note}) 별도
        </p>
      </Section>
    </>
  );
}
