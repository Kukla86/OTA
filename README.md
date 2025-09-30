# OTA Business Class

Premium OTA for Business/First flights with Amadeus & Sabre.

## Structure

- `frontend/` - Next.js 14 (Vercel)
- `backend/` - Fastify + TypeScript (Fly.io)

## Tech Stack

### Frontend
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Framer Motion
- Stripe Elements

### Backend  
- Fastify + TypeScript
- Prisma ORM (PostgreSQL)
- Redis cache
- Stripe API
- GDS: Amadeus & Sabre

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=https://ota-business-class-api.fly.dev
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend (.env)
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
AMADEUS_CLIENT_ID=...
AMADEUS_CLIENT_SECRET=...
SABRE_CLIENT_ID=...
SABRE_CLIENT_SECRET=...
```

## Deployment

- Frontend: Vercel (automatic on push to main)
- Backend: Fly.io (automatic on push to main)

## API Endpoints

- `GET /api/search/flights` - Search flights
- `POST /api/checkout` - Create payment intent
- `POST /api/stripe/webhook` - Stripe webhook
- `GET /api/user` - User profile
- `GET /health` - Health check
