import type { ApiRouteConfig, Handlers } from 'motia';
import ProfileService from "../../services/profile.service";
import { CreateProfileSchema, ProfileSchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
    name: 'CreateProfile',
    type: 'api',
    description: 'Creates a new profile',
    path: '/api/profiles',
    method: 'POST',
    bodySchema: CreateProfileSchema,
    responseSchema: {
        201: ProfileSchema
    },
    emits: [],
};

export const handler: Handlers['CreateProfile'] = async (req, { logger }) => {
    const validatedData = CreateProfileSchema.parse(req.body);
    const newProfile = await ProfileService.create(validatedData);
    return { status: 201, body: newProfile };
};
