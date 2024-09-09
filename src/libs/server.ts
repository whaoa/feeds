import 'server-only';
import { ValiError } from 'valibot';

import type { NextRequest } from 'next/server';

export function createRouteHandler<T = unknown>(
  handler: (request: NextRequest, params: T) => any,
) {
  return async function APIRouteHandler(request: NextRequest, params: T) {
    try {
      const response = await handler(request, params);
      return response instanceof Response ? response : Response.json(response);
    } catch (error: any) {
      if (error instanceof ValiError) {
        return Response.json({ message: error.message }, { status: 400 });
      }
      return Response.json({ message: error?.message || 'Internal server error' }, { status: 500 });
    }
  };
}
