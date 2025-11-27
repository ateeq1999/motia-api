import type { ApiRouteConfig, Handlers } from 'motia';
import AnnouncementService from "../../services/announcement.service";
import { UpdateAnnouncementSchema, AnnouncementSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'UpdateAnnouncement',
  type: 'api',
  description: 'Updates an existing announcement',
  path: '/api/announcements/:id',
  method: 'PUT',
  bodySchema: UpdateAnnouncementSchema,
  responseSchema: {
    200: AnnouncementSchema,
    404: z.object({ error: z.string() })
  },
  emits: [],
};

export const handler: Handlers['UpdateAnnouncement'] = async (req, { logger }) => {
  const { id } = (req as any).params;
  const validatedData = UpdateAnnouncementSchema.parse(req.body);
  const updatedAnnouncement = await AnnouncementService.update(id, validatedData);

  if (!updatedAnnouncement) {
    return { status: 404, body: { error: "Announcement not found" } };
  }

  return { status: 200, body: updatedAnnouncement };
};
