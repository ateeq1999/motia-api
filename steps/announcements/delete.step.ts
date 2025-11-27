import type { ApiRouteConfig, Handlers } from 'motia';
import AnnouncementService from "../../services/announcement.service";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'DeleteAnnouncement',
  type: 'api',
  description: 'Deletes an announcement by ID',
  path: '/api/announcements/:id',
  method: 'DELETE',
  responseSchema: {
    200: z.object({ success: z.boolean() })
  },
  emits: [],
};

export const handler: Handlers['DeleteAnnouncement'] = async (req, { logger }) => {
  const { id } = (req as any).params;
  await AnnouncementService.delete(id);
  return { status: 200, body: { success: true } };
};
