// IMPORTANT: 이 파일은 web/src/features/inquiry/schema.ts와 동기화되어야 합니다.
// M8에서 codegen 또는 shared workspace로 통합 예정.

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
    .regex(phoneRegex, "휴대폰 번호 형식이 올바르지 않습니다."),

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
  message: z.string().max(500).optional().default(""),

  consentPrivacy: z.literal(true, {
    errorMap: () => ({
      message: "개인정보 수집·이용에 동의해 주셔야 접수가 가능합니다.",
    }),
  }),
  consentMarketing: z.boolean().optional().default(false),

  // honeypot
  website: z.string().max(0).optional().default(""),

  // 시간차 검증용
  renderedAt: z.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
