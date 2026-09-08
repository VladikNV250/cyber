import { prisma } from '@/shared/api';

import { OrderCreationError } from '../../model/errors';
import { CreateOrderParams } from '../../model/schemas/createOrder';
import { OrderDetails, orderDetailsSchema } from '../../model/schemas/details';

export async function createOrder(
  data: CreateOrderParams,
): Promise<OrderDetails> {
  return prisma.$transaction(async (tx) => {
    const requestedQuantities = new Map<string, number>();
    for (const item of data.items) {
      const current = requestedQuantities.get(item.variantId) ?? 0;
      requestedQuantities.set(item.variantId, current + item.quantity);
    }

    const variantIds = Array.from(requestedQuantities.keys());
    const variants = await tx.productVariant.findMany({
      where: {
        id: { in: variantIds },
      },
      include: {
        product: true,
      },
    });

    const variantMap = new Map(variants.map((v) => [v.id, v]));

    for (const [variantId, totalQty] of requestedQuantities.entries()) {
      const variant = variantMap.get(variantId);
      if (!variant) {
        throw new OrderCreationError(
          `Product variant with ID ${variantId} was not found`,
          404,
        );
      }

      if (!variant.product.isActive) {
        throw new OrderCreationError(
          `Product "${variant.product.name}" is currently unavailable`,
          400,
        );
      }

      if (variant.stock < totalQty) {
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

    for (const [variantId, totalQty] of requestedQuantities.entries()) {
      const updateResult = await tx.productVariant.updateMany({
        where: {
          id: variantId,
          stock: { gte: totalQty },
        },
        data: {
          stock: {
            decrement: totalQty,
          },
        },
      });

      if (updateResult.count === 0) {
        const variant = variantMap.get(variantId);
        const name = variant ? ` "${variant.product.name}"` : '';
        throw new OrderCreationError(
          `Insufficient stock for product variant${name}`,
          409,
        );
      }
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
