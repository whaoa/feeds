'use client';

import { forwardRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/libs/util';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export const ScrollAreaScrollbar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'border-l border-l-transparent p-[1px] w-2.5 h-full',
      orientation === 'horizontal' && 'flex-col border-t border-t-transparent p-[1px] h-2.5',
      className,
    )}
    orientation={orientation}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-200/80" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollAreaScrollbar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export const ScrollAreaViewport = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    ref={ref}
    className={cn('w-full h-full rounded-[inherit]', className)}
    {...props}
  />
));
ScrollAreaViewport.displayName = ScrollAreaPrimitive.Viewport.displayName;

export const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    {children}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
