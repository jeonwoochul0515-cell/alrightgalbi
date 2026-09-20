// 정적 기본 콘텐츠 — Firestore 에 저장된 값이 없을 때 쓰이는 출고 상태.
// 관리자가 /admin 에서 수정하면 Firestore 값이 이 위에 덮어써진다.
import { stores } from "../data/stores";
import { menuItems, menuCategories, tableCharge } from "../data/menu";
import { faqItems } from "../data/faq";
import { franchiseCosts, valueProps, processSteps } from "../data/franchise";
import { instagramPosts, instagramHashtagUrl } from "../data/instagram";
import { newsItems } from "../data/news";
import { authorityBadges, safetyBadges, socialProofItems } from "../data/trustBadges";
import type { SiteContent, SiteSettings } from "./types";

export const defaultSettings: SiteSettings = {
  maintenance: true,
  maintenanceTitle: "홈페이지 리뉴얼 중입니다",
  maintenanceBody:
    "더 나은 모습으로 찾아뵙기 위해 올바로갈비 홈페이지를 새로 단장하고 있습니다. 공사 기간에도 전 매장은 정상 영업합니다.",
  hqPhone: "010-5722-4929",
  hqEmail: "frasier2015@naver.com",
  hqAddress: "부산광역시 부산진구 중앙대로680번가길 81, 1층",
  companyName: "올바로갈비",
  ceoName: "유종우",
  bizNumber: "728-38-01319",
  disclosureNumber: "2025.0854",
};

export const seedContent: SiteContent = {
  settings: defaultSettings,
  stores,
  menuItems,
  menuCategories,
  tableCharge,
  faqItems,
  franchiseCosts,
  valueProps,
  processSteps,
  instagramPosts,
  instagramHashtagUrl,
  newsItems,
  authorityBadges,
  safetyBadges,
  socialProofItems,
};
