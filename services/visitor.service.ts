import { createId } from '@paralleldrive/cuid2';
import { CreateVisitor, UpdateVisitor, Visitor } from '../types/model.types';
import db from '../db/connection';

export class VisitorService {
    static async create(data: CreateVisitor): Promise<Visitor> {
        const id = createId();
        const [visitor] = await db('visitors')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return visitor;
    }

    static async update(id: string, data: UpdateVisitor): Promise<Visitor | undefined> {
        const [visitor] = await db('visitors')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return visitor;
    }

    static async findAll(): Promise<Visitor[]> {
        return db('visitors').select('*');
    }

    static async findById(id: string): Promise<Visitor | undefined> {
        return db('visitors').where({ id }).first();
    }

    static async delete(id: string): Promise<boolean> {
        const deletedCount = await db('visitors').where({ id }).delete();
        return deletedCount > 0;
    }
}

export default VisitorService;
