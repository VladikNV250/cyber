import { NextRequest, NextResponse } from 'next/server';
import { getProductFilters } from '@/entities/product/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId') || undefined;

    const filters = await getProductFilters(categoryId);

    return NextResponse.json(filters);
  } catch (error) {
    console.error('Error fetching product filters:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
