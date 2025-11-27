import type { ApiRouteConfig, Handlers } from 'motia';
import AdvertisementService from "../../services/advertisement.service";
import { UpdateAdvertisementSchema, AdvertisementSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'UpdateAdvertisement',
  type: 'api',
  description: 'Updates an existing advertisement',
  path: '/api/advertisements/:id',
  method: 'PUT',
  bodySchema: UpdateAdvertisementSchema,
  responseSchema: {
    200: AdvertisementSchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
};

export const handler: Handlers['UpdateAdvertisement'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  const validatedData = UpdateAdvertisementSchema.parse(req.body);
  const updatedAdvertisement = await AdvertisementService.update(id, validatedData);

  if (!updatedAdvertisement) {
    return { status: 404, body: { error: "Advertisement not found" } };
  }

  return { status: 200, body: updatedAdvertisement };
};
