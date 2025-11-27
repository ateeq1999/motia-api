import type { ApiRouteConfig, Handlers } from 'motia';
import db from '../db/connection';
import { authMiddleware } from '../middlewares/auth.middleware';
import { errorMiddleware } from '../middlewares/error.middleware';
import { AppError } from '../errors/AppError';

export const config: ApiRouteConfig = {
    name: 'Me',
    type: 'api',
    description: 'Fetches the currently authenticated user.',
    path: '/api/auth/me',
    method: 'GET',
    middleware: [authMiddleware, errorMiddleware],
    emits: [],
}

export const handler: Handlers['Me'] = async (req, { logger }) => {
    // The user object is attached to the request by the authentication hook
    const userId = `${(req as any).user.id}`;

    const user = await db('users').where({ id: userId }).first();

    if (!user) {
        throw new AppError('User not found.', 404);
    }

    logger.info(`Fetched data for user ${user.email}.`);

    const { password, ...userWithoutPassword } = user;

    return { status: 201, body: { user: userWithoutPassword } };
}
