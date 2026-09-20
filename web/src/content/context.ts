import { createContext, useContext } from "react";
import type { Store, MenuItem, TrustBadgeData } from "../types/domain";
import type { SiteContent } from "./types";
import { seedContent } from "./seed";

/** 원본 콘텐츠에서 계산되는 값들 — 예전 data/*.ts 의 파생 export 를 대체한다. */
export interface DerivedContent {
  directStores: Store[];
  partnerStores: Store[];
  flagshipStore: Store | undefined;
  getStoreBySlug: (slug: string) => Store | undefined;
  signatureMenu: MenuItem[];
  allBadges: TrustBadgeData[];
  totalInitialFee: number;
  totalOtherCost: number;
}

export type ContentValue = SiteContent &
  DerivedContent & {
    /** Firestore 응답을 아직 못 받은 상태 (seed 로 렌더 중) */
    loading: boolean;
    /** 마지막으로 콘텐츠가 저장된 시각 (Firestore 값이 없으면 null) */
    updatedAt: Date | null;
  };

export function derive(content: SiteContent): SiteContent & DerivedContent {
  const { stores, menuItems, authorityBadges, safetyBadges, franchiseCosts } = content;
  return {
    ...content,
    directStores: stores.filter((s) => s.isDirect),
    partnerStores: stores.filter((s) => !s.isDirect),
    flagshipStore: stores.find((s) => s.isFlagship) ?? stores[0],
    getStoreBySlug: (slug: string) => stores.find((s) => s.id === slug),
    signatureMenu: menuItems.filter((m) => m.badge === "signature"),
    allBadges: [...authorityBadges, ...safetyBadges],
    totalInitialFee: franchiseCosts
      .filter((c) => c.category === "최초가맹금" && c.unit === "KRW_1000")
      .reduce((sum, c) => sum + c.amount, 0),
    totalOtherCost: franchiseCosts
      .filter((c) => c.category === "기타비용" && c.unit === "KRW_1000")
      .reduce((sum, c) => sum + c.amount, 0),
  };
}

export const ContentContext = createContext<ContentValue>({
  ...derive(seedContent),
  loading: true,
  updatedAt: null,
});

export function useContent(): ContentValue {
  return useContext(ContentContext);
}
