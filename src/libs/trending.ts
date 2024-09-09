import 'server-only';

import { request } from '@/libs/util';

import type { TrendingItem, TrendingPeriod } from '@/types/trending';

interface TopHubTrendingResponse {
  error: boolean;
  status: number;
  data: Array<{
    ID: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    extra: string;
    time: string;
    domain: string;
    sitename: string;
    logo: string;
    views: string;
  }>;
}

export async function fetchTrending(period: TrendingPeriod) {
  const response = await request('https://tophub.today/do', {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'origin': 'https://tophub.today',
      'referer': 'https://tophub.today/',
      'accept': '*/*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-requested-with': 'XMLHttpRequest',
    },
    method: 'POST',
    body: `c=hot&t=${period}`,
    next: { revalidate: 60 * 10, tags: ['trending', period] },
  });

  const json = await response.json<TopHubTrendingResponse>();

  if (json.error || json.status !== 200 || !Array.isArray(json.data)) {
    throw new Error('Failed to fetch trending');
  }

  return {
    date: new Date(response.headers.get('date') || Date.now()).toISOString(),
    items: json.data.map((item): TrendingItem => ({
      website: item.domain,
      websiteLabel: item.sitename,
      id: item.ID,
      link: item.url,
      title: item.title,
      description: item.description.indexOf('&lt;') === 0 ? '' : item.description,
      label: item.views,
      extra: item.extra,
      image: item.thumbnail,
    })),
  };
}
