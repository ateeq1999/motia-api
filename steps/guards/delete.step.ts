import type { ApiRouteConfig, Handlers } from 'motia';
import GuardService from "../../services/guard.service";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'DeleteGuard',
  type: 'api',
  description: 'Deletes a guard by ID',
  path: '/api/guards/:id',
  method: 'DELETE',
  responseSchema: {
    200: z.object({ success: z.boolean() })
  },
  emits: [],
};

export const handler: Handlers['DeleteGuard'] = async (req, { logger }) => {
  const { id } = req.params;
  await GuardService.delete(id);
  return { status: 200, body: { success: true } };
};
