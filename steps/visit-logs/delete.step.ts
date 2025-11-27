import type { ApiRouteConfig, Handlers } from 'motia';
import VisitLogService from "../../services/visit-log.service";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeleteVisitLog',
    type: 'api',
    description: 'Deletes a visit log',
    path: '/api/visit-logs/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
};

export const handler: Handlers['DeleteVisitLog'] = async (req, { logger }) => {
    const { id } = req.params;
    await VisitLogService.delete(id);
    return { status: 200, body: { success: true } };
};
