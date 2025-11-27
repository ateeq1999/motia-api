import type { ApiRouteConfig, Handlers } from 'motia';
import OfferService from "../../services/offer.service";
import { CreateOfferSchema, OfferSchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
    name: 'CreateOffer',
    type: 'api',
    description: 'Creates a new offer',
    path: '/api/offers',
    method: 'POST',
    bodySchema: CreateOfferSchema,
    responseSchema: {
        201: OfferSchema
    },
    emits: [],
};

export const handler: Handlers['CreateOffer'] = async (req, { logger }) => {
    const validatedData = CreateOfferSchema.parse(req.body);
    const newOffer = await OfferService.create(validatedData);
    return { status: 201, body: newOffer };
};
