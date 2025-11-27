import type { ApiRouteConfig, Handlers } from 'motia';
import GuardService from "../../services/guard.service";
import { GuardSchema } from "../../types/model.types";
import { z } from 'zod';
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
  name: 'GetGuard',
  type: 'api',
  description: 'Gets a single guard by ID',
  path: '/api/guards/:id',
  method: 'GET',
  responseSchema: {
    200: GuardSchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['GetGuard'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  const guard = await GuardService.findById(id);

  if (!guard) {
    return { status: 404, body: { error: "Guard not found" } };
  }

  return { status: 200, body: guard };
};
