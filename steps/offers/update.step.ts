import type { ApiRouteConfig, Handlers } from 'motia';
import OfferService from "../../services/offer.service";
import { UpdateOfferSchema, OfferSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'UpdateOffer',
    type: 'api',
    description: 'Updates an existing offer',
    path: '/api/offers/:id',
    method: 'PUT',
    bodySchema: UpdateOfferSchema,
    responseSchema: {
        200: OfferSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['UpdateOffer'] = async (req, { logger }) => {
    const { id } = req.params;
    const validatedData = UpdateOfferSchema.parse(req.body);
    const updatedOffer = await OfferService.update(id, validatedData);

    if (!updatedOffer) {
        return { status: 404, body: { error: "Offer not found" } };
    }

    return { status: 200, body: updatedOffer };
};
