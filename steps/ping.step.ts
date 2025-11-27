import type { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';
import { errorMiddleware } from '../middlewares/error.middleware';

const pingSchema = z.object({
    name: z.string().optional().default('World'),
})

const responseSchema = z.object({
    status: z.number().int().min(100).max(599),
    data: z.object({
        message: z.string(),
    }),
});

export const config: ApiRouteConfig = {
    name: 'Ping',
    type: 'api',
    description: 'Handles ping requests.',
    path: '/api/ping',
    method: 'POST',
    bodySchema: pingSchema,
    emits: [],
    middleware: [errorMiddleware],
}

export const handler: Handlers['Ping'] = async (req, { logger }) => {
    const { name } = pingSchema.parse(req.body);

    logger.info(`Ping received from ${name}.`);

    return { status: 201, body: { message: `Hello, ${name}!` } };
}
