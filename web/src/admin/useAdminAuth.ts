import { useCallback, useEffect, useState } from "react";
import { signInWithCustomToken, signOut, onIdTokenChanged } from "firebase/auth";
import { httpsCallable, type FunctionsError } from "firebase/functions";
import { functions } from "../lib/firebase";
import { auth } from "./auth";

export type AdminAuthStatus = "checking" | "signedOut" | "admin";

const callAdminLogin = httpsCallable<{ pin: string }, { token: string }>(
  functions,
  "adminLogin"
);

/**
 * PIN 기반 관리자 세션.
 * PIN 검증은 서버(adminLogin)에서만 이뤄지고, 클라이언트는 발급받은 custom token 으로
 * Firebase Auth 세션을 연다. Firestore 쓰기 권한은 이 토큰의 admin 클레임에서 나온다.
 */
export function useAdminAuth() {
  const [status, setStatus] = useState<AdminAuthStatus>("checking");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setStatus("signedOut");
        return;
      }
      const result = await user.getIdTokenResult();
      setStatus(result.claims.admin === true ? "admin" : "signedOut");
    });
  }, []);

  const login = useCallback(async (pin: string) => {
    setBusy(true);
    setError(null);
    try {
      const { data } = await callAdminLogin({ pin });
      await signInWithCustomToken(auth, data.token);
      // onIdTokenChanged 가 상태를 admin 으로 올린다.
    } catch (e) {
      const fe = e as FunctionsError;
      setError(fe?.message ?? "로그인에 실패했습니다.");
      setStatus("signedOut");
    } finally {
      setBusy(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setStatus("signedOut");
  }, []);

  return { status, error, busy, login, logout };
}
