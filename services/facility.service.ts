import { createId } from "@paralleldrive/cuid2";
import db from "../db/connection";
import { Facility } from "../types/model.types";

export class FacilityService {
  static async create(
    facility: Omit<Facility, "id" | "created_at">
  ): Promise<Facility> {
    const id = createId();
    const [newFacility] = await db("facilities")
      .insert({ ...facility, id })
      .returning("*");
    return newFacility;
  }

  static async delete(id: string): Promise<void> {
    await db("facilities").where({ id }).del();
  }

  static async findById(id: string): Promise<Facility | undefined> {
    return await db("facilities").where({ id }).first();
  }

  static async findAll(): Promise<Facility[]> {
    return await db("facilities").select("*");
  }

  static async update(
    id: string,
    updates: Partial<Omit<Facility, "id" | "created_at">>
  ): Promise<Facility | undefined> {
    const [updatedFacility] = await db("facilities")
      .where({ id })
      .update(updates)
      .returning("*");
    return updatedFacility;
  }
}

export default FacilityService;
