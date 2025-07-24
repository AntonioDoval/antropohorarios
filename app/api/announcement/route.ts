
import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized')
      return NextResponse.json({ enabled: false, title: '', text: '' })
    }

    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Supabase error fetching announcement:', error)
      return NextResponse.json({ enabled: false, title: '', text: '' })
    }

    if (data && data.length > 0) {
      const announcement = data[0]
      return NextResponse.json({
        enabled: announcement.enabled || false,
        title: announcement.title || '',
        text: announcement.text || ''
      })
    }

    return NextResponse.json({ enabled: false, title: '', text: '' })
  } catch (error) {
    console.error('Unexpected error fetching announcement:', error)
    return NextResponse.json({ enabled: false, title: '', text: '' })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación del admin
    const password = request.headers.get('x-admin-password')
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!password || !adminPassword || password !== adminPassword) {
      console.error('Unauthorized access attempt to POST /api/announcement')
      return NextResponse.json({ 
        error: 'No autorizado' 
      }, { status: 401 })
    }

    if (!supabaseAdmin) {
      console.error('Supabase admin client not configured')
      return NextResponse.json({ 
        error: 'Error de configuración del servidor - cliente admin no disponible' 
      }, { status: 500 })
    }

    const body = await request.json()
    const { enabled, title, text } = body
    
    console.log('Attempting to save announcement:', { enabled, title: title?.substring(0, 50), text: text?.substring(0, 50) })
    
    // Validar datos
    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ 
        error: 'El campo enabled debe ser un booleano' 
      }, { status: 400 })
    }

    // Insertar nuevo anuncio
    const { data, error } = await supabaseAdmin
      .from('announcements')
      .insert([{ 
        enabled: enabled,
        title: title || '',
        text: text || ''
      }])
      .select()

    if (error) {
      console.error('Supabase error saving announcement:', error)
      return NextResponse.json({ 
        error: `Error de base de datos: ${error.message}` 
      }, { status: 500 })
    }

    console.log('Announcement saved successfully:', data[0]?.id)
    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Unexpected error saving announcement:', error)
    return NextResponse.json({ 
      error: `Error interno: ${error instanceof Error ? error.message : 'Error desconocido'}` 
    }, { status: 500 })
  }
}
