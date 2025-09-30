import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe'

const checkoutSchema = z.object({
  amount: z.number().min(50), // минимум $0.50
  currency: z.string().default('usd'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency } = checkoutSchema.parse(body)

    const stripe = getStripe()
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
