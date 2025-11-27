import { createId } from '@paralleldrive/cuid2';
import { CreateProfile, UpdateProfile, Profile } from '../types/model.types';
import db from '../db/connection';

export class ProfileService {
    static async create(data: CreateProfile): Promise<Profile> {
        const id = createId();
        const [profile] = await db('profiles')
            .insert({
                ...data,
                id,
            })
            .returning('*');
        return profile;
    }

    static async update(id: string, data: UpdateProfile): Promise<Profile | undefined> {
        const [profile] = await db('profiles')
            .where({ id })
            .update({
                ...data,
            })
            .returning('*');
        return profile;
    }

    static async findAll(): Promise<Profile[]> {
        return db('profiles').select('*');
    }

    static async findById(id: string): Promise<Profile | undefined> {
        return db('profiles').where({ id }).first();
    }

    static async delete(id: string): Promise<boolean> {
        const deletedCount = await db('profiles').where({ id }).delete();
        return deletedCount > 0;
    }
}

export default ProfileService;
