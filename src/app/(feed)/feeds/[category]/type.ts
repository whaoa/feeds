import type * as feeds from '@/libs/feed';

// eslint-disable-next-line ts/consistent-type-definitions
export type RouteParams = {
  category: keyof typeof feeds;
};
