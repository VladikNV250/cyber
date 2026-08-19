import { NextRequest, NextResponse } from 'next/server';

import { updateProductVariantSchema } from '@/entities/product';
import {
  deleteProductVariant,
  updateProductVariant,
} from '@/entities/product/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const parsedData = updateProductVariantSchema.parse(body);
    const updatedVariant = await updateProductVariant(id, parsedData);
    return NextResponse.json(updatedVariant);
  } catch (error) {
    console.error('Error updating variant:', error);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    await deleteProductVariant(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting variant:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
