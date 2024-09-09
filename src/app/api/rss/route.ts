import * as v from 'valibot';

import { createRouteHandler } from '@/libs/server';
import { fetchRSSFeed } from '@/libs/rss';

import type { NextRequest } from 'next/server';

const RouteSchema = v.pipe(
  v.string('route must be a string'),
  v.transform(decodeURIComponent),
  v.trim(),
  v.nonEmpty('route should contain at least one character'),
  v.startsWith('/', 'route must start with /'),
);

export const GET = createRouteHandler(async (request: NextRequest) => {
  const route = v.parse(RouteSchema, request.nextUrl.searchParams.get('route'));
  const feed = await fetchRSSFeed(route);
  return Response.json(feed, {
    headers: {
      'cache-control': 'public, max-age=600',
    },
  });
});
