import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passengerSchema } from './schema';
import { PassengerFields } from './passenger-fields';
import { AddPassengerButton } from './add-passenger-button';
import { Button } from '@/components/ui/button';

export function PassengerForm({ onSubmit, isLoading, maxPassengers = 6 }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passengerSchema),
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
        <PassengerFields
          key={field.id}
          index={index}
          register={register}
          errors={errors}
          onRemove={() => remove(index)}
          showRemove={fields.length > 1}
        />
      ))}

      {fields.length < maxPassengers && (
        <AddPassengerButton onClick={handleAddPassenger} />
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