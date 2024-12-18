import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from 'sonner';

export function UserMenu() {
  const { user, logout, toggleAdminMode } = useAuthStore();
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

  if (!user) {
    return (
      <Link to="/login">
        <Button variant="primary" size="sm">
          <User className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div className="hidden sm:flex items-center space-x-4">
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
  );
}