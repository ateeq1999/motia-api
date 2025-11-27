import type { ApiRouteConfig, Handlers } from 'motia';
import ResidentService from "../../services/resident.service";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeleteResident',
    type: 'api',
    description: 'Deletes a resident by ID',
    path: '/api/residents/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['DeleteResident'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    await ResidentService.delete(id);
    return { status: 200, body: { success: true } };
};
