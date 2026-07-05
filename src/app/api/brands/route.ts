import { NextRequest, NextResponse } from 'next/server';
import { getBrands, createBrand, createBrandSchema } from '@/entities/brand';
import { ZodError } from 'zod';

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json(brands);
  } catch (error) {
    console.error('Unexpected error in GET /api/brands:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }
    console.error('Unexpected error in POST /api/brands:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
