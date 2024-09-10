'use client';

import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useQuery } from '@tanstack/react-query';

import { request } from '@/libs/util';
import { Card } from '@/components/layout/container';
import { Tabs, TabsList, TabsTrigger } from '@/components/radix/tab';
import { TrendingListItem } from '@/components/ui/trending';
import { TrendingPeriod } from '@/types/trending';

import type { TrendingItem } from '@/types/trending';

interface TrendingPeriodTabProps {
  value: TrendingPeriod;
  onChange: (value: TrendingPeriod) => void;
}

function PeriodTab({ value, onChange }: TrendingPeriodTabProps) {
  return (
    <Tabs value={value} onValueChange={onChange as (value: string) => void}>
      <TabsList>
        <TabsTrigger value="daily">今天</TabsTrigger>
        <TabsTrigger value="weekly">本周</TabsTrigger>
        <TabsTrigger value="monthly">本月</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function TrendingList({ period }: { period: TrendingPeriod }) {
  const { data, status } = useQuery({
    queryKey: ['trending', period],
    queryFn: () => (
      request(`/api/trending?period=${period}`).json<{ items: TrendingItem[] }>()
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

  return (
    <section className="px-2 pb-2">
      <Virtuoso
        disabled={!data?.length}
        useWindowScroll
        data={data}
        itemContent={(index, item) => <TrendingListItem item={item} index={index} />}
      />
    </section>
  );
}

export function Trending() {
  const [period, setPeriod] = useState(TrendingPeriod.daily);

  return (
    <Card>
      <PeriodTab value={period} onChange={setPeriod} />
      <TrendingList period={period} />
    </Card>
  );
}
