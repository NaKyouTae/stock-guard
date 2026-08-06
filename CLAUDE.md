# Stock Guard — 주식 관리 파트너 플랫폼

## 프로젝트 개요

토스증권 오픈 API 기반의 개인 자산 관리·투자 지원 서비스. **"내 자산을 지키고(Guard) 함께 키워가는 평생 투자 파트너"**를 지향한다. 국내 주식 + 미국 주식 모두 지원.

### 핵심 기능
- **통합 계좌 관리** — 본인 및 가족(자녀·배우자 등) 여러 계좌를 연결해 자산 현황을 한눈에
- **고수 포트폴리오 비교** — 유명 투자자 포트폴리오를 가져와 내 것과 비교·벤치마킹
- **AI 투자 추천** — 보유 현황·시장 분석 후 다음 매수 종목 추천
- **하방 보호(Guard)** — 하락장 리스크 감지 및 방어 전략
- **거래 & 자동매매** — 앱 내 거래, 나아가 전략 기반 자동매매
- **포트폴리오 분석** — 수익률·리스크·자산 배분

## 프로젝트 구조

**Turborepo + pnpm 모노레포** (Node 22, pnpm 10.33):
- `apps/app/` — Next.js 16, 사용자 웹 (추후 웹뷰) — **Vercel 배포** — port **16000**
- `apps/server/` — NestJS 11 + Prisma 7 — **Cloudtype 배포** — port **18070**

> 포트는 다른 로컬 프로젝트와 겹치지 않게 배정됨 (export-used-car 18090/15000, baby-rang 18080/13000).

## 기술 스택

### 서버 (apps/server)
- NestJS 11, Prisma 7, **MySQL 8**
- **Prisma 7 주의점** — datasource에 `url` 인라인 불가. 연결 설정은 `prisma.config.ts`(CLI/migrate용)에 두고, `PrismaClient`는 **드라이버 어댑터** 필요. MySQL은 `@prisma/adapter-mariadb` 사용 (연결 문자열 형식: `mysql://...` 또는 mariadb 형식)
- **형상관리** — `schema.prisma` 단일 소스 + `prisma/migrations/`를 git 커밋. `prisma migrate dev`(개발) / `prisma migrate deploy`(배포)
- API 전역 prefix `/api`, DTO 검증(class-validator), CORS(`CORS_ORIGIN`)
- 인증: JWT (토스 OAuth 연동 기반, 예정)
- 외부 연동: 토스증권 오픈 API (시세/잔고/주문)

### App 프론트엔드 (apps/app)
- Next.js 16 (App Router) + React 19 + **Tailwind CSS v4**
- 상태/데이터: TanStack Query (서버 상태, 시세 폴링) *(도입 예정)*
- 애니메이션: **Motion (Framer Motion)** — 전환/제스처/바텀시트 *(도입 예정)*
- 컴포넌트: Radix UI(headless) + Vaul(바텀시트) *(도입 예정)*
- 차트: lightweight-charts (주식 캔들/라인) *(도입 예정)*
- 폼/검증: React Hook Form + Zod *(도입 예정)*
- 유틸: es-toolkit, overlay-kit (토스 오픈소스) *(도입 예정)*

## UI 기조 — "토스 증권 느낌"

> **UI 작업 시 상세 규칙은 [`docs/ui-guide.md`](docs/ui-guide.md)를 반드시 참고할 것** (토큰·다크모드·반응형·컴포넌트 패턴·Do/Don't). 아래는 요약.

**핵심 철학: 무거운 UI 라이브러리를 쓰지 않고, 커스텀 디자인 시스템 + 극도로 매끄러운 마이크로 인터랙션으로 완성한다.** (완제품 컴포넌트 라이브러리를 그대로 쓰면 토스 느낌이 나지 않음 → Radix 같은 headless 위에 직접 스타일링)

- **반응형 (웹·태블릿·모바일 모두 지원)** — 모바일 고정 폭 금지. Tailwind 브레이크포인트(`sm:` `md:` `lg:`)로 화면별 레이아웃 구성. 콘텐츠는 `max-w-*` + `mx-auto`로 큰 화면에서 가독폭 유지. **`max-w-[430px]` 같은 하드 고정 컨테이너 사용 금지**
- **모바일 우선 작성(mobile-first)** — 기본 스타일은 모바일 기준, 위로 올려가며 확장. 단 데스크톱/태블릿 레이아웃도 반드시 함께 고려
- **컬러 톤** — 토스 블루 `#3182f6`(primary), 텍스트 `#191f28`, muted `#8b95a1`, surface `#f2f4f6`, background `#ffffff`. CSS 변수로 관리(`globals.css`)
- **다크 모드 지원** — 색상은 항상 시맨틱 토큰(`bg-background` `text-foreground` `text-muted` `bg-surface` `bg-primary`)으로 쓸 것. **하드코딩 색상 금지** (다크 대응 깨짐). 다크 토큰은 `globals.css`에서 `@media (prefers-color-scheme: dark)`로 시스템 자동 전환 + `:root[data-theme='dark'|'light']`로 수동 토글 훅 제공. 다크 배경 `#17171c`, primary `#4593fc`
- **폰트** — Apple SD Gothic Neo / Pretendard 계열
- **인터랙션** — 버튼 `active:scale`, 스프링 전환, 숫자 카운트업 등 "쫀득함"이 핵심 → Motion 적극 활용
- **웹뷰/모바일 대비 규칙**
  - `100dvh` 사용 (100vh 버그 회피)
  - `env(safe-area-inset-*)` 안전영역 대응 (노치/홈바)
  - 터치 타깃 44px 이상, hover 의존 금지 (모바일)
  - input font-size 16px 이상 (iOS 포커스 확대 방지)
  - `-webkit-tap-highlight-color: transparent`
  - viewport `viewport-fit=cover` (확대는 허용 — 접근성)

## 컨벤션

- **통화는 KRW(원화)** 기본, 미국 주식은 USD 병기 (환율 처리 주의)
- **커서 기반 페이지네이션** 지향 (대량 거래/보유 내역)
- **BFF 프록시 패턴** — 프론트 API Routes → NestJS (httpOnly 쿠키 JWT)
- **보험/소유이력류 외부 데이터는 자체 DB 저장 지양**, 실시간 조회 (해당 시)
- **반응형 필수** — 웹/태블릿/모바일 모두 지원. `sm:`/`md:`/`lg:` 브레이크포인트 활용 (자세한 건 UI 기조 참고)

## 실행

```bash
pnpm install
pnpm --filter server prisma:generate   # Prisma Client 생성

pnpm dev          # app(16000) + server(18070) 동시 (turbo)
pnpm dev:app      # 프론트만
pnpm dev:server   # 서버만
pnpm build        # 전체 빌드
```

## 배포

| 앱 | 플랫폼 | 설정 |
|----|--------|------|
| `apps/app` | Vercel | Root Directory = `apps/app` |
| `apps/server` | Cloudtype | Root = `apps/server`, build `pnpm build`, start `pnpm start:prod` |

배포 시 DB 마이그레이션: `pnpm --filter server prisma:deploy`

## 검토 필요한 제약 (기획/법무)

- **타인·가족 계좌 연결** — 토스증권 오픈 API 약관 및 자본시장법상 대리 조회·매매 제약 여부 확인 필요
- **유명인 포트폴리오** — 국내는 공시 의무가 거의 없어 정확한 실시간 데이터 확보 제한적 (미국 13F 등 일부만 공개). "추정 포트폴리오" 표기 주의
- **자동매매** — 증권 API 주문 권한·인증·리스크 관리 요건 충족 필요
