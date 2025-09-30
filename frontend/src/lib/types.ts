export type CabinClass = 'Business' | 'First'
export type Provider = 'Amadeus' | 'Sabre'

export type FlightOffer = {
  id: string
  airline: string
  price: number
  class: CabinClass
  from: string
  to: string
  departure: string
  arrival: string
  provider: Provider
}

export type SearchQuery = {
  from: string
  to: string
  date: string
  class: CabinClass
  adults?: number
}