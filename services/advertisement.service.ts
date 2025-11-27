import db from "../db/connection";
import { Advertisement } from "../types/model.types";

class AdvertisementService {
  private static instance: AdvertisementService;

  private constructor() { }

  public static getInstance(): AdvertisementService {
    if (!AdvertisementService.instance) {
      AdvertisementService.instance = new AdvertisementService();
    }
    return AdvertisementService.instance;
  }

  public async create(
    advertisement: Omit<Advertisement, "id" | "created_at">
  ): Promise<Advertisement> {
    const [newAdvertisement] = await db("advertisements")
      .insert(advertisement)
      .returning("*");
    return newAdvertisement;
  }

  public async delete(id: string): Promise<void> {
    await db("advertisements").where({ id }).del();
  }

  public async get(id: string): Promise<Advertisement | undefined> {
    return await db("advertisements").where({ id }).first();
  }

  public async list(): Promise<Advertisement[]> {
    return await db("advertisements").select("*");
  }

  public async update(
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

export default AdvertisementService.getInstance();