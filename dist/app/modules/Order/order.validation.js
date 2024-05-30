"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
        message: 'Invalid product ID',
    }),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().positive(),
});
exports.orderValidationSchema = orderValidationSchema;
