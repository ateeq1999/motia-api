import type { ApiRouteConfig, Handlers } from 'motia';
import VisitorService from "../../services/visitor.service";
import { CreateVisitorSchema, VisitorSchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
    name: 'CreateVisitor',
    type: 'api',
    description: 'Creates a new visitor',
    path: '/api/visitors',
    method: 'POST',
    bodySchema: CreateVisitorSchema,
    responseSchema: {
        201: VisitorSchema
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['CreateVisitor'] = async (req, { logger }) => {
    const validatedData = CreateVisitorSchema.parse(req.body);
    const newVisitor = await VisitorService.create(validatedData);
    return { status: 201, body: newVisitor };
};
