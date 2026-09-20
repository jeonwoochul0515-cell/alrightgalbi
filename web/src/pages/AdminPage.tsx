import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { httpsCallable } from "firebase/functions";
import { functions } from "../lib/firebase";
import { useAdminAuth } from "../admin/useAdminAuth";
import { AdminLogin } from "../admin/AdminLogin";
import { SectionEditor } from "../admin/SectionEditor";
import { InquiriesPanel } from "../admin/InquiriesPanel";
import { useContent } from "../content/context";
import { saveSection } from "../content/repository";
import {
  CONTENT_SECTIONS,
  SECTION_LABELS,
  type SectionId,
  type SiteContent,
} from "../content/types";

const callSnapshot = httpsCallable<{ docId: string; payload: unknown }, { ok: true }>(
  functions,
  "snapshotContent"
);

type Tab = SectionId | "inquiries";

const TABS: { id: Tab; label: string }[] = [
  ...(Object.keys(CONTENT_SECTIONS) as SectionId[]).map((id) => ({
    id: id as Tab,
    label: SECTION_LABELS[id],
  })),
  { id: "inquiries", label: "가맹 문의" },
];

const eq = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** SiteContent 를 키 순회 가능한 형태로 다룬다 (섹션 정의가 키를 보증한다). */
const asRecord = (value: SiteContent) => value as unknown as Record<string, unknown>;

/** ContentValue(파생값 포함)에서 저장 대상 원본 필드만 뽑아낸다. */
function extractSiteContent(source: Record<string, unknown>): SiteContent {
  const out: Record<string, unknown> = {};
  for (const keys of Object.values(CONTENT_SECTIONS)) {
    for (const key of keys) out[key] = source[key];
  }
  return out as unknown as SiteContent;
}

export function AdminPage() {
  const { status, error, busy, login, logout } = useAdminAuth();

  const body =
    status === "checking" ? (
      <div className="flex min-h-dvh items-center justify-center bg-zinc-950 text-sm text-zinc-500">
        확인 중…
      </div>
    ) : status === "admin" ? (
      <AdminShell onLogout={logout} />
    ) : (
      <AdminLogin onSubmit={login} error={error} busy={busy} />
    );

  return (
    <>
      <Helmet>
        <title>올바로갈비 관리자</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {body}
    </>
  );
}

function AdminShell({ onLogout }: { onLogout: () => void }) {
  const live = useContent();
  const server = useMemo(
    () => extractSiteContent(live as unknown as Record<string, unknown>),
    [live]
  );

  const [draft, setDraft] = useState<SiteContent>(server);
  const [tab, setTab] = useState<Tab>("settings");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const lastServer = useRef(server);

  // 서버 값이 바뀌면, 아직 손대지 않은 섹션만 최신으로 따라간다.
  useEffect(() => {
    setDraft((prev) => {
      let next = prev;
      for (const sectionId of Object.keys(CONTENT_SECTIONS) as SectionId[]) {
        const keys = CONTENT_SECTIONS[sectionId];
        const untouched = keys.every((k) => eq(prev[k], lastServer.current[k]));
        if (!untouched) continue;
        if (next === prev) next = { ...prev };
        for (const k of keys) asRecord(next)[k] = asRecord(server)[k];
      }
      return next;
    });
    lastServer.current = server;
  }, [server]);

  const patch = useCallback((changes: Partial<SiteContent>) => {
    setDraft((prev) => ({ ...prev, ...changes }));
  }, []);

  const isDirty = useCallback(
    (sectionId: SectionId) =>
      !CONTENT_SECTIONS[sectionId].every((k) => eq(draft[k], server[k])),
    [draft, server]
  );

  const dirtySections = (Object.keys(CONTENT_SECTIONS) as SectionId[]).filter(isDirty);

  const save = async (sectionId: SectionId) => {
    setSaving(true);
    setToast(null);
    try {
      // 되돌리기용으로 직전 버전을 먼저 보관한다 (실패해도 저장은 진행).
      const before: Record<string, unknown> = {};
      for (const k of CONTENT_SECTIONS[sectionId]) before[k] = server[k];
      await callSnapshot({ docId: sectionId, payload: before }).catch(() => undefined);

      await saveSection(sectionId, draft);
      setToast(`'${SECTION_LABELS[sectionId]}' 저장 완료 — 사이트에 바로 반영됐습니다.`);
    } catch (e) {
      setToast(`저장 실패: ${(e as Error).message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const revert = (sectionId: SectionId) => {
    if (!window.confirm("저장하지 않은 변경 내용을 모두 되돌릴까요?")) return;
    setDraft((prev) => {
      const next = { ...prev };
      for (const k of CONTENT_SECTIONS[sectionId]) asRecord(next)[k] = asRecord(server)[k];
      return next;
    });
  };

  // 저장하지 않은 변경이 있으면 이탈을 막는다.
  useEffect(() => {
    if (dirtySections.length === 0) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirtySections.length]);

  const activeSection = tab === "inquiries" ? null : (tab as SectionId);

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <span className="text-sm font-semibold tracking-tight">올바로갈비 관리자</span>
          {live.settings.maintenance && (
            <span className="rounded bg-amber-900/50 px-2 py-0.5 text-[11px] text-amber-300">
              리뉴얼 모드 — 방문자에게 안내 화면만 보임
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-xs text-zinc-400 hover:text-white"
          >
            사이트 보기 ↗
          </a>
          <button onClick={onLogout} className="text-xs text-zinc-400 hover:text-white">
            로그아웃
          </button>
        </div>

        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-2">
          {TABS.map((t) => {
            const dirty = t.id !== "inquiries" && isDirty(t.id as SectionId);
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded px-3 py-1.5 text-xs transition ${
                  tab === t.id
                    ? "bg-amber-600 font-medium text-zinc-950"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                }`}
              >
                {t.label}
                {dirty && <span className="ml-1 text-amber-400">●</span>}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {activeSection ? (
          <>
            <SectionEditor section={activeSection} draft={draft} patch={patch} />

            <div className="sticky bottom-0 -mx-4 mt-8 border-t border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500">
                  {isDirty(activeSection)
                    ? "저장하지 않은 변경이 있습니다."
                    : "모든 변경이 저장되었습니다."}
                </span>
                <button
                  onClick={() => revert(activeSection)}
                  disabled={!isDirty(activeSection) || saving}
                  className="ml-auto rounded border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-zinc-500 disabled:opacity-30"
                >
                  되돌리기
                </button>
                <button
                  onClick={() => void save(activeSection)}
                  disabled={!isDirty(activeSection) || saving}
                  className="rounded bg-amber-600 px-4 py-1.5 text-xs font-medium text-zinc-950 transition hover:bg-amber-500 disabled:opacity-30"
                >
                  {saving ? "저장 중…" : "저장"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <InquiriesPanel />
        )}
      </main>

      {toast && (
        <div className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs text-zinc-100 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
