import type { ApiRouteConfig, Handlers } from 'motia';
import FacilityService from "../../services/facility.service";
import { FacilitySchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'GetFacility',
  type: 'api',
  description: 'Gets a single facility by ID',
  path: '/api/facilities/:id',
  method: 'GET',
  responseSchema: {
    200: FacilitySchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
};

export const handler: Handlers['GetFacility'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  const facility = await FacilityService.findById(id);

  if (!facility) {
    return { status: 404, body: { error: "Facility not found" } };
  }

  return { status: 200, body: facility };
};
