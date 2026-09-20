import { useEffect, useState } from "react";
import {
  requestPublish,
  subscribePublishState,
  needsPublish,
  type PublishState,
} from "../content/publish";
import { useContent } from "../content/context";

function formatTime(d?: Date): string {
  if (!d) return "-";
  return d.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TONE: Record<string, string> = {
  requested: "border-amber-700/60 bg-amber-950/30 text-amber-200",
  building: "border-amber-700/60 bg-amber-950/30 text-amber-200",
  failed: "border-red-900/60 bg-red-950/40 text-red-300",
  stale: "border-amber-700/60 bg-amber-950/30 text-amber-200",
  done: "border-zinc-800 bg-zinc-900/40 text-zinc-400",
};

/**
 * 검색엔진·카카오톡 미리보기가 읽는 정적 HTML 갱신 패널.
 *
 * 방문자 화면은 저장 즉시 바뀌지만, 봇이 받아가는 HTML 은 빌드 시점에 고정된다.
 * 여기서 재배포를 요청하면 GitHub Actions 가 최신 콘텐츠로 사이트를 다시 만들어 올린다.
 */
export function PublishPanel() {
  const { updatedAt } = useContent();
  const [state, setState] = useState<PublishState>({ status: "idle" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => subscribePublishState(setState), []);

  const inProgress = state.status === "requested" || state.status === "building";
  const stale = needsPublish(state, updatedAt);

  const request = async () => {
    setBusy(true);
    setError(null);
    try {
      await requestPublish();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const tone = inProgress
    ? TONE.building
    : state.status === "failed"
      ? TONE.failed
      : stale
        ? TONE.stale
        : TONE.done;

  let message: string;
  if (state.status === "building") message = "검색엔진용 페이지를 다시 만드는 중입니다…";
  else if (state.status === "requested") message = "요청 접수됨 — 곧 시작합니다.";
  else if (state.status === "failed")
    message = `마지막 반영이 실패했습니다: ${state.error ?? "원인 미상"}`;
  else if (stale) message = "저장한 내용이 아직 검색엔진에 반영되지 않았습니다.";
  else message = "검색엔진에도 최신 내용이 반영돼 있습니다.";

  return (
    <section className={`mb-8 rounded-lg border px-4 py-3 ${tone}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold">검색엔진·카톡 미리보기 반영</h3>
          <p className="mt-0.5 text-xs leading-relaxed">{message}</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            마지막 콘텐츠 저장 {formatTime(updatedAt ?? undefined)} · 마지막 반영{" "}
            {formatTime(state.publishedAt?.toDate?.())}
            {state.runUrl && (
              <>
                {" · "}
                <a
                  href={state.runUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-zinc-300"
                >
                  진행 기록 ↗
                </a>
              </>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void request()}
          disabled={busy || inProgress}
          className="shrink-0 rounded bg-amber-600 px-4 py-2 text-xs font-medium text-zinc-950 transition hover:bg-amber-500 disabled:opacity-40"
        >
          {inProgress ? "반영 중…" : busy ? "요청 중…" : "지금 반영하기"}
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-300">요청 실패: {error}</p>}

      <p className="mt-2 border-t border-white/5 pt-2 text-[11px] leading-relaxed text-zinc-500">
        방문자가 보는 화면은 저장 즉시 바뀝니다. 이 버튼은 구글·네이버 검색 결과와 카카오톡
        링크 미리보기에 쓰이는 페이지를 다시 만드는 것이라 몇 분 걸립니다.
      </p>
    </section>
  );
}
