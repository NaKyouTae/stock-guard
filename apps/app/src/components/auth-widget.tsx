'use client';

import { useEffect, useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:18070';

type AuthUser = {
  id: string;
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
};

export function AuthWidget() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/token', { cache: 'no-store' });
      const data = await res.json();
      setUser(data.authenticated ? (data.user ?? null) : null);
    } catch {
      /* 네트워크 실패 — 무시 */
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // 팝업 열렸을 때 배경 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    setUser(null);
  }

  // 로딩 중엔 자리만 확보 (레이아웃 시프트 방지)
  if (!loaded) {
    return <div className="h-9 w-[72px] rounded-xl bg-surface" aria-hidden />;
  }

  if (user) {
    const label = user.nickname || user.email || '내 계정';
    return (
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-medium">
          {user.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.profileImage}
              alt=""
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white"
            >
              {label.slice(0, 1)}
            </span>
          )}
          <span className="max-w-[96px] truncate">{label}</span>
        </span>
        <button
          type="button"
          onClick={logout}
          className="rounded-xl bg-surface px-3 py-2 text-sm font-medium text-muted transition-transform active:scale-[0.97]"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-[0.97]"
      >
        로그인
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="로그인"
        >
          <div
            className="w-full max-w-[360px] rounded-3xl bg-background p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl">🛡️</span>
              <h2 className="mt-3 text-lg font-bold">Stock Guard 시작하기</h2>
              <p className="mt-1 text-center text-sm leading-relaxed text-muted">
                로그인하고 내 자산을 한곳에서
                <br />
                안전하게 관리해 보세요.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  window.location.href = `${API_URL}/api/auth/kakao`;
                }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition-transform active:scale-[0.99]"
                style={{ backgroundColor: '#FEE500', color: '#191919' }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#191919"
                  aria-hidden="true"
                >
                  <path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.3 4.8 6.7-.2.7-.7 2.7-.8 3.1-.1.5.2.5.4.4.2-.1 2.7-1.8 3.7-2.5.6.1 1.2.1 1.9.1 5.5 0 10-3.5 10-7.8S17.5 3 12 3z" />
                </svg>
                카카오로 시작하기
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-11 w-full rounded-xl bg-surface text-sm font-medium text-muted transition-transform active:scale-[0.99]"
              >
                나중에
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
