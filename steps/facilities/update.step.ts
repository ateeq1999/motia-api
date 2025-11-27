import type { ApiRouteConfig, Handlers } from 'motia';
import FacilityService from "../../services/facility.service";
import { UpdateFacilitySchema, FacilitySchema } from "../../types/model.types";
import { z } from 'zod';
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
  name: 'UpdateFacility',
  type: 'api',
  description: 'Updates an existing facility',
  path: '/api/facilities/:id',
  method: 'PUT',
  bodySchema: UpdateFacilitySchema,
  responseSchema: {
    200: FacilitySchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['UpdateFacility'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  const validatedData = UpdateFacilitySchema.parse(req.body);
  const updatedFacility = await FacilityService.update(id, validatedData);

  if (!updatedFacility) {
    return { status: 404, body: { error: "Facility not found" } };
  }

  return { status: 200, body: updatedFacility };
};
