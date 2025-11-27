import type { ApiRouteConfig, Handlers } from 'motia';
import ProfileService from "../../services/profile.service";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeleteProfile',
    type: 'api',
    description: 'Deletes a profile by ID',
    path: '/api/profiles/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['DeleteProfile'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    await ProfileService.delete(id);
    return { status: 200, body: { success: true } };
};
