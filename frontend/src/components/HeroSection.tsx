'use client'

import { useState } from 'react'
import { SearchForm } from './SearchForm'
import { Play, Star, Shield, Clock } from 'lucide-react'

export function HeroSection() {
  const [searchResults, setSearchResults] = useState(null)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-sky-900 via-primary-800 to-sky-700">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-white/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 border border-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main headline */}
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            Experience
            <span className="block premium-text">Luxury Air Travel</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-normal mt-2">
              Like Never Before
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover premium flights, exclusive deals, and personalized service that makes every journey extraordinary.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-white/80">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-premium-gold fill-current" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-premium-platinum" />
              <span className="text-sm font-medium">Secure Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-premium-diamond" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>

          {/* Search Form Overlay */}
          <div className="glass-effect rounded-2xl p-8 shadow-2xl max-w-5xl mx-auto">
            <SearchForm onSearch={setSearchResults} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="btn-premium text-lg px-8 py-4">
              Explore Premium Deals
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl px-8 py-4 hover:bg-white/20 transition-all duration-200">
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
