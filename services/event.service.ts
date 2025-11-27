import { createId } from "@paralleldrive/cuid2";
import db from "../db/connection";
import { Event } from "../types/model.types";

class EventService {
  private static instance: EventService;

  private constructor() { }

  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  public async create(
    event: Omit<Event, "id" | "created_at">
  ): Promise<Event> {
    const id = createId();
    const [newEvent] = await db("events")
      .insert({ ...event, id })
      .returning("*");
    return newEvent;
  }

  public async delete(id: string): Promise<void> {
    await db("events").where({ id }).del();
  }

  public async get(id: string): Promise<Event | undefined> {
    return await db("events").where({ id }).first();
  }

  public async list(): Promise<Event[]> {
    return await db("events").select("*");
  }

  public async update(
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

export default EventService.getInstance();
