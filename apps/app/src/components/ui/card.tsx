import { cn } from '@/lib/utils';

/** 토스풍 카드: 넉넉한 라운드, 옅은 배경. 기본은 surface 톤. */
export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('rounded-2xl bg-surface p-4', className)} {...props} />
  );
}
