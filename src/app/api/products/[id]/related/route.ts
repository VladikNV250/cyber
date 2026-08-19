import { NextRequest, NextResponse } from 'next/server';

import { getRelatedProducts } from '@/entities/product/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.has('limit')
      ? parseInt(searchParams.get('limit') as string, 10)
      : 4;

    const relatedProducts = await getRelatedProducts(
      id,
      isNaN(limit) ? 4 : limit,
    );
    return NextResponse.json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
