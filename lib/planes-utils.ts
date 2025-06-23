
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
    orientaciones: string[] // Lista de orientaciones para las que es válida
    equivalencia: {
      cod85?: string
      cod23?: string
      nombrePlan85?: string
      nombrePlan23?: string
    }
    ciclos: {
      ciclo23Prof?: string
      ciclo23LicSocio?: string
      ciclo23LicArqueo?: string
      ciclo85?: string
    }
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
    // Buscar la materia en todos los planes de estudios
    const materiasEncontradas: {
      plan: PlanDeEstudios
      materia: MateriaDelPlan
    }[] = []
    
    for (const plan of planes) {
      const materiaEncontrada = plan.materias.find(materia => 
        normalizarNombre(materia.nombre) === normalizarNombre(asignatura.materia)
      )
      
      if (materiaEncontrada) {
        materiasEncontradas.push({ plan, materia: materiaEncontrada })
      }
    }
    
    const result: AsignaturaConPlan = {
      ...asignatura,
      planInfo: materiasEncontradas.length > 0 ? procesarInformacionPlanes(materiasEncontradas, planes) : undefined
    }
    
    return result
  })
}

function procesarInformacionPlanes(
  materiasEncontradas: { plan: PlanDeEstudios; materia: MateriaDelPlan }[],
  todosLosPlanes: PlanDeEstudios[]
): AsignaturaConPlan['planInfo'] {
  // Obtener orientaciones válidas
  const orientaciones = materiasEncontradas.map(item => item.plan.orientacion)
  
  // Buscar equivalencias entre planes 1985 y 2023
  const materiasPlan23 = materiasEncontradas.filter(item => item.plan.año === "2023")
  const materiasPlan85 = materiasEncontradas.filter(item => item.plan.año === "1985")
  
  let equivalencia: any = {}
  
  // Si tenemos materias en plan 2023, buscar equivalencias
  if (materiasPlan23.length > 0) {
    const materia23 = materiasPlan23[0].materia
    equivalencia.cod23 = materia23.cod23
    equivalencia.nombrePlan23 = materia23.nombre
    
    // Buscar equivalencia con plan 1985 usando cod85
    if (materia23.cod85) {
      const planEquivalente85 = todosLosPlanes.find(plan => 
        plan.año === "1985" && 
        plan.materias.some(m => m.cod85 === materia23.cod85 || m.cod23 === materia23.cod85)
      )
      
      if (planEquivalente85) {
        const materiaEquivalente = planEquivalente85.materias.find(m => 
          m.cod85 === materia23.cod85 || m.cod23 === materia23.cod85
        )
        if (materiaEquivalente) {
          equivalencia.cod85 = materiaEquivalente.cod85
          equivalencia.nombrePlan85 = materiaEquivalente.nombre
        }
      }
    }
  }
  
  // Si tenemos materias en plan 1985, agregar esa información
  if (materiasPlan85.length > 0) {
    const materia85 = materiasPlan85[0].materia
    if (!equivalencia.cod85) {
      equivalencia.cod85 = materia85.cod85
      equivalencia.nombrePlan85 = materia85.nombre
    }
  }
  
  // Construir ciclos según orientación
  const ciclos: any = {}
  materiasEncontradas.forEach(({ plan, materia }) => {
    if (plan.año === "2023") {
      if (plan.orientacion === "Profesorado") {
        ciclos.ciclo23Prof = materia.ciclo
      } else if (plan.orientacion === "Licenciatura en Antropología Sociocultural") {
        ciclos.ciclo23LicSocio = materia.ciclo
      } else if (plan.orientacion === "Licenciatura en Arqueología") {
        ciclos.ciclo23LicArqueo = materia.ciclo
      }
    } else if (plan.año === "1985") {
      ciclos.ciclo85 = materia.ciclo
    }
  })
  
  // Usar la primera materia encontrada para electividad, área y correlatividad
  const primeraMateria = materiasEncontradas[0].materia
  
  return {
    orientaciones,
    equivalencia,
    ciclos,
    electividad: primeraMateria.electividad || "",
    area: primeraMateria.area || "",
    correlatividad: primeraMateria.correlatividad || ""
  }
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

export function getAsignaturasPorCiclo(asignaturas: AsignaturaConPlan[], orientacion?: string) {
  const result: { [ciclo: string]: AsignaturaConPlan[] } = {}
  
  asignaturas.forEach(asignatura => {
    if (asignatura.planInfo?.ciclos) {
      let ciclo = ""
      
      // Determinar el ciclo según la orientación seleccionada
      if (orientacion === "Profesorado" && asignatura.planInfo.ciclos.ciclo23Prof) {
        ciclo = asignatura.planInfo.ciclos.ciclo23Prof
      } else if (orientacion === "Licenciatura en Antropología Sociocultural" && asignatura.planInfo.ciclos.ciclo23LicSocio) {
        ciclo = asignatura.planInfo.ciclos.ciclo23LicSocio
      } else if (orientacion === "Licenciatura en Arqueología" && asignatura.planInfo.ciclos.ciclo23LicArqueo) {
        ciclo = asignatura.planInfo.ciclos.ciclo23LicArqueo
      } else if (asignatura.planInfo.ciclos.ciclo85) {
        ciclo = asignatura.planInfo.ciclos.ciclo85
      }
      
      if (ciclo) {
        if (!result[ciclo]) {
          result[ciclo] = []
        }
        result[ciclo].push(asignatura)
      }
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

export function filtrarAsignaturasPorOrientacion(
  asignaturas: AsignaturaConPlan[], 
  orientacionesSeleccionadas: string[]
): AsignaturaConPlan[] {
  if (orientacionesSeleccionadas.length === 0) {
    return asignaturas
  }
  
  return asignaturas.filter(asignatura => {
    // Si no tiene información de plan, no filtrar
    if (!asignatura.planInfo?.orientaciones) {
      return true
    }
    
    // Verificar si alguna de las orientaciones seleccionadas coincide
    return orientacionesSeleccionadas.some(orientacionSeleccionada =>
      asignatura.planInfo!.orientaciones.includes(orientacionSeleccionada)
    )
  })
}

export function getOrientacionesDisponibles(): string[] {
  return [
    "Profesorado",
    "Licenciatura en Antropología Sociocultural",
    "Licenciatura en Arqueología"
  ]
}
