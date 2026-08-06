export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col px-6 pt-16 pb-10">
      <div className="flex flex-1 flex-col justify-center">
        <span className="text-4xl">🛡️</span>
        <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-tight">
          Stock Guard
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          여러 증권 계좌를 한곳에 모아 관리하고,
          <br />
          투자 고수와 비교하며, AI가 다음 투자를 추천하고
          <br />
          하락장에서 내 자산을 지켜주는 주식 파트너
        </p>
      </div>

      <button
        type="button"
        className="mt-8 h-14 w-full rounded-2xl bg-primary text-[16px] font-semibold text-white active:scale-[0.99] transition-transform"
      >
        시작하기
      </button>
    </main>
  );
}
