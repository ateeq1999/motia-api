import { createId } from '@paralleldrive/cuid2';
import { CreatePropertyCategory, UpdatePropertyCategory, PropertyCategory } from '../types/model.types';
import db from '../db/connection';

export class PropertyCategoryService {
    static async create(data: CreatePropertyCategory): Promise<PropertyCategory> {
        const id = createId();
        const [propertyCategory] = await db('property_categories')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return propertyCategory;
    }

    static async update(id: string, data: UpdatePropertyCategory): Promise<PropertyCategory | undefined> {
        const [propertyCategory] = await db('property_categories')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return propertyCategory;
    }

    static async findAll(): Promise<PropertyCategory[]> {
        return db('property_categories').select('*');
    }

    static async findById(id: string): Promise<PropertyCategory | undefined> {
        return db('property_categories').where({ id }).first();
    }

    static async delete(id: string): Promise<boolean> {
        const deletedCount = await db('property_categories').where({ id }).delete();
        return deletedCount > 0;
    }
}

export default PropertyCategoryService;
