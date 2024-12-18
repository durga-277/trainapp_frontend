import { z } from 'zod';

export const passengerSchema = z.object({
  passengers: z.array(z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Age must be a valid number',
    }),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Invalid phone number'),
  })).min(1, 'Add at least one passenger'),
});