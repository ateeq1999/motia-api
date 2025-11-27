import type { ApiRouteConfig, Handlers } from 'motia';
import SecurityCheckLogService from "../../services/security-check-log.service";
import { SecurityCheckLogSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'GetSecurityCheckLog',
    type: 'api',
    description: 'Retrieves a security check log by ID',
    path: '/api/security-check-logs/:id',
    method: 'GET',
    responseSchema: {
        200: SecurityCheckLogSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['GetSecurityCheckLog'] = async (req, { logger }) => {
    const { id } = (req as any).params;
    const securityCheckLog = await SecurityCheckLogService.findById(id);

    if (!securityCheckLog) {
        return { status: 404, body: { error: "Security check log not found" } };
    }

    return { status: 200, body: securityCheckLog };
};
