import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { z } from 'zod'
import { getCached, setCached } from './lib/redis'
import { amadeusSearch } from './gds/amadeus'
import { sabreSearch } from './gds/sabre'
import { getStripe } from './lib/stripe'
import { prisma } from './lib/prisma'
import type { FlightOffer, SearchQuery } from './types'

const app = Fastify({ logger: true })

await app.register(cors, { origin: true })
await app.register(helmet)

app.get('/health', async () => ({ ok: true }))

const SearchSchema = z.object({
  from: z.string().min(3),
  to: z.string().min(3),
  date: z.string().min(8),
  class: z.enum(['Business', 'First']),
  adults: z.coerce.number().min(1).max(9).optional(),
})

app.get('/api/search/flights', async (req, reply) => {
  const parsed = SearchSchema.safeParse((req as any).query)
  if (!parsed.success) return reply.code(400).send({ error: 'Invalid query' })
  const query = parsed.data as SearchQuery
  const cacheKey = `flights:${query.from}:${query.to}:${query.date}:${query.class}:${query.adults ?? 1}`
  const cached = await getCached<{ offers: FlightOffer[]; source: string[] }>(cacheKey)
  if (cached) return reply.send({ ...cached, cached: true })

  const [a, s] = await Promise.allSettled([amadeusSearch(query), sabreSearch(query)])
  const offers = [
    ...(a.status === 'fulfilled' ? a.value : []),
    ...(s.status === 'fulfilled' ? s.value : []),
  ]
  const response = { offers, source: [...(a.status === 'fulfilled' ? ['Amadeus'] : []), ...(s.status === 'fulfilled' ? ['Sabre'] : [])] }

  const popular: ReadonlyArray<readonly [string, string]> = [['JFK','LHR'],['SFO','NRT'],['LAX','SYD']]
  const isPopular = popular.some(([x,y]) => (x===query.from && y===query.to) || (x===query.to && y===query.from))
  await setCached(cacheKey, response, isPopular ? 900 : 300)

  return reply.send(response)
})

const CheckoutSchema = z.object({
  amount: z.number().int().min(50),
  currency: z.string().default('usd'),
  offerId: z.string().optional(),
  provider: z.string().optional(),
  cabinClass: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  airline: z.string().optional(),
  departureAt: z.string().optional(),
  arrivalAt: z.string().optional(),
})

app.post('/api/checkout', async (req, reply) => {
  const parsed = CheckoutSchema.safeParse((req as any).body)
  if (!parsed.success) return reply.code(400).send({ error: 'Invalid body' })
  const stripe = getStripe()
  const { amount, currency, ...metadata } = parsed.data
  const pi = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata,
    automatic_payment_methods: { enabled: true },
  })
  return reply.send({ clientSecret: pi.client_secret })
})

app.post('/api/stripe/webhook', async (req: any, reply) => {
  const stripe = getStripe()
  const sig = req.headers['stripe-signature'] as string | undefined
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !whSecret) return reply.code(400).send({ error: 'Missing signature' })
  let event
  try {
    const rawBody = JSON.stringify(req.body)
    event = stripe.webhooks.constructEvent(rawBody, sig, whSecret)
  } catch {
    return reply.code(400).send({ error: 'Invalid signature' })
  }
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as any
    const meta = pi.metadata || {}
    const price = Math.round((pi.amount as number) / 100)
    const user = await prisma.user.upsert({
      where: { email: 'demo@otabusiness.class' },
      update: {},
      create: { email: 'demo@otabusiness.class', name: 'Business Traveler' },
    })
    await prisma.order.create({
      data: {
        userId: user.id,
        offerId: meta.offerId ?? 'unknown',
        provider: meta.provider ?? 'unknown',
        airline: meta.airline ?? 'unknown',
        price,
        cabinClass: meta.cabinClass ?? 'Business',
        fromAirport: meta.from ?? 'XXX',
        toAirport: meta.to ?? 'YYY',
        departureAt: new Date(meta.departureAt ?? Date.now()),
        arrivalAt: new Date(meta.arrivalAt ?? Date.now()),
        stripePiId: pi.id,
        status: 'paid',
      },
    })
  }
  return reply.send({ received: true })
})

app.get('/api/user', async () => ({
  id: 'demo-user',
  email: 'demo@otabusiness.class',
  name: 'Business Traveler',
}))

const port = Number(process.env.PORT || 8080)
const host = '0.0.0.0'
app.listen({ port, host }).catch((err) => {
  app.log.error(err)
  process.exit(1)
})