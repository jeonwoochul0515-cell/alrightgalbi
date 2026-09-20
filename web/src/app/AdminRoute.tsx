import { lazy, Suspense } from "react";

// 관리자 화면은 방문자가 받을 이유가 없다 — /admin 에 들어올 때만 받아온다.
const AdminPage = lazy(() =>
  import("../pages/AdminPage").then((m) => ({ default: m.AdminPage }))
);

export function AdminRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-zinc-950 text-sm text-zinc-500">
          불러오는 중…
        </div>
      }
    >
      <AdminPage />
    </Suspense>
  );
}
