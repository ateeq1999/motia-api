import type { ApiRouteConfig, Handlers } from 'motia';
import AdvertisementService from "../../services/advertisement.service";
import { AdvertisementSchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { CacheService } from '../../services/cache.service';
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'ListAdvertisements',
  type: 'api',
  description: 'Lists all advertisements',
  path: '/api/advertisements',
  method: 'GET',
  responseSchema: {
    200: z.array(AdvertisementSchema)
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['ListAdvertisements'] = async (req, ctx) => {
  const cacheKey = 'list';

  const cached = await CacheService.get(ctx, 'advertisements', cacheKey);

  if (cached) {
    return { status: 200, body: cached };
  }

  const advertisements = await AdvertisementService.findAll();

  await CacheService.set(ctx, 'advertisements', cacheKey, advertisements);

  return { status: 200, body: advertisements };
};
