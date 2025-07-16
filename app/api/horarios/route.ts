
import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Fetching horarios from Supabase...')
    
    const { data, error } = await supabase
      .from('horarios')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Supabase error:', error.message, error.details, error.hint)
      return NextResponse.json({ 
        asignaturas: [], 
        periodo: { 
          año: new Date().getFullYear().toString(), 
          periodo: "1C" 
        } 
      })
    }

    console.log('Supabase query successful, records found:', data?.length || 0)

    if (data && data.length > 0) {
      console.log('Returning data from Supabase')
      return NextResponse.json(data[0].data)
    }

    console.log('No data found, returning empty structure')
    return NextResponse.json({ 
      asignaturas: [], 
      periodo: { 
        año: new Date().getFullYear().toString(), 
        periodo: "1C" 
      } 
    })
  } catch (error) {
    console.error('Unexpected error in GET /api/horarios:', error)
    return NextResponse.json({ 
      asignaturas: [], 
      periodo: { 
        año: new Date().getFullYear().toString(), 
        periodo: "1C" 
      } 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación del admin
    const password = request.headers.get('x-admin-password')
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!password || !adminPassword || password !== adminPassword) {
      console.error('Unauthorized access attempt to POST /api/horarios')
      return NextResponse.json({ 
        error: 'No autorizado. Solo los administradores pueden modificar los datos.' 
      }, { status: 401 })
    }

    // Verificar que tenemos el cliente administrativo
    if (!supabaseAdmin) {
      console.error('Supabase service key not configured')
      return NextResponse.json({ 
        error: 'Error de configuración del servidor: clave de servicio de Supabase no configurada' 
      }, { status: 500 })
    }

    const horarios = await request.json()
    
    console.log('Saving horarios to Supabase with admin credentials...')
    console.log('Data structure:', {
      asignaturas: horarios.asignaturas?.length || 0,
      periodo: horarios.periodo
    })
    
    // Validate the data structure
    if (!horarios.asignaturas || !Array.isArray(horarios.asignaturas)) {
      return NextResponse.json({ 
        error: 'Invalid data structure: asignaturas must be an array' 
      }, { status: 400 })
    }

    if (!horarios.periodo || !horarios.periodo.año || !horarios.periodo.periodo) {
      return NextResponse.json({ 
        error: 'Invalid data structure: periodo must contain año and periodo' 
      }, { status: 400 })
    }
    
    const { error } = await supabaseAdmin
      .from('horarios')
      .insert([
        { 
          data: horarios,
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Supabase error:', error.message, error.details, error.hint)
      return NextResponse.json({ 
        error: `Error saving horarios: ${error.message}` 
      }, { status: 500 })
    }

    console.log('Horarios saved successfully to Supabase')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in POST /api/horarios:', error)
    return NextResponse.json({ 
      error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verificar autenticación del admin
    const password = request.headers.get('x-admin-password')
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!password || !adminPassword || password !== adminPassword) {
      console.error('Unauthorized access attempt to DELETE /api/horarios')
      return NextResponse.json({ 
        error: 'No autorizado. Solo los administradores pueden eliminar los datos.' 
      }, { status: 401 })
    }

    // Verificar que tenemos el cliente administrativo
    if (!supabaseAdmin) {
      console.error('Supabase service key not configured')
      return NextResponse.json({ 
        error: 'Error de configuración del servidor: clave de servicio de Supabase no configurada' 
      }, { status: 500 })
    }

    console.log('Clearing all horarios from Supabase with admin credentials...')
    
    const { error } = await supabaseAdmin
      .from('horarios')
      .delete()
      .neq('id', 0) // Delete all records

    if (error) {
      console.error('Supabase error:', error.message, error.details, error.hint)
      return NextResponse.json({ 
        error: `Error clearing horarios: ${error.message}` 
      }, { status: 500 })
    }

    console.log('All horarios cleared successfully from Supabase')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in DELETE /api/horarios:', error)
    return NextResponse.json({ 
      error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}
