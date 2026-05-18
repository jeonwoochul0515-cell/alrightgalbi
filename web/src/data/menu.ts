// 시그니처 갈비·사이드 8종 + 식사 보조 메뉴. 본사 통일 단가, 부전·화명 직영 동일 운영.
import type { MenuItem, MenuCategory } from "../types/domain";

export const menuCategories: MenuCategory[] = [
  { id: "galbi", label: "갈비", description: "본사 통일 단가 · 100g 기준" },
  { id: "side", label: "사이드", description: "특수부위·별미" },
  { id: "meal", label: "식사", description: "식사·찌개·면" },
];

export const menuItems: MenuItem[] = [
  {
    id: "raw-pork",
    name: "명품생돼지갈비",
    nameEn: "Premium Fresh Pork Galbi",
    description:
      "씹을수록 살아나는 깊은 풍미와 쫄깃한 식감의 조화. 불판 위에서 구워질수록 고소한 육즙이 살아나는 대표 생돼지갈비 메뉴입니다.",
    price: 3900,
    unit: "100g",
    recommendedServing: { grams: 200, people: 1 },
    badge: "signature",
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "galbi",
    image: "/menu/raw-pork.jpg",
  },
  {
    id: "yangnyeom-pork",
    name: "수제양념돼지갈비",
    nameEn: "Marinated Pork Galbi",
    description:
      "직접 만든 특제 양념이 고기에 깊게 스며들어 은은한 단맛과 감칠맛을 완성한 대중적인 인기 메뉴입니다.",
    price: 3500,
    unit: "100g",
    recommendedServing: { grams: 200, people: 1 },
    badge: "signature",
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "galbi",
    image: "/menu/yangnyeom-pork.jpg",
  },
  {
    id: "beef-galbi",
    name: "황제생소갈비살",
    nameEn: "Emperor Fresh Beef Galbi",
    description:
      "풍부한 육즙과 부드러운 식감이 살아있는 프리미엄 갈비살. 씹을수록 진하게 퍼지는 고소한 풍미가 매력적인 메뉴입니다.",
    price: 7900,
    unit: "100g",
    badge: "signature",
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "galbi",
    image: "/menu/beef-galbi.jpg",
  },
  {
    id: "instant-beef",
    name: "즉석양념황제소갈비살",
    nameEn: "Instant Marinated Emperor Beef Galbi",
    description:
      "주문 즉시 버무린 특제 양념으로 더욱 촉촉하고 깊은 맛을 완성했습니다. 불향과 감칠맛의 조화가 인상적인 인기 메뉴입니다.",
    price: 8900,
    unit: "100g",
    badge: "signature",
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "galbi",
    image: "/menu/instant-beef.jpg",
  },
  {
    id: "odol-galbi",
    name: "오돌갈비",
    description:
      "오독오독 살아있는 식감과 매콤한 풍미가 매력적인 별미 메뉴. 씹을수록 고소함이 살아나는 중독적인 맛을 느낄 수 있습니다.",
    price: 6900,
    unit: "100g",
    badge: "side",
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "side",
    image: "/menu/odol-galbi.jpg",
  },
  {
    id: "makchang",
    name: "쫀득돼지막창",
    description:
      "쫄깃하면서도 고소한 풍미가 살아있는 인기 메뉴. 씹을수록 퍼지는 진한 고소함과 특유의 식감이 매력입니다.",
    price: 5900,
    unit: "100g",
    badge: "side",
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "side",
    image: "/menu/makchang.jpg",
  },
  {
    id: "pork-skin",
    name: "돼지껍데기",
    description:
      "겉은 바삭하고 속은 쫀득한 식감이 매력적인 메뉴. 불향과 고소함이 어우러져 별미로 즐기기 좋습니다.",
    price: 3900,
    unit: "100g",
    badge: "side",
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "side",
    image: "/menu/pork-skin.jpg",
  },
  {
    id: "chicken-neck",
    name: "닭목살",
    description:
      "부드러우면서도 탱글한 식감을 동시에 느낄 수 있는 특수부위. 담백한 풍미와 은은한 육즙이 살아있는 매력적인 메뉴입니다.",
    price: 3900,
    unit: "100g",
    badge: "side",
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "side",
    image: "/menu/chicken-neck.jpg",
  },
  {
    id: "doenjang-stew",
    name: "해물된장찌개",
    description: "해물 듬뿍 된장찌개",
    price: 4500,
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "meal",
  },
  {
    id: "doenjang-rice",
    name: "소고기된장술밥",
    description: "소고기 된장 술밥",
    price: 5000,
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "meal",
  },
  {
    id: "naengmyeon",
    name: "맛있는냉면",
    description: "물냉면·비빔냉면",
    price: 6000,
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "meal",
  },
  {
    id: "egg-rice",
    name: "계란공기밥",
    description: "공깃밥",
    price: 1500,
    availableAt: ["bujeon", "hwamyeong", "gimhae-oedong"],
    category: "meal",
  },
];

export const tableCharge = {
  amount: 3000,
  label: "상차림비",
  note: "테이블당",
};

export const signatureMenu = menuItems.filter((m) => m.badge === "signature");
