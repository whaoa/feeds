import { Trending } from './page.client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '趋势',
};

export default function Page() {
  return <Trending />;
}
