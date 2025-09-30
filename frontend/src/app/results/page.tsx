'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { FlightOffer } from '@/lib/types'
import { FlightCard } from '@/components/FlightCard'
import { apiUrl } from '@/lib/api'
import { Button } from '@/components/ui/button'

export default function ResultsPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [offers, setOffers] = useState<FlightOffer[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const from = params.get('from')
    const to = params.get('to')
    const date = params.get('date')
    const klass = params.get('class')
    if (!from || !to || !date || !klass) return
    setLoading(true)
    fetch(apiUrl(`/api/search/flights?from=${from}&to=${to}&date=${date}&class=${klass}`))
      .then(r => r.json())
      .then(d => setOffers(d.offers || []))
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false))
  }, [params])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Results</h1>
      <div className="space-y-3">
        {(offers || []).map(o => (
          <FlightCard
            key={o.id}
            offer={o}
            action={<Button onClick={() => router.push(`/flight/${o.id}?provider=${o.provider}`)}>View</Button>}
          />
        ))}
      </div>
    </div>
  )
}


