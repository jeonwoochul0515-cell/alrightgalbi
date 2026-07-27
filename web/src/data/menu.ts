// 시그니처 갈비·사이드 8종 + 식사 보조 메뉴. 본사 통일 단가, 직영·가맹 동일 운영. 다국어 표기 포함.
import type { MenuItem, MenuCategory, Slug } from "../types/domain";
import { stores } from "./stores";

const ALL_STORE_IDS: Slug[] = stores.map((s) => s.id);

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
    nameJa: "名品生豚カルビ",
    description:
      "씹을수록 살아나는 깊은 풍미와 쫄깃한 식감의 조화. 불판 위에서 구워질수록 고소한 육즙이 살아나는 대표 생돼지갈비 메뉴입니다.",
    descriptionEn:
      "Fresh pork ribs with rich umami and chewy texture. The signature dish — juices come alive as it grills on charcoal.",
    descriptionJa:
      "噛むほど深いコクと弾力のある食感。炭火で焼き上げるほど旨みが広がる、看板の生豚カルビメニュー。",
    price: 3900,
    unit: "100g",
    recommendedServing: { grams: 200, people: 1 },
    badge: "signature",
    availableAt: ALL_STORE_IDS,
    category: "galbi",
    image: "/menu/raw-pork.jpg",
  },
  {
    id: "yangnyeom-pork",
    name: "수제양념돼지갈비",
    nameEn: "House Marinated Pork Galbi",
    nameJa: "自家製ヤンニョム豚カルビ",
    description:
      "직접 만든 특제 양념이 고기에 깊게 스며들어 은은한 단맛과 감칠맛을 완성한 대중적인 인기 메뉴입니다.",
    descriptionEn:
      "Pork ribs marinated in our signature house sauce — gentle sweetness balanced with savory depth. The most-loved item.",
    descriptionJa:
      "自家製の特製ヤンニョムが肉にしっかり染み込み、ほのかな甘みと旨みを完成させた人気メニュー。",
    price: 3500,
    unit: "100g",
    recommendedServing: { grams: 200, people: 1 },
    badge: "signature",
    availableAt: ALL_STORE_IDS,
    category: "galbi",
    image: "/menu/yangnyeom-pork.jpg",
  },
  {
    id: "beef-galbi",
    name: "황제생소갈비살",
    nameEn: "Emperor Fresh Beef Short Rib",
    nameJa: "皇帝生牛カルビ",
    description:
      "풍부한 육즙과 부드러운 식감이 살아있는 프리미엄 갈비살. 씹을수록 진하게 퍼지는 고소한 풍미가 매력적인 메뉴입니다.",
    descriptionEn:
      "Premium fresh beef short rib with abundant juices and tender texture. Rich nutty flavor that grows with each bite.",
    descriptionJa:
      "豊富な肉汁と柔らかな食感のプレミアム牛カルビ肉。噛むほど広がる香ばしい風味が魅力。",
    price: 7900,
    unit: "100g",
    badge: "signature",
    availableAt: ALL_STORE_IDS,
    category: "galbi",
    image: "/menu/beef-galbi.jpg",
  },
  {
    id: "instant-beef",
    name: "즉석양념황제소갈비살",
    nameEn: "Instant Marinated Emperor Beef Short Rib",
    nameJa: "即席ヤンニョム皇帝牛カルビ",
    description:
      "주문 즉시 버무린 특제 양념으로 더욱 촉촉하고 깊은 맛을 완성했습니다. 불향과 감칠맛의 조화가 인상적인 인기 메뉴입니다.",
    descriptionEn:
      "Beef short rib tossed in special sauce right after ordering — moist, deep, with a perfect smoke-and-umami balance.",
    descriptionJa:
      "ご注文後すぐに特製ヤンニョムで和える、よりジューシーで深い味わい。炭の香りと旨みの調和が魅力。",
    price: 8900,
    unit: "100g",
    badge: "signature",
    availableAt: ALL_STORE_IDS,
    category: "galbi",
    image: "/menu/instant-beef.jpg",
  },
  {
    id: "odol-galbi",
    name: "오돌갈비",
    nameEn: "Crunchy Cartilage Galbi",
    nameJa: "オドルカルビ（軟骨カルビ）",
    description:
      "오독오독 살아있는 식감과 매콤한 풍미가 매력적인 별미 메뉴. 씹을수록 고소함이 살아나는 중독적인 맛을 느낄 수 있습니다.",
    descriptionEn: "Crunchy cartilage cut with spicy edge — an addictive textural specialty.",
    descriptionJa: "コリコリとした食感とピリ辛の風味が魅力。クセになる香ばしさ。",
    price: 6900,
    unit: "100g",
    badge: "side",
    availableAt: ALL_STORE_IDS,
    category: "side",
    image: "/menu/odol-galbi.jpg",
  },
  {
    id: "makchang",
    name: "쫀득돼지막창",
    nameEn: "Chewy Pork Intestine",
    nameJa: "モチモチ豚マッチャン",
    description:
      "쫄깃하면서도 고소한 풍미가 살아있는 인기 메뉴. 씹을수록 퍼지는 진한 고소함과 특유의 식감이 매력입니다.",
    descriptionEn: "Chewy yet richly nutty pork intestine — deepens in flavor as you chew.",
    descriptionJa: "モチモチ食感と香ばしさ。噛むほど広がる深いコクが魅力。",
    price: 5900,
    unit: "100g",
    badge: "side",
    availableAt: ALL_STORE_IDS,
    category: "side",
    image: "/menu/makchang.jpg",
  },
  {
    id: "pork-skin",
    name: "돼지껍데기",
    nameEn: "Pork Skin",
    nameJa: "豚の皮",
    description:
      "겉은 바삭하고 속은 쫀득한 식감이 매력적인 메뉴. 불향과 고소함이 어우러져 별미로 즐기기 좋습니다.",
    descriptionEn: "Crispy outside, chewy inside — pork skin with charcoal aroma.",
    descriptionJa: "外はカリッ、中はモチっと。炭火の香りと香ばしさが楽しめる一品。",
    price: 3900,
    unit: "100g",
    badge: "side",
    availableAt: ALL_STORE_IDS,
    category: "side",
    image: "/menu/pork-skin.jpg",
  },
  {
    id: "chicken-neck",
    name: "닭목살",
    nameEn: "Chicken Neck",
    nameJa: "鶏首肉",
    description:
      "부드러우면서도 탱글한 식감을 동시에 느낄 수 있는 특수부위. 담백한 풍미와 은은한 육즙이 살아있는 매력적인 메뉴입니다.",
    descriptionEn: "Tender yet springy chicken neck — light flavor with subtle juiciness.",
    descriptionJa: "柔らかさとプリッとした食感が同時に楽しめる希少部位。あっさりとした旨み。",
    price: 3900,
    unit: "100g",
    badge: "side",
    availableAt: ALL_STORE_IDS,
    category: "side",
    image: "/menu/chicken-neck.jpg",
  },
  {
    id: "beef-yukhoe",
    name: "맛보기한우육회",
    nameEn: "Hanwoo Beef Tartare (Sampler)",
    nameJa: "韓牛ユッケ（お試しサイズ）",
    description:
      "신선한 한우 우둔살을 곱게 채썰어 고소한 참기름과 마늘로 감칠맛을 살린 맛보기 사이즈. 식전 별미로 가볍게 즐기기 좋은 메뉴입니다.",
    descriptionEn: "Fresh Hanwoo (Korean beef) tartare with sesame oil and garlic, sampler-size starter.",
    descriptionJa: "新鮮な韓牛のもも肉を細切りに。ごま油とにんにくで旨みを引き出したお試しサイズ。",
    price: 11900,
    badge: "new",
    availableAt: ALL_STORE_IDS,
    category: "side",
    image: "/menu/beef-yukhoe.jpg",
  },
  {
    id: "doenjang-stew",
    name: "해물된장찌개",
    nameEn: "Seafood Doenjang Stew",
    nameJa: "海鮮テンジャンチゲ",
    description: "해물 듬뿍 된장찌개",
    descriptionEn: "Soybean paste stew loaded with seafood.",
    descriptionJa: "魚介たっぷりのテンジャン（味噌）チゲ。",
    price: 4500,
    availableAt: ALL_STORE_IDS,
    category: "meal",
  },
  {
    id: "doenjang-rice",
    name: "소고기된장술밥",
    nameEn: "Beef Doenjang Sool-bap",
    nameJa: "牛肉テンジャン酒ご飯",
    description: "소고기 된장 술밥",
    descriptionEn: "Beef and soybean paste over rice.",
    descriptionJa: "牛肉と味噌を絡めた酒ご飯。",
    price: 5000,
    availableAt: ALL_STORE_IDS,
    category: "meal",
  },
  {
    id: "naengmyeon",
    name: "맛있는냉면",
    nameEn: "Naengmyeon (Cold Noodle)",
    nameJa: "冷麺",
    description: "물냉면·비빔냉면",
    descriptionEn: "Cold buckwheat noodles — choose broth or spicy mixed.",
    descriptionJa: "水冷麺・ビビン冷麺からお選びいただけます。",
    price: 6000,
    availableAt: ALL_STORE_IDS,
    category: "meal",
  },
  {
    id: "egg-rice",
    name: "계란공기밥",
    nameEn: "Rice with Egg",
    nameJa: "玉子ご飯",
    description: "공깃밥",
    descriptionEn: "Bowl of steamed rice with egg.",
    descriptionJa: "炊き立てご飯（玉子付き）。",
    price: 1500,
    availableAt: ALL_STORE_IDS,
    category: "meal",
  },
];

export const tableCharge = {
  amount: 3000,
  label: "상차림비",
  note: "테이블당",
};

export const signatureMenu = menuItems.filter((m) => m.badge === "signature");
