import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCached, setCached } from '@/lib/redis'
import { amadeusSearch } from '@/gds/amadeus/client'
import { sabreSearch } from '@/gds/sabre/client'
import { CabinClass, NormalizedFlightResponse, SearchQuery } from '@/lib/types'

const SearchSchema = z.object({
  from: z.string().min(3),
  to: z.string().min(3),
  date: z.string().min(8),
  class: z.enum(['Business', 'First']),
  adults: z.coerce.number().min(1).max(9).optional(),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const parsed = SearchSchema.safeParse({
    from: searchParams.get('from'),
    to: searchParams.get('to'),
    date: searchParams.get('date'),
    class: searchParams.get('class'),
    adults: searchParams.get('adults'),
  })
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
  }
  const query = parsed.data as SearchQuery & { class: CabinClass }
  const cacheKey = `flights:${query.from}:${query.to}:${query.date}:${query.class}:${query.adults ?? 1}`

  const cached = await getCached<NormalizedFlightResponse>(cacheKey)
  if (cached) return NextResponse.json({ ...cached, cached: true })

  const [amadeus, sabre] = await Promise.allSettled([
    amadeusSearch(query),
    sabreSearch(query),
  ])

  const offers = [
    ...(amadeus.status === 'fulfilled' ? amadeus.value : []),
    ...(sabre.status === 'fulfilled' ? sabre.value : []),
  ]

  const response: NormalizedFlightResponse = {
    offers,
    source: [
      ...(amadeus.status === 'fulfilled' ? ['Amadeus'] : []),
      ...(sabre.status === 'fulfilled' ? ['Sabre'] : []),
    ],
  }

  const popular = [
    ['JFK', 'LHR'],
    ['SFO', 'NRT'],
    ['LAX', 'SYD'],
  ] as const
  const isPopular = popular.some(([a, b]) =>
    (a === query.from && b === query.to) || (a === query.to && b === query.from)
  )
  await setCached(cacheKey, response, isPopular ? 900 : 300)
  return NextResponse.json(response)
}


