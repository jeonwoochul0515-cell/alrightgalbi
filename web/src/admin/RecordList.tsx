import { useState } from "react";
import type { RecordSchema } from "./fields";
import { FieldInput } from "./FieldInput";
import { getPath, setPath, moveItem } from "./pathUtils";

type Item = Record<string, unknown>;

export interface RecordListProps {
  schema: RecordSchema;
  items: Item[];
  onChange: (items: Item[]) => void;
  addLabel?: string;
  emptyLabel?: string;
}

const btn =
  "rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-white disabled:opacity-30 disabled:hover:border-zinc-700";

export function RecordList({
  schema,
  items,
  onChange,
  addLabel = "항목 추가",
  emptyLabel = "등록된 항목이 없습니다.",
}: RecordListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const update = (index: number, path: string, value: unknown) => {
    const next = [...items];
    next[index] = setPath(next[index], path, value);
    onChange(next);
  };

  const remove = (index: number) => {
    const title = String(getPath(items[index], schema.titlePath) ?? "이 항목");
    if (!window.confirm(`'${title}' 을(를) 삭제할까요? 저장을 눌러야 실제로 반영됩니다.`)) return;
    onChange(items.filter((_, i) => i !== index));
    setOpenIndex(null);
  };

  const duplicate = (index: number) => {
    const copy = structuredClone(items[index]);
    if (typeof copy.id === "string") copy.id = `${copy.id}-copy`;
    const next = [...items];
    next.splice(index + 1, 0, copy);
    onChange(next);
    setOpenIndex(index + 1);
  };

  const move = (index: number, delta: number) => {
    onChange(moveItem(items, index, index + delta));
    setOpenIndex(index + delta);
  };

  const add = () => {
    onChange([...items, schema.blank()]);
    setOpenIndex(items.length);
  };

  return (
    <div className="space-y-2">
      {items.length === 0 && (
        <p className="rounded border border-dashed border-zinc-700 px-4 py-6 text-center text-sm text-zinc-500">
          {emptyLabel}
        </p>
      )}

      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const title = String(getPath(item, schema.titlePath) ?? "") || "(제목 없음)";
        const subtitle = schema.subtitlePath
          ? String(getPath(item, schema.subtitlePath) ?? "")
          : "";

        return (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40"
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
              >
                <span className="text-zinc-600 tabular-nums text-xs">{index + 1}</span>
                <span className="truncate text-sm font-medium text-zinc-100">{title}</span>
                {subtitle && (
                  <span className="truncate text-xs text-zinc-500">· {subtitle}</span>
                )}
                <span className="ml-auto shrink-0 text-xs text-zinc-600">
                  {isOpen ? "접기" : "펼치기"}
                </span>
              </button>
            </div>

            {isOpen && (
              <div className="border-t border-zinc-800 px-3 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {schema.fields.map((field) => (
                    <FieldInput
                      key={field.path}
                      field={field}
                      record={item}
                      onChange={(path, value) => update(index, path, value)}
                    />
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-800 pt-3">
                  <button type="button" className={btn} disabled={index === 0} onClick={() => move(index, -1)}>
                    ↑ 위로
                  </button>
                  <button
                    type="button"
                    className={btn}
                    disabled={index === items.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    ↓ 아래로
                  </button>
                  <button type="button" className={btn} onClick={() => duplicate(index)}>
                    복제
                  </button>
                  <button
                    type="button"
                    className="ml-auto rounded border border-red-900/60 px-2 py-1 text-xs text-red-400 transition hover:border-red-500 hover:text-red-300"
                    onClick={() => remove(index)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={add}
        className="w-full rounded-lg border border-dashed border-zinc-700 py-2.5 text-sm text-zinc-400 transition hover:border-amber-600 hover:text-amber-400"
      >
        + {addLabel}
      </button>
    </div>
  );
}
