import { createId } from "@paralleldrive/cuid2";
import db from "../db/connection";
import { Announcement } from "../types/model.types";

export class AnnouncementService {
  static async create(
    announcement: Omit<Announcement, "id" | "created_at">
  ): Promise<Announcement> {
    const id = createId();
    const [newAnnouncement] = await db("announcements")
      .insert({ ...announcement, id })
      .returning("*");
    return newAnnouncement;
  }

  static async delete(id: string): Promise<void> {
    await db("announcements").where({ id }).del();
  }

  static async findById(id: string): Promise<Announcement | undefined> {
    return await db("announcements").where({ id }).first();
  }

  static async findAll(): Promise<Announcement[]> {
    return await db("announcements").select("*");
  }

  static async update(
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

export default AnnouncementService;