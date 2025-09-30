'use client'
import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import { apiUrl } from '@/lib/api'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: typeof window !== 'undefined' ? window.location.origin + '/profile' : '' },
    })
    if (error) setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={submitting || !stripe}>Pay</Button>
    </form>
  )
}

function CheckoutContent() {
  const params = useSearchParams()
  const price = Number(params.get('price') || 0)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function createPI() {
    setLoading(true)
    const res = await fetch(apiUrl('/api/checkout'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(price * 100), currency: 'usd' }),
    })
    const data = await res.json()
    setClientSecret(data.clientSecret)
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div className="mb-6">Total: <span className="font-bold">${price}</span></div>
      {!clientSecret ? (
        <Button disabled={loading} onClick={createPI}>
          {loading ? 'Creating...' : 'Create Payment'}
        </Button>
      ) : (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}