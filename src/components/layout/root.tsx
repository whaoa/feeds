import Link from 'next/link';
import Image from 'next/image';

import * as metadata from '@/constants/metadata';
import { cn } from '@/libs/util';
import { Container } from '@/components/layout/container';
import { HeaderNavLink } from '@/components/layout/link';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
  SheetRoot,
  SheetTitle,
  SheetTrigger,
} from '@/components/radix/sheet';

import type { PropsWithChildren } from 'react';

function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        className={className}
        width={24}
        height={24}
        alt="logo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iI2VmNDQ0NCIgZD0ibTIxMC43OCAzOS4yNWwtMTMwLjI1LTIzQTE2IDE2IDAgMCAwIDYyIDI5LjIzbC0yOS43NSAxNjlhMTYgMTYgMCAwIDAgMTMgMTguNTNsMTMwLjI1IDIzYTE2IDE2IDAgMCAwIDE4LjU0LTEzbDI5Ljc1LTE2OWExNiAxNiAwIDAgMC0xMy4wMS0xOC41MW0tNzUuMjggOTIuMzFhOCA4IDAgMCAxLTcuODcgNi42MWE4LjMgOC4zIDAgMCAxLTEuNC0uMTJsLTQxLjUtNy4zM0E4IDggMCAwIDEgODcuNTIgMTE1bDQxLjQ4IDcuMjlhOCA4IDAgMCAxIDYuNSA5LjI3bTQ3LTI0LjE4YTggOCAwIDAgMS03Ljg2IDYuNjFhNy42IDcuNiAwIDAgMS0xLjQxLS4xM2wtODMtMTQuNjVhOCA4IDAgMCAxIDIuNzktMTUuNzZsODMgMTQuNjZhOCA4IDAgMCAxIDYuNTEgOS4yN1ptNS41NS0zMS41MmE4IDggMCAwIDEtNy44NyA2LjYxYTguNCA4LjQgMCAwIDEtMS40LS4xMmwtODMtMTQuNjZhOCA4IDAgMSAxIDIuNzgtMTUuNzVsODMgMTQuNjVhOCA4IDAgMCAxIDYuNTIgOS4yN1oiLz48L3N2Zz4="
      />
      <span className="shrink-0 font-bold text-lg text-slate-800">
        {metadata.name}
      </span>
    </span>
  );
}

function MenuButton({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <SheetRoot>
      <SheetTrigger className={className}>
        {/* https://remixicon.com/icon/menu-line */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-slate-800">
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </SheetTrigger>
      <SheetPortal>
        <SheetOverlay />
        <SheetContent className="px-4 w-full h-full">
          <SheetTitle className="flex items-center border-b border-b-slate-200 py-4">
            <Logo className="shrink-0" />
            <span className="flex-1" />
            <SheetClose className="shrink-0">
              {/* https://remixicon.com/icon/close-line */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-slate-800">
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
              </svg>
            </SheetClose>
          </SheetTitle>
          <SheetDescription />
          <main className="mt-5">{children}</main>
        </SheetContent>
      </SheetPortal>
    </SheetRoot>
  );
}

const navigations = [
  { label: '趋势', href: '/' },
  { label: '资讯', href: '/feeds/news' },
  { label: '娱乐', href: '/feeds/ent' },
  { label: '开发', href: '/feeds/dev' },
];

export function RootHeader() {
  return (
    <header className="sticky z-[1] left-0 top-0 border-b border-b-gray-200 w-full bg-white shadow-sm">
      <Container className="flex items-stretch">
        <Link className="shrink-0 inline-flex items-center px-4 py-3" href="/">
          <Logo />
        </Link>

        <span className="flex-1 mx-5" />

        <nav className="max-sm:hidden shrink-0">
          {navigations.map((item) => (
            <HeaderNavLink key={item.href} href={item.href}>{item.label}</HeaderNavLink>
          ))}
        </nav>

        <MenuButton className="sm:hidden">
          {navigations.map((item) => (
            <Link key={item.href} className="block border-b border-b-slate-200" href={item.href}>
              <SheetClose className="flex items-center px-2 py-3 w-full font-bold text-left">
                <span className="flex-1">{item.label}</span>
                {/* https://remixicon.com/icon/arrow-right-s-line */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-slate-600">
                  <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                </svg>
              </SheetClose>
            </Link>
          ))}
        </MenuButton>
      </Container>
    </header>
  );
}
