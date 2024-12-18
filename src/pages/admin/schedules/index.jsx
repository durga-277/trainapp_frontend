import React from 'react';
import { ScheduleList } from './schedule-list';
import { ScheduleForm } from './schedule-form';
import { useScheduleStore } from '@/lib/store/schedule-store';
import { toast } from 'sonner';

export function AdminSchedulesPage() {
  const { isFormOpen, setIsFormOpen } = useScheduleStore();

  const handleSuccess = (message) => {
    toast.success(message);
    setIsFormOpen(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {isFormOpen ? (
          <ScheduleForm onSuccess={handleSuccess} />
        ) : (
          <ScheduleList />
        )}
      </div>
    </div>
  );
}