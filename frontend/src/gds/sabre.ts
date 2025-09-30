import { FlightOffer, SearchQuery } from '../lib/types'

type OAuthToken = { access_token: string; token_type: string; expires_in: number }

async function fetchToken(): Promise<string> {
  const base = process.env.SABRE_BASE_URL || 'https://api.test.sabre.com'
  const id = process.env.SABRE_CLIENT_ID
  const secret = process.env.SABRE_CLIENT_SECRET
  if (!id || !secret) throw new Error('Sabre credentials missing')
  const creds = Buffer.from(`${id}:${secret}`).toString('base64')
  const res = await fetch(`${base}/v2/auth/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Sabre OAuth failed')
  const json = (await res.json()) as OAuthToken
  return json.access_token
}

export async function sabreSearch(query: SearchQuery): Promise<FlightOffer[]> {
  const base = process.env.SABRE_BASE_URL || 'https://api.test.sabre.com'
  const token = await fetchToken()
  const params = new URLSearchParams({
    origin: query.from,
    destination: query.to,
    departuredate: query.date,
    onlineitinerariesonly: 'N',
    limit: '20',
    adult: String(query.adults ?? 1),
    cabin: query.class === 'First' ? 'F' : 'C',
  })
  const res = await fetch(`${base}/v1/shop/flights?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Sabre search failed')
  const data = await res.json()
  return normalizeSabre(data)
}

export function normalizeSabre(data: any): FlightOffer[] {
  const list = Array.isArray(data?.PricedItineraries) ? data.PricedItineraries : []
  return list.map((o: any, idx: number) => {
    const seg = o?.AirItinerary?.OriginDestinationOptions?.[0]?.FlightSegments?.[0]
    const total = o?.AirItineraryPricingInfo?.ItinTotalFare?.TotalFare?.Amount ?? 0
    return {
      id: o?.TPA_Extensions?.ETicket ?? String(idx),
      airline: seg?.MarketingAirline ?? 'XX',
      price: Number(total),
      class: (seg?.ResBookDesigCabinID === 'F' ? 'First' : 'Business') as 'Business' | 'First',
      from: seg?.DepartureAirport ?? '',
      to: seg?.ArrivalAirport ?? '',
      departure: seg?.DepartureDateTime ?? '',
      arrival: seg?.ArrivalDateTime ?? '',
      provider: 'Sabre',
    }
  })
}
