'use client';

import { forwardRef } from 'react';
import {
  List as RadixTabsList,
  Root as RadixTabsRoot,
  Trigger as RadixTabsTrigger,
} from '@radix-ui/react-tabs';

import { cn } from '@/libs/util';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export const Tabs = RadixTabsRoot;

export const TabsList = forwardRef<
  ElementRef<typeof RadixTabsList>,
  ComponentPropsWithoutRef<typeof RadixTabsList>
>(({ className, ...props }, ref) => (
  <RadixTabsList ref={ref} className={cn('p-1', className)} {...props} />
));
TabsList.displayName = RadixTabsList.displayName;

export const TabsTrigger = forwardRef<
  ElementRef<typeof RadixTabsTrigger>,
  ComponentPropsWithoutRef<typeof RadixTabsTrigger>
>(({ className, ...props }, ref) => (
  <RadixTabsTrigger
    ref={ref}
    className={cn(
      'relative mx-2 rounded px-2 py-1 text-sm text-slate-800 hover:text-primary hover:bg-red-50 aria-selected:text-primary',
      'after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-b-transparent aria-selected:after:border-b-primary',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = RadixTabsTrigger.displayName;
