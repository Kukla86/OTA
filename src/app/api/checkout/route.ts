import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe'

const BodySchema = z.object({
  amount: z.number().int().min(50), // в центах USD
  currency: z.string().default('usd'),
  offerId: z.string().optional(),
  provider: z.string().optional(),
  cabinClass: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  const stripe = getStripe()
  const { amount, currency, ...meta } = parsed.data
  const pi = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata: meta,
    automatic_payment_methods: { enabled: true },
  })
  return NextResponse.json({ clientSecret: pi.client_secret })
}


