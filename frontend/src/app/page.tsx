'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { FeaturedDestinations } from '@/components/FeaturedDestinations'
import { PremiumServices } from '@/components/PremiumServices'
import { Testimonials } from '@/components/Testimonials'
import { Newsletter } from '@/components/Newsletter'

export default function Home() {
  const [searchResults, setSearchResults] = useState(null)

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedDestinations />
      <PremiumServices />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
