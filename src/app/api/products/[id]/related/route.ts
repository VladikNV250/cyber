import { NextRequest, NextResponse } from 'next/server';

import { getRelatedProducts } from '@/entities/product/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const searchParams = request.nextUrl.searchParams;
    let limit = 4;

    if (searchParams.has('limit')) {
      const parsedLimit = parseInt(searchParams.get('limit') as string, 10);
      if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 20) {
        return NextResponse.json(
          {
            error:
              'Invalid limit parameter. Must be a positive integer between 1 and 20.',
          },
          { status: 400 },
        );
      }
      limit = parsedLimit;
    }

    const relatedProducts = await getRelatedProducts(id, limit);
    return NextResponse.json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
