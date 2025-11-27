import type { ApiRouteConfig, Handlers } from 'motia';
import VoucherService from "../../services/voucher.service";
import { VoucherSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'ListVouchers',
    type: 'api',
    description: 'Lists all vouchers',
    path: '/api/vouchers',
    method: 'GET',
    responseSchema: {
        200: z.array(VoucherSchema)
    },
    emits: [],
};

export const handler: Handlers['ListVouchers'] = async (req, { logger }) => {
    const vouchers = await VoucherService.list();
    return { status: 200, body: vouchers };
};
