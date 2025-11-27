import type { ApiRouteConfig, Handlers } from 'motia';
import EventService from "../../services/event.service";
import { CreateEventSchema, EventSchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
  name: 'CreateEvent',
  type: 'api',
  description: 'Creates a new event',
  path: '/api/events',
  method: 'POST',
  bodySchema: CreateEventSchema,
  responseSchema: {
    201: EventSchema
  },
  emits: [],
};

export const handler: Handlers['CreateEvent'] = async (req, { logger }) => {
  const validatedData = CreateEventSchema.parse(req.body);
  const newEvent = await EventService.create(validatedData);
  return { status: 201, body: newEvent };
};
