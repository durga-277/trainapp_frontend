import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useScheduleStore } from '@/lib/store/schedule-store';
import { scheduleSchema } from '@/lib/validations/schedule';
import { X } from 'lucide-react';

export function ScheduleForm({ onSuccess }) {
  const { editingSchedule, addSchedule, updateSchedule, setIsFormOpen } = useScheduleStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: editingSchedule || {
      trainName: '',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      status: 'Active',
    },
  });

  const onSubmit = async (data) => {
    try {
      if (editingSchedule) {
        await updateSchedule(editingSchedule.id, data);
        onSuccess('Schedule updated successfully');
      } else {
        await addSchedule(data);
        onSuccess('Schedule created successfully');
      }
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsFormOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Train Name</label>
              <Input
                {...register('trainName')}
                error={errors.trainName?.message}
                placeholder="Express 123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Origin Station</label>
              <Input
                {...register('origin')}
                error={errors.origin?.message}
                placeholder="New York"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Destination Station</label>
              <Input
                {...register('destination')}
                error={errors.destination?.message}
                placeholder="Boston"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Departure Time</label>
              <Input
                type="datetime-local"
                {...register('departureTime')}
                error={errors.departureTime?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
              <Input
                type="datetime-local"
                {...register('arrivalTime')}
                error={errors.arrivalTime?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <Input
                type="number"
                step="0.01"
                {...register('price')}
                error={errors.price?.message}
                placeholder="99.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register('status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              >
                <option value="Active">Active</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}