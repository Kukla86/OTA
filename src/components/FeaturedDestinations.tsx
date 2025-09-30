'use client'

import { useState } from 'react'
import { MapPin, Star, ArrowRight, Plane } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$899',
    originalPrice: '$1,299',
    rating: 4.9,
    reviews: 1247,
    duration: '8h 30m',
    discount: '31% OFF'
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$1,299',
    originalPrice: '$1,799',
    rating: 4.8,
    reviews: 892,
    duration: '12h 15m',
    discount: '28% OFF'
  },
  {
    id: 3,
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$699',
    originalPrice: '$999',
    rating: 4.7,
    reviews: 634,
    duration: '14h 45m',
    discount: '30% OFF'
  },
  {
    id: 4,
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$599',
    originalPrice: '$899',
    rating: 4.6,
    reviews: 2156,
    duration: '6h 20m',
    discount: '33% OFF'
  },
  {
    id: 5,
    name: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1506905925346-14b1e0d0b0b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$1,499',
    originalPrice: '$2,199',
    rating: 4.8,
    reviews: 743,
    duration: '16h 30m',
    discount: '32% OFF'
  },
  {
    id: 6,
    name: 'London, UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ae1c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$799',
    originalPrice: '$1,199',
    rating: 4.7,
    reviews: 1834,
    duration: '7h 45m',
    discount: '33% OFF'
  }
]

export function FeaturedDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(destinations.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(destinations.length / 3)) % Math.ceil(destinations.length / 3))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Featured
            <span className="block text-gradient">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world's most beautiful cities with our curated selection of premium flight deals
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-premium-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {destination.discount}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-premium-gold fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Plane className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">{destination.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold text-xl text-gray-900">
                      {destination.name}
                    </h3>
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(destination.rating)
                              ? 'text-premium-gold fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {destination.reviews.toLocaleString()} reviews
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-display font-bold text-2xl text-primary-600">
                        {destination.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {destination.originalPrice}
                      </span>
                    </div>
                    <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium group">
                      <span>Book Now</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-200"
          >
            <ArrowRight className="h-6 w-6 text-gray-600 rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-200"
          >
            <ArrowRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-primary text-lg px-8 py-4">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  )
}
