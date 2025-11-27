import type { ApiRouteConfig, Handlers } from 'motia';
import SecurityCheckLogService from "../../services/security-check-log.service";
import { UpdateSecurityCheckLogSchema, SecurityCheckLogSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'UpdateSecurityCheckLog',
    type: 'api',
    description: 'Updates an existing security check log',
    path: '/api/security-check-logs/:id',
    method: 'PUT',
    bodySchema: UpdateSecurityCheckLogSchema,
    responseSchema: {
        200: SecurityCheckLogSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['UpdateSecurityCheckLog'] = async (req, { logger }) => {
    const { id } = req.params;
    const validatedData = UpdateSecurityCheckLogSchema.parse(req.body);
    const updatedSecurityCheckLog = await SecurityCheckLogService.update(id, validatedData);

    if (!updatedSecurityCheckLog) {
        return { status: 404, body: { error: "Security check log not found" } };
    }

    return { status: 200, body: updatedSecurityCheckLog };
};
