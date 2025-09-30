import { FlightOffer, SearchQuery } from '../types'

type OAuthToken = { access_token: string; token_type: string; expires_in: number }

async function fetchToken(): Promise<string> {
  const base = process.env.AMADEUS_BASE_URL || 'https://test.api.amadeus.com'
  const id = process.env.AMADEUS_CLIENT_ID
  const secret = process.env.AMADEUS_CLIENT_SECRET
  if (!id || !secret) throw new Error('Amadeus credentials missing')
  const res = await fetch(`${base}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: id, client_secret: secret }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Amadeus OAuth failed')
  const json = (await res.json()) as OAuthToken
  return json.access_token
}

export async function amadeusSearch(query: SearchQuery): Promise<FlightOffer[]> {
  const base = process.env.AMADEUS_BASE_URL || 'https://test.api.amadeus.com'
  const token = await fetchToken()
  const params = new URLSearchParams({
    originLocationCode: query.from,
    destinationLocationCode: query.to,
    departureDate: query.date,
    adults: String(query.adults ?? 1),
    travelClass: query.class,
    currencyCode: 'USD',
    nonStop: 'false',
    max: '20',
  })
  const res = await fetch(`${base}/v2/shopping/flight-offers?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Amadeus search failed')
  const data = await res.json()
  return normalizeAmadeus(data)
}

export function normalizeAmadeus(data: any): FlightOffer[] {
  return (data.data || []).map((o: any, idx: number) => {
    const itinerary = o?.itineraries?.[0]
    const segment = itinerary?.segments?.[0]
    return {
      id: o.id ?? String(idx),
      airline: segment?.carrierCode ?? 'XX',
      price: Number(o?.price?.total ?? 0),
      class: (o?.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ?? 'Business') as 'Business' | 'First',
      from: segment?.departure?.iataCode ?? '',
      to: segment?.arrival?.iataCode ?? '',
      departure: segment?.departure?.at ?? '',
      arrival: segment?.arrival?.at ?? '',
      provider: 'Amadeus',
    }
  })
}
