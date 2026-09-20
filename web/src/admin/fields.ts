/** 관리자 폼을 자동 생성하기 위한 필드 정의. 도메인 타입 하나당 스키마 하나. */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "tags"
  | "json";

export interface FieldDef {
  /** 점 표기 중첩 경로 지원 — 예: "hours.open" */
  path: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  help?: string;
  /** 폼에서 한 줄 전체를 차지할지 */
  wide?: boolean;
}

export interface RecordSchema {
  /** 목록에서 제목으로 보여줄 필드 경로 */
  titlePath: string;
  /** 목록에서 부제로 보여줄 필드 경로 */
  subtitlePath?: string;
  fields: FieldDef[];
  /** 새 항목을 만들 때의 기본값 */
  blank: () => Record<string, unknown>;
}

const slugField: FieldDef = {
  path: "id",
  label: "ID (영문 소문자·하이픈, URL에 쓰임)",
  type: "text",
  placeholder: "bujeon",
  help: "매장 상세 주소가 /stores/<ID> 로 만들어집니다. 저장 후 바꾸면 기존 링크가 끊깁니다.",
};

export const storeSchema: RecordSchema = {
  titlePath: "name",
  subtitlePath: "district",
  fields: [
    slugField,
    { path: "name", label: "매장 전체 이름", type: "text", placeholder: "올바로갈비 서면점" },
    { path: "shortName", label: "짧은 이름", type: "text", placeholder: "서면점" },
    { path: "shortNameEn", label: "짧은 이름 (영문)", type: "text" },
    { path: "shortNameJa", label: "짧은 이름 (일문)", type: "text" },
    { path: "district", label: "행정동", type: "text", placeholder: "부산진구 부전동" },
    { path: "districtEn", label: "행정동 (영문)", type: "text" },
    { path: "districtJa", label: "행정동 (일문)", type: "text" },
    { path: "address", label: "주소", type: "text", wide: true },
    { path: "addressDetail", label: "지번 등 부가 주소", type: "text" },
    { path: "phone", label: "전화번호", type: "text", placeholder: "0507-1331-7220" },
    { path: "lat", label: "위도", type: "number", help: "지도 표시에 쓰입니다." },
    { path: "lng", label: "경도", type: "number" },
    { path: "hours.open", label: "영업 시작", type: "text", placeholder: "15:20" },
    { path: "hours.close", label: "영업 종료", type: "text", placeholder: "24:00" },
    { path: "hours.lastOrder", label: "라스트오더", type: "text", placeholder: "23:10" },
    { path: "hours.closedDays", label: "휴무일", type: "tags", placeholder: "월요일, 설날" },
    { path: "hours.note", label: "영업시간 비고", type: "text", wide: true },
    { path: "access", label: "찾아오는 길", type: "text", wide: true },
    { path: "isDirect", label: "본사 직영점", type: "boolean" },
    { path: "isFlagship", label: "대표 매장 (1호점)", type: "boolean" },
    { path: "openedAt", label: "오픈일", type: "text", placeholder: "2025-03-18" },
    {
      path: "heroImage",
      label: "대표 이미지 경로",
      type: "text",
      placeholder: "/stores/bujeon.jpg",
      help: "web/public 아래 파일 경로입니다.",
      wide: true,
    },
    { path: "features", label: "특징", type: "tags", wide: true, placeholder: "단체석, 주차 가능" },
    { path: "tags", label: "검색 태그", type: "tags", wide: true },
  ],
  blank: () => ({
    id: "",
    name: "",
    shortName: "",
    district: "",
    address: "",
    phone: "",
    isDirect: false,
  }),
};

export const menuItemSchema: RecordSchema = {
  titlePath: "name",
  subtitlePath: "category",
  fields: [
    { path: "id", label: "ID", type: "text", placeholder: "raw-pork" },
    { path: "name", label: "메뉴명", type: "text" },
    { path: "nameEn", label: "메뉴명 (영문)", type: "text" },
    { path: "nameJa", label: "메뉴명 (일문)", type: "text" },
    { path: "price", label: "가격 (원)", type: "number" },
    { path: "unit", label: "단위", type: "text", placeholder: "100g" },
    {
      path: "category",
      label: "분류",
      type: "select",
      options: [
        { value: "galbi", label: "갈비" },
        { value: "side", label: "사이드" },
        { value: "meal", label: "식사" },
        { value: "drink", label: "음료" },
      ],
    },
    {
      path: "badge",
      label: "배지",
      type: "select",
      options: [
        { value: "", label: "없음" },
        { value: "signature", label: "시그니처" },
        { value: "new", label: "신메뉴" },
        { value: "limited", label: "한정" },
        { value: "side", label: "사이드" },
      ],
      help: "시그니처로 지정하면 홈 화면 대표 메뉴에 노출됩니다.",
    },
    { path: "description", label: "설명", type: "textarea", wide: true },
    { path: "descriptionEn", label: "설명 (영문)", type: "textarea", wide: true },
    { path: "descriptionJa", label: "설명 (일문)", type: "textarea", wide: true },
    { path: "recommendedServing.grams", label: "권장 주문량 (g)", type: "number" },
    { path: "recommendedServing.people", label: "권장 인원", type: "number" },
    { path: "image", label: "이미지 경로", type: "text", wide: true, placeholder: "/menu/raw-pork.jpg" },
    {
      path: "availableAt",
      label: "판매 매장 ID",
      type: "tags",
      wide: true,
      help: "매장 ID를 쉼표로 구분해 입력합니다. 비우면 어디에도 노출되지 않습니다.",
    },
  ],
  blank: () => ({
    id: "",
    name: "",
    price: 0,
    category: "galbi",
    availableAt: [],
  }),
};

export const menuCategorySchema: RecordSchema = {
  titlePath: "label",
  subtitlePath: "id",
  fields: [
    {
      path: "id",
      label: "분류 ID",
      type: "select",
      options: [
        { value: "galbi", label: "galbi" },
        { value: "side", label: "side" },
        { value: "meal", label: "meal" },
        { value: "drink", label: "drink" },
      ],
    },
    { path: "label", label: "표시 이름", type: "text" },
    { path: "description", label: "설명", type: "text", wide: true },
  ],
  blank: () => ({ id: "side", label: "", description: "" }),
};

export const faqSchema: RecordSchema = {
  titlePath: "question",
  fields: [
    { path: "id", label: "ID", type: "text" },
    {
      path: "category",
      label: "분류",
      type: "select",
      options: [
        { value: "", label: "없음" },
        { value: "cost", label: "비용" },
        { value: "process", label: "절차" },
        { value: "support", label: "지원" },
        { value: "ops", label: "운영" },
        { value: "legal", label: "법적사항" },
      ],
    },
    { path: "question", label: "질문", type: "text", wide: true },
    { path: "answer", label: "답변", type: "textarea", wide: true },
  ],
  blank: () => ({ id: "", question: "", answer: "" }),
};

export const franchiseCostSchema: RecordSchema = {
  titlePath: "label",
  subtitlePath: "category",
  fields: [
    { path: "id", label: "ID", type: "text" },
    {
      path: "category",
      label: "구분",
      type: "select",
      options: [
        { value: "최초가맹금", label: "최초가맹금" },
        { value: "기타비용", label: "기타비용" },
        { value: "운영부담", label: "운영부담" },
      ],
    },
    { path: "label", label: "항목명", type: "text", wide: true },
    { path: "amount", label: "금액", type: "number", help: "단위가 '천원'이면 5500 = 550만원입니다." },
    {
      path: "unit",
      label: "단위",
      type: "select",
      options: [
        { value: "KRW_1000", label: "천원" },
        { value: "PERCENT", label: "퍼센트 (×100)" },
        { value: "MONTHLY_KRW", label: "월 정액(원)" },
      ],
    },
    {
      path: "displayOverride",
      label: "표시 문구 덮어쓰기",
      type: "text",
      wide: true,
      help: "입력하면 금액 대신 이 문구가 그대로 표에 나옵니다. 예: 1.65% 또는 44만원",
    },
    { path: "supplier", label: "공급업체", type: "text" },
    { path: "emphasized", label: "강조 표시", type: "boolean" },
    { path: "flexible", label: "조정 가능 배지", type: "boolean" },
    { path: "note", label: "비고", type: "textarea", wide: true },
  ],
  blank: () => ({
    id: "",
    category: "기타비용",
    label: "",
    amount: 0,
    unit: "KRW_1000",
  }),
};

export const valuePropSchema: RecordSchema = {
  titlePath: "label",
  subtitlePath: "metric",
  fields: [
    { path: "id", label: "ID", type: "text" },
    { path: "metric", label: "숫자", type: "text", placeholder: "1.65" },
    { path: "label", label: "라벨", type: "text", placeholder: "% 로열티" },
    {
      path: "icon",
      label: "아이콘",
      type: "select",
      options: [
        { value: "shield", label: "방패" },
        { value: "coin", label: "동전" },
        { value: "anchor", label: "닻" },
        { value: "store", label: "매장" },
        { value: "fire", label: "불" },
        { value: "leaf", label: "잎" },
      ],
    },
    { path: "description", label: "설명", type: "textarea", wide: true },
    { path: "source", label: "출처", type: "text", wide: true },
  ],
  blank: () => ({ id: "", metric: "", label: "", description: "", icon: "shield" }),
};

export const processStepSchema: RecordSchema = {
  titlePath: "title",
  subtitlePath: "durationDays",
  fields: [
    { path: "id", label: "ID", type: "text" },
    { path: "order", label: "순서", type: "number" },
    { path: "title", label: "단계명", type: "text" },
    { path: "durationDays", label: "소요 기간", type: "text", placeholder: "1–3일" },
    { path: "description", label: "설명", type: "textarea", wide: true },
  ],
  blank: () => ({ id: "", order: 1, title: "", description: "" }),
};

export const newsSchema: RecordSchema = {
  titlePath: "title",
  subtitlePath: "date",
  fields: [
    { path: "id", label: "ID", type: "text" },
    { path: "date", label: "날짜", type: "text", placeholder: "2026-01-15" },
    { path: "title", label: "제목", type: "text", wide: true },
    { path: "summary", label: "요약", type: "textarea", wide: true },
    { path: "href", label: "링크", type: "text", wide: true },
    { path: "source", label: "출처", type: "text" },
    { path: "image", label: "이미지 경로", type: "text" },
  ],
  blank: () => ({ id: "", date: "", title: "", summary: "" }),
};

export const trustBadgeSchema: RecordSchema = {
  titlePath: "label",
  subtitlePath: "value",
  fields: [
    { path: "id", label: "ID", type: "text" },
    { path: "label", label: "라벨", type: "text" },
    { path: "value", label: "값", type: "text" },
    {
      path: "variant",
      label: "종류",
      type: "select",
      options: [
        { value: "authority", label: "권위 (상단)" },
        { value: "safety", label: "안전 (폼 직전)" },
      ],
    },
    { path: "source", label: "출처", type: "text", wide: true },
    { path: "href", label: "링크", type: "text", wide: true },
  ],
  blank: () => ({ id: "", label: "", variant: "authority" }),
};

export const socialProofSchema: RecordSchema = {
  titlePath: "label",
  subtitlePath: "metric",
  fields: [
    { path: "id", label: "ID", type: "text" },
    {
      path: "source",
      label: "출처 채널",
      type: "select",
      options: [
        { value: "diningcode", label: "다이닝코드" },
        { value: "siksin", label: "식신" },
        { value: "instagram", label: "인스타그램" },
        { value: "facebook", label: "페이스북" },
      ],
    },
    { path: "metric", label: "수치", type: "text" },
    { path: "label", label: "라벨", type: "text" },
    { path: "quote", label: "인용구", type: "textarea", wide: true },
    { path: "href", label: "링크", type: "text", wide: true },
  ],
  blank: () => ({ id: "", source: "instagram", metric: "", label: "" }),
};

export const instagramSchema: RecordSchema = {
  titlePath: "author",
  subtitlePath: "caption",
  fields: [
    { path: "id", label: "ID", type: "text" },
    { path: "url", label: "게시물 URL", type: "text", wide: true },
    { path: "thumbnail", label: "썸네일 경로", type: "text", wide: true, placeholder: "/instagram/xxx.jpg" },
    { path: "author", label: "작성자", type: "text", placeholder: "@impact.busan" },
    { path: "authorRole", label: "작성자 소개", type: "text" },
    {
      path: "kind",
      label: "게시물 종류",
      type: "select",
      options: [
        { value: "reel", label: "릴스" },
        { value: "post", label: "게시물" },
        { value: "carousel", label: "캐러셀" },
      ],
    },
    { path: "storeId", label: "관련 매장 ID", type: "text" },
    { path: "caption", label: "캡션", type: "textarea", wide: true },
    {
      path: "metrics",
      label: "지표",
      type: "json",
      wide: true,
      help: '예: [{"label":"좋아요","value":"1,791"}]',
    },
  ],
  blank: () => ({ id: "", url: "", thumbnail: "", author: "", caption: "", kind: "reel" }),
};

export const settingsFields: FieldDef[] = [
  {
    path: "maintenance",
    label: "리뉴얼(공사) 모드",
    type: "boolean",
    help: "켜면 방문자에게 리뉴얼 안내 화면만 보입니다. 관리자 페이지는 계속 열립니다.",
    wide: true,
  },
  { path: "maintenanceTitle", label: "리뉴얼 화면 제목", type: "text", wide: true },
  { path: "maintenanceBody", label: "리뉴얼 화면 본문", type: "textarea", wide: true },
  { path: "companyName", label: "상호", type: "text" },
  { path: "ceoName", label: "대표자", type: "text" },
  { path: "bizNumber", label: "사업자등록번호", type: "text" },
  { path: "disclosureNumber", label: "정보공개서 등록번호", type: "text" },
  { path: "hqPhone", label: "대표 전화", type: "text" },
  { path: "hqEmail", label: "대표 이메일", type: "text" },
  { path: "hqAddress", label: "본사 주소", type: "text", wide: true },
];
