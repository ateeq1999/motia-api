import type { ApiRouteConfig, Handlers } from 'motia';
import ProfileService from "../../services/profile.service";
import { ProfileSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListProfiles',
    type: 'api',
    description: 'Lists all profiles',
    path: '/api/profiles',
    method: 'GET',
    responseSchema: {
        200: z.array(ProfileSchema)
    },
    emits: [],
};

export const handler: Handlers['ListProfiles'] = async (req, { logger }) => {
    const profiles = await ProfileService.findAll();
    return { status: 200, body: profiles };
};
