import type { ApiRouteConfig, Handlers } from 'motia';
import VoucherService from "../../services/voucher.service";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'DeleteVoucher',
    type: 'api',
    description: 'Deletes a voucher by ID',
    path: '/api/vouchers/:id',
    method: 'DELETE',
    responseSchema: {
        200: z.object({ success: z.boolean() })
    },
    emits: [],
};

export const handler: Handlers['DeleteVoucher'] = async (req, { logger }) => {
    const { id } = req.pathParams;
    await VoucherService.delete(id);
    return { status: 200, body: { success: true } };
};
