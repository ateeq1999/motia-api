import db from "../db/connection";
import { Announcement } from "../types/model.types";

class AnnouncementService {
  private static instance: AnnouncementService;

  private constructor() { }

  public static getInstance(): AnnouncementService {
    if (!AnnouncementService.instance) {
      AnnouncementService.instance = new AnnouncementService();
    }
    return AnnouncementService.instance;
  }

  public async create(
    announcement: Omit<Announcement, "id" | "created_at">
  ): Promise<Announcement> {
    const [newAnnouncement] = await db("announcements")
      .insert(announcement)
      .returning("*");
    return newAnnouncement;
  }

  public async delete(id: string): Promise<void> {
    await db("announcements").where({ id }).del();
  }

  public async get(id: string): Promise<Announcement | undefined> {
    return await db("announcements").where({ id }).first();
  }

  public async list(): Promise<Announcement[]> {
    return await db("announcements").select("*");
  }

  public async update(
    id: string,
    updates: Partial<Omit<Announcement, "id" | "created_at">>
  ): Promise<Announcement | undefined> {
    const [updatedAnnouncement] = await db("announcements")
      .where({ id })
      .update(updates)
      .returning("*");
    return updatedAnnouncement;
  }
}

export default AnnouncementService.getInstance();