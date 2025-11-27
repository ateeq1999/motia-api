import type { ApiRouteConfig, Handlers } from 'motia';
import SecurityCheckLogService from "../../services/security-check-log.service";
import { CreateSecurityCheckLogSchema, SecurityCheckLogSchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
    name: 'CreateSecurityCheckLog',
    type: 'api',
    description: 'Creates a new security check log',
    path: '/api/security-check-logs',
    method: 'POST',
    bodySchema: CreateSecurityCheckLogSchema,
    responseSchema: {
        201: SecurityCheckLogSchema
    },
    emits: [],
};

export const handler: Handlers['CreateSecurityCheckLog'] = async (req, { logger }) => {
    const validatedData = CreateSecurityCheckLogSchema.parse(req.body);
    const securityCheckLog = await SecurityCheckLogService.create(validatedData);

    return { status: 201, body: securityCheckLog };
};
