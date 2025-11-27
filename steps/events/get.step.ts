import type { ApiRouteConfig, Handlers } from 'motia';
import EventService from "../../services/event.service";
import { EventSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'GetEvent',
  type: 'api',
  description: 'Gets a single event by ID',
  path: '/api/events/:id',
  method: 'GET',
  responseSchema: {
    200: EventSchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
};

export const handler: Handlers['GetEvent'] = async (req, { logger }) => {
  const { id } = (req as any).params;
  const event = await EventService.findById(id);

  if (!event) {
    return { status: 404, body: { error: "Event not found" } };
  }

  return { status: 200, body: event };
};
