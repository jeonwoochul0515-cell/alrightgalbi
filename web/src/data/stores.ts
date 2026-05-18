// 본사 직영 매장(부전·화명·김해외동) 데이터. 가맹점은 StoreLocatorSection의 partnerStores 별도 관리.
import type { Store } from "../types/domain";

export const stores: Store[] = [
  {
    id: "bujeon",
    name: "올바로갈비 부전(서면)점",
    shortName: "부전점",
    district: "부산진구 부전동",
    address: "부산광역시 부산진구 중앙대로680번가길 81, 1층",
    addressDetail: "부전동 168-6",
    lat: 35.1570923,
    lng: 129.0610698,
    phone: "0507-1314-1467",
    hours: {
      open: "15:20",
      close: "24:00",
      lastOrder: "23:10",
    },
    access: "서면역 6번 출구 도보 약 3분",
    isFlagship: true,
    isDirect: true,
    openedAt: "2025-03-18",
    heroImage: "/hero-1920.jpg",
    features: ["본사 직영 1호점", "서면역 도보 3분", "단체석"],
    tags: ["본사", "1호점", "서면", "부전동"],
  },
  {
    id: "hwamyeong",
    name: "올바로갈비 화명직영점",
    shortName: "화명점",
    district: "북구 화명동",
    address: "부산광역시 북구 금곡대로285번길 39, 103호",
    lat: 35.2369,
    lng: 129.0149,
    phone: "010-5722-4929",
    hours: {
      open: "16:00",
      close: "익일 02:00",
      lastOrder: "01:00",
    },
    access: "화명동 상권 중심",
    isDirect: true,
    heroImage: "/hero-1920.jpg",
    features: ["본사 직영", "양 조절 주문 가능 (돼지 600g·소 400g)", "심야 영업"],
    tags: ["화명", "북구", "직영"],
  },
  {
    id: "gimhae-oedong",
    name: "올바로갈비 김해외동점",
    shortName: "김해외동점",
    district: "김해시 외동",
    address: "경상남도 김해시 함박로119번길 17, 1층 106호",
    lat: 35.2342,
    lng: 128.8811,
    phone: "010-5722-4929",
    hours: {
      open: "16:00",
      close: "익일 02:00",
      lastOrder: "01:00",
    },
    access: "김해 외동 상권",
    isDirect: true,
    heroImage: "/hero-1920.jpg",
    features: ["본사 직영", "경남권 거점", "심야 영업"],
    tags: ["김해", "외동", "경남", "직영"],
  },
];

export const getStoreBySlug = (slug: string): Store | undefined =>
  stores.find((s) => s.id === slug);

export const flagshipStore = stores.find((s) => s.isFlagship)!;
