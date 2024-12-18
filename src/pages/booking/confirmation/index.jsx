import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Home } from 'lucide-react';

export function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, passengers, trainId, totalAmount } = location.state || {};

  if (!bookingId) {
    navigate('/search');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 mb-8">
              Your booking has been confirmed and your tickets are ready.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Booking Reference</p>
                <p className="font-medium">{bookingId}</p>
              </div>
              <div>
                <p className="text-gray-500">Payment Status</p>
                <p className="font-medium text-green-600">Paid</p>
              </div>
              <div>
                <p className="text-gray-500">Train</p>
                <p className="font-medium">Express {trainId}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Amount</p>
                <p className="font-medium">${totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500">Passengers</p>
                <p className="font-medium">{passengers.length}</p>
              </div>
              <div>
                <p className="text-gray-500">Journey Date</p>
                <p className="font-medium">March 15, 2024</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Passenger Details</h3>
              <div className="space-y-2">
                {passengers.map((passenger, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-2 rounded">
                    <span>{passenger.name}</span>
                    <span className="text-gray-500">Seat {passenger.seatNumber}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
            <Button
              className="w-full"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}