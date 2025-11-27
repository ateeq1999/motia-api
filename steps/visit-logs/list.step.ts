import type { ApiRouteConfig, Handlers } from 'motia';
import VisitLogService from "../../services/visit-log.service";
import { VisitLogSchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListVisitLogs',
    type: 'api',
    description: 'Lists all visit logs',
    path: '/api/visit-logs',
    method: 'GET',
    responseSchema: {
        200: z.array(VisitLogSchema)
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['ListVisitLogs'] = async (req, { logger }) => {
    const visitLogs = await VisitLogService.findAll();
    return { status: 200, body: visitLogs };
};
