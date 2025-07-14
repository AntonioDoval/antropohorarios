
import { MateriaDelPlan, PlanType, OrientacionType } from "../types/planes"
import { getContenidoMinimo } from "../contenidos-minimos"

export const toSentenceCase = (str: string) => {
  let result = str.toLowerCase()
  result = result.charAt(0).toUpperCase() + result.slice(1)
  
  // Encontrar y corregir números romanos
  result = result.replace(/\b(i{1,3}|iv|v|vi{0,3}|ix|x|xi{0,3}|xiv|xv|xvi{0,3}|xix|xx)\b/g, (match) => {
    return match.toUpperCase()
  })
  
  return result
}

export const getMateriasByCiclo = (materias: MateriaDelPlan[], ciclo: string, plan: PlanType, orientacion: OrientacionType) => {
  let filteredMaterias = []
  
  if (plan === "2023") {
    if (orientacion === "profesorado") {
      filteredMaterias = materias.filter(materia => materia.ciclo.includes(ciclo))
    } else {
      const orientacionSuffix = orientacion === "arqueologia" ? "Arqueología" : "Sociocultural"
      filteredMaterias = materias.filter(materia => 
        materia.ciclo.includes(ciclo) && 
        materia.ciclo.includes(orientacionSuffix)
      )
    }
  } else {
    filteredMaterias = materias.filter(materia => materia.ciclo.includes(ciclo))
  }
  
  return filteredMaterias
}

export const getMateriasByArea = (materias: MateriaDelPlan[], area: string) => {
  return materias.filter(materia => 
    materia.ciclo.includes("CFO") && 
    materia.area === area &&
    materia.electividad.includes("Elección B")
  )
}

export const getMateriasElectivasArqueologia = (materias: MateriaDelPlan[]) => {
  return materias.filter(materia => 
    materia.ciclo.includes("CFO") && 
    materia.electividad.includes("Elección A")
  )
}

export const getTituloOrientacion = (plan: PlanType, orientacion: OrientacionType) => {
  if (plan === "2023") {
    if (orientacion === "profesorado") return "Profesorado"
    if (orientacion === "sociocultural") return "Licenciatura"
    return "Licenciatura"
  } else {
    if (orientacion === "profesorado") return "Profesorado"
    if (orientacion === "sociocultural") return "Licenciatura"
      return "Licenciatura"
  }
}

export const isVariableMateria = (materia: MateriaDelPlan) => {
  return materia.electividad === "Variable" || 
         materia.nombre.toLowerCase().includes("seminario") ||
         materia.nombre.toLowerCase().includes("materia electiva")
}
