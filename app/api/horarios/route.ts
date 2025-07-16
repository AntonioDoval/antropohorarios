
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
    const horarios = await request.json()
    
    console.log('Saving horarios to Supabase...')
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
    
    const { error } = await supabase
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

export async function DELETE() {
  try {
    console.log('Clearing all horarios from Supabase...')
    
    const { error } = await supabase
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
