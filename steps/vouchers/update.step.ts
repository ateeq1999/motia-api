import type { ApiRouteConfig, Handlers } from 'motia';
import VoucherService from "../../services/voucher.service";
import { UpdateVoucherSchema, VoucherSchema } from "../../types/model.types";
import { z } from 'zod';

export const config: ApiRouteConfig = {
    name: 'UpdateVoucher',
    type: 'api',
    description: 'Updates an existing voucher',
    path: '/api/vouchers/:id',
    method: 'PUT',
    bodySchema: UpdateVoucherSchema,
    responseSchema: {
        200: VoucherSchema,
        404: z.object({ error: z.string() })
    },
    emits: [],
};

export const handler: Handlers['UpdateVoucher'] = async (req, { logger }) => {
    const { id } = req.params;
    const validatedData = UpdateVoucherSchema.parse(req.body);
    const updatedVoucher = await VoucherService.update(id, validatedData);

    if (!updatedVoucher) {
        return { status: 404, body: { error: "Voucher not found" } };
    }

    return { status: 200, body: updatedVoucher };
};
