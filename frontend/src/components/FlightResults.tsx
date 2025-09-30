'use client'

import { useState } from 'react'
import { 
  Plane, 
  Clock, 
  MapPin, 
  Star, 
  ChevronDown, 
  Filter,
  SortAsc,
  Wifi,
  Utensils,
  Headphones
} from 'lucide-react'

const flights = [
  {
    id: 1,
    airline: 'Delta Airlines',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Delta-Airlines-Logo.png',
    departure: {
      time: '08:30',
      airport: 'JFK',
      city: 'New York'
    },
    arrival: {
      time: '14:45',
      airport: 'LHR',
      city: 'London'
    },
    duration: '6h 15m',
    stops: 'Non-stop',
    price: 1299,
    originalPrice: 1899,
    class: 'Business',
    amenities: ['WiFi', 'Meals', 'Entertainment'],
    rating: 4.8,
    reviews: 1247
  },
  {
    id: 2,
    airline: 'British Airways',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/British-Airways-Logo.png',
    departure: {
      time: '15:20',
      airport: 'JFK',
      city: 'New York'
    },
    arrival: {
      time: '05:30+1',
      airport: 'LHR',
      city: 'London'
    },
    duration: '7h 10m',
    stops: 'Non-stop',
    price: 899,
    originalPrice: 1299,
    class: 'Premium Economy',
    amenities: ['WiFi', 'Meals'],
    rating: 4.6,
    reviews: 892
  },
  {
    id: 3,
    airline: 'Virgin Atlantic',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Virgin-Atlantic-Logo.png',
    departure: {
      time: '22:15',
      airport: 'JFK',
      city: 'New York'
    },
    arrival: {
      time: '10:25+1',
      airport: 'LHR',
      city: 'London'
    },
    duration: '7h 10m',
    stops: 'Non-stop',
    price: 1599,
    originalPrice: 2199,
    class: 'First Class',
    amenities: ['WiFi', 'Meals', 'Entertainment', 'Lounge Access'],
    rating: 4.9,
    reviews: 634
  },
  {
    id: 4,
    airline: 'American Airlines',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/American-Airlines-Logo.png',
    departure: {
      time: '11:45',
      airport: 'JFK',
      city: 'New York'
    },
    arrival: {
      time: '23:30',
      airport: 'LHR',
      city: 'London'
    },
    duration: '7h 45m',
    stops: '1 Stop (CDG)',
    price: 699,
    originalPrice: 999,
    class: 'Economy',
    amenities: ['WiFi'],
    rating: 4.3,
    reviews: 2156
  }
]

export function FlightResults() {
  const [sortBy, setSortBy] = useState('price')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFlights, setSelectedFlights] = useState<number[]>([])

  const handleSelectFlight = (flightId: number) => {
    setSelectedFlights(prev => 
      prev.includes(flightId) 
        ? prev.filter(id => id !== flightId)
        : [...prev, flightId]
    )
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi className="h-4 w-4" />
      case 'Meals': return <Utensils className="h-4 w-4" />
      case 'Entertainment': return <Headphones className="h-4 w-4" />
      default: return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Flight Results
          </h1>
          <p className="text-gray-600">
            New York (JFK) → London (LHR) • Dec 15, 2024 • 1 Passenger
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <SortAsc className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="price">Price (Low to High)</option>
              <option value="duration">Duration</option>
              <option value="departure">Departure Time</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Under $500', value: '0-500' },
                    { label: '$500 - $1000', value: '500-1000' },
                    { label: '$1000 - $1500', value: '1000-1500' },
                    { label: 'Over $1500', value: '1500+' }
                  ].map((range) => (
                    <label key={range.value} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airlines */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Airlines</h4>
                <div className="space-y-2">
                  {['Delta Airlines', 'British Airways', 'Virgin Atlantic', 'American Airlines'].map((airline) => (
                    <label key={airline} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2 text-sm text-gray-700">{airline}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stops */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Stops</h4>
                <div className="space-y-2">
                  {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
                    <label key={stop} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2 text-sm text-gray-700">{stop}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Class */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Class</h4>
                <div className="space-y-2">
                  {['Economy', 'Premium Economy', 'Business', 'First Class'].map((classType) => (
                    <label key={classType} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600" />
                      <span className="ml-2 text-sm text-gray-700">{classType}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flight Results */}
        <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          <div className="space-y-6">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 ${
                  selectedFlights.includes(flight.id) 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  {/* Flight Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={flight.logo}
                          alt={flight.airline}
                          className="h-8 w-8 object-contain"
                        />
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {flight.airline}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(flight.rating)
                                      ? 'text-premium-gold fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {flight.rating} ({flight.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          ${flight.price}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${flight.originalPrice}
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                          Save ${flight.originalPrice - flight.price}
                        </div>
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      {/* Departure */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {flight.departure.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.departure.airport}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.departure.city}
                        </div>
                      </div>

                      {/* Flight Path */}
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">
                            {flight.duration}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                            <Plane className="h-4 w-4 text-primary-600" />
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {flight.stops}
                          </div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {flight.arrival.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.arrival.airport}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.arrival.city}
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700">
                          {flight.class}
                        </span>
                        <div className="flex items-center space-x-2">
                          {flight.amenities.map((amenity, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-1 text-gray-600"
                            >
                              {getAmenityIcon(amenity)}
                              <span className="text-xs">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button
                      onClick={() => handleSelectFlight(flight.id)}
                      className={`w-full lg:w-auto px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        selectedFlights.includes(flight.id)
                          ? 'bg-primary-600 text-white'
                          : 'btn-primary'
                      }`}
                    >
                      {selectedFlights.includes(flight.id) ? 'Selected' : 'Select Flight'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="btn-primary px-8 py-3">
              Load More Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
