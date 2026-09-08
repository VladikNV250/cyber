import { z } from 'zod';

import {
  OrderStatus,
  PaymentMethod,
  ShippingMethod,
} from '@/generated/prisma/enums';

export const orderStatusSchema = z.enum(OrderStatus);
export const shippingMethodSchema = z.enum(ShippingMethod);
export const paymentMethodSchema = z.enum(PaymentMethod);

export { OrderStatus, PaymentMethod, ShippingMethod };

export const shippingDetailsSchema = z.object({
  recipientName: z.string().trim().min(1, 'Recipient name is required'),
  phone: z.e164('Invalid phone number').trim(),
  city: z.string().trim().min(1, 'City is required'),
  deliveryBranch: z.string().trim().optional(),
  street: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export const orderItemSchema = z.object({
  id: z.uuid(),
  quantity: z.number().int().min(1),
  priceAtPurchase: z.coerce.number().min(0),
  orderId: z.uuid(),
  productVariantId: z.uuid(),
});

export const orderSchema = z.object({
  id: z.uuid(),
  totalAmount: z.coerce.number().min(0),
  status: orderStatusSchema,
  userId: z.uuid().nullable().optional(),
  customerEmail: z.email(),
  customerPhone: z.e164('Invalid phone number').trim(),
  customerName: z.string().min(1),
  shippingMethod: shippingMethodSchema,
  paymentMethod: paymentMethodSchema,
  shippingDetails: shippingDetailsSchema,
  transactionId: z.string().nullable().optional(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type ShippingDetails = z.infer<typeof shippingDetailsSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;
