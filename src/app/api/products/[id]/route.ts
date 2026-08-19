import { NextRequest, NextResponse } from 'next/server';

import { updateProductSchema } from '@/entities/product';
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from '@/entities/product/server';
import { uuidSchema } from '@/shared/model';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    if (!uuidSchema.safeParse(id).success) {
      return NextResponse.json(
        { error: 'Invalid product ID format' },
        { status: 400 },
      );
    }
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    if (!uuidSchema.safeParse(id).success) {
      return NextResponse.json(
        { error: 'Invalid product ID format' },
        { status: 400 },
      );
    }
    const body = await request.json();
    const parsedData = updateProductSchema.parse(body);
    const updatedProduct = await updateProduct(id, parsedData);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    if (!uuidSchema.safeParse(id).success) {
      return NextResponse.json(
        { error: 'Invalid product ID format' },
        { status: 400 },
      );
    }
    await deleteProduct(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
