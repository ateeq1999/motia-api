import type { ApiRouteConfig, Handlers } from 'motia';
import VoucherService from "../../services/voucher.service";
import { VoucherSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'GetVoucher',
    type: 'api',
    description: 'Gets a single voucher by ID',
    path: '/api/vouchers/:id',
    method: 'GET',
    responseSchema: {
        200: VoucherSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['GetVoucher'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    const voucher = await VoucherService.get(id);

    if (!voucher) {
        return { status: 404, body: { error: "Voucher not found" } };
    }

    return { status: 200, body: voucher };
};
