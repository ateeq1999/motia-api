import type { ApiRouteConfig, Handlers } from 'motia';
import VisitorService from "../../services/visitor.service";
import { VisitorSchema } from "../../types/model.types";
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
};

export const handler: Handlers['ListVisitors'] = async (req, { logger }) => {
    const visitors = await VisitorService.list();
    return { status: 200, body: visitors };
};
