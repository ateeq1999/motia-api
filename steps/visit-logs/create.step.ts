import type { ApiRouteConfig, Handlers } from 'motia';
import VisitLogService from "../../services/visit-log.service";
import { CreateVisitLogSchema, VisitLogSchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
    name: 'CreateVisitLog',
    type: 'api',
    description: 'Creates a new visit log',
    path: '/api/visit-logs',
    method: 'POST',
    bodySchema: CreateVisitLogSchema,
    responseSchema: {
        201: VisitLogSchema
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['CreateVisitLog'] = async (req, { logger }) => {
    const validatedData = CreateVisitLogSchema.parse(req.body);
    const visitLog = await VisitLogService.create(validatedData);

    return { status: 201, body: visitLog };
};
