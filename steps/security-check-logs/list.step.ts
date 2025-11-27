import type { ApiRouteConfig, Handlers } from 'motia';
import SecurityCheckLogService from "../../services/security-check-log.service";
import { SecurityCheckLogSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListSecurityCheckLogs',
    type: 'api',
    description: 'Lists all security check logs',
    path: '/api/security-check-logs',
    method: 'GET',
    responseSchema: {
        200: z.array(SecurityCheckLogSchema)
    },
    emits: [],
};

export const handler: Handlers['ListSecurityCheckLogs'] = async (req, { logger }) => {
    const securityCheckLogs = await SecurityCheckLogService.findAll();
    return { status: 200, body: securityCheckLogs };
};
