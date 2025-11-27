import type { ApiRouteConfig, Handlers } from 'motia';
import VoucherService from "../../services/voucher.service";
import { CreateVoucherSchema, VoucherSchema } from "../../types/model.types";

export const config: ApiRouteConfig = {
    name: 'CreateVoucher',
    type: 'api',
    description: 'Creates a new voucher',
    path: '/api/vouchers',
    method: 'POST',
    bodySchema: CreateVoucherSchema,
    responseSchema: {
        201: VoucherSchema
    },
    emits: [],
};

export const handler: Handlers['CreateVoucher'] = async (req, { logger }) => {
    const validatedData = CreateVoucherSchema.parse(req.body);
    const newVoucher = await VoucherService.create(validatedData);
    return { status: 201, body: newVoucher };
};
