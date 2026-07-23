import { NextRequest, NextResponse } from 'next/server';
import { createCategory, getCategories } from '@/entities/category/server';
import { createCategorySchema } from '@/entities/category';
import { ZodError } from 'zod';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Unexpected error in GET /api/categories:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = createCategorySchema.parse(body);
    const newCategory = await createCategory(parsedData);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }
    console.error('Unexpected error in POST /api/categories:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
