import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Заглушка для пользователя
  return NextResponse.json({ 
    user: { 
      id: '1', 
      email: 'user@example.com', 
      name: 'Test User' 
    } 
  })
}

export async function POST(request: NextRequest) {
  // Заглушка для создания пользователя
  return NextResponse.json({ 
    user: { 
      id: '1', 
      email: 'user@example.com', 
      name: 'Test User' 
    } 
  })
}
