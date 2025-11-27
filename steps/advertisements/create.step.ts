import type { ApiRouteConfig, Handlers } from 'motia';
import AdvertisementService from "../../services/advertisement.service";
import { CreateAdvertisementSchema, AdvertisementSchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { CacheService } from '../../services/cache.service';

export const config: ApiRouteConfig = {
  name: 'CreateAdvertisement',
  type: 'api',
  description: 'Creates a new advertisement',
  path: '/api/advertisements',
  method: 'POST',
  bodySchema: CreateAdvertisementSchema,
  responseSchema: {
    201: AdvertisementSchema
  },
  middleware: [errorMiddleware],
  emits: [],
};

export const handler: Handlers['CreateAdvertisement'] = async (req, ctx) => {
  const data = CreateAdvertisementSchema.parse(req.body);

  const advertisement = await AdvertisementService.create(data);

  await CacheService.invalidate(ctx, 'advertisements');

  return { status: 201, body: advertisement };
};
