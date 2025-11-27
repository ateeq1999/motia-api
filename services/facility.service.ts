import db from "../db/connection";
import { Facility } from "../types/model.types";

class FacilityService {
  private static instance: FacilityService;

  private constructor() { }

  public static getInstance(): FacilityService {
    if (!FacilityService.instance) {
      FacilityService.instance = new FacilityService();
    }
    return FacilityService.instance;
  }

  public async create(
    facility: Omit<Facility, "id" | "created_at">
  ): Promise<Facility> {
    const [newFacility] = await db("facilities")
      .insert(facility)
      .returning("*");
    return newFacility;
  }

  public async delete(id: string): Promise<void> {
    await db("facilities").where({ id }).del();
  }

  public async get(id: string): Promise<Facility | undefined> {
    return await db("facilities").where({ id }).first();
  }

  public async list(): Promise<Facility[]> {
    return await db("facilities").select("*");
  }

  public async update(
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

export default FacilityService.getInstance();
