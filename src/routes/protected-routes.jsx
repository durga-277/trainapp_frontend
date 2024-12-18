import React from 'react';
import { BookingPage } from '@/pages/booking';
import { PaymentPage } from '@/pages/booking/payment';
import { ConfirmationPage } from '@/pages/booking/confirmation';
import { ProfilePage } from '@/pages/profile';

export const protectedRoutes = [
  {
    path: '/booking/:id',
    element: <BookingPage />,
  },
  {
    path: '/booking/payment',
    element: <PaymentPage />,
  },
  {
    path: '/booking/confirmation',
    element: <ConfirmationPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
];