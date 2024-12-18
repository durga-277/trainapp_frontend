import React from 'react';

export function PaymentSummary({ amount }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span>${amount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Tax</span>
        <span>${(amount * 0.1).toFixed(2)}</span>
      </div>
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${(amount * 1.1).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}