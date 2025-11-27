import type { ApiRouteConfig, Handlers } from 'motia';
import AdvertisementService from "../../services/advertisement.service";
import { CreateAdvertisementSchema, AdvertisementSchema } from "../../types/model.types";

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
  emits: [],
};

export const handler: Handlers['CreateAdvertisement'] = async (req, { logger }) => {
  const validatedData = CreateAdvertisementSchema.parse(req.body);
  const newAdvertisement = await AdvertisementService.create(validatedData);
  return { status: 201, body: newAdvertisement };
};

