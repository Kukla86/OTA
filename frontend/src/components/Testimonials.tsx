'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Business Executive',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Skyline OTA has completely transformed my business travel experience. The premium services and attention to detail are unmatched. Every flight feels like a luxury experience.',
    highlight: 'Transformed my business travel'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Frequent Traveler',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'The concierge service is absolutely phenomenal. They handled everything from airport transfers to restaurant reservations. I never have to worry about anything when I travel.',
    highlight: 'Concierge service is phenomenal'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Luxury Traveler',
    location: 'Miami, FL',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'As someone who travels extensively, I can confidently say Skyline OTA provides the best premium travel experience. The lounge access and priority services make every trip seamless.',
    highlight: 'Best premium travel experience'
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Investment Banker',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'The Diamond membership has been worth every penny. The personal travel manager and VIP services have made my frequent international trips incredibly comfortable and efficient.',
    highlight: 'Diamond membership worth every penny'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Tech Entrepreneur',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Skyline OTA understands what luxury travel should be. From the moment I book until I reach my destination, everything is handled with precision and care.',
    highlight: 'Understands luxury travel'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Consultant',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'The premium services have saved me countless hours and stress. The priority boarding and lounge access alone make the membership worthwhile for any frequent traveler.',
    highlight: 'Saved countless hours and stress'
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            What Our
            <span className="block text-gradient">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied travelers who have experienced the Skyline OTA difference
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-primary-50 to-sky-50 rounded-3xl p-8 md:p-12 relative">
                      {/* Quote Icon */}
                      <div className="absolute top-8 left-8">
                        <Quote className="h-8 w-8 text-primary-200" />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        {/* Testimonial Content */}
                        <div className="lg:col-span-2">
                          <div className="mb-6">
                            <div className="flex items-center space-x-1 mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-5 w-5 text-premium-gold fill-current"
                                />
                              ))}
                            </div>
                            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                              "{testimonial.text}"
                            </blockquote>
                            <div className="text-primary-600 font-semibold text-lg">
                              "{testimonial.highlight}"
                            </div>
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="text-center lg:text-left">
                          <div className="inline-block">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-20 h-20 rounded-full mx-auto lg:mx-0 mb-4 object-cover"
                            />
                            <h4 className="font-display font-semibold text-xl text-gray-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-primary-600 font-medium">
                              {testimonial.role}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-200"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">99%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
