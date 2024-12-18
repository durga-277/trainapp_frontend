import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, XCircle, CheckCircle } from 'lucide-react';

export function AdminBookingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Bookings</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Booking ID</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Train</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((booking) => (
                  <tr key={booking} className="bg-white border-b">
                    <td className="px-6 py-4">BKG-{booking}234</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">Express {booking}</td>
                    <td className="px-6 py-4">2024-03-{booking + 10}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking % 3 === 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking % 2 === 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking % 3 === 0
                          ? 'Pending'
                          : booking % 2 === 0
                          ? 'Confirmed'
                          : 'Cancelled'}
                      </span>
                    </td>
                    <td className="px-6 py-4">${(booking * 100).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}