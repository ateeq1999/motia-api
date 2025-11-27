import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyCategoryService from "../../services/property-category.service";
import { CreatePropertyCategorySchema, PropertyCategorySchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
    name: 'CreatePropertyCategory',
    type: 'api',
    description: 'Creates a new property category',
    path: '/api/property-categories',
    method: 'POST',
    bodySchema: CreatePropertyCategorySchema,
    responseSchema: {
        201: PropertyCategorySchema
    },
    emits: [],
};

export const handler: Handlers['CreatePropertyCategory'] = async (req, { logger }) => {
    const validatedData = CreatePropertyCategorySchema.parse(req.body);
    const propertyCategory = await PropertyCategoryService.create(validatedData);

    return { status: 201, body: propertyCategory };
};
