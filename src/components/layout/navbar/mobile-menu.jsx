import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';
import { Link } from 'react-router-dom';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="flex items-center sm:hidden">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 right-0 w-full bg-white border-b border-gray-200 p-4">
          <div className="flex flex-col space-y-4">
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

            {user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                <Button variant="outline" size="sm" className="w-full">Logout</Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm" className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}