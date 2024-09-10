import Link from 'next/link';

import { Card, Container } from '@/components/layout/container';
import { withButtonClassName } from '@/components/radix/button';

export default function NotFound() {
  return (
    <Container className="py-5">
      <Card className="py-20">
        <div className="flex items-center justify-center w-full">
          <h1 className="text-2xl">404</h1>
          <span className="mx-4 border-r border-r-gray-200 w-0 h-8 bg-gray-200" />
          <h2 className="text-center text-sm text-zinc-500">你似乎来到了没有知识存在的荒原……</h2>
        </div>
        <div className="mt-4 text-center">
          <Link className={withButtonClassName('outline')} href="/" replace>前往首页</Link>
        </div>
      </Card>
    </Container>
  );
}
