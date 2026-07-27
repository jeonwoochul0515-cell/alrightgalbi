// Instagram 큐레이션 게시물 데이터. 외부 인플루언서 게시물 + #올바로갈비 해시태그 진입 카드.
// 본사 공식 인스타 계정이 운영되면 url·thumbnail·caption을 교체.
import type { InstagramPost } from "../types/domain";

export const instagramHashtagUrl =
  "https://www.instagram.com/explore/tags/%EC%98%AC%EB%B0%94%EB%A1%9C%EA%B0%88%EB%B9%84/";

export const instagramPosts: InstagramPost[] = [
  {
    id: "reel-DTR3laZElIe",
    url: "https://www.instagram.com/reel/DTR3laZElIe/",
    thumbnail: "/instagram/DTR3laZElIe.jpg",
    author: "@impact.busan",
    authorRole: "부산 맛집 인플루언서 · 17.8만 뷰",
    caption:
      "“가격 미친거아니가…” — 하단점에서 직접 다녀온 부산 양념돼지갈비 가성비 릴.",
    kind: "reel",
    metrics: [
      { label: "좋아요", value: "1,791" },
      { label: "댓글", value: "57" },
    ],
    storeId: "hadan",
  },
  {
    id: "reel-DSTPT2bk6RN",
    url: "https://www.instagram.com/reel/DSTPT2bk6RN/",
    thumbnail: "/instagram/DSTPT2bk6RN.jpg",
    author: "@busan_aroi",
    authorRole: "부산·양산 맛집 소개",
    caption:
      "화명직영점 방문기 — 100g 3,000원 양념돼지갈비·7,900원 LA갈비·5,900원 오돌갈비까지 직접 시식한 가족 외식 추천 영상.",
    kind: "reel",
    metrics: [
      { label: "좋아요", value: "1,108" },
      { label: "댓글", value: "83" },
    ],
    storeId: "hwamyeong",
  },
  {
    id: "reel-DXGysR6jUxz",
    url: "https://www.instagram.com/reel/DXGysR6jUxz/",
    thumbnail: "/instagram/DXGysR6jUxz.jpg",
    author: "@busan.food.here",
    authorRole: "부산 맛집 여기",
    caption:
      "“숯불돼지갈비 1인분 3,500원!?” — 동아대 학생들이 무조건 달려간다는 하단 올바로갈비 영상 후기.",
    kind: "reel",
    metrics: [
      { label: "좋아요", value: "1,243" },
      { label: "댓글", value: "29" },
    ],
    storeId: "hadan",
  },
];
