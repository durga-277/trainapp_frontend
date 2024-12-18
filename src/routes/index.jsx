import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from '@/lib/auth/auth-guard';
import { publicRoutes } from './public-routes';
import { protectedRoutes } from './protected-routes';
import { adminRoutes } from './admin-routes';
import { NotFoundPage } from '@/pages/not-found';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
      
      {/* Protected Routes */}
      {protectedRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <AuthGuard>
              {route.element}
            </AuthGuard>
          }
        />
      ))}

      {/* Admin Routes */}
      {adminRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <AuthGuard requireAdmin>
              {route.element}
            </AuthGuard>
          }
        />
      ))}

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}