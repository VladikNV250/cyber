import { NextRequest, NextResponse } from 'next/server';
import {
  productListQuerySchema,
  createProductSchema,
} from '@/entities/product';
import { getProducts, createProduct } from '@/entities/product/server';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryObj: Record<string, string | string[]> = Object.fromEntries(
      searchParams.entries(),
    );

    const brandIds = searchParams.getAll('brandIds');
    if (brandIds.length > 0) {
      queryObj.brandIds = brandIds;
    }

    const parsedQuery = productListQuerySchema.parse(queryObj);
    const result = await getProducts(parsedQuery);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = createProductSchema.parse(body);
    const newProduct = await createProduct(parsedData);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }
    console.error('Unexpected error in POST /api/products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
