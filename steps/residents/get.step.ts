import type { ApiRouteConfig, Handlers } from 'motia';
import ResidentService from "../../services/resident.service";
import { ResidentSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'GetResident',
    type: 'api',
    description: 'Gets a single resident by ID',
    path: '/api/residents/:id',
    method: 'GET',
    responseSchema: {
        200: ResidentSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['GetResident'] = async (req, { logger }) => {
    const { id } = req.params;
    const resident = await ResidentService.get(id);

    if (!resident) {
        return { status: 404, body: { error: "Resident not found" } };
    }

    return { status: 200, body: resident };
};
