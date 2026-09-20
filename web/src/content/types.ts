import type {
  Store,
  MenuItem,
  MenuCategory,
  FAQItem,
  FranchiseCost,
  ValueProp,
  ProcessStep,
  NewsItem,
  TrustBadgeData,
  SocialProofItem,
  InstagramPost,
} from "../types/domain";

export interface TableCharge {
  amount: number;
  label: string;
  note: string;
}

/** 사이트 전역 설정 — 운영 스위치와 회사 정보 */
export interface SiteSettings {
  /** true면 모든 공개 라우트가 리뉴얼 안내 화면만 노출한다 (/admin 제외) */
  maintenance: boolean;
  maintenanceTitle: string;
  maintenanceBody: string;
  hqPhone: string;
  hqEmail: string;
  hqAddress: string;
  companyName: string;
  ceoName: string;
  bizNumber: string;
  disclosureNumber: string;
}

/** 사이트가 렌더에 쓰는 전체 콘텐츠 */
export interface SiteContent {
  settings: SiteSettings;
  stores: Store[];
  menuItems: MenuItem[];
  menuCategories: MenuCategory[];
  tableCharge: TableCharge;
  faqItems: FAQItem[];
  franchiseCosts: FranchiseCost[];
  valueProps: ValueProp[];
  processSteps: ProcessStep[];
  instagramPosts: InstagramPost[];
  instagramHashtagUrl: string;
  newsItems: NewsItem[];
  authorityBadges: TrustBadgeData[];
  safetyBadges: TrustBadgeData[];
  socialProofItems: SocialProofItem[];
}

/**
 * Firestore 문서 단위 = 저장(쓰기) 단위.
 * 각 문서는 SiteContent 의 부분집합을 그대로 담기 때문에 병합이 단순한 얕은 덮어쓰기로 끝난다.
 */
export const CONTENT_SECTIONS = {
  settings: ["settings"],
  stores: ["stores"],
  menu: ["menuItems", "menuCategories", "tableCharge"],
  faq: ["faqItems"],
  franchise: ["franchiseCosts", "valueProps", "processSteps"],
  instagram: ["instagramPosts", "instagramHashtagUrl"],
  news: ["newsItems"],
  trust: ["authorityBadges", "safetyBadges", "socialProofItems"],
} as const satisfies Record<string, readonly (keyof SiteContent)[]>;

export type SectionId = keyof typeof CONTENT_SECTIONS;

export const SECTION_LABELS: Record<SectionId, string> = {
  settings: "사이트 설정",
  stores: "매장",
  menu: "메뉴",
  faq: "자주 묻는 질문",
  franchise: "가맹 비용·절차",
  instagram: "인스타그램",
  news: "소식",
  trust: "신뢰 배지·후기",
};
