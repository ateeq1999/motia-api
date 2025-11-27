import { createId } from '@paralleldrive/cuid2';
import { CreateProperty, UpdateProperty, Property } from '../types/model.types';
import db from '../db/connection';

export class PropertyService {
    static async create(data: CreateProperty): Promise<Property> {
        const id = createId();
        const [property] = await db('properties')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return property;
    }

    static async update(id: string, data: UpdateProperty): Promise<Property | undefined> {
        const [property] = await db('properties')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return property;
    }

    static async findAll(): Promise<Property[]> {
        return db('properties').select('*');
    }

    static async findById(id: string): Promise<Property | undefined> {
        return db('properties').where({ id }).first();
    }

    static async delete(id: string): Promise<boolean> {
        const deletedCount = await db('properties').where({ id }).delete();
        return deletedCount > 0;
    }
}

export default PropertyService;
