import Image from 'next/image';

import { cn, formatDate } from '@/libs/util';
import { ExternalLink } from '@/components/utility/link';

import { Ranking } from './ranking';

import type { Feed } from '@/libs/feed';
import type { RSSFeedItem } from '@/types/rss';

interface FeedItemProps {
  feed: Feed;
  item: RSSFeedItem;
  index: number;
}

export function FeedItem({ feed, item, index }: FeedItemProps) {
  const image = (feed.image !== 'none' && item.image)
    ? (
        <aside
          className={cn(
            'shrink-0 max-sm:hidden relative overflow-hidden rounded w-36 h-24',
            feed.image === 'left' && 'mr-3',
            feed.image === 'right' && 'ml-3',
          )}
        >
          <Image
            className="object-cover"
            alt={item.title}
            src={item.image}
            fill
            unoptimized
            referrerPolicy="no-referrer"
          />
        </aside>
      )
    : null;

  return (
    <ExternalLink
      className={cn('block px-2 py-3', index > 0 && 'border-t border-t-gray-200')}
      href={item.link}
    >
      <article className="flex">
        {feed.ranking ? <Ranking className="shrink-0 mt-0.5 mr-3" number={index + 1} /> : null}
        {feed.image === 'left' && image}
        <main className="flex-1">
          <h3 className="font-bold font-base">{item.title}</h3>
          {item.description ? (
            <p className="mt-2 text-sm line-clamp-2 text-slate-500">{item.description}</p>
          ) : null}
          {(item.author || item.date) ? (
            <p className="mt-2">
              {item.author ? (
                <span className="rounded mr-3 px-2 py-1 text-xs text-primary bg-red-100">
                  {`@${item.author}`}
                </span>
              ) : null}
              {item.date ? (
                <span className="text-sm text-gray-400">{`发布于：${formatDate(item.date)}`}</span>
              ) : null}
            </p>
          ) : null}
        </main>
        {feed.image === 'right' && image}
      </article>
    </ExternalLink>
  );
}
