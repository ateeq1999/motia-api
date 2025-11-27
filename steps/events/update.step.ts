import type { ApiRouteConfig, Handlers } from 'motia';
import EventService from "../../services/event.service";
import { UpdateEventSchema, EventSchema } from "../../types/model.types";
import { z } from 'zod';
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
  name: 'UpdateEvent',
  type: 'api',
  description: 'Updates an existing event',
  path: '/api/events/:id',
  method: 'PUT',
  bodySchema: UpdateEventSchema,
  responseSchema: {
    200: EventSchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['UpdateEvent'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  const validatedData = UpdateEventSchema.parse(req.body);
  const updatedEvent = await EventService.update(id, validatedData);

  if (!updatedEvent) {
    return { status: 404, body: { error: "Event not found" } };
  }

  return { status: 200, body: updatedEvent };
};
