import { createId } from '@paralleldrive/cuid2';
import { CreateResident, UpdateResident, Resident } from '../types/model.types';
import db from '../db/connection';

export class ResidentService {
    static async create(data: CreateResident): Promise<Resident> {
        const id = createId();
        const [resident] = await db('residents')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return resident;
    }

    static async update(id: string, data: UpdateResident): Promise<Resident | undefined> {
        const [resident] = await db('residents')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return resident;
    }

    static async findAll(): Promise<Resident[]> {
        return db('residents').select('*');
    }

    static async findById(id: string): Promise<Resident | undefined> {
        return db('residents').where({ id }).first();
    }

    static async delete(id: string): Promise<boolean> {
        const deletedCount = await db('residents').where({ id }).delete();
        return deletedCount > 0;
    }
}

export default ResidentService;
