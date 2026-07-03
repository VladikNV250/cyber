import { NextRequest, NextResponse } from 'next/server';
import { getBrands, createBrand, createBrandSchema } from '@/entities/brand';

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json(brands);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = createBrandSchema.parse(body);
    const newBrand = await createBrand(parsedData);
    return NextResponse.json(newBrand, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 400 },
    );
  }
}
