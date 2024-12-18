import React from 'react';
import { AdminDashboardPage } from '@/pages/admin/dashboard';
import { AdminTrainsPage } from '@/pages/admin/trains';
import { AdminUsersPage } from '@/pages/admin/users';
import { AdminBookingsPage } from '@/pages/admin/bookings';
import { AdminSchedulesPage } from '@/pages/admin/schedules';

export const adminRoutes = [
  {
    path: '/admin',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/trains',
    element: <AdminTrainsPage />,
  },
  {
    path: '/admin/users',
    element: <AdminUsersPage />,
  },
  {
    path: '/admin/bookings',
    element: <AdminBookingsPage />,
  },
  {
    path: '/admin/schedules',
    element: <AdminSchedulesPage />,
  },
];