import React from 'react';
import { SeatGrid } from './seat-grid';
import { SeatLegend } from './seat-legend';

export function SeatSelection({ selectedSeats, onSeatSelect, bookedSeats = [] }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <SeatLegend />
      <SeatGrid
        selectedSeats={selectedSeats}
        onSeatSelect={onSeatSelect}
        bookedSeats={bookedSeats}
      />
    </div>
  );
}