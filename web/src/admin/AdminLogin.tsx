import { useState, type FormEvent } from "react";

export interface AdminLoginProps {
  onSubmit: (pin: string) => void;
  error: string | null;
  busy: boolean;
}

export function AdminLogin({ onSubmit, error, busy }: AdminLoginProps) {
  const [pin, setPin] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!pin.trim() || busy) return;
    onSubmit(pin.trim());
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-zinc-950 px-6">
      <form onSubmit={submit} className="w-full max-w-xs">
        <h1 className="mb-1 text-center text-lg font-semibold tracking-tight text-zinc-100">
          올바로갈비 관리자
        </h1>
        <p className="mb-6 text-center text-xs text-zinc-500">PIN을 입력하세요</p>

        <input
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-3 text-center text-lg tracking-[0.4em] text-zinc-100 placeholder:tracking-[0.4em] placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
        />

        {error && (
          <p className="mt-3 rounded border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs leading-relaxed text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !pin.trim()}
          className="mt-4 w-full rounded-md bg-amber-600 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-amber-500 disabled:opacity-40"
        >
          {busy ? "확인 중…" : "로그인"}
        </button>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-600">
          5회 틀리면 10분간 잠깁니다.
          <br />
          탭을 닫으면 자동으로 로그아웃됩니다.
        </p>
      </form>
    </div>
  );
}
