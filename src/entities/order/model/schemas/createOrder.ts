import { z } from 'zod';

import {
  paymentMethodSchema,
  shippingDetailsSchema,
  shippingMethodSchema,
} from './order';

export const createOrderItemInputSchema = z.object({
  variantId: z.uuid('Invalid variant ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const createOrderInputSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, 'Customer name must be at least 2 characters'),
  customerEmail: z.email('Invalid email address').trim(),
  customerPhone: z
    .e164('Customer phone must be in E.164 format (e.g. +380501234567)')
    .trim(),
  shippingMethod: shippingMethodSchema,
  paymentMethod: paymentMethodSchema,
  shippingDetails: shippingDetailsSchema,
  items: z
    .array(createOrderItemInputSchema)
    .min(1, 'Order must contain at least one item'),
});

export type CreateOrderItemInput = z.infer<typeof createOrderItemInputSchema>;
export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

export interface CreateOrderParams extends CreateOrderInput {
  userId?: string | null;
}
