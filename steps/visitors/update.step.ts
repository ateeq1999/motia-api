import type { ApiRouteConfig, Handlers } from 'motia';
import VisitorService from "../../services/visitor.service";
import { UpdateVisitorSchema, VisitorSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'UpdateVisitor',
    type: 'api',
    description: 'Updates an existing visitor',
    path: '/api/visitors/:id',
    method: 'PUT',
    bodySchema: UpdateVisitorSchema,
    responseSchema: {
        200: VisitorSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['UpdateVisitor'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    const validatedData = UpdateVisitorSchema.parse(req.body);
    const updatedVisitor = await VisitorService.update(id, validatedData);

    if (!updatedVisitor) {
        return { status: 404, body: { error: "Visitor not found" } };
    }

    return { status: 200, body: updatedVisitor };
};
