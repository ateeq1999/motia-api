import type { ApiRouteConfig, Handlers } from 'motia';
import SecurityCheckLogService from "../../services/security-check-log.service";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeleteSecurityCheckLog',
    type: 'api',
    description: 'Deletes a security check log',
    path: '/api/security-check-logs/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
};

export const handler: Handlers['DeleteSecurityCheckLog'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    await SecurityCheckLogService.delete(id);
    return { status: 200, body: { success: true } };
};
