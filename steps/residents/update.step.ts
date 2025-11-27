import type { ApiRouteConfig, Handlers } from 'motia';
import ResidentService from "../../services/resident.service";
import { UpdateResidentSchema, ResidentSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'UpdateResident',
    type: 'api',
    description: 'Updates an existing resident',
    path: '/api/residents/:id',
    method: 'PUT',
    bodySchema: UpdateResidentSchema,
    responseSchema: {
        200: ResidentSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['UpdateResident'] = async (req, { logger }) => {
    const { id } = (req as any).params;
    const validatedData = UpdateResidentSchema.parse(req.body);
    const updatedResident = await ResidentService.update(id, validatedData);

    if (!updatedResident) {
        return { status: 404, body: { error: "Resident not found" } };
    }

    return { status: 200, body: updatedResident };
};
