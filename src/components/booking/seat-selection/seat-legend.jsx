import React from 'react';

export function SeatLegend() {
  return (
    <div className="flex justify-center mb-6">
      <div className="space-x-4">
        <span className="inline-flex items-center">
          <span className="w-4 h-4 bg-amber-600 rounded-sm mr-2"></span>
          Selected
        </span>
        <span className="inline-flex items-center">
          <span className="w-4 h-4 bg-gray-300 rounded-sm mr-2"></span>
          Booked
        </span>
        <span className="inline-flex items-center">
          <span className="w-4 h-4 bg-white border border-gray-300 rounded-sm mr-2"></span>
          Available
        </span>
      </div>
    </div>
  );
}