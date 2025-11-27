import type { ApiRouteConfig, Handlers } from 'motia';
import GuardService from "../../services/guard.service";
import { GuardSchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'ListGuards',
  type: 'api',
  description: 'Lists all guards',
  path: '/api/guards',
  method: 'GET',
  responseSchema: {
    200: z.array(GuardSchema)
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['ListGuards'] = async (req, { logger }) => {
  const guards = await GuardService.findAll();
  return { status: 200, body: guards };
};
