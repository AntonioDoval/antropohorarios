
import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('enabled', true)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Error fetching announcement:', error)
      return NextResponse.json({ enabled: false, title: '', text: '' })
    }

    if (data && data.length > 0) {
      return NextResponse.json(data[0])
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
      return NextResponse.json({ 
        error: 'No autorizado' 
      }, { status: 401 })
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ 
        error: 'Error de configuración del servidor' 
      }, { status: 500 })
    }

    const { enabled, title, text } = await request.json()
    
    // Insertar nuevo anuncio
    const { data, error } = await supabaseAdmin
      .from('announcements')
      .insert([{ enabled, title, text }])
      .select()

    if (error) {
      console.error('Error saving announcement:', error)
      return NextResponse.json({ 
        error: 'Error al guardar el anuncio' 
      }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Unexpected error saving announcement:', error)
    return NextResponse.json({ 
      error: 'Error interno del servidor' 
    }, { status: 500 })
  }
}
