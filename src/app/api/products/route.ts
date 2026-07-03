import { NextRequest, NextResponse } from 'next/server';
import {
  getProducts,
  createProduct,
  productListQuerySchema,
  createProductSchema,
} from '@/entities/product';

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
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 400 },
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
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 400 },
    );
  }
}
