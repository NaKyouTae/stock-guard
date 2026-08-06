import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <header className="flex justify-end">
          <ThemeToggle />
        </header>

        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-2xl">
            <span className="text-5xl sm:text-6xl">🛡️</span>
            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Stock Guard
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              여러 증권 계좌를 한곳에 모아 관리하고, 투자 고수와 비교하며,
              AI가 다음 투자를 추천하고 하락장에서 내 자산을 지켜주는 주식 파트너
            </p>

            <button
              type="button"
              className="mt-8 h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white transition-transform active:scale-[0.99] sm:w-auto sm:px-12"
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
