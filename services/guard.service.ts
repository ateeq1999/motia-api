import { createId } from "@paralleldrive/cuid2";
import db from "../db/connection";
import { Guard } from "../types/model.types";

export class GuardService {
  static async create(
    guard: Omit<Guard, "id" | "created_at">
  ): Promise<Guard> {
    const id = createId();
    const [newGuard] = await db("guards")
      .insert({ ...guard, id })
      .returning("*");
    return newGuard;
  }

  static async delete(id: string): Promise<void> {
    await db("guards").where({ id }).del();
  }

  static async findById(id: string): Promise<Guard | undefined> {
    return await db("guards").where({ id }).first();
  }

  static async findAll(): Promise<Guard[]> {
    return await db("guards").select("*");
  }

  static async update(
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

export default GuardService;
