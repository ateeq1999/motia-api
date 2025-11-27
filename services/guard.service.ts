import db from "../db/connection";
import { Guard } from "../types/model.types";

class GuardService {
  private static instance: GuardService;

  private constructor() { }

  public static getInstance(): GuardService {
    if (!GuardService.instance) {
      GuardService.instance = new GuardService();
    }
    return GuardService.instance;
  }

  public async create(
    guard: Omit<Guard, "id" | "created_at">
  ): Promise<Guard> {
    const [newGuard] = await db("guards")
      .insert(guard)
      .returning("*");
    return newGuard;
  }

  public async delete(id: string): Promise<void> {
    await db("guards").where({ id }).del();
  }

  public async get(id: string): Promise<Guard | undefined> {
    return await db("guards").where({ id }).first();
  }

  public async list(): Promise<Guard[]> {
    return await db("guards").select("*");
  }

  public async update(
    id: string,
    updates: Partial<Omit<Guard, "id" | "created_at">>
  ): Promise<Guard | undefined> {
    const [updatedGuard] = await db("guards")
      .where({ id })
      .update(updates)
      .returning("*");
    return updatedGuard;
  }
}

export default GuardService.getInstance();
