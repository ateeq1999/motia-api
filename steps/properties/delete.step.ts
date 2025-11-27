import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyService from "../../services/property.service";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeleteProperty',
    type: 'api',
    description: 'Deletes a property by ID',
    path: '/api/properties/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
};

export const handler: Handlers['DeleteProperty'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    await PropertyService.delete(id);
    return { status: 200, body: { success: true } };
};
