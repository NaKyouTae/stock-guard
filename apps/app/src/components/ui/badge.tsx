import { cn } from '@/lib/utils';

/** 작은 태그 (예: 지수 카드의 "반도체주 약세") */
export function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-background px-1.5 py-0.5 text-[11px] text-muted',
        className,
      )}
      {...props}
    />
  );
}
