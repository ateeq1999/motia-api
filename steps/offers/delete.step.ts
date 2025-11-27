import type { ApiRouteConfig, Handlers } from 'motia';
import OfferService from "../../services/offer.service";
import { errorMiddleware } from '../../middlewares/error.middleware';
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeleteOffer',
    type: 'api',
    description: 'Deletes an offer by ID',
    path: '/api/offers/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
    middleware: [errorMiddleware],
};

export const handler: Handlers['DeleteOffer'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    await OfferService.delete(id);
    return { status: 200, body: { success: true } };
};
