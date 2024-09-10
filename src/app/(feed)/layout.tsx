import { Container } from '@/components/layout/container';

import type { PropsWithChildren } from 'react';

function FeedFooter() {
  return (
    <footer>
      <Container className="pt-10 pb-14">
        <p className="text-center text-xs text-gray-400">
          —— 你在寻找什么呢？这里已经翻到底了哦！——
        </p>
      </Container>
    </footer>
  );
}

export default function FeedLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Container className="py-5">
        {children}
      </Container>
      <FeedFooter />
    </>
  );
}
