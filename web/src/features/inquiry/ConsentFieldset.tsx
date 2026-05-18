import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { InquiryInput } from "./schema";

export function ConsentFieldset() {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<InquiryInput>();

  const privacy = useWatch({ control, name: "consentPrivacy" });
  const marketing = useWatch({ control, name: "consentMarketing" });

  const allChecked = Boolean(privacy) && Boolean(marketing);
  const allRef = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useState<"privacy" | "marketing" | null>(null);

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
    <fieldset className="space-y-3 rounded-lg border border-[var(--color-border)] p-5 bg-[var(--color-charcoal-900)]">
      <legend className="px-2 text-[12px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.12em]">
        약관 동의
      </legend>

      <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
        <input
          ref={allRef}
          type="checkbox"
          checked={allChecked}
          onChange={(e) => onToggleAll(e.target.checked)}
          aria-controls="c-privacy c-marketing"
          className="w-5 h-5 accent-[var(--color-ember-500)]"
        />
        <strong className="text-[15px] text-[var(--color-fg-strong)]">전체 동의</strong>
      </label>

      <div className="border-t border-[var(--color-border)] pt-3 space-y-3">
        <div>
          <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
            <input
              id="c-privacy"
              type="checkbox"
              aria-invalid={!!errors.consentPrivacy}
              aria-describedby={errors.consentPrivacy ? "c-privacy-err" : undefined}
              {...register("consentPrivacy")}
              className="mt-0.5 w-5 h-5 accent-[var(--color-ember-500)]"
            />
            <span className="text-[14px] text-[var(--color-fg)] leading-[1.5]">
              <span className="text-[var(--color-ember-400)] font-bold">[필수]</span> 개인정보 수집·이용 동의
            </span>
            <button
              type="button"
              onClick={() => setOpenModal("privacy")}
              className="ml-auto text-[12px] text-[var(--color-brass-400)] underline min-h-[44px] px-2"
            >
              보기
            </button>
          </label>
          {errors.consentPrivacy && (
            <p
              id="c-privacy-err"
              role="alert"
              className="mt-1 ml-8 text-[12px] text-[var(--color-ember-400)]"
            >
              {errors.consentPrivacy.message}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
            <input
              id="c-marketing"
              type="checkbox"
              {...register("consentMarketing")}
              className="mt-0.5 w-5 h-5 accent-[var(--color-ember-500)]"
            />
            <span className="text-[14px] text-[var(--color-fg-muted)] leading-[1.5]">
              <span className="text-[var(--color-fg-soft)] font-bold">[선택]</span> 마케팅 정보 수신 동의
            </span>
            <button
              type="button"
              onClick={() => setOpenModal("marketing")}
              className="ml-auto text-[12px] text-[var(--color-brass-400)] underline min-h-[44px] px-2"
            >
              보기
            </button>
          </label>
        </div>
      </div>

      {openModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[rgba(0,0,0,0.7)]"
          onClick={() => setOpenModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--color-charcoal-900)] border border-[var(--color-border-strong)] rounded-lg max-w-[600px] max-h-[80vh] overflow-y-auto p-8"
          >
            <h3 className="text-[18px] font-bold text-[var(--color-fg-strong)] mb-4">
              {openModal === "privacy" ? "[필수] 개인정보 수집·이용 동의" : "[선택] 마케팅 정보 수신 동의"}
            </h3>
            <pre className="text-[13px] text-[var(--color-fg-muted)] whitespace-pre-wrap leading-[1.85] font-sans">
              {openModal === "privacy" ? privacyText : marketingText}
            </pre>
            <button
              type="button"
              onClick={() => setOpenModal(null)}
              className="mt-6 w-full min-h-[48px] rounded-md bg-[var(--color-ember-500)] text-[var(--color-ivory-50)] font-bold"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </fieldset>
  );
}

const privacyText = `올바로갈비(이하 "회사")는 창업 상담 신청을 위하여 「개인정보 보호법」 제15조 및 제22조에 따라 아래와 같이 개인정보를 수집·이용하며, 정보주체의 동의를 받습니다.

1. 수집 항목 (필수)
  - 성함, 휴대전화번호, 이메일 주소, 희망 출점 지역(시·도/시·군·구), 창업 예산 구간
  - (선택) 외식업 경험, 문의 내용

2. 수집·이용 목적
  - 창업 상담 신청 접수 및 회신 (전화·문자·이메일 상담)
  - 가맹 적합성 사전 검토 및 정보공개서 제공
  - 상담 이력 관리, 부정·중복 접수 방지

3. 보유·이용 기간
  - 접수일로부터 90일까지 보관 후 자동 파기
  - 단, 가맹계약이 체결되는 경우 해당 계약 관련 법령(가맹사업법 등)에서 정한 기간 동안 별도 보관

4. 동의를 거부할 권리 및 거부 시 불이익
  - 정보주체는 본 동의를 거부할 권리가 있으며, 이 경우 창업 상담 신청 접수 및 회신이 제한될 수 있습니다.

5. 제3자 제공 / 처리위탁
  - 회사는 본 항목에 한하여 제3자에게 제공하지 않습니다.
  - 메일 발송 NAVER Cloud(SMTP), 인프라 Google LLC(Firebase, asia-northeast3 서울 리전)을 이용합니다.

6. 동의 철회·열람·정정·삭제 요청
  - frasier2015@naver.com 또는 010-5722-4929로 요청 시 지체 없이 처리합니다.

※ 만 14세 이상만 접수 가능합니다. 만 14세 미만의 개인정보는 수집하지 않습니다.`;

const marketingText = `올바로갈비는 신규 매장 오픈, 가맹 설명회, 이벤트 등 광고성 정보를 이메일·SMS·카카오 알림톡 등으로 전송하기 위하여 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제50조에 따라 별도의 동의를 받습니다.

- 수집 항목: 위 [필수] 항목 중 휴대전화번호, 이메일 주소
- 보유·이용 기간: 동의 철회 시 또는 수집일로부터 2년 중 빠른 날까지
- 야간(오후 9시 ~ 익일 오전 8시) 전송 시에는 별도 동의를 받지 않는 한 광고성 정보를 전송하지 않습니다.
- 동의를 거부하셔도 창업 상담 신청 접수에는 영향이 없습니다.`;
