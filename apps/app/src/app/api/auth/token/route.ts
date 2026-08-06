import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:18070';

// 현재 로그인 상태/사용자 조회. httpOnly 쿠키의 access_token 을 서버에 Bearer 로 전달한다.
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');
  if (!token) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token.value}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 401 || res.status === 403) {
      return NextResponse.json({ authenticated: false, user: null });
    }
    if (!res.ok) {
      // 일시적 서버 실패 — 세션은 유지하되 user 는 stale 로 표시
      return NextResponse.json({ authenticated: true, user: null, stale: true });
    }
    const user = await res.json();
    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: true, user: null, stale: true });
  }
}
