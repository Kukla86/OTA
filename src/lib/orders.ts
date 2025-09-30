// Репозиторий заказов через Prisma
import type Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

export async function createOrderFromPaymentIntent(pi: Stripe.PaymentIntent) {
  const meta = pi.metadata || {}
  const priceCents = typeof pi.amount === 'number' ? pi.amount : 0
  const price = Math.round(priceCents / 100)

  // В демо используем тестового пользователя; позже заменить на реального auth
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


