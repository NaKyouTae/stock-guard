import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** 조건부 클래스 병합 (shadcn/ui 규약) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
