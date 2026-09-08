import { z } from 'zod';

import { orderItemSchema, orderSchema } from './order';

export const orderItemWithProductSchema = orderItemSchema.extend({
  variant: z.object({
    id: z.uuid(),
    sku: z.string(),
    images: z.array(z.string()),
    attributes: z.record(z.string(), z.string()).default({}),
    product: z.object({
      id: z.uuid(),
      name: z.string(),
    }),
  }),
});

export const orderDetailsSchema = orderSchema.extend({
  items: z.array(orderItemWithProductSchema),
});

export type OrderDetails = z.infer<typeof orderDetailsSchema>;
export type OrderItemWithProduct = z.infer<typeof orderItemWithProductSchema>;
