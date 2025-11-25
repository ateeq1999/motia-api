import type { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';
import db from '../db/connection';
import bcrypt from 'bcrypt';

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
}

export const handler: Handlers['Login'] = async (req, { app, logger }) => {
    const { email, password } = loginSchema.parse(req.body);

    const user = await db('users').where({ email }).first();

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password.');
    }

    const token = app.jwt.sign({
        id: user.id,
        email: user.email,
    });

    logger.info(`User ${email} logged in successfully.`);

    return { success: true, token };
}
