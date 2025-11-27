import type { ApiRouteConfig, Handlers } from 'motia';
import AdvertisementService from "../../services/advertisement.service";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'DeleteAdvertisement',
  type: 'api',
  description: 'Deletes an advertisement by ID',
  path: '/api/advertisements/:id',
  method: 'DELETE',
  responseSchema: {
    200: z.object({ success: z.boolean() })
  },
  emits: [],
};

export const handler: Handlers['DeleteAdvertisement'] = async (req, { logger }) => {
  const { id } = req.params;
  await AdvertisementService.delete(id);
  return { status: 200, body: { success: true } };
};
