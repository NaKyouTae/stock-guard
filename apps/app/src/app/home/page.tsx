import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const QUICK_MENUS = [
  { icon: '🔗', label: '계좌 연결' },
  { icon: '📊', label: '포트폴리오' },
  { icon: '👥', label: '고수 비교' },
  { icon: '🤖', label: 'AI 추천' },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-surface">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 lg:px-12">
        {/* 상단 바 */}
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-lg font-bold">Stock Guard</span>
          </Link>
          <ThemeToggle />
        </header>

        {/* 총 자산 요약 */}
        <section className="mt-6 rounded-3xl bg-background p-6 shadow-sm sm:p-8">
          <p className="text-sm text-muted">총 자산</p>
          <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            ₩0
          </p>
          <p className="mt-2 text-sm text-muted">
            계좌를 연결하면 자산 현황이 표시됩니다
          </p>
        </section>

        {/* 빠른 메뉴 */}
        <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK_MENUS.map((menu) => (
            <button
              key={menu.label}
              type="button"
              className="flex flex-col items-center gap-2 rounded-2xl bg-background p-5 shadow-sm transition-transform active:scale-[0.98]"
            >
              <span className="text-2xl">{menu.icon}</span>
              <span className="text-sm font-medium">{menu.label}</span>
            </button>
          ))}
        </section>

        {/* 보유 종목 (빈 상태) */}
        <section className="mt-4 rounded-3xl bg-background p-6 shadow-sm sm:p-8">
          <h2 className="text-base font-semibold">보유 종목</h2>
          <div className="flex flex-col items-center py-10 text-center">
            <span className="text-4xl">📭</span>
            <p className="mt-3 text-sm text-muted">아직 연결된 계좌가 없어요</p>
            <button
              type="button"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-transform active:scale-[0.99]"
            >
              계좌 연결하기
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
