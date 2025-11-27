import type { ApiRouteConfig, Handlers } from 'motia';
import VisitLogService from "../../services/visit-log.service";
import { VisitLogSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'GetVisitLog',
    type: 'api',
    description: 'Retrieves a visit log by ID',
    path: '/api/visit-logs/:id',
    method: 'GET',
    responseSchema: {
        200: VisitLogSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['GetVisitLog'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    const visitLog = await VisitLogService.findById(id);

    if (!visitLog) {
        return { status: 404, body: { error: "Visit log not found" } };
    }

    return { status: 200, body: visitLog };
};
