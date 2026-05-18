import { z } from "zod";

export const BUDGET_OPTIONS = [
  "under_100m",
  "100_200m",
  "200_300m",
  "over_300m",
] as const;

export const EXPERIENCE_OPTIONS = [
  "none",
  "under_1y",
  "1_3y",
  "over_3y",
] as const;

export const BUDGET_LABELS: Record<(typeof BUDGET_OPTIONS)[number], string> = {
  under_100m: "1억 미만",
  "100_200m": "1억 ~ 2억",
  "200_300m": "2억 ~ 3억",
  over_300m: "3억 이상",
};

export const EXPERIENCE_LABELS: Record<(typeof EXPERIENCE_OPTIONS)[number], string> = {
  none: "없음",
  under_1y: "1년 미만",
  "1_3y": "1 ~ 3년",
  over_3y: "3년 이상",
};

const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;

export const inquirySchema = z.object({
  name: z
    .string({ required_error: "성함을 입력해 주세요." })
    .trim()
    .min(2, "성함은 2자 이상 입력해 주세요.")
    .max(20, "성함은 20자 이하로 입력해 주세요."),
  phone: z
    .string({ required_error: "연락처를 입력해 주세요." })
    .trim()
    .regex(phoneRegex, "휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"),
  email: z
    .string({ required_error: "이메일을 입력해 주세요." })
    .trim()
    .email("이메일 형식이 올바르지 않습니다."),
  regionSido: z.string().min(1, "희망 시·도를 선택해 주세요."),
  regionGu: z.string().min(1, "희망 시·군·구를 선택해 주세요."),
  budget: z.enum(BUDGET_OPTIONS, {
    errorMap: () => ({ message: "창업 예산을 선택해 주세요." }),
  }),
  experience: z.enum(EXPERIENCE_OPTIONS).optional(),
  message: z
    .string()
    .max(500, "문의 내용은 500자 이하로 입력해 주세요.")
    .optional()
    .default(""),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({
      message: "개인정보 수집·이용에 동의해 주셔야 접수가 가능합니다.",
    }),
  }),
  consentMarketing: z.boolean().optional().default(false),
  // honeypot
  website: z.string().max(0, "잘못된 요청입니다.").optional().default(""),
  // 시간차 검증
  renderedAt: z.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
