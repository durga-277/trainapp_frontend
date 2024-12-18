import { z } from 'zod';

export const scheduleSchema = z.object({
  trainName: z.string().min(2, 'Train name must be at least 2 characters'),
  origin: z.string().min(2, 'Origin station must be at least 2 characters'),
  destination: z.string().min(2, 'Destination station must be at least 2 characters'),
  departureTime: z.string().min(1, 'Departure time is required'),
  arrivalTime: z.string().min(1, 'Arrival time is required'),
  price: z.string().or(z.number()).transform(Number).positive('Price must be positive'),
  status: z.enum(['Active', 'Cancelled', 'Delayed']),
});