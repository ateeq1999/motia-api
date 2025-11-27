import { createId } from '@paralleldrive/cuid2';
import { CreateSecurityCheckLog, UpdateSecurityCheckLog, SecurityCheckLog } from '../types/model.types';
import db from '../db/connection';

export class SecurityCheckLogService {
    static async create(data: CreateSecurityCheckLog): Promise<SecurityCheckLog> {
        const id = createId();
        const [securityCheckLog] = await db('security_check_logs')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return securityCheckLog;
    }

    static async update(id: string, data: UpdateSecurityCheckLog): Promise<SecurityCheckLog | undefined> {
        const [securityCheckLog] = await db('security_check_logs')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return securityCheckLog;
    }

    static async findAll(): Promise<SecurityCheckLog[]> {
        return db('security_check_logs').select('*');
    }

    static async findById(id: string): Promise<SecurityCheckLog | undefined> {
        return db('security_check_logs').where({ id }).first();
    }

    static async delete(id: string): Promise<boolean> {
        const deletedCount = await db('security_check_logs').where({ id }).delete();
        return deletedCount > 0;
    }
}

export default SecurityCheckLogService;
