'use client'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import type { FlightOffer } from '@/lib/types'

export default function FlightDetailPage() {
  const { id } = useParams<{ id: string }>()
  const params = useSearchParams()
  const router = useRouter()
  const [offer, setOffer] = useState<FlightOffer | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const provider = params.get('provider')
    if (!id || !provider) return
    // В реальности тянем деталь из GDS; пока используем last search cache через /api/search/flights или просто мокаем
    setLoading(true)
    fetch(`/api/search/flights?provider=${provider}&id=${id}`)
      .then(() => setOffer({
        id,
        airline: 'XX',
        price: 1999,
        class: 'Business',
        from: 'JFK',
        to: 'LHR',
        departure: '2025-10-20T10:00:00Z',
        arrival: '2025-10-20T18:00:00Z',
        provider: provider as any,
      }))
      .finally(() => setLoading(false))
  }, [id, params])

  if (loading || !offer) return <div className="p-6">Loading...</div>

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">{offer.airline} • {offer.from} → {offer.to}</h1>
      <div className="mb-6 text-gray-600">{offer.departure} → {offer.arrival} • {offer.class} • {offer.provider}</div>
      <div className="text-3xl font-bold mb-6">${'{'}offer.price{'}'}</div>
      <button className="px-4 py-2 bg-black text-white rounded" onClick={() => router.push(`/checkout?offerId=${offer.id}&provider=${offer.provider}&price=${offer.price}`)}>Proceed to checkout</button>
    </div>
  )
}


