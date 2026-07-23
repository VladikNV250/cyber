import { NextRequest, NextResponse } from 'next/server';
import { updateBrand, deleteBrand } from '@/entities/brand/server';
import { updateBrandSchema } from '@/entities/brand';
import { ZodError } from 'zod';
import { Prisma } from '@/generated/prisma/client';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const parsedData = updateBrandSchema.parse(body);
    const updatedBrand = await updateBrand(id, parsedData);
    return NextResponse.json(updatedBrand);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    console.error('Unexpected error in PUT /api/brands/[id]:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    await deleteBrand(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    console.error('Unexpected error in DELETE /api/brands/[id]:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
