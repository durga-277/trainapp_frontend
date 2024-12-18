import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SeatMap } from '@/components/booking/seat-map';
import { PassengerForm, PassengerFormData } from '@/components/booking/passenger-form';
import { toast } from 'sonner';
import { format } from 'date-fns';

const BOOKED_SEATS = ['A1', 'B3', 'C4', 'D2', 'E5']; // Simulated booked seats

export function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSeatSelect = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handlePassengerSubmit = async (data: PassengerFormData) => {
    if (selectedSeats.length !== data.passengers.length) {
      toast.error(`Please select ${data.passengers.length} seats`);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Assign seats to passengers
      const passengersWithSeats = data.passengers.map((passenger, index) => ({
        ...passenger,
        seatNumber: selectedSeats[index],
      }));

      navigate('/booking/payment', {
        state: {
          passengers: passengersWithSeats,
          trainId: id,
          amount: 249.99 * passengersWithSeats.length,
          journeyDate: format(new Date(), 'PPP'),
        },
      });
    } catch (error) {
      toast.error('Failed to process booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Book Your Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Train Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Train Number</p>
                <p className="font-medium">Express {id}</p>
              </div>
              <div>
                <p className="text-gray-500">Route</p>
                <p className="font-medium">New York → Boston</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium">{format(new Date(), 'PPP')}</p>
              </div>
              <div>
                <p className="text-gray-500">Departure Time</p>
                <p className="font-medium">09:00 AM</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>
            <SeatMap
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
              bookedSeats={BOOKED_SEATS}
            />
            <p className="text-sm text-gray-500 mt-2">
              Selected seats: {selectedSeats.join(', ') || 'None'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Passenger Details</h3>
            <PassengerForm onSubmit={handlePassengerSubmit} isLoading={isLoading} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}