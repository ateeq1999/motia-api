import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyCategoryService from "../../services/property-category.service";
import { PropertyCategorySchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'GetPropertyCategory',
    type: 'api',
    description: 'Retrieves a property category by ID',
    path: '/api/property-categories/:id',
    method: 'GET',
    responseSchema: {
        200: PropertyCategorySchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['GetPropertyCategory'] = async (req, { logger }) => {
    const { id } = req.params;
    const propertyCategory = await PropertyCategoryService.findById(id);

    if (!propertyCategory) {
        return { status: 404, body: { error: "Property category not found" } };
    }

    return { status: 200, body: propertyCategory };
};
