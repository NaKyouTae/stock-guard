import Link from 'next/link';
import { Search, Heart } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { AuthWidget } from '@/components/auth-widget';
import { Sparkline } from '@/components/sparkline';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeUp } from '@/components/ui/motion';

type Dir = 'up' | 'down';

const INDICES: {
  name: string;
  tag?: string;
  price: string;
  change: string;
  pct: string;
  dir: Dir;
  spark: number[];
}[] = [
  { name: '코스피', tag: '반도체주 약세', price: '6,357.84', change: '-240.42', pct: '3.64%', dir: 'down', spark: [8, 7, 5, 3, 2, 3, 2, 4, 3] },
  { name: '코스닥', tag: '수급 개선 기대', price: '802.92', change: '+3.33', pct: '0.41%', dir: 'up', spark: [3, 4, 2, 5, 4, 6, 5, 7, 8] },
  { name: '나스닥 100 선물', price: '29,601.25', change: '-13.75', pct: '0.04%', dir: 'down', spark: [6, 5, 6, 4, 5, 3, 4, 3, 4] },
  { name: '나스닥', tag: '대형 기술주 약세', price: '26,363.43', change: '-221.56', pct: '0.83%', dir: 'down', spark: [8, 6, 7, 5, 4, 3, 4, 2, 3] },
  { name: '필라델피아 반도체', tag: '차익실현 압력', price: '12,008.88', change: '-170.38', pct: '1.39%', dir: 'down', spark: [7, 8, 6, 5, 6, 4, 3, 4, 2] },
  { name: '달러 환율', tag: '중동긴장 완화', price: '1,419.45', change: '-5.35', pct: '0.37%', dir: 'down', spark: [6, 5, 6, 4, 3, 4, 3, 2, 3] },
  { name: 'VIX', price: '15.81', change: '-0.69', pct: '4.18%', dir: 'down', spark: [7, 6, 5, 6, 4, 5, 3, 4, 3] },
  { name: 'S&P 500', price: '7,723.55', change: '-12.97', pct: '0.16%', dir: 'down', spark: [6, 5, 4, 5, 3, 4, 3, 3, 2] },
  { name: '비트코인', tag: '거래소 이체 부담', price: '91,338,000', change: '-378,000', pct: '0.41%', dir: 'down', spark: [8, 7, 8, 6, 5, 6, 4, 5, 4] },
  { name: '금', tag: '달러 약세', price: '4,341.60', change: '+36.4', pct: '0.84%', dir: 'up', spark: [3, 2, 4, 3, 5, 4, 6, 7, 8] },
];

const STOCKS: {
  rank: number;
  name: string;
  price: string;
  pct: string;
  dir: Dir;
  amount: string;
  cap: string;
  industry: string;
  ai: string;
}[] = [
  { rank: 1, name: 'SK하이닉스', price: '1,540,000', pct: '-7.67%', dir: 'down', amount: '179억원', cap: '1,180.5조원', industry: '종합반도체', ai: '미 반도체 약세' },
  { rank: 2, name: '삼성전자', price: '234,000', pct: '-4.87%', dir: 'down', amount: '150억원', cap: '1,562.4조원', industry: '종합반도체', ai: '미 반도체 약세' },
  { rank: 3, name: '삼성전기', price: '1,255,000', pct: '-7.44%', dir: 'down', amount: '112억원', cap: '99.8조원', industry: '스마트폰MLCC', ai: '반도체주 조정 부담' },
  { rank: 4, name: 'KODEX 레버리지', price: '94,155', pct: '-8.36%', dir: 'down', amount: '103억원', cap: '5.8조원', industry: '-', ai: '미국 반도체 약세' },
  { rank: 5, name: 'SOXL', price: '186,663', pct: '-0.80%', dir: 'down', amount: '58억원', cap: '34.1조원', industry: '반도체', ai: 'AMD 기대치 미달' },
  { rank: 6, name: 'KODEX 인버스', price: '1,120', pct: '+4.38%', dir: 'up', amount: '55억원', cap: '8,149억원', industry: '-', ai: '반도체주 약세' },
  { rank: 7, name: 'SOXS', price: '64,543', pct: '+0.48%', dir: 'up', amount: '54억원', cap: '1.8조원', industry: '반도체', ai: '차익실현 압력' },
  { rank: 8, name: 'KODEX 반도체레버리지', price: '62,995', pct: '-9.37%', dir: 'down', amount: '48억원', cap: '8,654억원', industry: '반도체', ai: '미 반도체 약세' },
  { rank: 9, name: 'KODEX 코스닥150레버리지', price: '6,705', pct: '+2.52%', dir: 'up', amount: '42억원', cap: '3.6조원', industry: '-', ai: '알테오젠 계약 확대' },
  { rank: 10, name: 'SK스퀘어', price: '1,001,000', pct: '-10.54%', dir: 'down', amount: '38억원', cap: '143.7조원', industry: '지주사', ai: '미 반도체 약세' },
];

const TICKER: { name: string; price: string; change: string; dir: Dir }[] = [
  { name: '달러 인덱스', price: '99.65', change: '-0.02 (0.02%)', dir: 'down' },
  { name: '달러 환율', price: '1,419.45', change: '-5.35 (0.37%)', dir: 'down' },
  { name: '코스피', price: '6,355.62', change: '-242.64 (3.67%)', dir: 'down' },
  { name: '코스닥', price: '803.05', change: '+3.46 (0.43%)', dir: 'up' },
  { name: '나스닥', price: '26,363.43', change: '-221.56 (0.83%)', dir: 'down' },
  { name: '나스닥 100 선물', price: '29,603.5', change: '-11.5 (0.03%)', dir: 'down' },
];

const TABS = ['실시간 차트', '지금 뜨는 산업', '외국인·기관 매매 동향'];
const FILTERS = ['전체', '국내', '해외', '거래대금', '거래량', '급상승', '급하락'];

function color(dir: Dir) {
  return dir === 'up' ? 'text-up' : 'text-down';
}

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background pb-14">
      {/* 상단 네비 */}
      <header className="sticky top-0 z-20 border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-1.5 text-lg font-bold">
            <span>🛡️</span>
            <span>Stock Guard</span>
          </Link>
          <nav className="hidden items-center gap-5 text-[15px] font-medium text-muted md:flex">
            <span className="text-foreground">홈</span>
            <span>피드</span>
            <span>주식 골라보기</span>
            <span>내 계좌</span>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm text-muted lg:flex">
              <Search size={16} />
              <span>종목을 검색하세요</span>
            </div>
            <ThemeToggle />
            <AuthWidget />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        {/* 장 상태 */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <span className="text-up">●</span> 국내 정규장{' '}
            <span className="text-foreground/70">09:00 ~ 15:30</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-up">●</span> 해외 데이마켓{' '}
            <span className="text-foreground/70">09:00 ~ 17:00</span>
          </span>
        </div>

        {/* 지수 카드 */}
        <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INDICES.map((idx, i) => (
            <FadeUp key={idx.name} delay={i * 0.03}>
              <Card>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold leading-tight">
                    {idx.name}
                  </span>
                  {idx.tag && <Badge className="shrink-0">{idx.tag}</Badge>}
                </div>
                <Sparkline
                  data={idx.spark}
                  direction={idx.dir}
                  className="my-2.5 h-8 w-full"
                />
                <div className="text-lg font-bold tabular-nums">{idx.price}</div>
                <div
                  className={`text-sm font-medium tabular-nums ${color(idx.dir)}`}
                >
                  {idx.change} ({idx.pct})
                </div>
              </Card>
            </FadeUp>
          ))}
        </section>

        {/* 실시간 차트 */}
        <FadeUp delay={0.1} className="mt-8">
          <div className="flex items-center gap-5 border-b border-black/5 text-[15px] dark:border-white/10">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                type="button"
                className={
                  i === 0
                    ? 'border-b-2 border-primary pb-2.5 font-bold text-foreground'
                    : 'pb-2.5 font-medium text-muted'
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 필터 chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                className={
                  i === 0
                    ? 'rounded-full bg-foreground px-3.5 py-1.5 text-sm font-medium text-background'
                    : 'rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-muted'
                }
              >
                {f}
              </button>
            ))}
          </div>

          {/* 랭킹 테이블 */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-muted">
                  <th className="py-2 pr-2 font-medium">순위 · 오늘 11:43 기준</th>
                  <th className="py-2 px-2 text-right font-medium">현재가</th>
                  <th className="py-2 px-2 text-right font-medium">등락률</th>
                  <th className="hidden py-2 px-2 text-right font-medium sm:table-cell">
                    거래대금
                  </th>
                  <th className="hidden py-2 px-2 text-right font-medium md:table-cell">
                    시가총액
                  </th>
                  <th className="hidden py-2 px-2 font-medium lg:table-cell">
                    산업
                  </th>
                  <th className="hidden py-2 pl-2 font-medium xl:table-cell">
                    AI 요약
                  </th>
                </tr>
              </thead>
              <tbody>
                {STOCKS.map((s) => (
                  <tr
                    key={s.rank}
                    className="border-t border-black/5 transition-colors hover:bg-surface/60 dark:border-white/5"
                  >
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2.5">
                        <Heart size={16} className="text-muted" />
                        <span className="w-4 text-center text-muted tabular-nums">
                          {s.rank}
                        </span>
                        <span
                          aria-hidden
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-[11px] font-bold text-muted"
                        >
                          {s.name.slice(0, 2)}
                        </span>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right font-medium tabular-nums">
                      {s.price}원
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-semibold tabular-nums ${color(s.dir)}`}
                    >
                      {s.pct}
                    </td>
                    <td className="hidden py-3 px-2 text-right tabular-nums text-muted sm:table-cell">
                      {s.amount}
                    </td>
                    <td className="hidden py-3 px-2 text-right tabular-nums text-muted md:table-cell">
                      {s.cap}
                    </td>
                    <td className="hidden py-3 px-2 text-muted lg:table-cell">
                      {s.industry}
                    </td>
                    <td className="hidden py-3 pl-2 text-muted xl:table-cell">
                      {s.ai}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </main>

      {/* 하단 티커 */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-black/5 bg-background/90 backdrop-blur dark:border-white/10">
        <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-2.5 text-xs sm:px-6 sm:text-sm">
          {TICKER.map((t) => (
            <span key={t.name} className="flex shrink-0 items-center gap-1.5">
              <span className="text-muted">{t.name}</span>
              <span className="font-medium tabular-nums">{t.price}</span>
              <span className={`tabular-nums ${color(t.dir)}`}>{t.change}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
