import { NextResponse } from 'next/server'

export async function GET() {
  // Заглушка профиля: позже заменить на auth + prisma
  return NextResponse.json({
    id: 'demo-user',
    email: 'demo@otabusiness.class',
    name: 'Business Traveler',
  })
}


