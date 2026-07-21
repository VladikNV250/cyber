import z from 'zod';

export const specsQuerySchema = z.record(z.string(), z.array(z.string()));
