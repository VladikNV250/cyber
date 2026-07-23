import { NextRequest, NextResponse } from 'next/server';
import { updateCategory, deleteCategory } from '@/entities/category/server';
import { updateCategorySchema } from '@/entities/category';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const parsedData = updateCategorySchema.parse(body);
    const updatedCategory = await updateCategory(id, parsedData);
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    await deleteCategory(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
