'use client'

import { useState } from 'react'
import { 
  Plane, 
  Calendar, 
  Users, 
  MapPin, 
  Search,
  ArrowRightLeft,
  Plus,
  Minus
} from 'lucide-react'

interface SearchFormProps {
  onSearch: (results: any) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip' | 'multi-city'>('round-trip')
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState('economy')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate search results
    onSearch({ message: 'Searching for flights...' })
  }

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      {/* Trip Type Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { value: 'round-trip', label: 'Round Trip' },
          { value: 'one-way', label: 'One Way' },
          { value: 'multi-city', label: 'Multi City' }
        ].map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setTripType(type.value as any)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              tripType === type.value
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Main Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* From */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="City or Airport"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* To */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="City or Airport"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Return Date (if round trip) */}
        {tripType === 'round-trip' && (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        )}
      </div>

      {/* Passengers and Class */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <button
                type="button"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="mx-3 font-medium">{passengers}</span>
              <button
                type="button"
                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cabin Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            <option value="economy">Economy</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Airlines</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">Any Airline</option>
              <option value="delta">Delta</option>
              <option value="united">United</option>
              <option value="american">American</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Stops</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">Any</option>
              <option value="0">Non-stop</option>
              <option value="1">1 Stop</option>
              <option value="2">2 Stops</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">Any Price</option>
              <option value="0-500">$0 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000+">$1,000+</option>
            </select>
          </div>
        </div>
      )}

      {/* Search Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="btn-premium text-lg px-12 py-4 flex items-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search Flights</span>
        </button>
      </div>
    </form>
  )
}
