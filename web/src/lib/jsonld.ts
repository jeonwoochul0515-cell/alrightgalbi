// 사이트 전역 JSON-LD 그래프 단일 소스 — vite plugin이 빌드 시 index.html에 주입하고, 페이지별 스키마(FAQ·빵부스러기)도 여기서 생성한다.
import { stores } from "../data/stores";
import { signatureMenu } from "../data/menu";
import { faqItems } from "../data/faq";

export const SITE = "https://olbarogalbi.com";

const restaurant = {
  "@type": "Restaurant",
  "@id": `${SITE}/#restaurant`,
  name: "올바로갈비",
  alternateName: "Olbaro Galbi",
  description:
    "올바로갈비는 부산에서 시작한 가성비 숯불 갈비 프랜차이즈다. 수제양념돼지갈비 100g 3,500원 단일가로 직영 3개·가맹 7개 매장을 운영하며, 보증금 0원·차액가맹금 0원·로열티 1.65% 조건으로 가맹점을 모집한다 (정보공개서 2025.0854).",
  url: SITE,
  logo: `${SITE}/og-cover.jpg`,
  image: [`${SITE}/hero-1920.jpg`],
  servesCuisine: ["Korean", "Korean BBQ", "갈비"],
  priceRange: "₩",
  telephone: "+82-10-5722-4929",
  email: "frasier2015@naver.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "중앙대로680번가길 81, 1층",
    addressLocality: "부산광역시 부산진구",
    addressRegion: "KR-26",
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.1570923,
    longitude: 129.0610698,
  },
  hasMenu: { "@id": `${SITE}/#menu` },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "올바로갈비",
  inLanguage: ["ko", "en", "ja"],
  publisher: { "@id": `${SITE}/#restaurant` },
  dateModified: "2026-07-27",
};

const localBusinesses = stores.map((store) => {
  const base: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": `${SITE}/stores/${store.id}#store`,
    name: store.name,
    url: `${SITE}/stores/${store.id}`,
    parentOrganization: { "@id": `${SITE}/#restaurant` },
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address.replace("부산광역시 ", "").replace(`${store.district} `, ""),
      addressLocality: `부산광역시 ${store.district.split(" ")[0]}`,
      addressCountry: "KR",
    },
    telephone: `+82-${store.phone.replace(/-/g, "").replace(/^0/, "")}`,
  };
  if (store.heroImage) {
    base.image = `${SITE}${store.heroImage}`;
  }
  if (store.lat !== undefined && store.lng !== undefined) {
    base.geo = { "@type": "GeoCoordinates", latitude: store.lat, longitude: store.lng };
  }
  if (store.hours) {
    const closedDays = store.hours.closedDays;
    base.openingHoursSpecification = [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: closedDays
          ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].filter(
              (d) => !closedDays.some((cd) => d.startsWith(cd === "화" ? "Tu" : cd === "월" ? "Mo" : cd === "수" ? "We" : cd === "목" ? "Th" : cd === "금" ? "Fr" : cd === "토" ? "Sa" : "Su"))
            )
          : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        opens: store.hours.open,
        closes: store.hours.close.replace("익일 ", ""),
      },
    ];
  }
  return base;
});

const menu = {
  "@type": "Menu",
  "@id": `${SITE}/#menu`,
  name: "올바로갈비 시그니처 메뉴",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "갈비",
      hasMenuItem: signatureMenu.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: String(item.price),
          priceCurrency: "KRW",
        },
      })),
    },
  ],
};

// FAQ 아코디언은 /franchise 에만 렌더되므로 FAQPage 스키마도 그 페이지에서 주입한다 (화면과 1:1 원칙).
export const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/franchise#faq`,
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export const storeBreadcrumbJsonLd = (storeId: string, storeName: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "매장", item: `${SITE}/#stores` },
    { "@type": "ListItem", position: 3, name: storeName, item: `${SITE}/stores/${storeId}` },
  ],
});

const breadcrumbs = {
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "가맹모집", item: `${SITE}/franchise` },
  ],
};

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [restaurant, website, ...localBusinesses, menu, breadcrumbs],
};
