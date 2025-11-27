import type { ApiRouteConfig, Handlers } from 'motia';
import ProfileService from "../../services/profile.service";
import { UpdateProfileSchema, ProfileSchema } from "../../types/model.types";
import { z } from 'zod';
import { errorMiddleware } from '../../middlewares/error.middleware';

export const config: ApiRouteConfig = {
    name: 'UpdateProfile',
    type: 'api',
    description: 'Updates an existing profile',
    path: '/api/profiles/:id',
    method: 'PUT',
    bodySchema: UpdateProfileSchema,
    responseSchema: {
        200: ProfileSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['UpdateProfile'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    const validatedData = UpdateProfileSchema.parse(req.body);
    const updatedProfile = await ProfileService.update(id, validatedData);

    if (!updatedProfile) {
        return { status: 404, body: { error: "Profile not found" } };
    }

    return { status: 200, body: updatedProfile };
};
