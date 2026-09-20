import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * 검색엔진·링크 미리보기가 읽는 정적 HTML 갱신(재배포) 상태.
 *
 * 관리자가 요청을 남기면 GitHub Actions 가 이를 감지해 사이트를 다시 빌드·배포하고
 * 결과를 같은 문서에 기록한다. 실제 배포 권한은 Actions 쪽 서비스 계정에만 있다.
 */
export type PublishStatus = "idle" | "requested" | "building" | "done" | "failed";

export interface PublishState {
  status: PublishStatus;
  requestedAt?: Timestamp;
  startedAt?: Timestamp;
  publishedAt?: Timestamp;
  runUrl?: string;
  error?: string;
}

const STATE_DOC = "site_publish/state";

export function subscribePublishState(
  onChange: (state: PublishState) => void
): () => void {
  return onSnapshot(
    doc(db, STATE_DOC),
    (snap) => onChange((snap.data() as PublishState | undefined) ?? { status: "idle" }),
    () => onChange({ status: "idle" })
  );
}

/** 재배포를 요청한다. 실제 배포는 Actions 가 수행한다. */
export async function requestPublish(): Promise<void> {
  await setDoc(
    doc(db, STATE_DOC),
    {
      status: "requested",
      requestedAt: serverTimestamp(),
      error: null,
      runUrl: null,
    },
    { merge: true }
  );
}

/** 마지막 배포 이후 콘텐츠가 바뀌었는지 — 배포 필요 여부 판단용 */
export function needsPublish(
  state: PublishState,
  contentUpdatedAt: Date | null
): boolean {
  if (state.status === "requested" || state.status === "building") return false;
  if (!contentUpdatedAt) return false;
  const published = state.publishedAt?.toDate?.();
  if (!published) return true;
  return contentUpdatedAt.getTime() > published.getTime();
}
