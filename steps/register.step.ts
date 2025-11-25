import type { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
    email: z.email('Invalid email address').min(1, 'Email is required').max(255, 'Email must be less than 255 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const config: ApiRouteConfig = {
    name: 'Register',
    type: 'api',
    description: 'Handles user register requests.',
    path: '/register',
    method: 'POST',
    bodySchema: registerSchema,
    emits: ['UserRegistered'],
}

export const handler: Handlers['Register'] = async (req, { emit, logger }) => {
    // Validate the incoming data against the schema
    const parsedData = registerSchema.safeParse(req.body);

    if (!parsedData.success) {
        logger.error('register validation failed', parsedData.error);
        throw new Error('Invalid register data');
    }

    // Emit an event indicating the user has logged in
    emit('UserRegistered', { user: parsedData.data });

    logger.info(`User ${parsedData.data.email} registered successfully.`);

    return { success: true, user: parsedData.data };
}
