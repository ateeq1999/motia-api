import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyService from "../../services/property.service";
import { CreatePropertySchema, PropertySchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
    name: 'CreateProperty',
    type: 'api',
    description: 'Creates a new property',
    path: '/api/properties',
    method: 'POST',
    bodySchema: CreatePropertySchema,
    responseSchema: {
        201: PropertySchema
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['CreateProperty'] = async (req, { logger }) => {
    const validatedData = CreatePropertySchema.parse(req.body);
    const newProperty = await PropertyService.create(validatedData);
    return { status: 201, body: newProperty };
};
