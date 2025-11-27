import type { ApiRouteConfig, Handlers } from 'motia';
import EventService from "../../services/event.service";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'DeleteEvent',
  type: 'api',
  description: 'Deletes an event by ID',
  path: '/api/events/:id',
  method: 'DELETE',
  responseSchema: {
    200: z.object({ success: z.boolean() })
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['DeleteEvent'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  await EventService.delete(id);
  return { status: 200, body: { success: true } };
};
