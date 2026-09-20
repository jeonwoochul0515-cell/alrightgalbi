import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { seedContent, defaultSettings } from "./seed";
import { CONTENT_SECTIONS, type SectionId, type SiteContent } from "./types";

const COLLECTION = "site_content";

/** Firestore 는 undefined 필드를 거부한다. 선택 필드가 비어 있을 때를 대비해 걷어낸다. */
export function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((v) => stripUndefined(v)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue;
      out[k] = stripUndefined(v);
    }
    return out as T;
  }
  return value;
}

type RawDoc = { id: string; data: Record<string, unknown> };

/** 가장 최근에 저장된 섹션의 시각 — 재배포가 필요한지 판단하는 데 쓰인다. */
function latestUpdatedAt(docs: RawDoc[]): Date | null {
  let latest: Date | null = null;
  for (const d of docs) {
    const ts = d.data.updatedAt as { toDate?: () => Date } | undefined;
    const at = ts?.toDate?.();
    if (at && (!latest || at > latest)) latest = at;
  }
  return latest;
}

/** seed 위에 Firestore 문서를 얇게 덮어쓴다. settings 만 기본값과 깊게 병합한다. */
function merge(docs: RawDoc[]): SiteContent {
  const out: SiteContent = { ...seedContent };
  for (const d of docs) {
    const keys = CONTENT_SECTIONS[d.id as SectionId];
    if (!keys) continue;
    for (const key of keys) {
      const value = d.data[key];
      if (value === undefined || value === null) continue;
      if (key === "settings") {
        out.settings = { ...defaultSettings, ...(value as object) };
      } else {
        (out as unknown as Record<string, unknown>)[key] = value;
      }
    }
  }
  return out;
}

/** 콘텐츠 전체를 실시간 구독한다. 실패해도 seed 로 사이트는 정상 동작한다. */
export function subscribeContent(
  onChange: (content: SiteContent, updatedAt: Date | null) => void,
  onError?: (error: unknown) => void
): () => void {
  return onSnapshot(
    collection(db, COLLECTION),
    (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, data: d.data() }));
      onChange(merge(docs), latestUpdatedAt(docs));
    },
    (err) => {
      console.warn("site_content 구독 실패 — 기본 콘텐츠로 표시합니다.", err);
      onError?.(err);
    }
  );
}

/** 1회성 조회 (구독이 필요 없는 곳용) */
export async function fetchContent(): Promise<SiteContent> {
  const snap = await getDocs(collection(db, COLLECTION));
  return merge(snap.docs.map((d) => ({ id: d.id, data: d.data() })));
}

/** 섹션 단위 저장 — 관리자 토큰이 있어야 규칙을 통과한다. */
export async function saveSection(
  section: SectionId,
  content: SiteContent
): Promise<void> {
  const payload: Record<string, unknown> = {};
  for (const key of CONTENT_SECTIONS[section]) {
    payload[key] = stripUndefined(content[key]);
  }
  await setDoc(doc(db, COLLECTION, section), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}
