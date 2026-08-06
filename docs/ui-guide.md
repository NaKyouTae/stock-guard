# Stock Guard — UI 디자인 가이드

> App 프론트엔드(`apps/app`)의 디자인 시스템·UI 규칙 문서. UI 작업 전 반드시 이 문서를 따른다.
> 요약본은 `CLAUDE.md`의 "UI 기조" 참고, 상세 규칙은 여기.

## 1. 핵심 철학 — "토스 증권 느낌"

무거운 완제품 UI 라이브러리를 그대로 쓰지 않는다. **커스텀 디자인 시스템 + 극도로 매끄러운 마이크로 인터랙션**으로 완성한다. 컴포넌트가 필요하면 headless(Radix 등) 위에 직접 스타일링한다.

- 깔끔하고 여백이 넉넉한 레이아웃
- 절제된 컬러, 명확한 위계
- 쫀득한 전환·제스처 (Motion)

## 2. 반응형 (웹 · 태블릿 · 모바일)

- **모바일 고정 폭 금지.** `max-w-[430px]` 같은 하드 컨테이너를 쓰지 않는다.
- **mobile-first로 작성**하되, 태블릿·데스크톱 레이아웃도 반드시 함께 설계한다.
- 콘텐츠는 `max-w-*` + `mx-auto`로 큰 화면에서 가독폭을 유지한다. (예: 페이지 컨테이너 `max-w-5xl`)
- Tailwind 브레이크포인트: `sm`(640) · `md`(768) · `lg`(1024) · `xl`(1280).
- 예시 패턴:
  ```tsx
  <main className="min-h-dvh bg-background">
    <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10 lg:px-16">
      {/* 타이포·여백을 단계별로 확장: text-3xl sm:text-5xl lg:text-6xl */}
    </div>
  </main>
  ```

## 3. 컬러 토큰 (시맨틱)

색상은 **항상 시맨틱 토큰**으로 사용한다. HEX 하드코딩 금지 (다크 모드가 깨진다).

| 토큰 | Tailwind 클래스 | 라이트 | 다크 | 용도 |
|------|-----------------|--------|------|------|
| background | `bg-background` | `#ffffff` | `#17171c` | 페이지 바탕 |
| foreground | `text-foreground` | `#191f28` | `#f2f4f6` | 기본 텍스트 |
| muted | `text-muted` | `#8b95a1` | `#6b7684` | 보조 텍스트 |
| surface | `bg-surface` | `#f2f4f6` | `#26282c` | 카드/영역 배경 |
| primary | `bg-primary` / `text-primary` | `#3182f6` | `#4593fc` | 강조·CTA (토스 블루) |

- 토큰 정의: `apps/app/src/app/globals.css` (`:root` + `@theme inline`)
- primary 위 텍스트는 `text-white` 고정 (양쪽 모드 모두 대비 확보됨).
- 신규 색이 필요하면 임의 HEX 대신 **토큰을 추가**한다 (globals.css 3곳: 기본 `:root`, 다크 media, 다크 `data-theme`).

## 4. 다크 모드

- **3단 지원: 시스템 / 라이트 / 다크.**
- 동작 방식:
  - **시스템** — `data-theme` 미설정. `@media (prefers-color-scheme: dark)`가 OS 설정을 따름.
  - **수동** — `<html data-theme="light|dark">`가 시스템 설정보다 우선.
- **토글**: `apps/app/src/components/theme-toggle.tsx` (client). 선택값을 `localStorage['theme']`에 저장 (`system`은 키 삭제).
- **FOUC 방지**: `layout.tsx` `<head>`의 인라인 스크립트가 하이드레이션 전에 저장값을 `data-theme`로 적용. `<html>`에 `suppressHydrationWarning` 필수.
- 새 페이지/컴포넌트는 토큰만 쓰면 자동으로 다크 대응된다 — 별도 `dark:` 유틸리티 불필요.

## 5. 타이포그래피

- 폰트: `-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', system-ui`
- 제목: `font-bold tracking-tight`, 반응형 크기 확장
- 본문: `leading-relaxed`, 보조 설명은 `text-muted`
- 앤티앨리어싱: body에 `-webkit-font-smoothing: antialiased` 적용됨

## 6. 인터랙션 / 애니메이션

- "쫀득함"이 핵심. 버튼 누름 `active:scale-[0.99]`, 부드러운 `transition`.
- 페이지 전환·바텀시트·제스처는 **Motion(Framer Motion)** 사용 (도입 예정).
- 바텀시트/드로어는 **Vaul** (도입 예정).
- 숫자(잔고·수익률)는 카운트업 애니메이션 지향.

## 7. 모바일 / 웹뷰 대응 규칙

추후 웹뷰로 감쌀 것을 전제로, 처음부터 지킨다.

- 높이는 `100dvh` 사용 (100vh 버그 회피).
- 안전영역: body에 `env(safe-area-inset-*)` 패딩 적용됨 (노치/홈바).
- 터치 타깃 **44px 이상**, hover 의존 금지(모바일).
- `input` font-size **16px 이상** (iOS 포커스 시 확대 방지).
- `-webkit-tap-highlight-color: transparent` (전역 적용됨).
- viewport: `viewport-fit=cover`, 확대는 허용(접근성) — `maximum-scale` 잠그지 않는다.

## 8. 접근성

- 인터랙티브 요소에 `aria-label` / `role` 부여 (예: 테마 토글 `radiogroup`/`radio`).
- 색상만으로 정보 전달 금지 (수익=빨강·파랑은 아이콘/부호 병행).
- 포커스 가시성 유지.

## 9. 도입 예정 스택

| 목적 | 라이브러리 |
|------|-----------|
| 애니메이션 | Motion (Framer Motion) |
| headless 컴포넌트 | Radix UI |
| 바텀시트 | Vaul |
| 차트 | lightweight-charts |
| 폼/검증 | React Hook Form + Zod |
| 서버 상태 | TanStack Query |
| 유틸 | es-toolkit, overlay-kit (토스 오픈소스) |

## 10. Do / Don't

**Do**
- 시맨틱 토큰으로 색상 사용
- mobile-first + 브레이크포인트로 반응형
- headless 위에 직접 스타일
- 토큰만으로 다크 대응

**Don't**
- HEX 색상 하드코딩
- `max-w-[430px]` 등 모바일 고정 폭
- 완제품 컴포넌트 라이브러리를 기본 룩 그대로 사용
- `dark:` 유틸리티 남발 (토큰으로 해결)
- 100vh 사용 / 확대 잠금
