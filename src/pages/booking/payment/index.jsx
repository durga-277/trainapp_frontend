import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentForm } from '@/components/booking/payment-form';
import { stripePromise } from '@/lib/services/payment';
import { sendBookingConfirmation } from '@/lib/services/email';
import { toast } from 'sonner';

export function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { passengers, trainId, amount, journeyDate } = location.state || {};

  if (!passengers || !trainId) {
    navigate('/search');
    return null;
  }

  const handlePaymentSuccess = async () => {
    const bookingId = `BKG-${Math.random().toString(36).substr(2, 9)}`;
    
    // Send email confirmation to each passenger
    const emailPromises = passengers.map(passenger => 
      sendBookingConfirmation(passenger.email, {
        bookingId,
        trainId,
        passengers,
        totalAmount: amount * 1.1, // Including tax
        journeyDate,
      })
    );

    await Promise.all(emailPromises);
    toast.success('Booking confirmations sent to all passengers');

    navigate('/booking/confirmation', {
      state: {
        bookingId,
        passengers,
        trainId,
        totalAmount: amount * 1.1,
        journeyDate,
      },
    });
  };

  const handlePaymentError = (error) => {
    toast.error(error);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-medium">Booking Summary</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">Train:</span> Express {trainId}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Journey Date:</span> {journeyDate}
                </p>
                <div className="border-t pt-2 mt-2">
                  <h4 className="font-medium mb-2">Passengers:</h4>
                  {passengers.map((passenger, index) => (
                    <div key={index} className="text-sm flex justify-between items-center">
                      <span>{passenger.name}</span>
                      <span className="text-gray-600">Seat {passenger.seatNumber}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Elements>
        </CardContent>
      </Card>
    </motion.div>
  );
}