import Link from 'next/link'
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-primary-400" />
              <span className="font-display font-bold text-xl">Skyline</span>
              <span className="text-xs bg-gradient-to-r from-premium-gold to-premium-platinum bg-clip-text text-transparent font-semibold">
                PREMIUM
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Experience luxury air travel with our premium flight booking platform. 
              Your journey to the skies starts here.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/flights" className="block text-gray-400 hover:text-white transition-colors">
                Flights
              </Link>
              <Link href="/hotels" className="block text-gray-400 hover:text-white transition-colors">
                Hotels
              </Link>
              <Link href="/packages" className="block text-gray-400 hover:text-white transition-colors">
                Vacation Packages
              </Link>
              <Link href="/deals" className="block text-gray-400 hover:text-white transition-colors">
                Special Deals
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <div className="space-y-2">
              <Link href="/premium" className="block text-gray-400 hover:text-white transition-colors">
                Premium Services
              </Link>
              <Link href="/lounge" className="block text-gray-400 hover:text-white transition-colors">
                Airport Lounge Access
              </Link>
              <Link href="/priority" className="block text-gray-400 hover:text-white transition-colors">
                Priority Boarding
              </Link>
              <Link href="/concierge" className="block text-gray-400 hover:text-white transition-colors">
                Concierge Service
              </Link>
              <Link href="/support" className="block text-gray-400 hover:text-white transition-colors">
                24/7 Support
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">support@skyline-ota.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Skyline OTA. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
