import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, Plus, Trash2 } from 'lucide-react';

const passengerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Age must be a valid number',
  }),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
});

const bookingSchema = z.object({
  passengers: z.array(passengerSchema).min(1, 'Add at least one passenger'),
});

export type PassengerFormData = z.infer<typeof bookingSchema>;

interface PassengerFormProps {
  onSubmit: (data: PassengerFormData) => void;
  isLoading?: boolean;
  maxPassengers?: number;
}

export function PassengerForm({ onSubmit, isLoading, maxPassengers = 6 }: PassengerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengers: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'passengers',
  });

  const handleAddPassenger = () => {
    if (fields.length < maxPassengers) {
      append({});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {fields.map((field, index) => (
        <div key={field.id} className="relative bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Passenger {index + 1}</h4>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...register(`passengers.${index}.name`)}
                  placeholder="John Doe"
                  className="pl-10"
                  error={errors.passengers?.[index]?.name?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...register(`passengers.${index}.age`)}
                  type="number"
                  placeholder="25"
                  className="pl-10"
                  error={errors.passengers?.[index]?.age?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...register(`passengers.${index}.email`)}
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10"
                  error={errors.passengers?.[index]?.email?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...register(`passengers.${index}.phone`)}
                  type="tel"
                  placeholder="+1 234 567 890"
                  className="pl-10"
                  error={errors.passengers?.[index]?.phone?.message}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {fields.length < maxPassengers && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAddPassenger}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Passenger
        </Button>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue to Payment'}
      </Button>

      {fields.length === maxPassengers && (
        <p className="text-sm text-amber-600 text-center">
          Maximum {maxPassengers} passengers allowed per booking
        </p>
      )}
    </form>
  );
}