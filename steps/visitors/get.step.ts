import type { ApiRouteConfig, Handlers } from 'motia';
import VisitorService from "../../services/visitor.service";
import { VisitorSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'GetVisitor',
    type: 'api',
    description: 'Gets a single visitor by ID',
    path: '/api/visitors/:id',
    method: 'GET',
    responseSchema: {
        200: VisitorSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['GetVisitor'] = async (req, { logger }) => {
    const { id } = req.params;
    const visitor = await VisitorService.get(id);

    if (!visitor) {
        return { status: 404, body: { error: "Visitor not found" } };
    }

    return { status: 200, body: visitor };
};
