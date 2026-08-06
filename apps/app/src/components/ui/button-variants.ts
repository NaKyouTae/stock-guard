import { cva, type VariantProps } from 'class-variance-authority';

// 서버 컴포넌트(예: <Link className={buttonVariants(...)}>)에서도 호출 가능하도록
// cva 정의는 'use client' 밖의 별도 모듈에 둔다.
export const buttonVariants = cva(
  'inline-flex select-none items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        secondary: 'bg-surface text-foreground',
        ghost: 'text-muted hover:bg-surface',
        outline: 'border border-black/10 text-foreground dark:border-white/15',
      },
      size: {
        default: 'h-11 px-5 text-[15px]',
        sm: 'h-9 px-3.5 text-sm',
        lg: 'h-14 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
