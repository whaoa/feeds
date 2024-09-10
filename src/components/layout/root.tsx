import Link from 'next/link';
import Image from 'next/image';

import * as metadata from '@/constants/metadata';
import { Container } from '@/components/layout/container';
import { HeaderNavLink } from '@/components/layout/link';

export function RootHeader() {
  return (
    <header className="sticky z-[1] left-0 top-0 border-b border-b-gray-200 w-full bg-white shadow-sm">
      <Container className="flex items-stretch">
        <Link className="shrink-0 inline-flex items-center px-4 py-3" href="/">
          <Image
            className="mr-1"
            width={24}
            height={24}
            alt="logo"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iI2VmNDQ0NCIgZD0ibTIxMC43OCAzOS4yNWwtMTMwLjI1LTIzQTE2IDE2IDAgMCAwIDYyIDI5LjIzbC0yOS43NSAxNjlhMTYgMTYgMCAwIDAgMTMgMTguNTNsMTMwLjI1IDIzYTE2IDE2IDAgMCAwIDE4LjU0LTEzbDI5Ljc1LTE2OWExNiAxNiAwIDAgMC0xMy4wMS0xOC41MW0tNzUuMjggOTIuMzFhOCA4IDAgMCAxLTcuODcgNi42MWE4LjMgOC4zIDAgMCAxLTEuNC0uMTJsLTQxLjUtNy4zM0E4IDggMCAwIDEgODcuNTIgMTE1bDQxLjQ4IDcuMjlhOCA4IDAgMCAxIDYuNSA5LjI3bTQ3LTI0LjE4YTggOCAwIDAgMS03Ljg2IDYuNjFhNy42IDcuNiAwIDAgMS0xLjQxLS4xM2wtODMtMTQuNjVhOCA4IDAgMCAxIDIuNzktMTUuNzZsODMgMTQuNjZhOCA4IDAgMCAxIDYuNTEgOS4yN1ptNS41NS0zMS41MmE4IDggMCAwIDEtNy44NyA2LjYxYTguNCA4LjQgMCAwIDEtMS40LS4xMmwtODMtMTQuNjZhOCA4IDAgMSAxIDIuNzgtMTUuNzVsODMgMTQuNjVhOCA4IDAgMCAxIDYuNTIgOS4yN1oiLz48L3N2Zz4="
          />
          <span className="font-bold text-lg text-slate-800">
            {metadata.name}
          </span>
        </Link>

        <span className="flex-1 mx-5" />

        <nav className="shrink-0">
          <HeaderNavLink href="/">
            趋势
          </HeaderNavLink>
        </nav>
      </Container>
    </header>
  );
}
