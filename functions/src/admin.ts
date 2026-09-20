import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { timingSafeEqual, createHash } from "node:crypto";

if (!getApps().length) initializeApp();

/**
 * 관리자 PIN. 운영 값은 functions/.env 의 ADMIN_PIN 으로 주입한다.
 * PIN 자체는 짧기 때문에 아래 레이트리밋이 실질적인 방어선이다.
 */
const FALLBACK_PIN = "0070";

const CORS_ORIGINS = [
  "https://olbarogalbi.com",
  "https://www.olbarogalbi.com",
  "https://olbarogalbi.kr",
  "https://www.olbarogalbi.kr",
  "https://olbarogalbi.web.app",
  "https://olbarogalbi.firebaseapp.com",
  "http://localhost:5173",
];

/** 관리자 세션 uid — 단일 운영자 계정 */
const ADMIN_UID = "site-admin";

/** 실패 허용 횟수와 관찰 구간 */
const MAX_FAILS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function constantTimeEquals(a: string, b: string): boolean {
  // 길이가 달라도 길이 자체를 흘리지 않도록 해시 비교로 고정 길이를 만든다.
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

function clientIpHash(req: { rawRequest: { headers: Record<string, unknown>; ip?: string } }): string {
  const xff = req.rawRequest.headers["x-forwarded-for"];
  const ip =
    (typeof xff === "string" ? xff.split(",")[0]?.trim() : undefined) ??
    req.rawRequest.ip ??
    "unknown";
  return createHash("sha256").update(ip).digest("base64url").slice(0, 32);
}

/**
 * PIN을 검증하고 admin 클레임이 담긴 custom token을 발급한다.
 * Firestore 쓰기 권한은 오직 이 토큰을 통해서만 생긴다 (firestore.rules 참조).
 */
export const adminLogin = onCall(
  {
    region: "asia-northeast3",
    enforceAppCheck: false,
    cors: CORS_ORIGINS,
    maxInstances: 5,
  },
  async (req) => {
    const pin = typeof req.data?.pin === "string" ? req.data.pin.trim() : "";
    if (!pin) {
      throw new HttpsError("invalid-argument", "PIN을 입력해 주세요.");
    }

    const db = getFirestore();
    const ipHash = clientIpHash(req as never);
    const rlRef = db.doc(`rate_limits/admin_${ipHash}`);

    // 잠금 여부를 먼저 확인한다 (실패 누적 시 차단)
    const now = Date.now();
    const rlSnap = await rlRef.get();
    const fails: number[] = (rlSnap.data()?.fails ?? []).filter(
      (t: number) => t > now - WINDOW_MS
    );
    if (fails.length >= MAX_FAILS) {
      const waitMin = Math.ceil((fails[0] + WINDOW_MS - now) / 60000);
      throw new HttpsError(
        "resource-exhausted",
        `로그인 시도가 너무 많습니다. ${waitMin}분 후 다시 시도해 주세요.`
      );
    }

    const expected = process.env.ADMIN_PIN?.trim() || FALLBACK_PIN;
    if (!constantTimeEquals(pin, expected)) {
      fails.push(now);
      await rlRef.set(
        { fails, updatedAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
      const left = MAX_FAILS - fails.length;
      throw new HttpsError(
        "permission-denied",
        left > 0
          ? `PIN이 올바르지 않습니다. (남은 시도 ${left}회)`
          : "PIN이 올바르지 않습니다. 10분간 로그인이 제한됩니다."
      );
    }

    // 성공 — 실패 기록 초기화
    await rlRef.set({ fails: [], updatedAt: FieldValue.serverTimestamp() }, { merge: true });

    let token: string;
    try {
      token = await getAuth().createCustomToken(ADMIN_UID, { admin: true });
    } catch (e) {
      console.error("adminLogin.createCustomToken failed", e);
      throw new HttpsError(
        "internal",
        "관리자 토큰 발급에 실패했습니다. 서비스 계정에 'Service Account Token Creator' 권한이 필요합니다."
      );
    }

    console.log("admin.login.success", { ipHash });
    return { token };
  }
);

/**
 * 콘텐츠 저장 시 직전 버전을 이력으로 남긴다.
 * 클라이언트는 site_content 에 직접 쓰고, 이 함수는 되돌리기용 스냅샷 보관만 담당한다.
 */
export const snapshotContent = onCall(
  {
    region: "asia-northeast3",
    enforceAppCheck: false,
    cors: CORS_ORIGINS,
    maxInstances: 5,
  },
  async (req) => {
    if (req.auth?.token?.admin !== true) {
      throw new HttpsError("permission-denied", "관리자만 사용할 수 있습니다.");
    }
    const docId = typeof req.data?.docId === "string" ? req.data.docId : "";
    const payload = req.data?.payload;
    if (!docId || typeof payload !== "object" || payload === null) {
      throw new HttpsError("invalid-argument", "docId와 payload가 필요합니다.");
    }

    const db = getFirestore();
    await db.collection("site_content_history").add({
      docId,
      payload,
      createdAt: FieldValue.serverTimestamp(),
      expireAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });
    return { ok: true as const };
  }
);
