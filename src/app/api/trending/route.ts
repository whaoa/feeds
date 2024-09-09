import * as v from 'valibot';

import { createRouteHandler } from '@/libs/server';
import { fetchTrending } from '@/libs/trending';
import { TrendingPeriod } from '@/types/trending';

const PeriodSchema = v.nullish(
  v.enum(TrendingPeriod, 'period must be one of daily, weekly, monthly'),
  TrendingPeriod.daily,
);

export const GET = createRouteHandler(async (request) => {
  const period = v.parse(PeriodSchema, request.nextUrl.searchParams.get('period'));
  const trending = await fetchTrending(period);
  return Response.json(trending, {
    headers: {
      'cache-control': 'public, max-age=600',
    },
  });
});
