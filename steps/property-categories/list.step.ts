import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyCategoryService from "../../services/property-category.service";
import { PropertyCategorySchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListPropertyCategories',
    type: 'api',
    description: 'Lists all property categories',
    path: '/api/property-categories',
    method: 'GET',
    responseSchema: {
        200: z.array(PropertyCategorySchema)
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['ListPropertyCategories'] = async (req, { logger }) => {
    const propertyCategories = await PropertyCategoryService.findAll();
    return { status: 200, body: propertyCategories };
};
