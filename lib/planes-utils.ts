
export interface MateriaDelPlan {
  cod85: string
  cod23: string
  nombre: string
  nombreCorto: string
  nombreSiglas: string
  ciclo: string
  electividad: string
  area: string
  correlatividad: string
}

export interface PlanDeEstudios {
  año: string
  titulo: string
  orientacion: string
  materias: MateriaDelPlan[]
}

export interface AsignaturaConPlan {
  id: string
  materia: string
  catedra: string
  tipoAsignatura?: string
  modalidadAprobacion: string
  modalidadCursada: string
  orientacion?: string
  agrupacionClases?: { [tipo: string]: "elegir" | "conjunto" }
  aclaraciones?: string
  clases: any[]
  // Datos del plan de estudios
  planInfo?: {
    cod85: string
    cod23: string
    nombreCorto: string
    nombreSiglas: string
    ciclo: string
    electividad: string
    area: string
    correlatividad: string
  }
}

export function getPlanesDeEstudios(): PlanDeEstudios[] {
  const data = localStorage.getItem("planes-estudios-antropologia")
  return data ? JSON.parse(data) : []
}

export function enrichAsignaturasWithPlanInfo(asignaturas: any[]): AsignaturaConPlan[] {
  const planes = getPlanesDeEstudios()
  
  return asignaturas.map(asignatura => {
    // Buscar la materia en los planes de estudios por nombre
    let materiaEncontrada: MateriaDelPlan | null = null
    
    for (const plan of planes) {
      materiaEncontrada = plan.materias.find(materia => 
        // Comparar nombres normalizados (sin mayúsculas y caracteres especiales)
        normalizarNombre(materia.nombre) === normalizarNombre(asignatura.materia)
      ) || null
      
      if (materiaEncontrada) break
    }
    
    const result: AsignaturaConPlan = {
      ...asignatura,
      planInfo: materiaEncontrada ? {
        cod85: materiaEncontrada.cod85,
        cod23: materiaEncontrada.cod23,
        nombreCorto: materiaEncontrada.nombreCorto,
        nombreSiglas: materiaEncontrada.nombreSiglas,
        ciclo: materiaEncontrada.ciclo,
        electividad: materiaEncontrada.electividad,
        area: materiaEncontrada.area,
        correlatividad: materiaEncontrada.correlatividad,
      } : undefined
    }
    
    return result
  })
}

function normalizarNombre(nombre: string): string {
  return nombre
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getAsignaturasPorCiclo(asignaturas: AsignaturaConPlan[]) {
  const result: { [ciclo: string]: AsignaturaConPlan[] } = {}
  
  asignaturas.forEach(asignatura => {
    if (asignatura.planInfo?.ciclo) {
      const ciclo = asignatura.planInfo.ciclo
      if (!result[ciclo]) {
        result[ciclo] = []
      }
      result[ciclo].push(asignatura)
    } else {
      // Asignaturas sin información de plan
      if (!result['Sin clasificar']) {
        result['Sin clasificar'] = []
      }
      result['Sin clasificar'].push(asignatura)
    }
  })
  
  return result
}

export function getAsignaturasPorArea(asignaturas: AsignaturaConPlan[]) {
  const result: { [area: string]: AsignaturaConPlan[] } = {}
  
  asignaturas.forEach(asignatura => {
    if (asignatura.planInfo?.area && asignatura.planInfo.area.trim()) {
      const area = asignatura.planInfo.area
      if (!result[area]) {
        result[area] = []
      }
      result[area].push(asignatura)
    } else {
      // Asignaturas sin área específica
      if (!result['General']) {
        result['General'] = []
      }
      result['General'].push(asignatura)
    }
  })
  
  return result
}
