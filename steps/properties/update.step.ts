import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyService from "../../services/property.service";
import { UpdatePropertySchema, PropertySchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'UpdateProperty',
    type: 'api',
    description: 'Updates an existing property',
    path: '/api/properties/:id',
    method: 'PUT',
    bodySchema: UpdatePropertySchema,
    responseSchema: {
        200: PropertySchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['UpdateProperty'] = async (req, { logger }) => {
    const { id } = (req as any).params;
    const validatedData = UpdatePropertySchema.parse(req.body);
    const updatedProperty = await PropertyService.update(id, validatedData);

    if (!updatedProperty) {
        return { status: 404, body: { error: "Property not found" } };
    }

    return { status: 200, body: updatedProperty };
};
