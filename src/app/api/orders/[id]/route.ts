import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getOrderById } from '@/entities/order/server';

const paramsSchema = z.object({
  id: z.uuid('Invalid order ID'),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  let id: string;
  try {
    const rawParams = await params;
    const parsed = paramsSchema.parse(rawParams);
    id = parsed.id;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Invalid route parameters' },
      { status: 400 },
    );
  }

  try {
    const order = await getOrderById(id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in GET /api/orders/[id]:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
