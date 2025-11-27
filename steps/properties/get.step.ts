import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyService from "../../services/property.service";
import { PropertySchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'GetProperty',
    type: 'api',
    description: 'Gets a single property by ID',
    path: '/api/properties/:id',
    method: 'GET',
    responseSchema: {
        200: PropertySchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['GetProperty'] = async (req, { logger }) => {
    const { id } = req.params;
    const property = await PropertyService.get(id);

    if (!property) {
        return { status: 404, body: { error: "Property not found" } };
    }

    return { status: 200, body: property };
};
