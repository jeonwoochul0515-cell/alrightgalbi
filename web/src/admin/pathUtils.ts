/** 점 표기 경로로 중첩 객체를 읽고 쓴다 (불변). 예: "hours.open" */

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

export function setPath<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown
): T {
  const [head, ...rest] = path.split(".");
  if (rest.length === 0) {
    // 빈 값은 필드 자체를 제거한다 — Firestore 가 undefined 를 거부하기 때문.
    if (value === undefined) {
      const next = { ...obj };
      delete next[head];
      return next;
    }
    return { ...obj, [head]: value };
  }
  const child = (obj[head] ?? {}) as Record<string, unknown>;
  const nextChild = setPath(child, rest.join("."), value);
  // 중첩 객체가 완전히 비면 부모에서도 걷어낸다.
  if (Object.keys(nextChild).length === 0) {
    const next = { ...obj };
    delete next[head];
    return next;
  }
  return { ...obj, [head]: nextChild };
}

/** 목록 항목을 위아래로 이동 */
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [picked] = next.splice(from, 1);
  next.splice(to, 0, picked);
  return next;
}
