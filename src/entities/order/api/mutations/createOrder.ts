import { prisma } from '@/shared/api';

import { OrderCreationError } from '../../model/errors';
import { CreateOrderInput } from '../../model/schemas/createOrder';
import { orderDetailsSchema } from '../../model/schemas/details';

export async function createOrder(data: CreateOrderInput) {
  return prisma.$transaction(async (tx) => {
    const variantIds = data.items.map((item) => item.variantId);
    const variants = await tx.productVariant.findMany({
      where: {
        id: { in: variantIds },
      },
      include: {
        product: true,
      },
    });

    const variantMap = new Map(variants.map((v) => [v.id, v]));

    for (const item of data.items) {
      const variant = variantMap.get(item.variantId);
      if (!variant) {
        throw new OrderCreationError(
          `Product variant with ID ${item.variantId} was not found`,
          404,
        );
      }

      if (!variant.product.isActive) {
        throw new OrderCreationError(
          `Product "${variant.product.name}" is currently unavailable`,
          400,
        );
      }

      if (variant.stock < item.quantity) {
        throw new OrderCreationError(
          `Insufficient stock for "${variant.product.name}" (available: ${variant.stock})`,
          409,
        );
      }

      if (!variant.allowedShipping.includes(data.shippingMethod)) {
        throw new OrderCreationError(
          `Shipping method is not supported for product "${variant.product.name}"`,
          400,
        );
      }
    }

    let totalAmount = 0;
    const orderItemsData = data.items.map((item) => {
      const variant = variantMap.get(item.variantId)!;
      const price = Number(variant.price);
      totalAmount += price * item.quantity;

      return {
        productVariantId: variant.id,
        quantity: item.quantity,
        priceAtPurchase: price,
      };
    });

    for (const item of data.items) {
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    const order = await tx.order.create({
      data: {
        totalAmount,
        status: 'PENDING',
        userId: data.userId ?? null,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerName: data.customerName,
        shippingMethod: data.shippingMethod,
        paymentMethod: data.paymentMethod,
        shippingDetails: data.shippingDetails,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return orderDetailsSchema.parse(order);
  });
}
