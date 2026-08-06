import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stock Guard',
  description: '내 자산을 지키고 함께 키워가는 주식 관리 파트너',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        {/* 모바일 우선 · 웹뷰 대비 중앙 고정 컨테이너 */}
        <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
