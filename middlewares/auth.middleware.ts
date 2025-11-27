import type { ApiMiddleware } from 'motia';
import jwt from 'jsonwebtoken';

export const authMiddleware: ApiMiddleware = async (req, ctx, next) => {
    let authHeader = req.headers?.authorization;

    // Handle potential string[] type for headers
    if (Array.isArray(authHeader)) {
        authHeader = authHeader[0]; // Take the first header if multiple are present
    }

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

        if (typeof decoded === 'string') {
            ctx.logger.error('JWT verification failed: Invalid token payload type.');
            return {
                status: 401,
                body: { error: 'Unauthorized: Invalid token' },
            };
        }

        (req as any).user = decoded as { id: string; email: string };
        return await next();
    } catch (error) {
        ctx.logger.error('JWT verification failed', { error });
        return {
            status: 401,
            body: { error: 'Unauthorized: Invalid token' },
        };
    }
};
