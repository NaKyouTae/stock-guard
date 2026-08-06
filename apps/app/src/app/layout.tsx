import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stock Guard',
  description: '내 자산을 지키고 함께 키워가는 주식 관리 파트너',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // 웹뷰 안전영역 대응 (확대는 허용 — 접근성)
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
