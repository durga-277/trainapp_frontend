import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from '@/lib/auth';
import { LandingPage } from '@/pages/landing';
import { SearchPage } from '@/pages/search';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { BookingPage } from '@/pages/booking';
import { PaymentPage } from '@/pages/booking/payment';
import { ConfirmationPage } from '@/pages/booking/confirmation';
import { ProfilePage } from '@/pages/profile';
import { AdminDashboardPage } from '@/pages/admin/dashboard';
import { AdminTrainsPage } from '@/pages/admin/trains';
import { AdminUsersPage } from '@/pages/admin/users';
import { AdminBookingsPage } from '@/pages/admin/bookings';
import { NotFoundPage } from '@/pages/not-found';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes */}
      <Route path="/booking/:id" element={
        <AuthGuard>
          <BookingPage />
        </AuthGuard>
      } />
      <Route path="/booking/payment" element={
        <AuthGuard>
          <PaymentPage />
        </AuthGuard>
      } />
      <Route path="/booking/confirmation" element={
        <AuthGuard>
          <ConfirmationPage />
        </AuthGuard>
      } />
      <Route path="/profile" element={
        <AuthGuard>
          <ProfilePage />
        </AuthGuard>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <AuthGuard requireAdmin>
          <AdminDashboardPage />
        </AuthGuard>
      } />
      <Route path="/admin/trains" element={
        <AuthGuard requireAdmin>
          <AdminTrainsPage />
        </AuthGuard>
      } />
      <Route path="/admin/users" element={
        <AuthGuard requireAdmin>
          <AdminUsersPage />
        </AuthGuard>
      } />
      <Route path="/admin/bookings" element={
        <AuthGuard requireAdmin>
          <AdminBookingsPage />
        </AuthGuard>
      } />

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}