import { useState, useMemo } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../lib/firebase";
import { inquirySchema, BUDGET_OPTIONS, BUDGET_LABELS, EXPERIENCE_OPTIONS, EXPERIENCE_LABELS, type InquiryInput } from "./schema";
import { regions, getGuList } from "./regions";
import { ConsentFieldset } from "./ConsentFieldset";
import { Button } from "../../components/atoms/Button";
import { cn } from "../../utils/cn";

type Step = 0 | 1 | 2;
type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; id: string }
  | { kind: "error"; message: string };

const stepLabels = ["희망 지역", "예산·경험", "연락처"];

export function InquiryForm() {
  const [step, setStep] = useState<Step>(0);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const renderedAt = useMemo(() => Date.now(), []);

  const methods = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      regionSido: "",
      regionGu: "",
      message: "",
      consentMarketing: false,
      website: "",
      renderedAt,
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const sido = useWatch({ control, name: "regionSido" });
  const guList = sido ? getGuList(sido) : [];

  const goNext = async () => {
    const fields: Array<keyof InquiryInput> =
      step === 0 ? ["regionSido", "regionGu"] : ["budget"];
    const ok = await trigger(fields);
    if (ok) setStep((s) => Math.min(2, s + 1) as Step);
  };

  const goPrev = () => setStep((s) => Math.max(0, s - 1) as Step);

  const onSubmit = async (data: InquiryInput) => {
    setState({ kind: "submitting" });
    try {
      const submit = httpsCallable<InquiryInput, { ok: true; id: string }>(
        functions,
        "submitInquiry"
      );
      const res = await submit(data);
      setState({ kind: "success", id: res.data.id });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "일시적인 오류입니다. 010-5722-4929로 직접 연락 주세요.";
      setState({ kind: "error", message });
    }
  };

  if (state.kind === "success") {
    return <SuccessCard id={state.id} />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          {...register("website")}
        />

        {/* Progress */}
        <ol className="flex items-center gap-2 mb-8" aria-label="진행 단계">
          {stepLabels.map((label, i) => (
            <li key={label} className="flex-1">
              <div
                className={cn(
                  "h-1 rounded-full transition-colors",
                  i <= step ? "bg-[var(--color-ember-500)]" : "bg-[var(--color-charcoal-700)]"
                )}
              />
              <p
                className={cn(
                  "mt-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors",
                  i === step
                    ? "text-[var(--color-brass-300)]"
                    : i < step
                    ? "text-[var(--color-fg-muted)]"
                    : "text-[var(--color-fg-soft)]"
                )}
              >
                {i + 1}. {label}
              </p>
            </li>
          ))}
        </ol>

        {/* Step 0: Region */}
        {step === 0 && (
          <div className="space-y-5">
            <Field
              label="희망 시·도"
              error={errors.regionSido?.message}
              required
              hint="아직 결정 안 하셔도 괜찮습니다."
            >
              <select
                {...register("regionSido", {
                  onChange: () => setValue("regionGu", ""),
                })}
                aria-invalid={!!errors.regionSido}
                className={selectClass}
              >
                <option value="">시·도 선택</option>
                {regions.map((r) => (
                  <option key={r.sido} value={r.sido}>
                    {r.sido}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="희망 시·군·구" error={errors.regionGu?.message} required>
              <select
                {...register("regionGu")}
                aria-invalid={!!errors.regionGu}
                disabled={!sido}
                className={selectClass}
              >
                <option value="">{sido ? "구·군 선택" : "시·도 먼저 선택"}</option>
                {guList.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>

            {sido === "부산광역시" && (
              <p className="text-[12px] text-[var(--color-brass-300)] bg-[rgba(176,133,69,0.08)] border-l-2 border-[var(--color-brass-500)] pl-3 py-2">
                ✓ 부산권은 본사 직영 운영 지역입니다. 본사에서 직접 상담드립니다.
              </p>
            )}
          </div>
        )}

        {/* Step 1: Budget + Experience */}
        {step === 1 && (
          <div className="space-y-6">
            <Field label="창업 예산" error={errors.budget?.message} required hint="건물·임대료 제외 본부 분담분 기준">
              <div className="grid grid-cols-2 gap-2">
                {BUDGET_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt}
                    name="budget"
                    value={opt}
                    label={BUDGET_LABELS[opt]}
                    register={register("budget")}
                  />
                ))}
              </div>
            </Field>

            <Field label="외식업 경험" hint="선택 사항">
              <div className="grid grid-cols-2 gap-2">
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt}
                    name="experience"
                    value={opt}
                    label={EXPERIENCE_LABELS[opt]}
                    register={register("experience")}
                  />
                ))}
              </div>
            </Field>
          </div>
        )}

        {/* Step 2: Contact */}
        {step === 2 && (
          <div className="space-y-5">
            <Field label="성함" error={errors.name?.message} required>
              <input
                type="text"
                {...register("name")}
                aria-invalid={!!errors.name}
                className={inputClass}
                autoComplete="name"
              />
            </Field>
            <Field label="연락처" error={errors.phone?.message} required hint="010-0000-0000 / 24시간 내 본사 직접 회신">
              <input
                type="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
                className={inputClass}
                autoComplete="tel"
                placeholder="010-1234-5678"
              />
            </Field>
            <Field label="이메일" error={errors.email?.message} required>
              <input
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                className={inputClass}
                autoComplete="email"
              />
            </Field>
            <Field label="문의 내용" error={errors.message?.message} hint="500자 이내 (선택)">
              <textarea
                {...register("message")}
                rows={4}
                className={cn(inputClass, "resize-none")}
              />
            </Field>

            <ConsentFieldset />

            {state.kind === "error" && (
              <p role="alert" className="text-[13px] text-[var(--color-ember-400)] bg-[rgba(192,57,43,0.08)] border-l-2 border-[var(--color-ember-500)] pl-3 py-2">
                {state.message}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center gap-3 justify-between">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={goPrev}>
              ← 이전
            </Button>
          ) : (
            <span />
          )}

          {step < 2 ? (
            <Button type="button" onClick={goNext}>
              다음 →
            </Button>
          ) : (
            <Button type="submit" disabled={state.kind === "submitting"}>
              {state.kind === "submitting" ? "접수 중…" : "창업 상담 신청"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

const inputClass =
  "w-full min-h-[48px] px-4 py-3 rounded-md bg-[var(--color-charcoal-900)] border border-[var(--color-border-strong)] text-[var(--color-fg-strong)] text-[15px] placeholder:text-[var(--color-fg-soft)] focus:outline-none focus:border-[var(--color-brass-400)] aria-[invalid=true]:border-[var(--color-ember-500)] transition-colors";

const selectClass = inputClass + " appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, error, required, hint, children }: FieldProps) {
  return (
    <div>
      <label className="block">
        <span className="block text-[12px] font-bold text-[var(--color-brass-400)] uppercase tracking-[0.1em] mb-2">
          {label}
          {required && <span className="text-[var(--color-ember-400)] ml-1">*</span>}
        </span>
        {children}
      </label>
      {hint && !error && (
        <p className="mt-1.5 text-[11px] text-[var(--color-fg-soft)]">{hint}</p>
      )}
      {error && (
        <p role="alert" className="mt-1.5 text-[12px] text-[var(--color-ember-400)] font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

function RadioCard({
  name,
  value,
  label,
  register,
}: {
  name: string;
  value: string;
  label: string;
  register: ReturnType<ReturnType<typeof useForm<InquiryInput>>["register"]>;
}) {
  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        value={value}
        {...register}
        className="peer sr-only"
        name={name}
      />
      <div className="min-h-[56px] flex items-center justify-center px-4 py-3 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-charcoal-900)] text-[14px] font-semibold text-[var(--color-fg-muted)] transition-all peer-checked:border-[var(--color-ember-500)] peer-checked:bg-[rgba(192,57,43,0.12)] peer-checked:text-[var(--color-fg-strong)] peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--color-focus)] peer-focus-visible:outline-offset-2">
        {label}
      </div>
    </label>
  );
}

function SuccessCard({ id }: { id: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="surface-elev p-8 md:p-10 text-center"
    >
      <div className="mx-auto w-16 h-16 rounded-full border-2 border-[var(--color-brass-500)] flex items-center justify-center text-[28px] text-[var(--color-brass-300)] mb-6">
        ✓
      </div>
      <h3 className="text-[24px] md:text-[28px] font-bold text-[var(--color-fg-strong)] mb-3">
        창업 상담 신청이 정상 접수되었습니다.
      </h3>
      <p className="text-[15px] text-[var(--color-fg-muted)] leading-[1.85] max-w-[44ch] mx-auto">
        영업일 기준 24시간 내에 본사 대표가 직접 연락드리겠습니다.
        <br />
        급하신 분은 아래 번호로 직접 전화 주세요.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <a
          href="tel:01057224929"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[var(--color-ember-500)] text-[var(--color-ivory-50)] font-bold min-h-[52px]"
        >
          본사 010-5722-4929
        </a>
        <p className="text-[11px] text-[var(--color-fg-soft)]">접수 ID: {id}</p>
      </div>
    </div>
  );
}
