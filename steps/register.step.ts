import type { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';
import db from '../db/connection';
import bcrypt from 'bcrypt';
import { createId } from '@paralleldrive/cuid2';
import { errorMiddleware } from '../middlewares/error.middleware';
import { AppError } from '../errors/AppError';

const registerSchema = z.object({
    email: z.string().email('Invalid email address').min(1, 'Email is required').max(255, 'Email must be less than 255 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const config: ApiRouteConfig = {
    name: 'Register',
    type: 'api',
    description: 'Handles user register requests.',
    path: '/api/auth/register',
    method: 'POST',
    bodySchema: registerSchema,
    emits: [],
    middleware: [errorMiddleware],
}

export const handler: Handlers['Register'] = async (req, { logger }) => {
    const { email, password } = registerSchema.parse(req.body);

    const existingUser = await db('users').where({ email }).first();

    if (existingUser) {
        throw new AppError('User with this email already exists.', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = createId();

    await db('users').insert({
        id,
        email,
        password: hashedPassword,
    });

    logger.info(`User ${email} registered successfully.`);

    return { status: 201, body: { user: { id, email } } };
}
