export type Locale = "ko" | "en";

export type Slug = "bujeon" | "hwamyeong" | "gimhae-oedong";

export interface Store {
  id: Slug;
  name: string;
  shortName: string;
  district: string;
  address: string;
  addressDetail?: string;
  lat: number;
  lng: number;
  phone: string;
  hours: {
    open: string;
    close: string;
    lastOrder?: string;
    closedDays?: string[];
    note?: string;
  };
  access: string;
  isFlagship?: boolean;
  isDirect: boolean;
  openedAt?: string;
  heroImage: string;
  features: string[];
  tags: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
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
