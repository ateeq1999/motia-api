import type { ApiRouteConfig, Handlers } from 'motia';
import VisitorService from "../../services/visitor.service";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeleteVisitor',
    type: 'api',
    description: 'Deletes a visitor by ID',
    path: '/api/visitors/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['DeleteVisitor'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    await VisitorService.delete(id);
    return { status: 200, body: { success: true } };
};
