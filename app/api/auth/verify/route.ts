
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    const adminPassword = process.env.ADMIN_PASSWORD
    
    // Log para depuración (remover en producción)
    console.log('Password provided:', !!password)
    console.log('Admin password configured:', !!adminPassword)
    
    if (!adminPassword) {
      console.log('Error: ADMIN_PASSWORD environment variable not set')
      return NextResponse.json(
        { error: 'Contraseña de admin no configurada' },
        { status: 500 }
      )
    }

    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
