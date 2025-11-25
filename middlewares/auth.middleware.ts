import type { ApiMiddleware } from 'motia';
import jwt from 'jsonwebtoken';

// Extend the Request object to include the user property
declare module 'motia' {
    interface Request {
        user?: { id: string; email: string };
    }
}

export const authMiddleware: ApiMiddleware = async (req, ctx, next) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            status: 401,
            body: { error: 'Unauthorized: No token provided' },
        };
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        ctx.logger.error('JWT_SECRET is not defined in environment variables.');
        return {
            status: 500,
            body: { error: 'Internal Server Error: JWT secret is not configured.' },
        };
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded as { id: string; email: string };
        return await next();
    } catch (error) {
        ctx.logger.error('JWT verification failed', { error });
        return {
            status: 401,
            body: { error: 'Unauthorized: Invalid token' },
        };
    }
};
