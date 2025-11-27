import type { ApiRouteConfig, Handlers } from 'motia';
import VisitLogService from "../../services/visit-log.service";
import { UpdateVisitLogSchema, VisitLogSchema } from "../../types/model.types";
import { z } from 'zod';
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
    name: 'UpdateVisitLog',
    type: 'api',
    description: 'Updates an existing visit log',
    path: '/api/visit-logs/:id',
    method: 'PUT',
    bodySchema: UpdateVisitLogSchema,
    responseSchema: {
        200: VisitLogSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['UpdateVisitLog'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    const validatedData = UpdateVisitLogSchema.parse(req.body);
    const updatedVisitLog = await VisitLogService.update(id, validatedData);

    if (!updatedVisitLog) {
        return { status: 404, body: { error: "Visit log not found" } };
    }

    return { status: 200, body: updatedVisitLog };
};
