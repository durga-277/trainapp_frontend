import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Train className="h-6 w-6 text-amber-600" />
              <span className="text-xl font-bold text-gray-900">TrainEase</span>
            </div>
            <p className="text-gray-600">Making train travel easy and comfortable for everyone.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-gray-600 hover:text-amber-600">Search Trains</Link></li>
              <li><Link to="/schedules" className="text-gray-600 hover:text-amber-600">Schedules</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-amber-600">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-600 hover:text-amber-600">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-amber-600">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-amber-600">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-amber-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-600">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">&copy; {new Date().getFullYear()} TrainEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}