// Firebase Auth 는 관리자 화면에서만 쓴다. 여기서만 import 해서
// 일반 방문자 번들에 auth SDK 가 섞여 들어가지 않게 한다.
import {
  getAuth,
  connectAuthEmulator,
  browserSessionPersistence,
  setPersistence,
  type Auth,
} from "firebase/auth";
import { app } from "../lib/firebase";

export const auth: Auth = getAuth(app);

if (typeof window !== "undefined") {
  // 탭을 닫으면 로그아웃된다 — 4자리 PIN 으로 영속 세션을 두지 않는다.
  void setPersistence(auth, browserSessionPersistence);
  if (import.meta.env.DEV) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  }
}
