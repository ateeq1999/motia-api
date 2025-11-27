import type { ApiRouteConfig, Handlers } from 'motia';
import AnnouncementService from "../../services/announcement.service";
import { CreateAnnouncementSchema, AnnouncementSchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
  name: 'CreateAnnouncement',
  type: 'api',
  description: 'Creates a new announcement',
  path: '/api/announcements',
  method: 'POST',
  bodySchema: CreateAnnouncementSchema,
  responseSchema: {
    201: AnnouncementSchema
  },
  emits: [],
};

export const handler: Handlers['CreateAnnouncement'] = async (req, { logger }) => {
  const validatedData = CreateAnnouncementSchema.parse(req.body);
  const newAnnouncement = await AnnouncementService.create(validatedData);
  return { status: 201, body: newAnnouncement };
};
