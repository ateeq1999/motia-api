import type { ApiRouteConfig, Handlers } from 'motia';
import EventService from "../../services/event.service";
import { EventSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'ListEvents',
  type: 'api',
  description: 'Lists all events',
  path: '/api/events',
  method: 'GET',
  responseSchema: {
    200: z.array(EventSchema)
  },
  emits: [],
};

export const handler: Handlers['ListEvents'] = async (req, { logger }) => {
  const events = await EventService.list();
  return { status: 200, body: events };
};
