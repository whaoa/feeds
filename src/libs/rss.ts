import 'server-only';
import { load } from 'cheerio';

import { request } from '@/libs/util';

import type { RSSFeedItem } from '@/types/rss';

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

function tryToPatchFeedItems(items: RSSFeedItem[]) {
  const tag = 'feed-block';

  const doc = items.map((item, index) => (
    (item.description && /<[a-z]/i.test(item.description))
      ? `<${tag} data-index="${index}">${item.description}</${tag}>`
      : ''
  )).join('');

  if (doc) {
    const $ = load(doc);
    $('feed-block').each((_, el) => {
      const node = $(el);
      const item = items[Number(node.data('index'))];
      if (item) {
        item.image = node.find('img, .hupu-img').first().attr('src');
        item.description = node.contents().toArray()
          .map((el) => $(el).text().trim())
          .filter(Boolean)
          .join('\n');
      }
    });
  }
}

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

export async function fetchRSSFeed(route: string) {
  route = (route || '').replace(/^\//, '').split('?')[0];
  if (!route) {
    throw new Error('loadFeed: route must be provided');
  }

  const instance = await resolveInstance();
  const response = await request(`${instance.host}/${route}?limit=50&format=json`, {
    next: { revalidate: 60 * 3, tags: ['rss', route] },
  });
  const feed = await response.json<RSSHubFeed>();

  const result = {
    feed: `${instance.host}/${route}`,
    date: new Date(response.headers.get('last-modified') || Date.now()).toISOString(),
    title: feed.title,
    description: feed.description,
    link: feed.home_page_url,
    items: feed.items.map((item): RSSFeedItem => ({
      link: item.url,
      title: item.title,
      description: item.content_html === item.title ? '' : item.content_html,
      author: item.authors?.[0]?.name || '',
      date: item.date_published ? new Date(item.date_published).toISOString() : undefined,
    })),
  };

  tryToPatchFeedItems(result.items);

  return result;
}
