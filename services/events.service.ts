import db from "../db/connection";
import { Advertisement } from "../types/model.types";

class EventService {
    public create = async (
        advertisement: Omit<Advertisement, "id" | "created_at">
    ): Promise<Advertisement> => {
        const [newAdvertisement] = await db("events")
            .insert(advertisement)
            .returning("*");
        return newAdvertisement;
    };

    public destroy = async (id: string): Promise<void> => {
        await db("events").where({ id }).del();
    };

    public show = async (id: string): Promise<Advertisement | undefined> => {
        return await db("events").where({ id }).first();
    };

    public index = async (): Promise<Advertisement[]> => {
        return await db("events").select("*");
    };

    public update = async (
        id: string,
        updates: Partial<Omit<Advertisement, "id" | "created_at">>
    ): Promise<Advertisement | undefined> => {
        const [updatedAdvertisement] = await db("events")
            .where({ id })
            .update(updates)
            .returning("*");
        return updatedAdvertisement;
    };
}

export default new EventService();
