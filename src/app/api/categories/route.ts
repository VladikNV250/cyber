import { NextRequest, NextResponse } from 'next/server';
import {
  createCategory,
  getCategories,
  createCategorySchema,
} from '@/entities/category';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
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
    const parsedData = createCategorySchema.parse(body);
    const newCategory = await createCategory(parsedData);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 400 },
    );
  }
}
