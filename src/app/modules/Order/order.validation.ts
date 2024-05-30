import { z } from 'zod';
import { Types } from 'mongoose';

const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid product ID',
  }),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export { orderValidationSchema };
