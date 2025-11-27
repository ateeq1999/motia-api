import type { ApiRouteConfig, Handlers } from 'motia';
import FacilityService from "../../services/facility.service";
import { CreateFacilitySchema, FacilitySchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
  name: 'CreateFacility',
  type: 'api',
  description: 'Creates a new facility',
  path: '/api/facilities',
  method: 'POST',
  bodySchema: CreateFacilitySchema,
  responseSchema: {
    201: FacilitySchema
  },
  emits: [],
};

export const handler: Handlers['CreateFacility'] = async (req, { logger }) => {
  const validatedData = CreateFacilitySchema.parse(req.body);
  const newFacility = await FacilityService.create(validatedData);
  return { status: 201, body: newFacility };
};
