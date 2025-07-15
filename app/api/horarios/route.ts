
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('horarios')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Error fetching horarios from Supabase:', error)
      return NextResponse.json({ 
        asignaturas: [], 
        periodo: { 
          año: new Date().getFullYear().toString(), 
          periodo: "1C" 
        } 
      })
    }

    if (data && data.length > 0) {
      return NextResponse.json(data[0].data)
    }

    return NextResponse.json({ 
      asignaturas: [], 
      periodo: { 
        año: new Date().getFullYear().toString(), 
        periodo: "1C" 
      } 
    })
  } catch (error) {
    console.error('Error in GET /api/horarios:', error)
    return NextResponse.json({ 
      asignaturas: [], 
      periodo: { 
        año: new Date().getFullYear().toString(), 
        periodo: "1C" 
      } 
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const horarios = await request.json()
    
    const { error } = await supabase
      .from('horarios')
      .insert([
        { 
          data: horarios,
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Error saving horarios to Supabase:', error)
      return NextResponse.json({ error: 'Error saving horarios' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in POST /api/horarios:', error)
    return NextResponse.json({ error: 'Error saving horarios' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const { error } = await supabase
      .from('horarios')
      .delete()
      .neq('id', 0) // Delete all records

    if (error) {
      console.error('Error clearing horarios from Supabase:', error)
      return NextResponse.json({ error: 'Error clearing horarios' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/horarios:', error)
    return NextResponse.json({ error: 'Error clearing horarios' }, { status: 500 })
  }
}
