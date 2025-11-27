import type { ApiRouteConfig, Handlers } from 'motia';
import GuardService from "../../services/guard.service";
import { UpdateGuardSchema, GuardSchema } from "../../types/model.types";
import { z } from 'zod';
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
  name: 'UpdateGuard',
  type: 'api',
  description: 'Updates an existing guard',
  path: '/api/guards/:id',
  method: 'PUT',
  bodySchema: UpdateGuardSchema,
  responseSchema: {
    200: GuardSchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['UpdateGuard'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  const validatedData = UpdateGuardSchema.parse(req.body);
  const updatedGuard = await GuardService.update(id, validatedData);

  if (!updatedGuard) {
    return { status: 404, body: { error: "Guard not found" } };
  }

  return { status: 200, body: updatedGuard };
};
