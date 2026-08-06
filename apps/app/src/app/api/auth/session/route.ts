import { NextRequest, NextResponse } from 'next/server';

// 세션 확립 라우트 (GET).
// 카카오 콜백(백엔드)이 top-level redirect 로 이 라우트에 토큰을 넘긴다.
// 쿠키를 navigation 응답에 실어 설정한다 (WKWebView 영속화 대응).
export function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const origin = request.nextUrl.origin; // open redirect 방지: 목적지는 항상 자기 origin
  const secure = process.env.NODE_ENV === 'production';

  if (!token) {
    return NextResponse.redirect(new URL('/', origin));
  }

  const res = NextResponse.redirect(new URL('/home', origin));
  res.cookies.set('access_token', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 180, // 180일
    path: '/',
  });
  return res;
}
