
import { NextRequest, NextResponse } from 'next/server'

// En producción, esto debería conectarse a una base de datos real
// Por simplicidad, usaremos un archivo JSON temporal
import fs from 'fs'
import path from 'path'

const HORARIOS_FILE = path.join(process.cwd(), 'data', 'horarios-data.json')

// Asegurar que el directorio y archivo existen
function ensureDataFile() {
  const dataDir = path.dirname(HORARIOS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(HORARIOS_FILE)) {
    fs.writeFileSync(HORARIOS_FILE, JSON.stringify({ asignaturas: [], periodo: { año: new Date().getFullYear().toString(), periodo: "1C" } }))
  }
}

export async function GET() {
  try {
    ensureDataFile()
    const data = fs.readFileSync(HORARIOS_FILE, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading horarios:', error)
    return NextResponse.json({ asignaturas: [], periodo: { año: new Date().getFullYear().toString(), periodo: "1C" } })
  }
}

export async function POST(request: NextRequest) {
  try {
    const horarios = await request.json()
    ensureDataFile()
    fs.writeFileSync(HORARIOS_FILE, JSON.stringify(horarios, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving horarios:', error)
    return NextResponse.json({ error: 'Error saving horarios' }, { status: 500 })
  }
}
