import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createOrderFromPaymentIntent } from '@/lib/orders'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const sig = req.headers.get('stripe-signature')
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !whSecret) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  const raw = await req.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  switch (event.type) {
    case 'payment_intent.succeeded':
      await createOrderFromPaymentIntent(event.data.object as any)
      break
  }
  return NextResponse.json({ received: true })
}


