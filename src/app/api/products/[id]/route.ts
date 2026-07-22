import { NextRequest, NextResponse } from 'next/server';
import { updateProductSchema } from '@/entities/product';
import { updateProduct, deleteProduct } from '@/entities/product/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const parsedData = updateProductSchema.parse(body);
    const updatedProduct = await updateProduct(id, parsedData);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    await deleteProduct(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
