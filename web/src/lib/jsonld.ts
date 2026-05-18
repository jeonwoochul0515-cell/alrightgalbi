import { stores } from "../data/stores";
import { signatureMenu } from "../data/menu";

const SITE = "https://olbarogalbi.web.app";

const restaurant = {
  "@type": "Restaurant",
  "@id": `${SITE}/#restaurant`,
  name: "올바로갈비",
  alternateName: "Olbaro Galbi",
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

const localBusinesses = stores.map((store) => ({
  "@type": "LocalBusiness",
  "@id": `${SITE}/stores/${store.id}#store`,
  name: store.name,
  parentOrganization: { "@id": `${SITE}/#restaurant` },
  address: {
    "@type": "PostalAddress",
    streetAddress: store.address.replace("부산광역시 ", "").replace(`${store.district} `, ""),
    addressLocality: `부산광역시 ${store.district.split(" ")[0]}`,
    addressCountry: "KR",
  },
  telephone: `+82-${store.phone.replace(/-/g, "").replace(/^0/, "")}`,
  geo: {
    "@type": "GeoCoordinates",
    latitude: store.lat,
    longitude: store.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: store.hours.closedDays
        ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].filter(
            (d) => !store.hours.closedDays?.some((cd) => d.startsWith(cd === "화" ? "Tu" : cd === "월" ? "Mo" : cd === "수" ? "We" : cd === "목" ? "Th" : cd === "금" ? "Fr" : cd === "토" ? "Sa" : "Su"))
          )
        : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      opens: store.hours.open,
      closes: store.hours.close.replace("익일 ", ""),
    },
  ],
}));

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

const faqPage = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "가맹 창업 비용은 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "가맹비 550만 + 교육비 550만 = 최초 가맹금 1,100만원 (보증금 0원). 인테리어·기기 등 기타 비용은 30평 기준 약 9,570만원입니다 (점포 임대 제외). 매월 매출의 1.65% 로열티가 부과됩니다. 자세한 내용은 정보공개서 2025.0854에서 확인하세요.",
      },
    },
    {
      "@type": "Question",
      name: "양념돼지갈비 가격은 왜 이렇게 쌉니까?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "본사 통일 단가로 100g 3,500원에 제공합니다. 전 매장 동일 단가이며 상차림비 3,000원이 테이블당 부과됩니다.",
      },
    },
  ],
};

const breadcrumbs = {
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "가맹모집", item: `${SITE}/franchise` },
  ],
};

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [restaurant, ...localBusinesses, menu, faqPage, breadcrumbs],
};
