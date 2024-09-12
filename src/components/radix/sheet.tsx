'use client';

import { forwardRef } from 'react';
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';

import { cn } from '@/libs/util';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export const SheetRoot = Root;
export const SheetTrigger = Trigger;
export const SheetClose = Close;
export const SheetPortal = Portal;

export const SheetTitle = Title;
export const SheetDescription = Description;

export const SheetOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(
  ({ className, ...props }, ref) => (
    <Overlay
      className={cn('fixed left-0 top-0 right-0 bottom-0 z-50 bg-black/80', className)}
      ref={ref}
      {...props}
    />
  ),
);
SheetOverlay.displayName = Overlay.displayName;

export const SheetContent = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Content>
>(
  ({ className, ...props }, ref) => (
    <Content
      className={cn('fixed left-0 top-0 right-0 bottom-0 m-auto z-50 bg-white', className)}
      ref={ref}
      {...props}
    />
  ),
);
SheetContent.displayName = Content.displayName;
