import type { ApiRouteConfig, Handlers } from 'motia';
import ResidentService from "../../services/resident.service";
import { CreateResidentSchema, ResidentSchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
    name: 'CreateResident',
    type: 'api',
    description: 'Creates a new resident',
    path: '/api/residents',
    method: 'POST',
    bodySchema: CreateResidentSchema,
    responseSchema: {
        201: ResidentSchema
    },
    emits: [],
};

export const handler: Handlers['CreateResident'] = async (req, { logger }) => {
    const validatedData = CreateResidentSchema.parse(req.body);
    const newResident = await ResidentService.create(validatedData);
    return { status: 201, body: newResident };
};
