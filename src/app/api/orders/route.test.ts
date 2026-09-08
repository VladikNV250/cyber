import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

import { OrderCreationError } from '@/entities/order';
import * as orderService from '@/entities/order/server';

import { POST } from './route';

vi.mock('@/entities/order/server', () => ({
  createOrder: vi.fn(),
}));

describe('POST /api/orders', () => {
  const validPayload = {
    customerName: 'Іван Коваленко',
    customerEmail: 'ivan@example.com',
    customerPhone: '+380501234567',
    shippingMethod: 'NOVA_POST',
    paymentMethod: 'CASH_ON_DELIVERY',
    shippingDetails: {
      recipientName: 'Іван Коваленко',
      phone: '+380501234567',
      city: 'Київ',
      deliveryBranch: 'Відділення №12',
    },
    items: [
      {
        variantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        quantity: 1,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates an order and returns 201 with created order data', async () => {
    const mockCreatedOrder = {
      id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
      totalAmount: 15499,
      status: 'PENDING',
      ...validPayload,
    };
    vi.mocked(orderService.createOrder).mockResolvedValueOnce(
      mockCreatedOrder as never,
    );

    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toEqual(mockCreatedOrder);
    expect(orderService.createOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        customerEmail: 'ivan@example.com',
        customerPhone: '+380501234567',
        userId: null,
      }),
    );
  });

  it('ignores any userId passed in the public request body and passes userId: null to createOrder', async () => {
    const payloadWithSpoofedUser = {
      ...validPayload,
      userId: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    };

    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(payloadWithSpoofedUser),
    });

    await POST(request);

    expect(orderService.createOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: null,
      }),
    );
  });

  it('returns 400 when validation fails', async () => {
    const invalidPayload = {
      ...validPayload,
      customerEmail: 'invalid-email',
    };

    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(invalidPayload),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Validation failed');
    expect(orderService.createOrder).not.toHaveBeenCalled();
  });

  it('returns 400 when body contains malformed JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: '{"malformed-json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid JSON body');
    expect(orderService.createOrder).not.toHaveBeenCalled();
  });

  it('returns appropriate status code on OrderCreationError (e.g., 409 on stock issue)', async () => {
    vi.mocked(orderService.createOrder).mockRejectedValueOnce(
      new OrderCreationError('Insufficient stock', 409),
    );

    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);

    expect(response.status).toBe(409);
    const data = await response.json();
    expect(data.error).toBe('Insufficient stock');
  });

  it('returns 500 on unexpected errors', async () => {
    vi.mocked(orderService.createOrder).mockRejectedValueOnce(
      new Error('Database explosion'),
    );

    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Internal Server Error');
  });

  it('returns 500 when createOrder service throws an internal ZodError', async () => {
    const internalZodError = new ZodError([
      {
        code: 'custom',
        path: ['totalAmount'],
        message: 'Internal data schema mismatch',
      },
    ]);
    vi.mocked(orderService.createOrder).mockRejectedValueOnce(internalZodError);

    const request = new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Internal Server Error');
  });
});
