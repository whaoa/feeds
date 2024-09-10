import Image from 'next/image';

import { cn } from '@/libs/util';
import { Ranking } from '@/components/ui/ranking';
import { ExternalLink } from '@/components/utility/link';

import type { TrendingItem } from '@/types/trending';

export function TrendingListItem({ item, index }: { item: TrendingItem; index: number }) {
  return (
    <ExternalLink
      className={cn('block px-2 py-3', index > 0 && 'border-t border-t-gray-200')}
      href={item.link}
    >
      <article className="flex">
        <Ranking className="shrink-0 mt-0.5 mr-2" number={index + 1} />
        <main className="flex-1 overflow-hidden">
          <h3 className="font-bold text-base line-clamp-2">{item.title}</h3>
          {item.description ? (
            <p className="mt-2 text-sm line-clamp-2 text-slate-500">{item.description}</p>
          ) : null}
          <p className="mt-2">
            <span className="rounded px-2 py-1 text-xs text-primary bg-red-100">
              {item.websiteLabel}
            </span>
            {item.label ? <span className="ml-5 text-sm text-gray-400">{item.label}</span> : null}
          </p>
        </main>
        {item.image ? (
          <aside className="shrink-0 max-sm:hidden relative overflow-hidden rounded ml-2 w-36 h-24">
            <Image
              className="object-cover"
              alt={item.title}
              src={item.image}
              fill
              unoptimized
              referrerPolicy="no-referrer"
            />
          </aside>
        ) : null}
      </article>
    </ExternalLink>
  );
}
