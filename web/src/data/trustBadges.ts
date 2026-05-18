import type { TrustBadgeData, SocialProofItem } from "../types/domain";

// 권위 배지 — 페이지 상단 (Hero 직하)
export const authorityBadges: TrustBadgeData[] = [
  {
    id: "ftc",
    label: "정보공개서 등록",
    value: "2025.0854",
    source: "공정거래위원회",
    variant: "authority",
    href: "https://franchise.ftc.go.kr",
  },
  {
    id: "biz",
    label: "사업자등록번호",
    value: "728-38-01319",
    variant: "authority",
  },
  {
    id: "compliance",
    label: "공정위 시정조치",
    value: "0건 (3년)",
    source: "정보공개서 2025.0854 III장",
    variant: "authority",
  },
];

// 안전 배지 — 폼 직전 (결정 직전)
export const safetyBadges: TrustBadgeData[] = [
  {
    id: "shinhan",
    label: "가맹금 예치기관",
    value: "신한은행",
    source: "가맹사업법 §6의5",
    variant: "safety",
  },
  {
    id: "sgi",
    label: "피해보상보험",
    value: "서울보증보험(주)",
    source: "가맹점사업자 피해보상보험",
    variant: "safety",
  },
];

export const allBadges: TrustBadgeData[] = [...authorityBadges, ...safetyBadges];

// 사회적 증거 mosaic
export const socialProofItems: SocialProofItem[] = [
  {
    id: "diningcode",
    source: "diningcode",
    metric: "5.0",
    label: "다이닝코드 평점",
    quote: "가성비 최고 돼지갈비집",
    href: "https://www.diningcode.com/profile.php?rid=6emIIJqx9n9i",
  },
  {
    id: "siksin-mag",
    source: "siksin",
    metric: "TOP 4",
    label: "식신 매거진 '서면 가성비'",
    href: "https://www.siksinhot.com/theme/magazine/7194",
  },
  {
    id: "instagram",
    source: "instagram",
    metric: "17.8만",
    label: "부산 인플루언서 릴 도달",
    quote: "가격 미친거아니가",
    href: "https://www.instagram.com/reel/DTR3laZElIe/",
  },
];
