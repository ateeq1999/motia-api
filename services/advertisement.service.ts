import { createId } from "@paralleldrive/cuid2";
import db from "../db/connection";
import { Advertisement } from "../types/model.types";

export class AdvertisementService {
  static async create(
    advertisement: Omit<Advertisement, "id" | "created_at">
  ): Promise<Advertisement> {
    const id = createId();
    const [newAdvertisement] = await db("advertisements")
      .insert({ ...advertisement, id })
      .returning("*");
    return newAdvertisement;
  }

  static async delete(id: string): Promise<void> {
    await db("advertisements").where({ id }).del();
  }

  static async findById(id: string): Promise<Advertisement | undefined> {
    return await db("advertisements").where({ id }).first();
  }

  static async findAll(): Promise<Advertisement[]> {
    return await db("advertisements").select("*");
  }

  static async update(
    id: string,
    updates: Partial<Omit<Advertisement, "id" | "created_at">>
  ): Promise<Advertisement | undefined> {
    const [updatedAdvertisement] = await db("advertisements")
      .where({ id })
      .update(updates)
      .returning("*");
    return updatedAdvertisement;
  }
}

export default AdvertisementService;