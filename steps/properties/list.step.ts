import type { ApiRouteConfig, Handlers } from 'motia';
import PropertyService from "../../services/property.service";
import { PropertySchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListProperties',
    type: 'api',
    description: 'Lists all properties',
    path: '/api/properties',
    method: 'GET',
    responseSchema: {
        200: z.array(PropertySchema)
    },
    emits: [],
};

export const handler: Handlers['ListProperties'] = async (req, { logger }) => {
    const properties = await PropertyService.findAll();
    return { status: 200, body: properties };
};
