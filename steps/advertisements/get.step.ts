import type { ApiRouteConfig, Handlers } from 'motia';
import AdvertisementService from "../../services/advertisement.service";
import { AdvertisementSchema } from "../../types/model.types";
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
};

export const handler: Handlers['GetAdvertisement'] = async (req, { logger }) => {
  const { id } = req.params;
  const advertisement = await AdvertisementService.get(id);

  if (!advertisement) {
    return { status: 404, body: { error: "Advertisement not found" } };
  }

  return { status: 200, body: advertisement };
};
