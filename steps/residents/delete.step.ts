import type { ApiRouteConfig, Handlers } from 'motia';
import ResidentService from "../../services/resident.service";
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
};

export const handler: Handlers['DeleteResident'] = async (req, { logger }) => {
    const { id } = (req as any).params;
    await ResidentService.delete(id);
    return { status: 200, body: { success: true } };
};
