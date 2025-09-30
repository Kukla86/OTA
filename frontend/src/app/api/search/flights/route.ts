import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCached, setCached } from '@/lib/redis'
import { amadeusSearch } from '@/gds/amadeus'
import { sabreSearch } from '@/gds/sabre'
import type { FlightOffer, SearchQuery } from '@/lib/types'

const searchSchema = z.object({
  from: z.string().min(3).max(3),
  to: z.string().min(3).max(3),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  class: z.enum(['Business', 'First']),
  adults: z.coerce.number().min(1).max(9).optional().default(1),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchSchema.parse({
      from: searchParams.get('from'),
      to: searchParams.get('to'),
      date: searchParams.get('date'),
      class: searchParams.get('class'),
      adults: searchParams.get('adults'),
    })

    const cacheKey = `search:${query.from}-${query.to}-${query.date}-${query.class}-${query.adults}`
    const cached = await getCached<FlightOffer[]>(cacheKey)
    if (cached) return NextResponse.json({ offers: cached })

    const [amadeusOffers, sabreOffers] = await Promise.allSettled([
      amadeusSearch(query),
      sabreSearch(query),
    ])

    const offers: FlightOffer[] = []
    if (amadeusOffers.status === 'fulfilled') offers.push(...amadeusOffers.value)
    if (sabreOffers.status === 'fulfilled') offers.push(...sabreOffers.value)

    await setCached(cacheKey, offers, 300) // 5 минут кэш
    return NextResponse.json({ offers })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
