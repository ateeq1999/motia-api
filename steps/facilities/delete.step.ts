import type { ApiRouteConfig, Handlers } from 'motia';
import FacilityService from "../../services/facility.service";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'DeleteFacility',
  type: 'api',
  description: 'Deletes a facility by ID',
  path: '/api/facilities/:id',
  method: 'DELETE',
  responseSchema: {
    200: z.object({ success: z.boolean() })
  },
  emits: [],
};

export const handler: Handlers['DeleteFacility'] = async (req, { logger }) => {
  const { id } = (req as any).params;
  await FacilityService.delete(id);
  return { status: 200, body: { success: true } };
};
