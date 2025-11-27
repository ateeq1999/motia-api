import type { ApiRouteConfig, Handlers } from 'motia';
import AnnouncementService from "../../services/announcement.service";
import { AnnouncementSchema } from "../../types/model.types";
import { z } from 'zod';
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
  name: 'GetAnnouncement',
  type: 'api',
  description: 'Gets a single announcement by ID',
  path: '/api/announcements/:id',
  method: 'GET',
  responseSchema: {
    200: AnnouncementSchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
  middleware: [errorMiddleware],
};

export const handler: Handlers['GetAnnouncement'] = async (req, { logger }) => {
  const { id } = req.pathParams;
  const announcement = await AnnouncementService.findById(id);

  if (!announcement) {
    return { status: 404, body: { error: "Announcement not found" } };
  }

  return { status: 200, body: announcement };
};
