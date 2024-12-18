import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AddPassengerButton({ onClick }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="w-full"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Another Passenger
    </Button>
  );
}