import type { ApiRouteConfig, Handlers } from 'motia';
import FacilityService from "../../services/facility.service";
import { FacilitySchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'ListFacilities',
  type: 'api',
  description: 'Lists all facilities',
  path: '/api/facilities',
  method: 'GET',
  responseSchema: {
    200: z.array(FacilitySchema)
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['ListFacilities'] = async (req, { logger }) => {
  const facilities = await FacilityService.findAll();
  return { status: 200, body: facilities };
};
