import { NextRequest, NextResponse } from 'next/server';
import { ZodError, z } from 'zod';

import { getProductsByIds } from '@/entities/product/server';

const idsSchema = z.array(z.uuid());

export async function GET(request: NextRequest) {
  try {
    const rawIds = request.nextUrl.searchParams.getAll('ids');
    const variantIds = rawIds
      .flatMap((id) => id.split(','))
      .map((id) => id.trim())
      .filter(Boolean);

    if (variantIds.length === 0) {
      return NextResponse.json([]);
    }

    const parsedVariantIds = idsSchema.parse(variantIds);
    const products = await getProductsByIds(parsedVariantIds);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products by ids:', error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
