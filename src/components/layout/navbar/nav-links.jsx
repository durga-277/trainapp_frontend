import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/lib/store';

export function NavLinks() {
  const { user } = useAuthStore();

  return (
    <div className="hidden sm:flex items-center space-x-4">
      <Link to="/search" className="text-gray-600 hover:text-gray-900">Search</Link>
      <Link to="/schedules" className="text-gray-600 hover:text-gray-900">Schedules</Link>
      
      {user?.role === 'admin' && (
        <>
          <Link to="/admin" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
          <Link to="/admin/trains" className="text-gray-600 hover:text-gray-900">Trains</Link>
          <Link to="/admin/bookings" className="text-gray-600 hover:text-gray-900">Bookings</Link>
          <Link to="/admin/users" className="text-gray-600 hover:text-gray-900">Users</Link>
        </>
      )}
    </div>
  );
}