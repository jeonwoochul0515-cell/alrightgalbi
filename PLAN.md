# 올바로갈비 가맹본부 홈페이지 — 구현 PLAN.md

> **버전**: 1.0 · **작성일**: 2026-04-11
> **소스**: research.md v2 + 플랜 에이전트 4팀(IA/폼/배포/네이버) 통합본
> **스택**: React 19 + Vite 6 + TypeScript + Tailwind v4 + React Router v7 + Framer Motion + React Hook Form + Zod + Firebase Hosting/Functions/Firestore + react-kakao-maps-sdk
> **작업 디렉터리**: `C:\Users\jeonw\.antigravity\alrightgalbi\` (웹 앱: `web/`, 함수: `functions/`)
> **디자인**: A안 "Charcoal Kiln" — `#1C1A18 / #F4ECD8 / #C0392B / #B08545`
> **목표 도메인**: `olbarogalbi.kr` (선점 권장, .co.kr 보조)
> **워드마크**: **`olbaroGALBI`** (소문자 olbaro + 대문자 GALBI). 본문 영문명 `Olbaro Galbi`, 한글 정식 상호 `올바로갈비`, 코드/도메인/SNS는 전부 소문자 `olbarogalbi`. 워드마크는 시각 자산 전용이며 코드 식별자에는 사용 금지.

---

## 0. 한 페이지 요약 (Executive Plan)

| 영역 | 결정 |
|---|---|
| 1차 출시 라우트 | `/` (랜딩 9섹션) · `/franchise` (가맹모집 7섹션) · `/stores/:slug` · `*` |
| 디자인 시스템 | A안 Charcoal Kiln, Tailwind v4 `@theme` 토큰 단일 소스 |
| 폰트 | Pretendard Variable subset(woff2 자체 호스팅) + Noto Serif KR 800 + Inter |
| 지도 | `react-kakao-maps-sdk` 라우트 lazy import |
| 폼 | React Hook Form + Zod + KRDS 동의 패턴 |
| 백엔드 | Firebase Functions onCall(asia-northeast3) → Firestore + Naver SMTP 메일 2종 |
| 보안 | App Check(reCAPTCHA v3) + honeypot + 시간차 + IP rate limit |
| 호스팅 | Firebase Hosting + 1년 immutable 캐시 + CSP·HSTS·Referrer-Policy |
| SEO | react-helmet-async + JSON-LD @graph(Restaurant + LocalBusiness×3 + Menu + FAQ + Breadcrumb) |
| 한국 SEO | 네이버 서치어드바이저(HTML 파일+태그 병행) + 사이트맵 + RSS + 스마트플레이스 매장 3곳 등록 |
| CI/CD | GitHub Actions: PR → preview channel, main → live |
| 성능 예산 | LCP ≤ 2.0s · CLS < 0.05 · TBT < 200ms · 홈 JS ≤ 140KB gzip |
| 접근성 | WCAG 2.2 AA + KRDS 동의 패턴 + 44px 터치 타깃 |
| 사전렌더링 | `vite-plugin-prerender`로 라우트별 정적 HTML — Yeti/Googlebot 콘텐츠 노출 보장 |

---

## 1. 사이트맵 · 라우팅

| Path | 페이지 컴포넌트 | 데이터 의존성 |
|---|---|---|
| `/` | `HomePage` | `menu.ts`, `stores.ts`, `news.ts`, `i18n/ko.ts` |
| `/franchise` | `FranchisePage` | `franchise.ts` (비용·프로세스·FAQ) |
| `/stores/:slug` | `StoreDetailPage` | `stores.ts` (slug 조회) |
| `*` | `NotFoundPage` | – |

slug: `bujeon`(부전·서면 본사 1호점) · `hadan`(하단점) · `hwamyeong`(화명직영점)

라우터는 `src/app/router.tsx`에 `createBrowserRouter`로 모으고, `RootLayout`이 공통 `<SiteHeader>`·`<SiteFooter>`·`<ScrollToHash>`·`<MotionPreferenceProvider>`를 감싼다. 랜딩 내부 내비는 hash anchor (`/#menu`, `/#stores`).

---

## 2. 페이지·섹션 구성

### 2.1 랜딩 페이지 `/` (9 섹션)
1. `HeroSection` (#hero) — 풀스크린 2-컬럼 벤토. 좌측: 키네틱 한글 헤드라인 "양념돼지갈비 3,500원" + 1차 CTA(가맹문의) + 2차 CTA(메뉴). 우측: 16:10 AVIF 갈비 클로즈업.
2. `BrandStorySection` (#story) — Noto Serif KR 800 H2 "부산, 숯불, 그리고 올바름" + 본문 3문단 + 대표 유종우 서명 + 키워드 칩 3개.
3. `WhyOlbaroSection` (#why) — 3카드 벤토: ① 보증금 0·로열티 1.65% ② 100g 3,500원 시그니처 ③ 부산 직영 3매장 검증. Brass Gold 카운트업.
4. `SignatureMenuSection` (#menu) — 카테고리 탭(갈비/식사/주류) + 3열 카드 그리드, 가격 노출.
5. `StoreLocatorSection` (#stores) — 좌측 카드 리스트(3개) + 우측 카카오 지도(lazy). 정적 PNG fallback.
6. `FranchiseTeaserSection` (#franchise-teaser) — Charcoal 풀블리드 배너, 4-필드 수치표 + CTA → `/franchise`.
7. `NewsSection` (#news) — 3카드(매장 오픈/미디어/공지). 비어있을 시 placeholder.
8. `FooterCtaSection` — "같이 가요, 올바로." 리퍼블 + tel/inquiry 2-CTA.
9. `SiteFooter` — 본사 법정 정보 4컬럼 → 모바일 아코디언.

### 2.2 가맹모집 페이지 `/franchise` (7 섹션)
1. `HeroFranchiseSection` — Ember Red 서브톤 1/2 히어로, "반값 창업 패키지" + PDF 다운로드.
2. `ValuePropsSection` — 2x2 벤토: 보증금 0 · 로열티 1.65% · 부산 본사 직전수 · 3년 민원 0건.
3. `CostBreakdownTable` — 정보공개서 발췌 표(최초 가맹금 1,100만 + 기타비용 9,570만), 모바일 카드 스택.
4. `ProcessTimelineSection` — 6–7단계 수직 타임라인(상담→임장→계약→인테리어→교육→오픈→사후).
5. `FaqSection` — 8–12문항 Headless UI Disclosure 아코디언 + FAQPage JSON-LD.
6. `TrustBarSection` — 정보공개서 2025.0854 / 사업자번호 / 신한은행 예치 / 서울보증보험 / 민원 0건 5배지 슬라이더.
7. `InquiryFormSection` (#inquiry) — children slot으로 `<InquiryForm />` 주입.

---

## 3. 컴포넌트 트리 (Atomic Design)

### Atoms (`src/components/atoms/`)
`Button` `Link` `Heading` `Text` `Badge` `Chip` `Icon` `Price` `Divider` `MotionReveal` `FormPlaceholder`

### Molecules (`src/components/molecules/`)
`MenuCard` `StoreCard` `StatCard` `ProcessStepItem` `FaqItem` `TrustBadge` `NavLinkItem` `LanguageToggle` `NewsCard` `CostRow`

### Organisms (`src/components/organisms/`)
`SiteHeader` `SiteFooter` `HeroSection` `BrandStorySection` `WhyOlbaroSection` `SignatureMenuSection` `StoreLocatorSection` `KakaoMap` `FranchiseTeaserSection` `NewsSection` `FooterCtaSection` `HeroFranchiseSection` `ValuePropsSection` `CostBreakdownTable` `ProcessTimelineSection` `FaqSection` `TrustBarSection` `InquiryFormSection`

### Templates (`src/components/templates/`)
`RootLayout` `HomeTemplate` `FranchiseTemplate` `StoreDetailTemplate`

---

## 4. 데이터 모델 — `src/types/domain.ts`

```ts
export type Locale = 'ko' | 'en';
export type Slug = 'bujeon' | 'hadan' | 'hwamyeong';

export interface Store {
  id: Slug;
  name: string;            // "올바로갈비 부전(서면)점"
  shortName: string;       // "부전점"
  address: string;
  addressDetail?: string;
  lat: number;
  lng: number;
  phone: string;
  hours: {
    open: string;          // "15:20"
    close: string;         // "24:00"
    lastOrder?: string;
    closedDays?: string[]; // ["화"]
    note?: string;
  };
  access: string;
  isFlagship?: boolean;
  openedAt?: string;       // ISO
  heroImage: string;
  gallery: string[];
  tags: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  price: number;           // KRW
  unit?: string;           // "100g"
  badge?: 'signature' | 'new' | 'limited';
  availableAt: Slug[];
  image?: string;
}

export interface MenuCategory {
  id: 'galbi' | 'meal' | 'side' | 'drink';
  label: string;
  description?: string;
  items: MenuItem[];
}

export interface FranchiseCost {
  id: string;
  category: '최초가맹금' | '기타비용' | '운영부담';
  label: string;
  amount: number;          // 천원 단위
  unit?: 'KRW_1000' | 'PERCENT' | 'MONTHLY';
  supplier?: string;
  note?: string;
  emphasized?: boolean;
}

export interface FAQItem {
  id: string;
  category: 'cost' | 'process' | 'support' | 'ops';
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  durationDays?: number;
  description: string;
}

export interface NewsItem {
  id: string;
  date: string;            // ISO
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
  icon: 'shield' | 'bank' | 'gavel' | 'store' | 'medal';
  href?: string;
}

export interface CtaLink { label: string; href: string; variant?: 'primary' | 'secondary'; }
export interface KineticLine { text: string; accent?: boolean; delayMs?: number; }
```

---

## 5. 디자인 토큰 — `src/styles/tokens.css`

```css
@import "tailwindcss";

@theme {
  /* === Charcoal Kiln Palette === */
  --color-charcoal-950: #0F0E0D;
  --color-charcoal-900: #1C1A18;
  --color-charcoal-800: #2A2724;
  --color-charcoal-700: #3A3631;
  --color-ivory-50:    #FBF7EC;
  --color-ivory-100:   #F4ECD8;
  --color-ivory-200:   #E8DEC3;
  --color-ember-500:   #C0392B;
  --color-ember-600:   #A12E22;
  --color-brass-400:   #C79B54;
  --color-brass-500:   #B08545;
  --color-brass-600:   #8E6A36;

  /* Semantic */
  --color-bg:          var(--color-charcoal-900);
  --color-bg-elev:     var(--color-charcoal-800);
  --color-fg:          var(--color-ivory-100);
  --color-fg-muted:    color-mix(in oklab, var(--color-ivory-100) 72%, transparent);
  --color-accent:      var(--color-ember-500);
  --color-accent-alt:  var(--color-brass-500);
  --color-focus:       var(--color-brass-400);

  /* Fonts */
  --font-sans:  "Pretendard Variable", "Pretendard", system-ui, sans-serif;
  --font-serif: "Noto Serif KR", "Nanum Myeongjo", serif;
  --font-latin: "Inter", "Pretendard Variable", sans-serif;

  /* Type scale */
  --text-display-xl: 5.5rem;
  --text-display-lg: 4rem;
  --text-display-md: 3rem;
  --text-h1:         2.25rem;
  --text-h2:         1.75rem;
  --text-h3:         1.375rem;
  --text-body:       1.0625rem;
  --leading-cjk:     1.75;
  --leading-display: 1.1;

  /* Spacing */
  --space-section-y: clamp(4rem, 8vw, 8rem);
  --space-gutter:    clamp(1rem, 4vw, 2.5rem);

  /* Radii */
  --radius-md:  0.75rem;
  --radius-lg:  1rem;
  --radius-xl:  1.5rem;
  --radius-2xl: 2rem;

  /* Shadows */
  --shadow-card:  0 12px 32px -12px rgba(0,0,0,0.55);
  --shadow-ember: 0 0 0 1px color-mix(in oklab, var(--color-ember-500) 40%, transparent),
                  0 8px 28px -10px color-mix(in oklab, var(--color-ember-500) 55%, transparent);

  /* Motion */
  --ease-emphasize: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 160ms;
  --duration-base: 280ms;
  --duration-slow: 520ms;
  --duration-hero: 900ms;

  /* Breakpoints */
  --breakpoint-sm:  40rem;
  --breakpoint-md:  48rem;
  --breakpoint-lg:  64rem;
  --breakpoint-xl:  80rem;
  --breakpoint-2xl: 96rem;
}

@layer base {
  :root { color-scheme: dark; }
  html { font-family: var(--font-sans); background: var(--color-bg); color: var(--color-fg); }
  body { line-height: var(--leading-cjk); font-size: var(--text-body); }
  :focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
    border-radius: var(--radius-md);
  }
  ::selection { background: var(--color-ember-500); color: var(--color-ivory-50); }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }
}
```

---

## 6. 가맹문의 폼 + Firebase Functions

### 6.1 Zod 스키마 — `web/src/features/inquiry/schema.ts`

```ts
import { z } from "zod";

export const BUDGET_OPTIONS = ["under_100m", "100_200m", "200_300m", "over_300m"] as const;
export const EXPERIENCE_OPTIONS = ["none", "under_1y", "1_3y", "over_3y"] as const;
export const TIMESLOT_OPTIONS = ["morning", "lunch", "afternoon", "evening", "anytime"] as const;

const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;

export const inquirySchema = z.object({
  name: z.string({ required_error: "성함을 입력해 주세요." })
    .trim().min(2, "성함은 2자 이상 입력해 주세요.").max(20, "성함은 20자 이하로 입력해 주세요."),
  phone: z.string({ required_error: "연락처를 입력해 주세요." })
    .trim().regex(phoneRegex, "휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"),
  email: z.string({ required_error: "이메일을 입력해 주세요." })
    .trim().email("이메일 형식이 올바르지 않습니다."),
  regionSido: z.string({ required_error: "희망 시·도를 선택해 주세요." }).min(1),
  regionGu: z.string({ required_error: "희망 시·군·구를 선택해 주세요." }).min(1),
  budget: z.enum(BUDGET_OPTIONS, { errorMap: () => ({ message: "창업 예산을 선택해 주세요." }) }),
  experience: z.enum(EXPERIENCE_OPTIONS).optional(),
  timeslots: z.array(z.enum(TIMESLOT_OPTIONS)).max(5).optional().default([]),
  message: z.string().max(500, "문의 내용은 500자 이하로 입력해 주세요.").optional().default(""),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({ message: "개인정보 수집·이용에 동의해 주셔야 접수가 가능합니다." }),
  }),
  consentMarketing: z.boolean().optional().default(false),
  // honeypot
  website: z.string().max(0, "잘못된 요청입니다.").optional().default(""),
  // 10초 미만 차단용
  renderedAt: z.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
```

### 6.2 KRDS 동의 패턴 — `ConsentFieldset.tsx`

```tsx
import { useWatch, useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";
import type { InquiryInput } from "./schema";

export function ConsentFieldset() {
  const { register, setValue, control, formState: { errors } } = useFormContext<InquiryInput>();
  const privacy = useWatch({ control, name: "consentPrivacy" });
  const marketing = useWatch({ control, name: "consentMarketing" });
  const allChecked = Boolean(privacy) && Boolean(marketing);
  const allRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (allRef.current) {
      allRef.current.indeterminate = !allChecked && Boolean(privacy || marketing);
    }
  }, [allChecked, privacy, marketing]);

  const onToggleAll = (checked: boolean) => {
    setValue("consentPrivacy", checked as true, { shouldValidate: true });
    setValue("consentMarketing", checked, { shouldValidate: true });
  };

  return (
    <fieldset className="consent">
      <legend>약관 동의</legend>
      <label className="consent__all">
        <input ref={allRef} type="checkbox" checked={allChecked}
          onChange={(e) => onToggleAll(e.target.checked)}
          aria-controls="c-privacy c-marketing" />
        <strong>전체 동의</strong>
      </label>
      <hr aria-hidden="true" />
      <label>
        <input id="c-privacy" type="checkbox"
          aria-invalid={!!errors.consentPrivacy}
          aria-describedby={errors.consentPrivacy ? "c-privacy-err" : undefined}
          {...register("consentPrivacy")} />
        <span>[필수] 개인정보 수집·이용 동의</span>
        <button type="button" onClick={() => openModal("privacy")}>보기</button>
      </label>
      {errors.consentPrivacy && (
        <p id="c-privacy-err" role="alert" className="field-error">
          {errors.consentPrivacy.message}
        </p>
      )}
      <label>
        <input id="c-marketing" type="checkbox" {...register("consentMarketing")} />
        <span>[선택] 마케팅 정보 수신 동의</span>
        <button type="button" onClick={() => openModal("marketing")}>보기</button>
      </label>
    </fieldset>
  );
}
```

핵심: 전체 동의는 **파생 상태(derived)** — 독립 필드가 아니어서 "필수 미동의 시 전체동의 해제 유지"가 자연스럽게 성립. `indeterminate`로 부분 체크 시각화.

### 6.3 Cloud Function — `functions/src/inquiry.ts`

```ts
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import nodemailer from "nodemailer";
import { inquirySchema } from "./schema";
import { renderHqMail, renderApplicantMail } from "./mail-templates";

if (!getApps().length) initializeApp();
const db = getFirestore();

const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASSWORD = defineSecret("SMTP_PASSWORD");
const HQ_EMAIL = "frasier2015@naver.com";

export const submitInquiry = onCall(
  {
    region: "asia-northeast3",
    secrets: [SMTP_USER, SMTP_PASSWORD],
    enforceAppCheck: true,
    cors: ["https://olbarogalbi.kr", "https://olbarogalbi.web.app"],
    maxInstances: 10,
  },
  async (req) => {
    const parsed = inquirySchema.safeParse(req.data);
    if (!parsed.success) throw new HttpsError("invalid-argument", "입력값이 올바르지 않습니다.");
    const d = parsed.data;

    if (d.website) throw new HttpsError("permission-denied", "스팸으로 판단되어 차단되었습니다.");
    if (Date.now() - d.renderedAt < 10_000)
      throw new HttpsError("permission-denied", "제출이 너무 빠릅니다.");

    // IP rate limit: 1시간 5건
    const ip = req.rawRequest.ip ?? "unknown";
    const rlRef = db.doc(`rate_limits/${Buffer.from(ip).toString("base64url")}`);
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(rlRef);
      const now = Date.now();
      const windowStart = now - 60 * 60 * 1000;
      const hits: number[] = (snap.data()?.hits ?? []).filter((t: number) => t > windowStart);
      if (hits.length >= 5)
        throw new HttpsError("resource-exhausted", "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.");
      hits.push(now);
      tx.set(rlRef, { hits, updatedAt: FieldValue.serverTimestamp() });
    });

    const docRef = await db.collection("inquiries").add({
      ...d,
      ipHash: Buffer.from(ip).toString("base64url"),
      userAgent: req.rawRequest.headers["user-agent"] ?? null,
      createdAt: FieldValue.serverTimestamp(),
      status: "new",
      expireAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });

    console.log("inquiry.created", {
      id: docRef.id,
      name: d.name[0] + "*".repeat(Math.max(0, d.name.length - 1)),
      phone: d.phone.replace(/\d{4}(?=-?\d{4}$)/, "****"),
      region: `${d.regionSido} ${d.regionGu}`,
      budget: d.budget,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.naver.com", port: 465, secure: true,
      auth: { user: SMTP_USER.value(), pass: SMTP_PASSWORD.value() },
    });

    await Promise.all([
      transporter.sendMail({
        from: `"올바로갈비 홈페이지" <${SMTP_USER.value()}>`,
        to: HQ_EMAIL,
        replyTo: d.email,
        subject: `[가맹문의] ${d.name} / ${d.regionSido} ${d.regionGu} / ${d.budget}`,
        html: renderHqMail(d, docRef.id),
        text: renderHqMail(d, docRef.id, { plain: true }),
      }),
      transporter.sendMail({
        from: `"올바로갈비" <${SMTP_USER.value()}>`,
        to: d.email,
        subject: "[올바로갈비] 가맹문의가 정상 접수되었습니다.",
        html: renderApplicantMail(d),
        text: renderApplicantMail(d, { plain: true }),
      }),
    ]);

    return { ok: true, id: docRef.id };
  }
);
```

### 6.4 Firestore 보안 규칙 — `firestore.rules`

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{id} {
      allow read: if request.auth != null && request.auth.token.admin == true;
      allow write: if false;
    }
    match /rate_limits/{key} {
      allow read, write: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> Admin SDK는 rules를 우회 → Functions 정상 작동. 운영 조회는 admin custom claim 부여한 계정만.

### 6.5 이메일 템플릿 — A안 컬러 적용

`functions/src/mail-templates.ts`에 본사 알림 메일과 신청자 자동 회신 메일 2종. 본사 메일은 Charcoal/Brass 톤 + 신청자 메일은 dark hero + 빨강 CTA. (구체 코드는 위 6.3과 동일 패턴, 길이상 생략 — 백엔드 구현 시 작성.)

### 6.6 스팸/보안 4중 방어
1. **Honeypot** `website` 필드 (display:none, tabindex=-1)
2. **시간차** `renderedAt < 10_000` 차단
3. **App Check + reCAPTCHA v3** — `enforceAppCheck: true`
4. **IP rate limit** 1시간 5건 슬라이딩 윈도

### 6.7 개인정보 수명주기
- 로그: 성함 첫 글자만, 전화 중간 4자리 마스킹, 이메일 로컬파트 마스킹
- Firestore TTL 정책: `inquiries.expireAt` 90일 자동 삭제
- 백업 안전망: Pub/Sub 일배치 함수
- `/privacy` 페이지에 수집·목적·보유기간 명시, ConsentFieldset "보기" 모달이 이 조항 노출

### 6.8 시크릿 관리
```bash
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASSWORD
firebase functions:secrets:set RECAPTCHA_SITE_KEY
```
`.env` 사용 금지. 프런트 측엔 `VITE_` 접두 공개 키만.

---

## 7. 빌드 파이프라인

### 7.1 `web/vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('picture')) {
          return new URLSearchParams(
            'format=avif;webp;jpg&w=640;960;1280;1920&as=picture'
          );
        }
        return new URLSearchParams();
      },
    }),
    visualizer({ filename: 'dist/stats.html', gzipSize: true }),
  ],
  build: {
    target: 'es2022',
    cssTarget: 'chrome108',
    sourcemap: false,
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 250,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'kakao-map':    ['react-kakao-maps-sdk'],
          'motion':       ['framer-motion'],
          'firebase':     ['firebase/app', 'firebase/analytics', 'firebase/performance'],
        },
      },
    },
  },
  server: { port: 5173, strictPort: true },
});
```

### 7.2 폰트 자체 호스팅

```bash
npm i -D pretendard
mkdir -p web/public/fonts
cp node_modules/pretendard/dist/web/variable/pretendard-subset/PretendardVariable.subset.woff2 \
   web/public/fonts/pretendard-variable-subset.woff2
```

`web/src/styles/fonts.css`:
```css
@font-face {
  font-family: 'Pretendard Variable';
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/pretendard-variable-subset.woff2') format('woff2-variations');
  unicode-range: U+AC00-D7A3, U+0020-007E, U+00A0-00FF, U+2010-2027;
}
```

`index.html`:
```html
<link rel="preload" href="/fonts/pretendard-variable-subset.woff2"
      as="font" type="font/woff2" crossorigin />
```

Noto Serif KR 800 / BM Hanna Pro는 IntersectionObserver 트리거 후 `document.fonts.load()`로 지연 로드 → LCP 경쟁 제외.

### 7.3 이미지 — `<Picture>` 컴포넌트

```tsx
// web/src/components/Picture.tsx
import type { FC, ImgHTMLAttributes } from 'react';

type PictureSources = {
  sources: { avif: string; webp: string; jpg: string };
  img: { src: string; w: number; h: number };
};

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  data: PictureSources;
  priority?: boolean;
}

export const Picture: FC<Props> = ({ data, priority, alt, className, sizes }) => (
  <picture>
    <source type="image/avif" srcSet={data.sources.avif} sizes={sizes} />
    <source type="image/webp" srcSet={data.sources.webp} sizes={sizes} />
    <img
      src={data.img.src}
      width={data.img.w}
      height={data.img.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  </picture>
);
```

사용:
```tsx
import hero from '@/assets/hero/yangnyeom.jpg?picture';
<Picture data={hero} alt="참숯에 구워지는 수제양념돼지갈비"
         priority sizes="(min-width: 960px) 1280px, 100vw" />
```

### 7.4 사전 렌더링 (Prerendering)

CSR SPA의 한계를 보완하기 위해 라우트별 정적 HTML을 빌드 시 생성. **네이버 Yeti는 JS 실행이 제한적**이므로 필수.

```bash
npm i -D vite-plugin-prerender
```

빌드 산출물 예상:
```
dist/
  index.html
  franchise/index.html
  stores/bujeon/index.html
  stores/hadan/index.html
  stores/hwamyeong/index.html
  naverXXXXXXXX.html
  robots.txt
  sitemap.xml
  rss.xml
```

각 경로별 `index.html`이 존재하면 `firebase.json`의 SPA fallback이 가로채기 전에 정적 파일이 우선 서빙된다.

---

## 8. SEO · 메타 · JSON-LD

### 8.1 `<SEO />` 컴포넌트 (react-helmet-async)

```tsx
// web/src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

const SITE = 'https://olbarogalbi.kr';
const DEFAULT_OG = `${SITE}/og/og-default.jpg`;

export function SEO({ title, description, path, image = DEFAULT_OG, type = 'website' }: SEOProps) {
  const url = `${SITE}${path}`;
  const fullTitle = `${title} | 올바로갈비`;
  return (
    <Helmet prioritizeSeoTags>
      <html lang="ko" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="올바로갈비" />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="theme-color" content="#1C1A18" />
      <meta name="naver-site-verification" content="__REPLACE__" />
      <meta name="google-site-verification" content="__REPLACE__" />
    </Helmet>
  );
}
```

### 8.2 JSON-LD `@graph` (홈 페이지 주입)

`web/src/lib/jsonld.ts`에 보관 후 `<Helmet><script type="application/ld+json">{JSON.stringify(graph)}</script></Helmet>`로 주입.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://olbarogalbi.kr/#restaurant",
      "name": "올바로갈비",
      "alternateName": "Olbaro Galbi",
      "url": "https://olbarogalbi.kr",
      "logo": "https://olbarogalbi.kr/og/logo.png",
      "image": ["https://olbarogalbi.kr/og/hero-1.jpg"],
      "servesCuisine": ["Korean", "Korean BBQ", "갈비"],
      "priceRange": "₩",
      "telephone": "+82-10-9342-4929",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "중앙대로680번가길 81, 1층",
        "addressLocality": "부산광역시 부산진구",
        "addressRegion": "KR-26",
        "postalCode": "47291",
        "addressCountry": "KR"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 35.1570923, "longitude": 129.0610698 },
      "hasMenu": { "@id": "https://olbarogalbi.kr/#menu" },
      "sameAs": [
        "https://www.instagram.com/impact.busan",
        "https://www.diningcode.com/profile.php?rid=IffrFNiEy3EO"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://olbarogalbi.kr/stores/bujeon#store",
      "name": "올바로갈비 부전(서면)점",
      "parentOrganization": { "@id": "https://olbarogalbi.kr/#restaurant" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "중앙대로680번가길 81, 1층",
        "addressLocality": "부산광역시 부산진구",
        "addressCountry": "KR"
      },
      "telephone": "+82-507-1314-1467",
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Mo","Tu","We","Th","Fr","Sa","Su"],
        "opens": "15:20", "closes": "24:00"
      }],
      "geo": { "@type": "GeoCoordinates", "latitude": 35.1570923, "longitude": 129.0610698 }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://olbarogalbi.kr/stores/hadan#store",
      "name": "올바로갈비 하단점",
      "parentOrganization": { "@id": "https://olbarogalbi.kr/#restaurant" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "낙동대로519번길 25, 1층",
        "addressLocality": "부산광역시 사하구",
        "addressCountry": "KR"
      },
      "telephone": "+82-507-1388-3032",
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Mo","We","Th","Fr","Sa","Su"],
        "opens": "16:00", "closes": "02:00"
      }]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://olbarogalbi.kr/stores/hwamyeong#store",
      "name": "올바로갈비 화명직영점",
      "parentOrganization": { "@id": "https://olbarogalbi.kr/#restaurant" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "금곡대로285번길 39, 103호",
        "addressLocality": "부산광역시 북구",
        "addressCountry": "KR"
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Mo","Tu","We","Th","Fr","Sa","Su"],
        "opens": "16:00", "closes": "01:00"
      }]
    },
    {
      "@type": "Menu",
      "@id": "https://olbarogalbi.kr/#menu",
      "name": "올바로갈비 메뉴",
      "hasMenuSection": [{
        "@type": "MenuSection",
        "name": "갈비",
        "hasMenuItem": [
          { "@type": "MenuItem", "name": "수제양념돼지갈비 (100g)",
            "offers": { "@type": "Offer", "price": "3500", "priceCurrency": "KRW" } },
          { "@type": "MenuItem", "name": "명품 생돼지갈비 (100g)",
            "offers": { "@type": "Offer", "price": "3900", "priceCurrency": "KRW" } },
          { "@type": "MenuItem", "name": "소갈비 (100g)",
            "offers": { "@type": "Offer", "price": "7900", "priceCurrency": "KRW" } },
          { "@type": "MenuItem", "name": "한우육회 (200g)",
            "offers": { "@type": "Offer", "price": "11900", "priceCurrency": "KRW" } }
        ]
      }]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "가맹 창업 비용은 얼마인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "가맹비 550만 + 교육비 550만(총 1,100만), 보증금 0원, 로열티 매월 매출의 1.65%. 인테리어·기기 등 기타 비용은 30평 기준 약 9,570만원입니다(점포 임대 제외)."
          }
        },
        {
          "@type": "Question",
          "name": "양념돼지갈비 가격은 왜 이렇게 쌉니까?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "본사 통일 단가로 100g 3,500원에 제공합니다. 전 매장 동일 단가이며 상차림비 3,000원이 테이블당 부과됩니다."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://olbarogalbi.kr/" },
        { "@type": "ListItem", "position": 2, "name": "매장", "item": "https://olbarogalbi.kr/stores" }
      ]
    }
  ]
}
```

### 8.3 `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://olbarogalbi.kr/</loc><lastmod>2026-04-11T09:00:00+09:00</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://olbarogalbi.kr/franchise</loc><lastmod>2026-04-11T09:00:00+09:00</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://olbarogalbi.kr/stores/bujeon</loc><lastmod>2026-04-11T09:00:00+09:00</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://olbarogalbi.kr/stores/hadan</loc><lastmod>2026-04-11T09:00:00+09:00</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://olbarogalbi.kr/stores/hwamyeong</loc><lastmod>2026-04-11T09:00:00+09:00</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>
```

### 8.4 `robots.txt` — 네이버 Yeti 명시 허용

```
# 올바로갈비 robots.txt
User-agent: Yeti
Allow: /

User-agent: Yeti-Mobile
Allow: /

User-agent: NaverBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Daumoa
Allow: /

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/private/
Disallow: /*?utm_

Sitemap: https://olbarogalbi.kr/sitemap.xml
```

### 8.5 `rss.xml` (공지사항용 — 네이버 별도 등록)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>올바로갈비 공지사항</title>
    <link>https://olbarogalbi.kr/notice</link>
    <description>부산 한식 갈비 가맹본부 올바로갈비 공식 공지·뉴스</description>
    <language>ko-kr</language>
    <lastBuildDate>Sat, 11 Apr 2026 09:00:00 +0900</lastBuildDate>
    <item>
      <title>화명직영점 그랜드 오픈 안내</title>
      <link>https://olbarogalbi.kr/notice/2026-04-hwamyeong-open</link>
      <description>부산 북구 화명동 직영점이 4월 20일 정식 오픈합니다.</description>
      <pubDate>Fri, 10 Apr 2026 10:00:00 +0900</pubDate>
      <guid>https://olbarogalbi.kr/notice/2026-04-hwamyeong-open</guid>
    </item>
  </channel>
</rss>
```

---

## 9. 네이버 서치어드바이저 등록·운영 (★ 한국 SEO 최우선)

> **1차 출처**: https://searchadvisor.naver.com/guide
> 본 섹션은 D팀 전담 보강본. C팀의 일반 SEO 위에 한국 특화 절차를 덮어쓴다.

### 9.1 사이트 등록 절차
1. https://searchadvisor.naver.com 접속 → **본사 운영용 네이버 계정**으로 로그인 (개인 계정 ❌, 권한 이전 어려움)
2. 웹마스터 도구 → 사이트 등록에 정확히 `https://olbarogalbi.kr/` 입력 (프로토콜·www·트레일링 슬래시 일치 필수)
3. 소유 확인 단계로 자동 이동

### 9.2 소유 확인 — **HTML 파일 + 메타 태그 병행 (권장)**

| 방법 | SPA + Firebase 적합도 |
|---|---|
| **HTML 파일 업로드** | ★★★★★ 권장 |
| HTML 태그(`<meta>`) | ★★★★ 사전렌더링 시 OK |
| DNS TXT | ★★★ 도메인 등록기관 접근 필요 |

**이유**: Firebase Hosting은 `public/`의 정적 파일을 SPA rewrite보다 **먼저** 서빙. `public/naverXXXXXXXX.html`을 두면 SPA 라우터가 가로채지 않고 200 반환. 두 방법 동시 적용하면 한쪽 사고 시 다른 한쪽으로 유지됨.

`web/public/naver1234567890abcdef.html` (네이버 발급 원본 그대로):
```
naver-site-verification: naver1234567890abcdef.html
```

`web/index.html` `<head>` 최상단:
```html
<meta name="naver-site-verification" content="1234567890abcdef1234567890abcdef12345678" />
```

`firebase.json`에 `**/*.html` no-cache 설정으로 인증 파일이 즉시 갱신되도록 함(아래 §10).

### 9.3 robots.txt — Yeti 명시 (§8.4 동일, 네이버 Yeti·Yeti-Mobile·NaverBot·Daumoa 모두 Allow)

### 9.4 sitemap.xml (§8.3) — 50,000 URL / 50MB 이하 단일, lastmod ISO 8601 + KST `+09:00`

### 9.5 RSS 피드 (§8.5) — 공지/뉴스 색인 가속 채널

### 9.6 메타·OG — `og:site_name`, `og:title`, `og:description`, `og:image`, `og:url`, `og:locale=ko_KR`. 네이버는 표준 OG를 1차 인식. `<html lang="ko">` 필수, `og:image` 1200×630 1MB 이하 절대 HTTPS URL.

### 9.7 JSON-LD — `Restaurant`, `LocalBusiness`(매장 3개), `Organization`, `BreadcrumbList`, `FAQPage`, `Menu` (§8.2 그대로)

### 9.8 네이버 통합검색 채널 분리 전략

| 채널 | 목적 | 등록처 | 비용 |
|---|---|---|---|
| **웹사이트** | 브랜드 권위·가맹 랜딩 | 서치어드바이저 | 무료 |
| **스마트플레이스** | 지도/플레이스 탭 (매장 3곳 각각) | smartplace.naver.com | 무료 |
| **네이버 블로그** | VIEW 탭 콘텐츠 시드 | blog.naver.com | 무료 |
| **네이버 톡톡** | 가맹문의 CS 채널 | partner.talk.naver.com | 무료 |

**스마트플레이스 매장 등록 (각 점 개별)**:
1. smartplace.naver.com 접속, 사업자등록증 보유 계정 로그인
2. 새 업체 등록 → 업종 "한식>갈비" 선택
3. 상호 "올바로갈비 부전점", 도로명 주소, 전화, 영업시간, 휴무, 메뉴(가격), 사진 10장 이상
4. 사업자등록증 사본 업로드 → 1–3 영업일 심사
5. 부전·하단·화명 3개 매장 **각각 등록**

### 9.9 색인 요청
1. 웹마스터 도구 → 요청 → **웹페이지 수집** → URL 입력 (신규는 핵심 5–10개만 수동 요청)
2. 요청 → **사이트맵 제출** `https://olbarogalbi.kr/sitemap.xml`
3. 요청 → **RSS 제출** `https://olbarogalbi.kr/rss.xml`
4. **일일 한도 약 50건** — 나머지는 사이트맵에 의존
5. 미색인 URL 진단: 사이트 진단 → 수집/색인 현황에서 사유 확인 후 재요청

### 9.10 사이트 진단 자동 점검 항목

| 항목 | 합격 기준 | Vite/Firebase 대응 |
|---|---|---|
| robots.txt 접근성 | 200 응답 | `web/public/robots.txt` |
| sitemap.xml 형식 | 표준 스키마 | §8.3 |
| HTTPS 강제 | – | Firebase 기본 |
| 응답 시간 | 평균 1초 이내 | CDN + 이미지 최적화 |
| 모바일 친화성 | 뷰포트 메타·44px 터치 타깃 | §11 토큰 |
| 중복 URL | 단일 canonical | trailing slash 통일 |
| canonical | `<link rel="canonical">` | `<SEO>` 컴포넌트 |
| 리다이렉트 체인 | 1단계 이내 | www→non-www 직접 |
| 4xx/5xx | 0건 | 404 페이지 처리 |

### 9.11 콘텐츠 최적화 가이드 (네이버 4요소: 원본성·시의성·신뢰성·풍부함)

- **메뉴 페이지**: 메뉴당 본문 200자+ (원산지·부위·숙성·1인분 기준·알레르기·추천 사이드)
- **매장 페이지 필수**: 도로명·위경도·전화·영업시간·휴무·주차·좌석수·룸·교통·사진 6장+·LocalBusiness JSON-LD
- **가맹문의 페이지**: 비용 표·FAQ 10개·연락처·가맹점 현황·정보공개서 다운로드·폼
- **본사 소개**: 창업 스토리·대표 인사말·식자재 수급·위생 인증·보도자료

**키워드 클러스터 5종 (부산+갈비+가성비)**:
1. 지역+업종: 부산 갈비집 / 부전동 갈비 / 하단 갈비 / 화명동 갈비
2. 가성비: 부산 가성비 갈비 / 부산 가족외식 갈비 / 점심특선
3. 가맹·창업: 부산 갈비 가맹점 / 한식 프랜차이즈 창업 / 소자본 외식창업
4. 메뉴 특화: 양념갈비 맛집 / 생갈비 맛집 / 부산 한우 갈비
5. 상황·동기: 부산 회식장소 / 부산 상견례 갈비 / 가족모임 식당

각 클러스터당 랜딩 1 + 보조 콘텐츠 3 구조.

### 9.12 모바일 최적화
- `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` 필수
- 본문 16px+, 행간 1.5+
- 터치 타깃 44×44px
- 가로 스크롤 금지
- 이미지 lazy + AVIF/WebP
- **PWA/AMP**: 네이버 가산점 없음 → 도입 불필요

### 9.13 운영 KPI (시점별)

| 시점 | 점검 | 합격 기준 |
|---|---|---|
| 출시 +1주 | 소유확인·사이트맵·robots·메인 색인 | 메인+5 URL 색인 |
| +1개월 | 색인률·진단 등급·브랜드 노출 | 80% 색인, "올바로갈비" 검색 1위 |
| +3개월 | 노출/클릭/CTR/순위/키워드 | 일 노출 1,000+, CTR 5%+, 비브랜드 키워드 10+ |

### 9.14 Firebase + Vite CSR 함정과 사전렌더링 (필수)

**핵심 문제**: Vite + React는 CSR이라 초기 HTML이 빈 `<div id="root">`. **Yeti는 JS 실행 능력이 제한적** → 본문·메타가 비어 보일 위험.

**해결 (우선순위)**:
1. **사전 렌더링** `vite-plugin-prerender` (또는 react-snap) — 라우트별 정적 HTML 생성. 본 사이트(라우트 ~10개)에 최적
2. **react-helmet-async** — 페이지별 메타 동적 주입, 사전렌더링과 **반드시 병행**
3. 콘텐츠 폭발 시 **Next.js / Astro로 SSG 마이그레이션** 검토

빌드 산출물에 `dist/franchise/index.html`, `dist/stores/bujeon/index.html` 등이 모두 존재해야 rewrites 가로채기 전에 정적 파일이 우선 서빙됨.

### 9.15 공통 함정
- **한글 도메인**: 병행 시 punycode(`xn--...`)로 별도 등록 + 301
- **트레일링 슬래시**: `/menu` vs `/menu/` 통일 + canonical
- **www vs non-www**: 한쪽으로 301 일원화
- **CSP 함정**: `default-src 'self'`만 두면 OG·JSON-LD 외부 참조 깨질 수 있음 → `report-only`로 시작
- **`X-Robots-Tag: noindex`** 헤더 잘못 들어가면 즉시 미색인 → 배포 전 `curl -I` 확인

### 9.16 출시 후 30분 즉시 체크리스트
1. ☐ `naverXXXXXXXX.html` 업로드 + `index.html` meta 삽입 → 재배포 → 소유 확인 클릭
2. ☐ `robots.txt` / `sitemap.xml` / `rss.xml` 200 응답 `curl -I` 검증
3. ☐ 사이트맵 + RSS 제출, 핵심 5 URL 수동 색인 요청
4. ☐ 스마트플레이스 부전·하단·화명 3개 매장 등록 시작
5. ☐ 사이트 진단 1차 자동 검사 → 빨간 항목 즉시 수정 후 재검사

---

## 10. Firebase Hosting 설정

### 10.1 `firebase.json`

```json
{
  "hosting": {
    "public": "web/dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "trailingSlash": false,
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ],
    "headers": [
      {
        "source": "**/*.@(html)",
        "headers": [{ "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }]
      },
      {
        "source": "/index.html",
        "headers": [
          { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
          { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(self), interest-cohort=()" },
          { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://dapi.kakao.com https://t1.daumcdn.net https://*.googletagmanager.com https://*.google-analytics.com https://*.firebaseio.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https: https://*.daumcdn.net; font-src 'self' data:; connect-src 'self' https://dapi.kakao.com https://*.google-analytics.com https://*.firebaseio.com https://firebaseinstallations.googleapis.com https://firebase.googleapis.com wss://*.firebaseio.com; frame-src https://*.daum.net; object-src 'none'; base-uri 'self'; form-action 'self'" }
        ]
      },
      {
        "source": "/assets/**",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      },
      {
        "source": "**/*.@(woff2|webp|avif|jpg|jpeg|png|svg|ico)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      },
      {
        "source": "/sitemap.xml",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600" }]
      }
    ]
  },
  "functions": [
    { "source": "functions", "codebase": "default", "runtime": "nodejs20", "region": "asia-northeast3" }
  ],
  "firestore": { "rules": "firestore.rules" }
}
```

### 10.2 `.firebaserc`

```json
{
  "projects": {
    "default": "olbarogalbi",
    "production": "olbarogalbi"
  }
}
```

---

## 11. Kakao Map SDK

1. https://developers.kakao.com 로그인 → 내 애플리케이션 → 추가
2. 플랫폼 → Web 등록: `https://olbarogalbi.kr`, `https://olbarogalbi--preview-*.web.app`, `http://localhost:5173`
3. **JavaScript 키** 복사 → GitHub Secrets `VITE_KAKAO_MAP_KEY`
4. 카카오맵 → 사용 설정 ON
5. **무료 쿼터: JavaScript Map 300,000회/일**
6. 로드: `useKakaoLoader({ appkey, libraries: ['services'] })` — 매장 페이지 진입 시에만 네트워크 발생

---

## 12. CI/CD — GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  checks: write
  pull-requests: write

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: web
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: web/package-lock.json
      - run: npm ci
      - run: npm run lint
      - name: Build
        env:
          VITE_FB_API_KEY: ${{ secrets.VITE_FB_API_KEY }}
          VITE_FB_APP_ID: ${{ secrets.VITE_FB_APP_ID }}
          VITE_FB_MEASUREMENT_ID: ${{ secrets.VITE_FB_MEASUREMENT_ID }}
          VITE_KAKAO_MAP_KEY: ${{ secrets.VITE_KAKAO_MAP_KEY }}
          VITE_RECAPTCHA_SITE_KEY: ${{ secrets.VITE_RECAPTCHA_SITE_KEY }}
        run: npm run build
      - name: Deploy preview channel
        if: github.event_name == 'pull_request'
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_OLBARO_GALBI }}
          projectId: olbarogalbi
          expires: 7d
          entryPoint: .
      - name: Deploy live
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_OLBARO_GALBI }}
          projectId: olbarogalbi
          channelId: live
          entryPoint: .
```

GitHub Secrets:
- `FIREBASE_SERVICE_ACCOUNT_OLBARO_GALBI` (Firebase Console → Project Settings → Service accounts → Generate new private key)
- `VITE_FB_API_KEY`, `VITE_FB_APP_ID`, `VITE_FB_MEASUREMENT_ID`, `VITE_KAKAO_MAP_KEY`, `VITE_RECAPTCHA_SITE_KEY`

---

## 13. 수동 배포 런북

```bash
# 0. 최초 1회 — 로컬 인증 (사용자 인터랙티브, ! 프리픽스 권장)
firebase login

# 1. 프로젝트 초기화
cd C:/Users/jeonw/.antigravity/alrightgalbi
firebase init hosting,functions,firestore
#   - public directory: web/dist
#   - SPA rewrite: Yes
#   - Functions language: TypeScript
#   - Use existing project: olbarogalbi

# 2. 빌드
cd web && npm ci && npm run build

# 3. 미리보기 채널 (검수용, 7일 만료)
cd ..
firebase hosting:channel:deploy preview --expires 7d
# → URL: https://olbarogalbi--preview-xxx.web.app

# 4. 검수 (Lighthouse desktop/mobile, 모바일 실기기, Kakao 지도 동작)

# 5. 프로덕션 배포
firebase deploy --only hosting,functions,firestore:rules

# 6. 롤백
firebase hosting:releases:list
firebase hosting:rollback
```

**실패 시나리오**:
- CSP 위반으로 Kakao 지도 미표시 → CSP의 `script-src`/`connect-src`에 `dapi.kakao.com`·`*.daumcdn.net` 재확인 후 재배포
- 캐시된 구버전 index.html → `**/*.html` no-cache 적용 확인 + CDN TTL ≤ 60초 대기

---

## 14. 도메인 연결

1. Firebase Console → Hosting → Add custom domain → `olbarogalbi.kr`
2. TXT 레코드 표시 → 가비아/후이즈 DNS에 추가 (5–30분 전파)
3. A 레코드 2개 표시 → `@`에 추가
4. `www.olbarogalbi.kr`은 CNAME → `olbarogalbi.kr` 또는 `olbarogalbi.web.app`
5. Let's Encrypt 자동 인증서 발급: 15분–24시간 대기
6. `.co.kr`은 보조 도메인으로 같은 프로젝트에 2차 바인딩(301 리다이렉트)

---

## 15. 모니터링

- **Firebase Performance**: `getPerformance(app)` 자동 수집 + 커스텀 trace `kakao_map_load`, `menu_image_lcp`
- **Alerts**: p75 LCP > 2.5s 이메일, Error rate > 1% 알림
- **Hosting Usage**: 무료 티어 10GB/월 초과 경보
- **GSC Core Web Vitals**: 주간 리뷰
- **Naver Search Advisor**: 수집 현황 주간 리뷰 (네이버 색인은 Google보다 2–4주 지연)

---

## 16. 의존성 패키지

**dependencies**
```
react@^19, react-dom@^19, react-router-dom@^7
framer-motion@^11
react-hook-form@^7, @hookform/resolvers@^3, zod@^3
react-kakao-maps-sdk@^1
react-helmet-async@^2
@headlessui/react@^2
lucide-react@^0.4
clsx@^2, class-variance-authority@^0.7
firebase@^10
```

**devDependencies**
```
vite@^6, @vitejs/plugin-react@^4
tailwindcss@^4, @tailwindcss/vite@^4
typescript@^6
vite-imagetools@^7, sharp@^0.33
vite-plugin-prerender@^1
rollup-plugin-visualizer@^5
prettier@^3, prettier-plugin-tailwindcss@^0.6
vitest@^2, @testing-library/react@^16, @testing-library/jest-dom@^6, jsdom@^25
pretendard
```

**functions/package.json**
```
firebase-functions@^5, firebase-admin@^12
nodemailer@^6
zod@^3
```

---

## 17. 파일 트리 (`web/src/`)

```
src/
├── app/
│   ├── router.tsx
│   ├── providers.tsx          // LocaleProvider + MotionPreferenceProvider + HelmetProvider
│   └── ScrollToHash.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── FranchisePage.tsx
│   ├── StoreDetailPage.tsx
│   └── NotFoundPage.tsx
├── components/
│   ├── atoms/    (Button, Link, Heading, Text, Badge, Chip, Icon, Price, Divider, MotionReveal, FormPlaceholder)
│   ├── molecules/ (MenuCard, StoreCard, StatCard, ProcessStepItem, FaqItem, TrustBadge, NavLinkItem, LanguageToggle, NewsCard, CostRow)
│   ├── organisms/ (SiteHeader, SiteFooter, HeroSection, BrandStorySection, WhyOlbaroSection, SignatureMenuSection, StoreLocatorSection, KakaoMap, FranchiseTeaserSection, NewsSection, FooterCtaSection, HeroFranchiseSection, ValuePropsSection, CostBreakdownTable, ProcessTimelineSection, FaqSection, TrustBarSection, InquiryFormSection)
│   ├── templates/ (RootLayout, HomeTemplate, FranchiseTemplate, StoreDetailTemplate)
│   ├── Picture.tsx
│   └── SEO.tsx
├── features/
│   └── inquiry/
│       ├── schema.ts
│       ├── regions.ts
│       ├── InquiryForm.tsx
│       ├── ConsentFieldset.tsx
│       ├── RegionSelect.tsx
│       ├── SuccessCard.tsx
│       ├── ErrorBanner.tsx
│       ├── useInquirySubmit.ts
│       └── inquiry.css
├── data/
│   ├── stores.ts
│   ├── menu.ts
│   ├── franchise.ts
│   ├── faq.ts
│   ├── news.ts
│   └── trustBadges.ts
├── types/
│   └── domain.ts
├── i18n/
│   ├── index.ts
│   ├── ko.ts
│   └── en.ts
├── hooks/
│   ├── useMotionPreference.ts
│   ├── useCountUp.ts
│   └── useLocale.ts
├── lib/
│   ├── firebase.ts
│   ├── analytics.ts
│   └── jsonld.ts
├── utils/
│   ├── format.ts
│   ├── cn.ts
│   └── seo.ts
├── styles/
│   ├── tokens.css
│   └── fonts.css
├── assets/
│   ├── images/ (hero, stores, menu)
│   ├── icons/
│   └── fonts/
├── App.tsx
└── main.tsx
```

`functions/` 디렉터리:
```
functions/
├── src/
│   ├── index.ts
│   ├── inquiry.ts
│   ├── schema.ts        // web/src/features/inquiry/schema.ts와 동기화
│   ├── mail-templates.ts
│   └── ttl-cleanup.ts   // Pub/Sub 90일 삭제 백업
├── package.json
└── tsconfig.json
```

---

## 18. 구현 시퀀싱 (12 마일스톤)

| # | 마일스톤 | 내용 | 산출물 |
|---|---|---|---|
| **M1** | Foundation | Vite 스캐폴드 검증, Tailwind v4 + 토큰 + 폰트 | `tokens.css`, `fonts.css`, Pretendard subset 호스팅 |
| **M2** | Types & Data | `types/domain.ts` + `data/*.ts` 6개 모듈 | research.md 사실관계 하드코딩 |
| **M3** | Atoms → Molecules | 11 atoms + 10 molecules | 시각 검증용 임시 페이지 |
| **M4** | Layout | RootLayout + Header + Footer + ScrollToHash + Router | 빈 페이지 라우팅 동작 |
| **M5** | 랜딩 organisms | 9개 섹션 순서대로 구현 | `/` 시각 완성 |
| **M6** | Store Detail | `StoreDetailPage` + KakaoMap lazy | 매장 3 페이지 |
| **M7** | Franchise | 7 섹션 + InquiryFormSection placeholder | `/franchise` |
| **M8** | Form + Functions | Zod 스키마, KRDS, Function, Firestore rules, 이메일 템플릿 | 폼 E2E 동작(에뮬레이터) |
| **M9** | Motion + a11y | Framer Motion fade/stagger/카운트업, prefers-reduced-motion, 키보드 QA | Lighthouse a11y ≥95 |
| **M10** | SEO + JSON-LD | `<SEO>`, jsonld.ts, sitemap, robots, rss, 사전렌더링 | 라우트별 정적 HTML 산출 |
| **M11** | Build & Deploy | firebase.json, .firebaserc, GitHub Actions, preview 배포 | preview URL 검수 |
| **M12** | Naver SA + Live | 소유확인, 사이트맵 제출, 스마트플레이스 등록, live 배포, 도메인 연결 | 프로덕션 + 색인 시작 |

각 마일스톤은 1–2 PR 단위. 완료 기준:
- M1–M4: 빌드 통과 + Lighthouse 100 (빈 페이지)
- M5: 데스크탑 1280 + 모바일 375 시각 검수
- M8: 에뮬레이터 폼 제출 → Firestore + 메일 2통 수신
- M10: `dist/franchise/index.html` 등 정적 HTML 모두 생성
- M11: preview Lighthouse Performance ≥ 95
- M12: 네이버 사이트 진단 합격 + 색인 시작 확인

---

## 19. 리스크 & 대응

| 리스크 | 영향 | 대응 |
|---|---|---|
| 화명점 영업시간/전화 미확인 | 매장 페이지 정확도 | `data/stores.ts` `hours.note` "문의 바람" 표기, 본사 회신 후 단일 파일 수정 배포 |
| 본사 BI/CI 파일 부재 | 디자인 톤 정합성 | 임시 워드마크(Noto Serif KR 800) 합의, 정식 로고 도착 시 SVG 교체 |
| Kakao Map 광고차단 | 매장 페이지 미표시 | 정적 PNG fallback + StoreCard 리스트 우선 |
| 네이버 Yeti CSR 미인식 | SEO 노출 0 | **사전렌더링 필수 (M10)** |
| Naver SMTP 일 500통 한도 | 가맹문의 폭주 시 | SendGrid로 transporter 추상화, 1줄 교체 |
| 정보공개서 "가맹사업 미개시"와 실제 운영 매장 갭 | 컴플라이언스 | 본사 회신 받아 직영/가맹 분류 명확화 후 표기 |
| 도메인 `olbaro.com` 점유 (LED 회사) | 영문 도메인 불가 | `olbarogalbi.kr/.co.kr` 선점 + `alrightgalbi.com` 영문 보조 |
| reCAPTCHA v3 사용성 | 일부 사용자 차단 | 임계값 0.5로 시작, 차단 시 fallback 안내 메시지 |

---

## 20. 본사 회신 필요 항목 (구현 진입 전 필수)

1. ✅ 정식 영문 표기: **`Olbaro Galbi`** (워드마크 `olbaroGALBI`) — 확정
2. ✅ 도메인: **`olbarogalbi.kr`** 선점 가능 — 확정 (`.co.kr`은 보조 권장)
3. ✅ Firebase 프로젝트: **`olbarogalbi`**, web app + Analytics(`G-S1P4RPLFE2`) + **Blaze 결제 플랜** 모두 확정 (Functions/Hosting/Firestore 즉시 사용 가능)
4. ☐ 본사 운영용 네이버 계정 (서치어드바이저·스마트플레이스용)
5. ☐ 본사 SMTP 사용 계정 + 비밀번호 (Naver Mail)
6. ☐ Kakao Developers 계정 + JavaScript 키 발급
7. ☐ 카카오톡 채널 (가맹문의 CTA용) — 또는 추후 보류 결정
8. ☐ 정보공개서 PDF (다운로드용 정식본)
9. ☐ 사업자등록증 사본 (스마트플레이스 매장 등록용)
10. ☐ 매장 사진 자산 (각 매장 6장+) + 음식 사진
11. ☐ 정식 BI/CI 파일 (SVG·AI) 또는 임시 워드마크 합의
12. ☐ 화명직영점 정확한 영업시간·전화·휴무
13. ☐ 정식 슬로건 채택 (권장: "같이 가요, 올바로.")
14. ☐ 가맹문의 응대 채널 확정 (이메일 단일 vs 카카오톡 채널 병행)

---

## 21. 출시 후 30분 즉시 액션 (M12 직후)

1. ☐ Firebase live 배포 완료 확인 (`firebase deploy --only hosting,functions`)
2. ☐ 도메인 HTTPS 접속 검증
3. ☐ 네이버 서치어드바이저 사이트 등록 → 소유 확인 → 사이트맵·RSS 제출 → 핵심 5 URL 수동 색인 요청
4. ☐ Google Search Console 등록 → TXT 인증 → 사이트맵 제출
5. ☐ Firebase Analytics 작동 확인 (Realtime 대시보드)
6. ☐ Lighthouse Mobile/Desktop 4지표 (Performance/A11y/SEO/Best Practices) 95+ 확인
7. ☐ 가맹문의 폼 E2E 1회 (테스트 데이터로 본사·신청자 메일 수신 확인)
8. ☐ 스마트플레이스 부전·하단·화명 3개 매장 등록 시작 (사업자등록증 업로드)
9. ☐ Kakao Developers 플랫폼 도메인 등록 확인
10. ☐ Firebase Performance 알림 룰 설정

---

> **결론**: 본 PLAN.md는 4개 전문 에이전트(IA·폼·배포·네이버 SEO)의 결과를 통합한 단일 실행 문서입니다. M1–M12 마일스톤을 순서대로 따르면 1차 출시까지 즉시 진입 가능. 본사 회신이 필요한 14개 항목(§20)을 받는 시점부터 M1을 착수하면 됩니다. 다음 명령은 본사 승인 후 "implement M1" 한 줄이면 충분합니다.
