import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ProductVariantWithProduct } from '@/entities/product/server';
import * as productService from '@/entities/product/server';

import { GET } from './route';

vi.mock('@/entities/product/server', () => ({
  getVariantsByIds: vi.fn(),
}));

describe('GET /api/variants/by-ids', () => {
  const validUuid1 = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  const validUuid2 = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles comma-separated UUIDs (?ids=id1,id2)', async () => {
    const mockVariants = [
      {
        id: validUuid1,
        productId: 'prod-1',
        sku: 'SKU-1',
        price: 100,
        stock: 5,
        images: ['/img1.png'],
        attributes: {},
        product: { id: 'prod-1', name: 'Product 1' },
      },
      {
        id: validUuid2,
        productId: 'prod-2',
        sku: 'SKU-2',
        price: 200,
        stock: 10,
        images: ['/img2.png'],
        attributes: {},
        product: { id: 'prod-2', name: 'Product 2' },
      },
    ] as unknown as ProductVariantWithProduct[];

    vi.mocked(productService.getVariantsByIds).mockResolvedValueOnce(
      mockVariants,
    );

    const request = new NextRequest(
      `http://localhost:3000/api/variants/by-ids?ids=${validUuid1},${validUuid2}`,
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(mockVariants);
    expect(productService.getVariantsByIds).toHaveBeenCalledWith([
      validUuid1,
      validUuid2,
    ]);
  });

  it('handles repeated query params (?ids=id1&ids=id2)', async () => {
    const mockVariants = [
      {
        id: validUuid1,
        productId: 'prod-1',
        sku: 'SKU-1',
        price: 100,
        stock: 5,
        images: ['/img1.png'],
        attributes: {},
        product: { id: 'prod-1', name: 'Product 1' },
      },
    ] as unknown as ProductVariantWithProduct[];

    vi.mocked(productService.getVariantsByIds).mockResolvedValueOnce(
      mockVariants,
    );

    const request = new NextRequest(
      `http://localhost:3000/api/variants/by-ids?ids=${validUuid1}&ids=${validUuid2}`,
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(productService.getVariantsByIds).toHaveBeenCalledWith([
      validUuid1,
      validUuid2,
    ]);
  });

  it('returns empty array when no ids parameter is passed', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/variants/by-ids',
    );
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
    expect(productService.getVariantsByIds).not.toHaveBeenCalled();
  });

  it('returns 400 when invalid UUID is provided', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/variants/by-ids?ids=not-a-uuid',
    );
    const response = await GET(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Validation failed');
  });
});
