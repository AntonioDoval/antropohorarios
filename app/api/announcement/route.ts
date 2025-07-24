
import { NextRequest, NextResponse } from 'next/server'

// Simulamos almacenamiento simple (en producción usarías una base de datos)
let announcementData = {
  enabled: false,
  title: "",
  content: ""
}

export async function GET() {
  try {
    return NextResponse.json(announcementData)
  } catch (error) {
    console.error('Error fetching announcement:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación de admin
    const adminPassword = request.headers.get('x-admin-password')
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    if (adminPassword !== expectedPassword) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { enabled, title, content } = body

    // Validación básica
    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'enabled debe ser boolean' }, { status: 400 })
    }

    announcementData = {
      enabled: enabled || false,
      title: title || "",
      content: content || ""
    }

    return NextResponse.json({ success: true, data: announcementData })
  } catch (error) {
    console.error('Error updating announcement:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
