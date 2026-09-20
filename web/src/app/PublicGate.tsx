import { RootLayout } from "../components/templates/RootLayout";
import { MaintenancePage } from "../pages/MaintenancePage";
import { useContent } from "../content/context";

/**
 * 공개 라우트 게이트.
 * 리뉴얼 모드가 켜져 있으면 Outlet 대신 안내 화면을 렌더해 하위 라우트를 통째로 가린다.
 * 스위치는 /admin → 사이트 설정에서 켜고 끈다.
 */
export function PublicGate() {
  const { settings, loading } = useContent();

  // 설정을 받기 전에 렌더하면 공개/비공개가 한 번 깜빡인다. 배경만 깔고 기다린다.
  if (loading) {
    return <div className="min-h-dvh bg-[var(--color-bg)]" aria-hidden="true" />;
  }
  if (settings.maintenance) return <MaintenancePage />;
  return <RootLayout />;
}
