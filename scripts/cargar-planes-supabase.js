
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Configurar Supabase (reemplazar con tus credenciales)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Usar service key para operaciones de escritura

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Importar datos de planes
const { 
  materiasProfesorado2023, 
  materiasLicenciaturaSociocultural2023, 
  materiasLicenciaturaArqueologia2023 
} = require('../lib/data/planes-data-2023')

const { 
  materiasProfesoradoSociocultural1985, 
  materiasProfesoradoArqueologia1985, 
  materiasLicenciaturaSociocultural1985, 
  materiasLicenciaturaArqueologia1985 
} = require('../lib/data/planes-data-1985')

async function cargarDatosPlanes() {
  try {
    console.log('Iniciando carga de datos de planes...')
    
    // Limpiar tabla existente
    console.log('Limpiando tabla existente...')
    await supabase.from('planes_estudios').delete().neq('id', 0)
    
    const datasets = [
      { data: materiasProfesorado2023, plan: '2023', orientacion: 'profesorado' },
      { data: materiasLicenciaturaSociocultural2023, plan: '2023', orientacion: 'sociocultural' },
      { data: materiasLicenciaturaArqueologia2023, plan: '2023', orientacion: 'arqueologia' },
      { data: materiasProfesoradoSociocultural1985, plan: '1985', orientacion: 'profesorado-sociocultural' },
      { data: materiasProfesoradoArqueologia1985, plan: '1985', orientacion: 'profesorado-arqueologia' },
      { data: materiasLicenciaturaSociocultural1985, plan: '1985', orientacion: 'sociocultural' },
      { data: materiasLicenciaturaArqueologia1985, plan: '1985', orientacion: 'arqueologia' }
    ]
    
    for (const dataset of datasets) {
      console.log(`Cargando ${dataset.plan} - ${dataset.orientacion}...`)
      
      const materiasParaSubir = dataset.data.map(materia => ({
        cod85: materia.cod85 || null,
        cod23: materia.cod23 || null,
        nombre: materia.nombre,
        nombreCorto: materia.nombreCorto || null,
        nombreSiglas: materia.nombreSiglas || null,
        ciclo: materia.ciclo || null,
        electividad: materia.electividad || null,
        area: materia.area || null,
        correlatividad: materia.correlatividad || null,
        plan: dataset.plan,
        orientacion: dataset.orientacion
      }))
      
      // Subir en lotes de 100
      const loteSize = 100
      for (let i = 0; i < materiasParaSubir.length; i += loteSize) {
        const lote = materiasParaSubir.slice(i, i + loteSize)
        const { error } = await supabase
          .from('planes_estudios')
          .insert(lote)
        
        if (error) {
          console.error(`Error al cargar lote ${i}-${i + loteSize}:`, error)
          continue
        }
        
        console.log(`Lote ${i}-${i + loteSize} cargado exitosamente`)
      }
    }
    
    console.log('Carga de datos completada!')
    
    // Verificar datos cargados
    const { data: count } = await supabase
      .from('planes_estudios')
      .select('*', { count: 'exact', head: true })
    
    console.log(`Total de registros cargados: ${count}`)
    
  } catch (error) {
    console.error('Error durante la carga:', error)
    process.exit(1)
  }
}

// Ejecutar script
cargarDatosPlanes()
