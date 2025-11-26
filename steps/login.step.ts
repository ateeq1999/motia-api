import type { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';
import db from '../db/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginSchema = z.object({
    email: z.string().email('Invalid email address').min(1, 'Email is required').max(255, 'Email must be less than 255 characters'),
    password: z.string(),
})

export const config: ApiRouteConfig = {
    name: 'Login',
    type: 'api',
    description: 'Handles user login requests.',
    path: '/api/auth/login',
    method: 'POST',
    bodySchema: loginSchema,
    emits: [],
}

export const handler: Handlers['Login'] = async (req, { logger }) => {
    const { email, password } = loginSchema.parse(req.body);

    const user = await db('users').where({ email }).first();

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password.');
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        logger.error('JWT_SECRET is not defined in environment variables.');
        throw new Error('Internal Server Error: JWT secret is not configured.');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        secret,
        { expiresIn: '1h' }
    );

    logger.info(`User ${email} logged in successfully.`);

    return { status: 201, body: { token } };
}
