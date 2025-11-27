import type { ApiRouteConfig, Handlers } from 'motia';
import ResidentService from "../../services/resident.service";
import { ResidentSchema } from "../../types/model.types";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListResidents',
    type: 'api',
    description: 'Lists all residents',
    path: '/api/residents',
    method: 'GET',
    responseSchema: {
        200: z.array(ResidentSchema)
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['ListResidents'] = async (req, { logger }) => {
    const residents = await ResidentService.findAll();
    return { status: 200, body: residents };
};
