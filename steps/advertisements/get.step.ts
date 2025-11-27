import type { ApiRouteConfig, Handlers } from 'motia';
import AdvertisementService from "../../services/advertisement.service";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { UpdateAdvertisementSchema, AdvertisementSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'GetAdvertisement',
  type: 'api',
  description: 'Gets a single advertisement by ID',
  path: '/api/advertisements/:id',
  method: 'GET',
  responseSchema: {
    200: AdvertisementSchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['GetAdvertisement'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  const advertisement = await AdvertisementService.findById(id);

  if (!advertisement) {
    return { status: 404, body: { error: "Advertisement not found" } };
  }

  return { status: 200, body: advertisement };
};
