import emailjs from 'emailjs-com';
import { config } from '../config';

export async function sendBookingConfirmation(email, bookingDetails) {
  try {
    await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      {
        to_email: email,
        booking_id: bookingDetails.bookingId,
        train_id: bookingDetails.trainId,
        passenger_count: bookingDetails.passengers.length,
        total_amount: bookingDetails.totalAmount.toFixed(2),
        journey_date: bookingDetails.journeyDate,
        passenger_details: bookingDetails.passengers
          .map(p => `${p.name} (Seat: ${p.seatNumber})`)
          .join('\n'),
      },
      config.emailjs.userId
    );
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}