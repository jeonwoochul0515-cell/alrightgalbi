import { useId } from "react";
import type { FieldDef } from "./fields";
import { getPath } from "./pathUtils";

const inputClass =
  "w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 " +
  "placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40";

export interface FieldInputProps {
  field: FieldDef;
  record: Record<string, unknown>;
  onChange: (path: string, value: unknown) => void;
}

export function FieldInput({ field, record, onChange }: FieldInputProps) {
  const id = useId();
  const raw = getPath(record, field.path);

  const set = (value: unknown) => onChange(field.path, value);

  let control: React.ReactNode;

  switch (field.type) {
    case "boolean":
      control = (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-200">
          <input
            id={id}
            type="checkbox"
            checked={raw === true}
            onChange={(e) => set(e.target.checked)}
            className="h-4 w-4 accent-amber-500"
          />
          {field.label}
        </label>
      );
      break;

    case "number":
      control = (
        <input
          id={id}
          type="number"
          className={inputClass}
          value={raw === undefined || raw === null ? "" : String(raw)}
          placeholder={field.placeholder}
          step="any"
          onChange={(e) => {
            const v = e.target.value;
            set(v === "" ? undefined : Number(v));
          }}
        />
      );
      break;

    case "textarea":
      control = (
        <textarea
          id={id}
          rows={4}
          className={inputClass}
          value={typeof raw === "string" ? raw : ""}
          placeholder={field.placeholder}
          onChange={(e) => set(e.target.value === "" ? undefined : e.target.value)}
        />
      );
      break;

    case "select":
      control = (
        <select
          id={id}
          className={inputClass}
          value={typeof raw === "string" ? raw : ""}
          onChange={(e) => set(e.target.value === "" ? undefined : e.target.value)}
        >
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
      break;

    case "tags": {
      const list = Array.isArray(raw) ? raw : [];
      control = (
        <input
          id={id}
          type="text"
          className={inputClass}
          value={list.join(", ")}
          placeholder={field.placeholder ?? "쉼표로 구분"}
          onChange={(e) => {
            const parts = e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            set(parts.length ? parts : undefined);
          }}
        />
      );
      break;
    }

    case "json": {
      const text = raw === undefined ? "" : JSON.stringify(raw, null, 2);
      control = (
        <textarea
          id={id}
          rows={5}
          className={`${inputClass} font-mono text-xs`}
          defaultValue={text}
          placeholder={field.placeholder}
          onBlur={(e) => {
            const v = e.target.value.trim();
            if (v === "") return set(undefined);
            try {
              set(JSON.parse(v));
              e.target.setCustomValidity("");
            } catch {
              e.target.setCustomValidity("JSON 형식이 올바르지 않습니다.");
              e.target.reportValidity();
            }
          }}
        />
      );
      break;
    }

    default:
      control = (
        <input
          id={id}
          type="text"
          className={inputClass}
          value={typeof raw === "string" ? raw : raw === undefined ? "" : String(raw)}
          placeholder={field.placeholder}
          onChange={(e) => set(e.target.value === "" ? undefined : e.target.value)}
        />
      );
  }

  return (
    <div className={field.wide ? "sm:col-span-2" : ""}>
      {field.type !== "boolean" && (
        <label htmlFor={id} className="mb-1 block text-xs font-medium text-zinc-400">
          {field.label}
        </label>
      )}
      {control}
      {field.help && <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">{field.help}</p>}
    </div>
  );
}
