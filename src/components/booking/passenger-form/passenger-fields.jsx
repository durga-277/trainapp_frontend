import React from 'react';
import { User, Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function PassengerFields({ index, register, errors, onRemove, showRemove }) {
  return (
    <div className="relative bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium">Passenger {index + 1}</h4>
        {showRemove && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemove}
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
  );
}