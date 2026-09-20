import { useEffect, useState } from "react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

interface Inquiry {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  regionSido?: string;
  regionGu?: string;
  budget?: string;
  experience?: string | null;
  message?: string;
  status?: string;
  memo?: string;
  createdAt?: Timestamp;
}

const STATUSES = [
  { value: "new", label: "신규" },
  { value: "contacted", label: "연락함" },
  { value: "meeting", label: "상담중" },
  { value: "done", label: "계약" },
  { value: "dropped", label: "보류" },
];

function formatDate(ts?: Timestamp): string {
  if (!ts?.toDate) return "-";
  return ts.toDate().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function InquiriesPanel() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"), limit(200));
    return onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Inquiry, "id">) })));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  const setStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "inquiries", id), { status, updatedAt: serverTimestamp() });
  };

  if (loading) return <p className="text-sm text-zinc-500">불러오는 중…</p>;
  if (error)
    return (
      <p className="rounded border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-300">
        문의를 불러오지 못했습니다: {error}
      </p>
    );
  if (items.length === 0)
    return (
      <p className="rounded border border-dashed border-zinc-700 px-4 py-8 text-center text-sm text-zinc-500">
        접수된 가맹 문의가 없습니다.
      </p>
    );

  return (
    <div className="space-y-2">
      <p className="text-xs text-zinc-500">
        최근 {items.length}건 · 문의는 접수 90일 후 자동 삭제됩니다.
      </p>
      {items.map((it) => (
        <div key={it.id} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm font-medium text-zinc-100">{it.name ?? "-"}</span>
            <a href={`tel:${it.phone ?? ""}`} className="text-sm text-amber-400 hover:underline">
              {it.phone ?? "-"}
            </a>
            <span className="text-xs text-zinc-500">
              {it.regionSido} {it.regionGu}
            </span>
            <span className="text-xs text-zinc-500">예산 {it.budget ?? "-"}</span>
            <span className="ml-auto text-[11px] text-zinc-600">{formatDate(it.createdAt)}</span>
          </div>

          {it.message && (
            <p className="mt-2 whitespace-pre-wrap rounded bg-zinc-950/60 px-2 py-1.5 text-xs leading-relaxed text-zinc-400">
              {it.message}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {it.email && <span className="text-xs text-zinc-500">{it.email}</span>}
            <select
              value={it.status ?? "new"}
              onChange={(e) => void setStatus(it.id, e.target.value)}
              className="ml-auto rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
