'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle, Gift, Plane } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Simulate API call
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-sky-600 to-primary-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Stay Updated with
              <span className="block premium-text">Exclusive Deals</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get access to premium flight deals, exclusive offers, and travel tips delivered straight to your inbox
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-2xl mx-auto mb-12">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white/50 focus:outline-none text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-premium px-8 py-4 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Subscribe</span>
                </button>
              </form>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <div className="flex items-center justify-center space-x-3 text-white">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                  <span className="text-xl font-semibold">Successfully Subscribed!</span>
                </div>
                <p className="text-white/80 mt-2">Thank you for joining our premium newsletter.</p>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                Exclusive Deals
              </h3>
              <p className="text-white/80">
                Get access to member-only flight deals and discounts up to 50% off
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                Travel Tips
              </h3>
              <p className="text-white/80">
                Receive expert travel advice and destination guides from our team
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                Priority Access
              </h3>
              <p className="text-white/80">
                Be the first to know about new routes and premium service launches
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm mb-4">
              Join over 50,000 travelers who trust Skyline OTA for their premium travel needs
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
              <span className="text-sm">✓ No spam, ever</span>
              <span className="text-sm">✓ Unsubscribe anytime</span>
              <span className="text-sm">✓ Privacy protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
