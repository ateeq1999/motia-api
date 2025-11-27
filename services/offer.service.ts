import { createId } from '@paralleldrive/cuid2';
import { CreateOffer, UpdateOffer, Offer } from '../types/model.types';
import db from '../db/connection';

export class OfferService {
    static async create(data: CreateOffer): Promise<Offer> {
        const id = createId();
        const [offer] = await db('offers')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return offer;
    }

    static async update(id: string, data: UpdateOffer): Promise<Offer | undefined> {
        const [offer] = await db('offers')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return offer;
    }

    static async findAll(): Promise<Offer[]> {
        return db('offers').select('*');
    }

    static async findById(id: string): Promise<Offer | undefined> {
        return db('offers').where({ id }).first();
    }

    static async delete(id: string): Promise<boolean> {
        const deletedCount = await db('offers').where({ id }).delete();
        return deletedCount > 0;
    }
}

export default OfferService;
