import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { createProductVariantSchema } from '@/entities/product';
import { createProductVariant } from '@/entities/product/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const productId = (await params).id;
    const body = await request.json();
    const parsedData = createProductVariantSchema.parse(body);
    const newVariant = await createProductVariant(productId, parsedData);
    return NextResponse.json(newVariant, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }
    console.error(
      'Unexpected error in POST /api/products/[id]/variants:',
      error,
    );
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
