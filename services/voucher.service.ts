import { createId } from '@paralleldrive/cuid2';
import { CreateVoucher, UpdateVoucher, Voucher } from '../types/model.types';
import db from '../db/connection';

export class VoucherService {
    static async create(data: CreateVoucher): Promise<Voucher> {
        const id = createId();
        const [voucher] = await db('vouchers')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return voucher;
    }

    static async update(id: string, data: UpdateVoucher): Promise<Voucher | undefined> {
        const [voucher] = await db('vouchers')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return voucher;
    }

    static async list(): Promise<Voucher[]> {
        return db('vouchers').select('*');
    }

    static async get(id: string): Promise<Voucher | undefined> {
        return db('vouchers').where({ id }).first();
    }

    static async delete(id: string): Promise<void> {
        await db('vouchers').where({ id }).delete();
    }
}

export default VoucherService;
