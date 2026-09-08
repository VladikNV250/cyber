import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

import * as orderService from '@/entities/order/server';

import { GET } from './route';

vi.mock('@/entities/order/server', () => ({
  getOrderById: vi.fn(),
}));

describe('GET /api/orders/[id]', () => {
  const validUuid = 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with order data when order is found', async () => {
    const mockOrder = {
      id: validUuid,
      totalAmount: 15499,
      status: 'PENDING',
      customerName: 'Іван Коваленко',
    };
    vi.mocked(orderService.getOrderById).mockResolvedValueOnce(
      mockOrder as never,
    );

    const request = new NextRequest(
      `http://localhost:3000/api/orders/${validUuid}`,
    );
    const response = await GET(request, {
      params: Promise.resolve({ id: validUuid }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(mockOrder);
    expect(orderService.getOrderById).toHaveBeenCalledWith(validUuid);
  });

  it('returns 404 when order does not exist', async () => {
    vi.mocked(orderService.getOrderById).mockResolvedValueOnce(null);

    const request = new NextRequest(
      `http://localhost:3000/api/orders/${validUuid}`,
    );
    const response = await GET(request, {
      params: Promise.resolve({ id: validUuid }),
    });

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data.error).toBe('Order not found');
  });

  it('returns 400 when id is not a valid UUID', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/orders/not-a-uuid',
    );
    const response = await GET(request, {
      params: Promise.resolve({ id: 'not-a-uuid' }),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Validation failed');
    expect(orderService.getOrderById).not.toHaveBeenCalled();
  });

  it('returns 500 when getOrderById service throws an internal ZodError', async () => {
    const internalZodError = new ZodError([
      {
        code: 'custom',
        path: ['items'],
        message: 'Internal order schema mismatch',
      },
    ]);
    vi.mocked(orderService.getOrderById).mockRejectedValueOnce(
      internalZodError,
    );

    const request = new NextRequest(
      `http://localhost:3000/api/orders/${validUuid}`,
    );
    const response = await GET(request, {
      params: Promise.resolve({ id: validUuid }),
    });

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Internal Server Error');
  });
});
