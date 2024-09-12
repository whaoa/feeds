'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Virtuoso } from 'react-virtuoso';
import { useQuery } from '@tanstack/react-query';

import { cn, request } from '@/libs/util';
import * as feeds from '@/libs/feed';
import { Card } from '@/components/layout/container';
import { FeedItem } from '@/components/ui/feed';
import { Tabs, TabsList, TabsTrigger } from '@/components/radix/tab';
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaViewport } from '@/components/radix/scroll-area';

import type { Feed, FeedSource } from '@/libs/feed';
import type { RSSFeedItem } from '@/types/rss';
import type { RouteParams } from './type';

interface FeedSourceTabProps {
  sources: FeedSource[];
  value?: FeedSource;
  onChange?: (value: FeedSource) => void;
}

function FeedSourceTab({ sources, value, onChange }: FeedSourceTabProps) {
  return (
    <ScrollArea className="p-2 w-full whitespace-nowrap">
      <ScrollAreaViewport role="tablist">
        {sources.map((item, index) => (
          <button
            key={item.name}
            className={cn(
              'inline-flex items-center rounded py-1 px-2 cursor-pointer',
              index > 0 && 'ml-2',
              item === value ? 'text-primary bg-red-50' : 'hover:text-primary hover:bg-red-50',
            )}
            type="button"
            role="tab"
            aria-selected={item === value}
            onClick={() => onChange?.(item)}
          >
            <Image
              className="mr-1 rounded-sm"
              src={item.icon}
              alt={item.label}
              width={16}
              height={16}
              unoptimized
            />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal" />
    </ScrollArea>
  );
}

interface FeedTabProps {
  feeds: FeedSource['feeds'];
  value?: Feed;
  onChange?: (value: Feed) => void;
}

function FeedTab({ feeds, value, onChange }: FeedTabProps) {
  const handleValueChange = useCallback((name: string) => {
    const feed = feeds.find((item) => item.name === name);
    if (feed) {
      onChange?.(feed);
    }
  }, [feeds, onChange]);

  return (
    <Tabs value={value?.name} onValueChange={handleValueChange}>
      <TabsList>
        {feeds.map((feed) => (
          <TabsTrigger key={feed.name} value={feed.name}>{feed.label}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function FeedList({ feed }: { feed: FeedSource['feeds'][number] }) {
  const { data, status } = useQuery({
    queryKey: ['trending', feed.route],
    queryFn: () => (
      request(`/api/rss?route=${feed.route}`).json<{ items: RSSFeedItem[] }>()
        .then((resp) => resp.items)
    ),
    keepPreviousData: false,
  });

  if (status === 'loading') {
    return (
      <div className="py-14 text-center text-gray-500">数据加载中……</div>
    );
  }

  if (status === 'error') {
    return (
      <div className="py-10 text-center text-gray-500">数据加载失败</div>
    );
  }

  if (!data?.length) {
    return (
      <div className="py-10 text-center text-gray-500">暂无数据</div>
    );
  }

  return (
    <section className="px-2 pb-2">
      <Virtuoso
        useWindowScroll
        disabled={!data?.length || data.length < 20}
        data={data}
        itemContent={(index, item) => <FeedItem feed={feed} item={item} index={index} />}
      />
    </section>
  );
}

function FeedContent({ source }: { source: FeedSource }) {
  const [feed, setFeed] = useState(source.feeds[0]);

  return (
    <>
      <FeedTab feeds={source.feeds} value={feed} onChange={setFeed} />
      <FeedList feed={feed} />
    </>
  );
}

export function FeedPage() {
  const { category } = useParams<RouteParams>();

  const sources = feeds[category];
  const [source, setSource] = useState(sources[0]);

  return (
    <>
      <Card>
        <FeedSourceTab sources={sources} value={source} onChange={setSource} />
      </Card>

      <Card className="mt-3">
        <FeedContent key={source.name} source={source} />
      </Card>
    </>
  );
}
