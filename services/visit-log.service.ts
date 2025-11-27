import { createId } from '@paralleldrive/cuid2';
import { CreateVisitLog, UpdateVisitLog, VisitLog } from '../types/model.types';
import db from '../db/connection';

export class VisitLogService {
    static async create(data: CreateVisitLog): Promise<VisitLog> {
        const id = createId();
        const [visitLog] = await db('visit_logs')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return visitLog;
    }

    static async update(id: string, data: UpdateVisitLog): Promise<VisitLog | undefined> {
        const [visitLog] = await db('visit_logs')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return visitLog;
    }

    static async findAll(): Promise<VisitLog[]> {
        return db('visit_logs').select('*');
    }

    static async findById(id: string): Promise<VisitLog | undefined> {
        return db('visit_logs').where({ id }).first();
    }

    static async delete(id: string): Promise<boolean> {
        const deletedCount = await db('visit_logs').where({ id }).delete();
        return deletedCount > 0;
    }
}

export default VisitLogService;
