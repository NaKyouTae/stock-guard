'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  buttonVariants,
  type ButtonVariantProps,
} from './button-variants';

export { buttonVariants };

type ButtonProps = HTMLMotionProps<'button'> & ButtonVariantProps;

/** press 시 스프링 스케일(모션)로 "쫀득함"을 준다. 링크에는 buttonVariants()를 className으로 사용. */
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
