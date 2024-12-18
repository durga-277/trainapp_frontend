import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ArrowRight, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface Train {
  id: string;
  name: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seatsLeft: number;
  status: 'On Time' | 'Delayed' | 'Cancelled';
  from: string;
  to: string;
  duration: string;
}

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [priceRange, setPriceRange] = useState(500);

  // Simulated train data
  const trains: Train[] = [
    {
      id: '1',
      name: 'Express 1',
      departureTime: '09:00 AM',
      arrivalTime: '11:30 AM',
      price: 99,
      seatsLeft: 52,
      status: 'On Time',
      from: 'New York',
      to: 'Boston',
      duration: '2h 30m',
    },
    {
      id: '2',
      name: 'Express 2',
      departureTime: '10:30 AM',
      arrivalTime: '01:00 PM',
      price: 129,
      seatsLeft: 35,
      status: 'Delayed',
      from: 'New York',
      to: 'Boston',
      duration: '2h 30m',
    },
    {
      id: '3',
      name: 'Express 3',
      departureTime: '02:00 PM',
      arrivalTime: '04:30 PM',
      price: 149,
      seatsLeft: 28,
      status: 'On Time',
      from: 'New York',
      to: 'Boston',
      duration: '2h 30m',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log('Searching with params:', searchParams);
  };

  const handleBookNow = (trainId: string) => {
    navigate(`/booking/${trainId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <Input
              type="text"
              placeholder="Departure City"
              value={searchParams.from}
              onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <Input
              type="text"
              placeholder="Arrival City"
              value={searchParams.to}
              onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <Input
              type="date"
              value={searchParams.date}
              onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search Trains
            </Button>
          </div>
        </form>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-64 bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Filter className="h-5 w-5 text-gray-500" />
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>${priceRange}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Train Type</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600" />
                  <span className="ml-2">Express</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600" />
                  <span className="ml-2">Local</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600" />
                  <span className="ml-2">High-speed</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Departure Time</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600" />
                  <span className="ml-2">Morning</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600" />
                  <span className="ml-2">Afternoon</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600" />
                  <span className="ml-2">Evening</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Results */}
        <div className="flex-1 space-y-4">
          {trains.map((train) => (
            <motion.div
              key={train.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{train.name}</h3>
                  <div className="flex items-center mt-2 text-gray-600">
                    <span>{train.departureTime}</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                    <span>{train.arrivalTime}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {train.from} → {train.to}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-600">${train.price}</p>
                  <p className="text-sm text-gray-600">{train.duration}</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    train.status === 'On Time'
                      ? 'bg-green-100 text-green-800'
                      : train.status === 'Delayed'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {train.status}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {train.seatsLeft} seats left
                  </span>
                </div>
                <Button
                  onClick={() => handleBookNow(train.id)}
                  disabled={train.status === 'Cancelled'}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}