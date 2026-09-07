import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ProductWithRelations } from '@/entities/product';
import * as productService from '@/entities/product/server';

import { GET } from './route';

vi.mock('@/entities/product/server', () => ({
  getProductsByIds: vi.fn(),
}));

describe('GET /api/products/by-ids', () => {
  const validUuid1 = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  const validUuid2 = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles comma-separated UUIDs (?ids=id1,id2)', async () => {
    const mockProducts = [
      { id: validUuid1, name: 'Product 1', minPrice: 100 },
      { id: validUuid2, name: 'Product 2', minPrice: 200 },
    ] as unknown as ProductWithRelations[];
    vi.mocked(productService.getProductsByIds).mockResolvedValueOnce(
      mockProducts,
    );

    const request = new NextRequest(
      `http://localhost:3000/api/products/by-ids?ids=${validUuid1},${validUuid2}`,
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(mockProducts);
    expect(productService.getProductsByIds).toHaveBeenCalledWith([
      validUuid1,
      validUuid2,
    ]);
  });

  it('handles repeated query params (?ids=id1&ids=id2)', async () => {
    const mockProducts = [
      { id: validUuid1, name: 'Product 1', minPrice: 100 },
    ] as unknown as ProductWithRelations[];
    vi.mocked(productService.getProductsByIds).mockResolvedValueOnce(
      mockProducts,
    );

    const request = new NextRequest(
      `http://localhost:3000/api/products/by-ids?ids=${validUuid1}&ids=${validUuid2}`,
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(productService.getProductsByIds).toHaveBeenCalledWith([
      validUuid1,
      validUuid2,
    ]);
  });

  it('returns empty array when no ids parameter is passed', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/products/by-ids',
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
    expect(productService.getProductsByIds).not.toHaveBeenCalled();
  });

  it('returns 400 when invalid UUID is provided', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/products/by-ids?ids=not-a-uuid',
    );
    const response = await GET(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Validation failed');
  });
});
