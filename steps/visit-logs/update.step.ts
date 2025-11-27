import type { ApiRouteConfig, Handlers } from 'motia';
import VisitLogService from "../../services/visit-log.service";
import { UpdateVisitLogSchema, VisitLogSchema } from "../../types/model.types";
import { z } from 'zod';

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
};

export const handler: Handlers['UpdateVisitLog'] = async (req, { logger }) => {
    const { id } = (req as any).params;
    const validatedData = UpdateVisitLogSchema.parse(req.body);
    const updatedVisitLog = await VisitLogService.update(id, validatedData);

    if (!updatedVisitLog) {
        return { status: 404, body: { error: "Visit log not found" } };
    }

    return { status: 200, body: updatedVisitLog };
};
