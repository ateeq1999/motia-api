import type { ApiRouteConfig, Handlers } from 'motia';
import ProfileService from "../../services/profile.service";
import { ProfileSchema } from "../../types/model.types";
import { z } from 'zod';
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
    name: 'GetProfile',
    type: 'api',
    description: 'Gets a single profile by ID',
    path: '/api/profiles/:id',
    method: 'GET',
    responseSchema: {
        200: ProfileSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['GetProfile'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    const profile = await ProfileService.findById(id);

    if (!profile) {
        return { status: 404, body: { error: "Profile not found" } };
    }

    return { status: 200, body: profile };
};
