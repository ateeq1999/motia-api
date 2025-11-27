import type { ApiRouteConfig, Handlers } from 'motia';
import OfferService from "../../services/offer.service";
import { OfferSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'GetOffer',
    type: 'api',
    description: 'Gets a single offer by ID',
    path: '/api/offers/:id',
    method: 'GET',
    responseSchema: {
        200: OfferSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['GetOffer'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    const offer = await OfferService.findById(id);

    if (!offer) {
        return { status: 404, body: { error: "Offer not found" } };
    }

    return { status: 200, body: offer };
};
