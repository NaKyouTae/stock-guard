import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 로그아웃 — access_token 쿠키 제거.
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  return NextResponse.json({ success: true });
}
