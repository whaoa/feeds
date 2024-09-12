'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/libs/util';

import type { ComponentPropsWithoutRef } from 'react';

type HeaderNavLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  href: string;
};

export function HeaderNavLink(props: HeaderNavLinkProps) {
  const { className, children, href, ...restProps } = props;

  const pathname = usePathname();
  const isActive = href.split('?')[0].split('#')[0] === pathname;

  return (
    <Link className={cn('inline-flex items-center relative px-3 h-full', className)} href={href} {...restProps}>
      <span
        className={cn(
          'rounded px-2 py-1 w-max h-max hover:bg-red-50',
          isActive ? 'text-primary' : 'hover:text-primary',
        )}
      >
        {children}
      </span>
      <hr
        className={cn(
          'absolute left-0 right-0 bottom-0 border-none mx-auto w-4/5 bg-primary transition-[height]',
          isActive ? 'h-1' : 'h-0',
        )}
      />
    </Link>
  );
}
