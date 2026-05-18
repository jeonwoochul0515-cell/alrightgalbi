import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { inquirySchema } from "./schema.js";
if (!getApps().length)
    initializeApp();
export const submitInquiry = onCall({
    region: "asia-northeast3",
    enforceAppCheck: false,
    cors: [
        "https://olbarogalbi.kr",
        "https://www.olbarogalbi.kr",
        "https://olbarogalbi.web.app",
        "https://olbarogalbi.firebaseapp.com",
        "http://localhost:5173",
    ],
    maxInstances: 10,
}, async (req) => {
    const parsed = inquirySchema.safeParse(req.data);
    if (!parsed.success) {
        throw new HttpsError("invalid-argument", "입력값이 올바르지 않습니다.");
    }
    const d = parsed.data;
    // Honeypot
    if (d.website && d.website.length > 0) {
        throw new HttpsError("permission-denied", "스팸으로 판단되어 차단되었습니다.");
    }
    // 시간차 검증 — 10초 미만 차단
    if (Date.now() - d.renderedAt < 10_000) {
        throw new HttpsError("permission-denied", "제출이 너무 빠릅니다. 잠시 후 다시 시도해 주세요.");
    }
    // IP rate limit — 1시간 5건
    const xff = req.rawRequest.headers["x-forwarded-for"];
    const ip = (typeof xff === "string" ? xff.split(",")[0]?.trim() : undefined) ??
        req.rawRequest.ip ??
        "unknown";
    const ipHash = Buffer.from(ip).toString("base64url");
    const db = getFirestore();
    const rlRef = db.doc(`rate_limits/${ipHash}`);
    await db.runTransaction(async (tx) => {
        const snap = await tx.get(rlRef);
        const now = Date.now();
        const windowStart = now - 60 * 60 * 1000;
        const hits = (snap.data()?.hits ?? []).filter((t) => t > windowStart);
        if (hits.length >= 5) {
            throw new HttpsError("resource-exhausted", "요청이 너무 많습니다. 잠시 후 다시 시도하거나 010-9342-4929로 직접 연락해 주세요.");
        }
        hits.push(now);
        tx.set(rlRef, { hits, updatedAt: FieldValue.serverTimestamp() });
    });
    // Save inquiry
    const docRef = await db.collection("inquiries").add({
        name: d.name,
        phone: d.phone,
        email: d.email,
        regionSido: d.regionSido,
        regionGu: d.regionGu,
        budget: d.budget,
        experience: d.experience ?? null,
        message: d.message ?? "",
        consentMarketing: d.consentMarketing ?? false,
        ipHash,
        userAgent: req.rawRequest.headers["user-agent"] ?? null,
        createdAt: FieldValue.serverTimestamp(),
        status: "new",
        // 90일 자동 삭제 (TTL 정책)
        expireAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
    // Masked log
    console.log("inquiry.created", {
        id: docRef.id,
        name: d.name[0] + "*".repeat(Math.max(0, d.name.length - 1)),
        phone: d.phone.replace(/\d{4}(?=-?\d{4}$)/, "****"),
        region: `${d.regionSido} ${d.regionGu}`,
        budget: d.budget,
    });
    // TODO: SMTP 메일 발송 — Naver SMTP 자격증명 도착 시 활성화
    // (Secret Manager에 SMTP_USER, SMTP_PASSWORD 등록 후)
    return { ok: true, id: docRef.id };
});
//# sourceMappingURL=inquiry.js.map