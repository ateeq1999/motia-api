import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyCategoryService from "../../services/property-category.service";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeletePropertyCategory',
    type: 'api',
    description: 'Deletes a property category',
    path: '/api/property-categories/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['DeletePropertyCategory'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    await PropertyCategoryService.delete(id);
    return { status: 200, body: { success: true } };
};
