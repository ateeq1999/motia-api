import type { ApiRouteConfig, Handlers } from 'motia';
import db from '../db/connection';
import { authMiddleware } from '../middlewares/auth.middleware';

export const config: ApiRouteConfig = {
    name: 'Me',
    type: 'api',
    description: 'Fetches the currently authenticated user.',
    path: '/api/auth/me',
    method: 'GET',
    middleware: [authMiddleware],
    emits: [],
}

export const handler: Handlers['Me'] = async (req, { logger }) => {
    // The user object is attached to the request by the authentication hook
    const userId = req.user.id;

    const user = await db('users').where({ id: userId }).first();

    if (!user) {
        throw new Error('User not found.');
    }

    logger.info(`Fetched data for user ${user.email}.`);

    const { password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
}
