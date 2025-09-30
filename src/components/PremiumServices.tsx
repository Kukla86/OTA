'use client'

import { 
  Crown, 
  Shield, 
  Clock, 
  Users, 
  Car, 
  Coffee, 
  Wifi, 
  Headphones,
  Star,
  CheckCircle
} from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Priority Boarding',
    description: 'Skip the lines and board first with our exclusive priority boarding service.',
    icon: Crown,
    features: ['Express check-in', 'Priority security', 'Early boarding'],
    price: '$49',
    popular: true
  },
  {
    id: 2,
    title: 'Lounge Access',
    description: 'Relax in premium airport lounges with complimentary food and beverages.',
    icon: Coffee,
    features: ['Unlimited refreshments', 'WiFi access', 'Comfortable seating'],
    price: '$79',
    popular: false
  },
  {
    id: 3,
    title: 'Concierge Service',
    description: '24/7 personal concierge to assist with all your travel needs.',
    icon: Headphones,
    features: ['24/7 support', 'Personal assistant', 'Custom requests'],
    price: '$199',
    popular: false
  },
  {
    id: 4,
    title: 'Airport Transfer',
    description: 'Luxury airport transfers in premium vehicles with professional drivers.',
    icon: Car,
    features: ['Luxury vehicles', 'Professional drivers', 'Meet & greet'],
    price: '$99',
    popular: false
  },
  {
    id: 5,
    title: 'Travel Insurance',
    description: 'Comprehensive travel protection for peace of mind during your journey.',
    icon: Shield,
    features: ['Trip cancellation', 'Medical coverage', 'Baggage protection'],
    price: '$39',
    popular: false
  },
  {
    id: 6,
    title: 'Fast Track Security',
    description: 'Expedited security screening to save time at the airport.',
    icon: Clock,
    features: ['Dedicated lanes', 'Faster screening', 'Priority processing'],
    price: '$29',
    popular: false
  }
]

const premiumTiers = [
  {
    name: 'Gold',
    price: '$299',
    period: 'per year',
    color: 'from-premium-gold to-yellow-400',
    features: [
      'Priority boarding on all flights',
      'Lounge access (5 visits)',
      'Fast track security',
      '24/7 customer support',
      'Exclusive deals & offers'
    ]
  },
  {
    name: 'Platinum',
    price: '$599',
    period: 'per year',
    color: 'from-premium-platinum to-purple-400',
    features: [
      'Everything in Gold',
      'Unlimited lounge access',
      'Airport transfers (10 trips)',
      'Concierge service',
      'Complimentary upgrades',
      'Priority customer support'
    ],
    popular: true
  },
  {
    name: 'Diamond',
    price: '$999',
    period: 'per year',
    color: 'from-premium-diamond to-cyan-400',
    features: [
      'Everything in Platinum',
      'Private jet access',
      'Personal travel manager',
      'Unlimited transfers',
      'VIP airport services',
      'Exclusive events & experiences'
    ]
  }
]

export function PremiumServices() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Premium
            <span className="block premium-text">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elevate your travel experience with our exclusive premium services designed for discerning travelers
          </p>
        </div>

        {/* Individual Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                service.popular ? 'ring-2 ring-premium-gold' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-premium-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-100 to-sky-100 rounded-2xl mb-4">
                  <service.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary-600">
                  {service.price}
                </div>
                <button className="btn-primary px-6 py-2 text-sm">
                  Add Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Tiers */}
        <div className="text-center mb-12">
          <h3 className="font-display font-bold text-3xl text-gray-900 mb-4">
            Premium Membership Tiers
          </h3>
          <p className="text-lg text-gray-600">
            Choose the perfect membership level for your travel needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {premiumTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                tier.popular ? 'ring-2 ring-premium-platinum scale-105' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-premium-platinum text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${tier.color} rounded-2xl mb-4`}>
                  <Crown className="h-10 w-10 text-white" />
                </div>
                <h4 className="font-display font-bold text-2xl text-gray-900 mb-2">
                  {tier.name}
                </h4>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-600 ml-2">{tier.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                tier.popular
                  ? 'bg-gradient-to-r from-premium-platinum to-purple-600 text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {tier.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
