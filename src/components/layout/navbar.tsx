import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Train, User, Menu, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';

export function Navbar() {
  const { user, logout, toggleAdminMode } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleAdminToggle = () => {
    toggleAdminMode();
    toast.success(`Switched to ${user?.role === 'admin' ? 'User' : 'Admin'} mode`);
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Train className="h-6 w-6 text-amber-600" />
              <span className="text-xl font-bold text-gray-900">TrainEase</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/search" className="text-gray-600 hover:text-gray-900">Search</Link>
            <Link to="/schedules" className="text-gray-600 hover:text-gray-900">Schedules</Link>
            
            {user && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAdminToggle}
                className="flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                {user.role === 'admin' ? 'Switch to User' : 'Switch to Admin'}
              </Button>
            )}

            {user?.role === 'admin' && (
              <>
                <Link to="/admin" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link to="/admin/trains" className="text-gray-600 hover:text-gray-900">Trains</Link>
                <Link to="/admin/bookings" className="text-gray-600 hover:text-gray-900">Bookings</Link>
                <Link to="/admin/users" className="text-gray-600 hover:text-gray-900">Users</Link>
              </>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button variant="secondary" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}