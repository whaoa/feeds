import { cn } from '@/libs/util';

import type { ComponentPropsWithoutRef } from 'react';

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  center?: boolean;
}

export function Container({ className, center, ...restProps }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-5 md:px-0 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg',
        center !== false && 'mx-auto',
        className,
      )}
      {...restProps}
    />
  );
}

interface CardProps extends ComponentPropsWithoutRef<'div'> {}

export function Card({ className, ...restProps }: CardProps) {
  return (
    <div
      className={cn('rounded-md border border-gray-200 bg-white shadow-sm', className)}
      {...restProps}
    />
  );
}
