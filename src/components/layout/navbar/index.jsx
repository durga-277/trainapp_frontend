import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinks } from './nav-links';
import { UserMenu } from './user-menu';
import { MobileMenu } from './mobile-menu';
import { Train } from 'lucide-react';

export function Navbar() {
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

          <NavLinks />
          <UserMenu />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}