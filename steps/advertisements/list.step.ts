import type { ApiRouteConfig, Handlers } from 'motia';
import AdvertisementService from "../../services/advertisement.service";
import { AdvertisementSchema } from "../../types/model.types";
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
};

export const handler: Handlers['ListAdvertisements'] = async (req, { logger }) => {
  const advertisements = await AdvertisementService.findAll();
  return { status: 200, body: advertisements };
};
