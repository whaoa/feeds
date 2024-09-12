import * as feeds from '@/libs/feed';

import { FeedPage } from './page.client';

import type { Metadata } from 'next';
import type { RouteParams } from './type';

export function generateStaticParams(): RouteParams[] {
  return (Object.keys(feeds) as (keyof typeof feeds)[])
    .filter((key) => feeds[key].length > 0)
    .map((key) => ({ category: key }));
}

export function generateMetadata({ params }: { params: RouteParams }): Metadata {
  const feed = feeds[params.category];
  return feed?.label ? { title: feed.label } : {};
}

export default function Page() {
  return <FeedPage />;
}
