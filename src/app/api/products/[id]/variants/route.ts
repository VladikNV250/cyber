import { NextRequest, NextResponse } from 'next/server';
import {
  createProductVariant,
  createProductVariantSchema,
} from '@/entities/product';

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
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 400 },
    );
  }
}
