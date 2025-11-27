import { createId } from "@paralleldrive/cuid2";
import db from "../db/connection";
import { Event } from "../types/model.types";

export class EventService {
  static async create(
    event: Omit<Event, "id" | "created_at">
  ): Promise<Event> {
    const id = createId();
    const [newEvent] = await db("events")
      .insert({ ...event, id })
      .returning("*");
    return newEvent;
  }

  static async delete(id: string): Promise<void> {
    await db("events").where({ id }).del();
  }

  static async findById(id: string): Promise<Event | undefined> {
    return await db("events").where({ id }).first();
  }

  static async findAll(): Promise<Event[]> {
    return await db("events").select("*");
  }

  static async update(
    id: string,
    updates: Partial<Omit<Event, "id" | "created_at">>
  ): Promise<Event | undefined> {
    const [updatedEvent] = await db("events")
      .where({ id })
      .update(updates)
      .returning("*");
    return updatedEvent;
  }
}

export default EventService;
