import type { ApiRouteConfig, Handlers } from 'motia';
import OfferService from "../../services/offer.service";
import { OfferSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListOffers',
    type: 'api',
    description: 'Lists all offers',
    path: '/api/offers',
    method: 'GET',
    responseSchema: {
        200: z.array(OfferSchema)
    },
    emits: [],
};

export const handler: Handlers['ListOffers'] = async (req, { logger }) => {
    const offers = await OfferService.list();
    return { status: 200, body: offers };
};
