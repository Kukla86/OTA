import { describe, it, expect } from 'vitest'
import { normalizeAmadeus } from '@/gds/amadeus/client'
import { normalizeSabre } from '@/gds/sabre/client'

describe('normalizers', () => {
  it('normalizes amadeus response', () => {
    const data = { data: [{ id: '1', price: { total: '1234' }, itineraries: [{ segments: [{ carrierCode: 'AA', departure: { iataCode: 'JFK', at: '2025-10-20T10:00:00Z' }, arrival: { iataCode: 'LHR', at: '2025-10-20T18:00:00Z' } }] }], travelerPricings: [{ fareDetailsBySegment: [{ cabin: 'Business' }] }] }] }
    const res = normalizeAmadeus(data)
    expect(res[0]).toMatchObject({ provider: 'Amadeus', class: 'Business', from: 'JFK', to: 'LHR' })
  })

  it('normalizes sabre response', () => {
    const data = { PricedItineraries: [{ AirItinerary: { OriginDestinationOptions: [{ FlightSegments: [{ MarketingAirline: 'BA', ResBookDesigCabinID: 'F', DepartureAirport: 'JFK', ArrivalAirport: 'LHR', DepartureDateTime: '2025-11-01T10:00:00Z', ArrivalDateTime: '2025-11-01T20:00:00Z' }] }] }, AirItineraryPricingInfo: { ItinTotalFare: { TotalFare: { Amount: 2500 } } } }] }
    const res = normalizeSabre(data)
    expect(res[0]).toMatchObject({ provider: 'Sabre', class: 'First', price: 2500 })
  })
})


