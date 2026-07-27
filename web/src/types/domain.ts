export type Locale = "ko" | "en";

export type Slug = string;

export interface Store {
  id: Slug;
  name: string;
  shortName: string;
  shortNameEn?: string;
  shortNameJa?: string;
  district: string;
  districtEn?: string;
  districtJa?: string;
  address: string;
  addressDetail?: string;
  lat?: number;
  lng?: number;
  phone: string;
  hours?: {
    open: string;
    close: string;
    lastOrder?: string;
    closedDays?: string[];
    note?: string;
  };
  access?: string;
  isFlagship?: boolean;
  isDirect: boolean;
  openedAt?: string;
  heroImage?: string;
  features?: string[];
  tags?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  nameJa?: string;
  description?: string;
  descriptionEn?: string;
  descriptionJa?: string;
  price: number;
  unit?: string;
  recommendedServing?: { grams: number; people: number };
  badge?: "signature" | "new" | "limited" | "side";
  availableAt: Slug[];
  image?: string;
  category: "galbi" | "side" | "meal" | "drink";
}

export interface MenuCategory {
  id: "galbi" | "side" | "meal" | "drink";
  label: string;
  description?: string;
}

export interface FranchiseCost {
  id: string;
  category: "최초가맹금" | "기타비용" | "운영부담";
  label: string;
  amount: number;
  unit: "KRW_1000" | "PERCENT" | "MONTHLY_KRW";
  supplier?: string;
  note?: string;
  emphasized?: boolean;
  /** 매장 상황·기존 설비에 따라 비용 조정이 가능한 항목. 표에서 "조정 가능" 배지로 강조 */
  flexible?: boolean;
  /** Override the right-side displayed value. Used for variable/percent/share-based items. */
  displayOverride?: string;
}

export interface ValueProp {
  id: string;
  metric: string;
  label: string;
  description: string;
  icon: "shield" | "coin" | "anchor" | "store" | "fire" | "leaf";
  source?: string;
}

export interface FAQItem {
  id: string;
  category?: "cost" | "process" | "support" | "ops" | "legal";
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  durationDays?: string;
  description: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  href?: string;
  source?: string;
  image?: string;
}

export interface TrustBadgeData {
  id: string;
  label: string;
  value?: string;
  source?: string;
  variant: "authority" | "safety";
  href?: string;
}

export interface SocialProofItem {
  id: string;
  source: "diningcode" | "siksin" | "instagram" | "facebook";
  metric: string;
  label: string;
  quote?: string;
  href?: string;
}

export interface InstagramPost {
  id: string;
  /** 게시물 URL (외부 인스타로 새 탭 이동) */
  url: string;
  /** 카드 썸네일로 노출할 자체 호스팅 이미지 경로 */
  thumbnail: string;
  /** 게시 작성자 (예: "@impact.busan") */
  author: string;
  /** 작성자 자기소개 (예: "부산 맛집 인플루언서") */
  authorRole?: string;
  /** 카드에 표시할 짧은 캡션·요약 */
  caption: string;
  /** 게시물 타입 (Reel / Post / Carousel) */
  kind: "reel" | "post" | "carousel";
  /** 노출할 메트릭 (선택). 예: { views: "17.8만", likes: "1,793" } */
  metrics?: { label: string; value: string }[];
  /** 어떤 매장과 관련된 게시물인지 (선택) */
  storeId?: Slug;
}
