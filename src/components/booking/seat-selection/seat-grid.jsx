import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SeatGrid({ selectedSeats, onSeatSelect, bookedSeats }) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const columns = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <div key={row} className="flex justify-center gap-4">
          <span className="w-6 text-center font-medium">{row}</span>
          {columns.map((col) => {
            const seatId = `${row}${col}`;
            const isSelected = selectedSeats.includes(seatId);
            const isBooked = bookedSeats.includes(seatId);

            return (
              <motion.button
                key={seatId}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => !isBooked && onSeatSelect(seatId)}
                className={cn(
                  'w-8 h-8 rounded-sm transition-colors',
                  isSelected ? 'bg-amber-600 text-white' :
                  isBooked ? 'bg-gray-300 cursor-not-allowed' :
                  'bg-white border border-gray-300 hover:border-amber-600'
                )}
                disabled={isBooked}
              >
                {col}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}