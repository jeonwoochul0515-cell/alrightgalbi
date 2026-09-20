import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ContentContext, derive } from "./context";
import { subscribeContent } from "./repository";
import { seedContent } from "./seed";
import type { SiteContent } from "./types";

/**
 * 사이트 콘텐츠 공급자.
 * seed 로 즉시 렌더한 뒤 Firestore 값이 도착하면 교체한다 — 첫 페인트가 네트워크를 기다리지 않는다.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(seedContent);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeContent(
      (next, at) => {
        setContent(next);
        setUpdatedAt(at);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, []);

  const value = useMemo(
    () => ({ ...derive(content), loading, updatedAt }),
    [content, loading, updatedAt]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
