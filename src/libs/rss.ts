import 'server-only';

import { request } from '@/libs/util';

import type { RSSFeed } from '@/types/rss';

interface RSSHubInstance {
  host: string;
  healthy: boolean;
  timestamp: number;
  ping: number;
}

const instances: RSSHubInstance[] = [
  { host: 'https://rsshub.app', healthy: false, timestamp: 0, ping: 0 },
  { host: 'https://rsshub.atgw.io', healthy: false, timestamp: 0, ping: 0 },
  { host: 'https://rsshub.henry.wang', healthy: false, timestamp: 0, ping: 0 },
];

async function checkInstancesHealth() {
  await Promise.allSettled(
    instances.map((instance) => {
      const start = Date.now();
      return fetch(`${instance.host}/healthz`, { cache: 'no-cache', signal: AbortSignal.timeout(3000) })
        .then((resp) => {
          instance.healthy = resp.ok;
          instance.timestamp = Date.now();
          instance.ping = instance.timestamp - start;
        })
        .catch(() => {
          instance.healthy = false;
          instance.timestamp = Date.now();
          instance.ping = 0;
        });
    }),
  );

  return {
    optimal: instances.filter((item) => item.healthy).sort((a, b) => b.ping - a.ping)[0],
    timestamp: Date.now(),
  };
}

function createRSSInstanceResolver(expires = 60 * 30) {
  let loader: Promise<RSSHubInstance> | undefined;
  let timestamp = 0;

  return (force = false) => {
    if (force || !loader || timestamp + expires * 1000 <= Date.now()) {
      loader = checkInstancesHealth().then((res) => {
        timestamp = Date.now();
        return res.optimal || Promise.reject(new Error('No available RSSHub instance found'));
      });
      loader.catch(() => {
        loader = undefined;
      });
    }
    return loader;
  };
}

const resolveInstance = createRSSInstanceResolver();

interface RSSHubFeed {
  title: string;
  description: string;
  home_page_url: string;
  items: Array<{
    id: string;
    url: string;
    title: string;
    content_html: string;
    date_published?: string;
    authors?: Array<{ name: string }>;
  }>;
}

export async function fetchRSSFeed(route: string): Promise<RSSFeed> {
  route = (route || '').replace(/^\//, '').split('?')[0];
  if (!route) {
    throw new Error('loadFeed: route must be provided');
  }
  const instance = await resolveInstance();
  const response = await request(`${instance.host}/${route}?format=json`, {
    next: { revalidate: 60 * 3, tags: ['rss', route] },
  });
  const feed = await response.json<RSSHubFeed>();
  return {
    feed: `${instance.host}/${route}`,
    date: new Date(response.headers.get('last-modified') || Date.now()).toISOString(),
    title: feed.title,
    description: feed.description,
    link: feed.home_page_url,
    items: feed.items.map((item) => ({
      link: item.url,
      title: item.title,
      description: item.content_html,
      author: item.authors?.[0]?.name || '',
      date: item.date_published ? new Date(item.date_published).toISOString() : undefined,
    })),
  };
}
