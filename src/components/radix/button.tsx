import { forwardRef } from 'react';

import { cn } from '@/libs/util';

import type { ComponentPropsWithoutRef } from 'react';

const classnames = {
  base: (
    'inline-flex items-center justify-center'
    + ' rounded-md font-medium text-sm whitespace-nowrap ring-offset-background transition-colors'
    + ' focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/40'
    + ' disabled:pointer-events-none disabled:opacity-50'
  ),
  sizes: {
    default: 'rounded-md px-2 h-8 text-sm',
    sm: 'rounded px-2 h-7 text-xs',
  },
  variants: {
    link: 'text-primary underline-offset-4 hover:underline',
    default: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-gray-200 bg-white hover:bg-gray-100',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-100/80',
    destructive: 'bg-red-600 text-white hover:bg-red-600/90',
  },
};

export function withButtonClassName(
  variant?: keyof typeof classnames.variants,
  size?: keyof typeof classnames.sizes,
  className?: string,
) {
  return cn(
    classnames.base,
    classnames.sizes[size || 'default'],
    classnames.variants[variant || 'default'],
    className,
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof classnames.variants;
  size?: keyof typeof classnames.sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant, size, type = 'button', ...restProps } = props;
    return (
      <button
        ref={ref}
        className={withButtonClassName(variant || 'default', size, className)}
        type={type}
        {...restProps}
      />
    );
  },
);

Button.displayName = 'Button';
