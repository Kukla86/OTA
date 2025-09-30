'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Plane, 
  Menu, 
  X, 
  User, 
  Bell, 
  Search,
  Crown,
  Star,
  ChevronDown
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Plane className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
              <div className="absolute -top-1 -right-1">
                <Crown className="h-4 w-4 text-premium-gold" />
              </div>
            </div>
            <span className="font-display font-bold text-xl text-gray-900">
              Skyline
            </span>
            <span className="text-xs bg-gradient-to-r from-premium-gold to-premium-platinum bg-clip-text text-transparent font-semibold">
              PREMIUM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/flights" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Flights
            </Link>
            <Link href="/hotels" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Hotels
            </Link>
            <Link href="/packages" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Packages
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Deals
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors">
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {/* Dropdown would go here */}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            <ThemeToggle />
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <User className="h-4 w-4" />
              <span className="hidden sm:block">Sign In</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <Link href="/flights" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Flights
              </Link>
              <Link href="/hotels" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Hotels
              </Link>
              <Link href="/packages" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Packages
              </Link>
              <Link href="/deals" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Deals
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
