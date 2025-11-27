import type { ApiRouteConfig, Handlers } from 'motia';
import GuardService from "../../services/guard.service";
import { CreateGuardSchema, GuardSchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
  name: 'CreateGuard',
  type: 'api',
  description: 'Creates a new guard',
  path: '/api/guards',
  method: 'POST',
  bodySchema: CreateGuardSchema,
  responseSchema: {
    201: GuardSchema
  },
  emits: [],
};

export const handler: Handlers['CreateGuard'] = async (req, { logger }) => {
  const validatedData = CreateGuardSchema.parse(req.body);
  const newGuard = await GuardService.create(validatedData);
  return { status: 201, body: newGuard };
};
