import type { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.email().min(1, 'Email is required').max(255, 'Email must be less than 255 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const config: ApiRouteConfig = {
    name: 'Login',
    type: 'api',
    description: 'Handles user login requests.',
    path: '/login',
    method: 'POST',
    bodySchema: loginSchema,
    emits: ['UserLoggedIn'],
}

export const handler: Handlers['Login'] = async (req, { emit, logger }) => {
    // Validate the incoming data against the schema
    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
        logger.error('Login validation failed', parsedData.error);
        throw new Error('Invalid login data');
    }

    const { email, password } = parsedData.data;
    // Here you would typically check the credentials against your user database
    // For demonstration, let's assume the credentials are valid
    const user = { id: '123', email, password };

    // Emit an event indicating the user has logged in
    emit('UserLoggedIn', { user });
    logger.info(`User ${email} logged in successfully.`);
    return { success: true, user };
}
