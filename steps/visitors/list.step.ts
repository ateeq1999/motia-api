import type { ApiRouteConfig, Handlers } from 'motia';
import VisitorService from "../../services/visitor.service";
import { VisitorSchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListVisitors',
    type: 'api',
    description: 'Lists all visitors',
    path: '/api/visitors',
    method: 'GET',
    responseSchema: {
        200: z.array(VisitorSchema)
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['ListVisitors'] = async (req, { logger }) => {
    const visitors = await VisitorService.findAll();
    return { status: 200, body: visitors };
};
