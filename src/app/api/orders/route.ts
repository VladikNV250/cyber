import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  CreateOrderInput,
  OrderCreationError,
  createOrderInputSchema,
} from '@/entities/order';
import { createOrder } from '@/entities/order/server';

export async function POST(request: NextRequest) {
  let parsedData: CreateOrderInput;
  try {
    const body = await request.json();
    parsedData = createOrderInputSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const order = await createOrder({
      ...parsedData,
      userId: null,
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof OrderCreationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }

    console.error('Unexpected error in POST /api/orders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
