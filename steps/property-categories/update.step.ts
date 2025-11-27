import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyCategoryService from "../../services/property-category.service";
import { UpdatePropertyCategorySchema, PropertyCategorySchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'UpdatePropertyCategory',
    type: 'api',
    description: 'Updates an existing property category',
    path: '/api/property-categories/:id',
    method: 'PUT',
    bodySchema: UpdatePropertyCategorySchema,
    responseSchema: {
        200: PropertyCategorySchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['UpdatePropertyCategory'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    const validatedData = UpdatePropertyCategorySchema.parse(req.body);
    const updatedPropertyCategory = await PropertyCategoryService.update(id, validatedData);

    if (!updatedPropertyCategory) {
        return { status: 404, body: { error: "Property category not found" } };
    }

    return { status: 200, body: updatedPropertyCategory };
};
