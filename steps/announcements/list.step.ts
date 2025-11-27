import type { ApiRouteConfig, Handlers } from 'motia';
import AnnouncementService from "../../services/announcement.service";
import { AnnouncementSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'ListAnnouncements',
  type: 'api',
  description: 'Lists all announcements',
  path: '/api/announcements',
  method: 'GET',
  responseSchema: {
    200: z.array(AnnouncementSchema)
  },
  emits: [],
};

export const handler: Handlers['ListAnnouncements'] = async (req, { logger }) => {
  const announcements = await AnnouncementService.findAll();
  return { status: 200, body: announcements };
};
