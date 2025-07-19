
export interface EquivalenciaMateria {
  cod85: string
  cod23: string
  nombre1985: string
  nombre2023: string
  nombreCorto: string
  nombreSiglas: string
  lic23SOC: string
  lic23ARQ: string
  prof23: string
  lic85SOC: string
  lic85ARQ: string
  prof85: string
}

// Función para convertir texto a title case manteniendo números romanos
export const toTitleCase = (str: string): string => {
  if (!str) return ""
  
  // Convertir a minúsculas primero
  let result = str.toLowerCase()
  
  // Capitalizar primera letra y letras después de espacios
  result = result.replace(/\b\w/g, (char) => char.toUpperCase())
  
  // Mantener números romanos en mayúsculas
  result = result.replace(/\b(i{1,3}|iv|v|vi{0,3}|ix|x|xi{0,3}|xiv|xv|xvi{0,3}|xix|xx)\b/gi, (match) => {
    return match.toUpperCase()
  })
  
  return result
}

// Datos del CSV convertidos a estructura TypeScript
export const equivalenciasData: EquivalenciaMateria[] = [
  {
    cod85: "0743",
    cod23: "17001",
    nombre1985: "EPISTEMOLOGÍA Y MÉTODOS DE INVESTIGACIÓN SOCIAL",
    nombre2023: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES",
    nombreCorto: "Epistemo",
    nombreSiglas: "EPIS",
    lic23SOC: "Ciclo de Formación General (CFG) Licenciatura Sociocultural",
    lic23ARQ: "Ciclo de Formación General (CFG) Licenciatura Sociocultural",
    prof23: "Ciclo de Formación General (CFG) Licenciatura Sociocultural",
    lic85SOC: "Ciclo Orientación Sociocultural",
    lic85ARQ: "",
    prof85: "Ciclo Orientación Sociocultural"
  },
  {
    cod85: "0733",
    cod23: "17002",
    nombre1985: "HISTORIA DE LA TEORÍA ANTROPOLÓGICA",
    nombre2023: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I",
    nombreCorto: "Historia y Teoría 1",
    nombreSiglas: "HTA1",
    lic23SOC: "Ciclo de Formación General (CFG) Licenciatura Sociocultural",
    lic23ARQ: "Ciclo de Formación General (CFG) Licenciatura Sociocultural",
    prof23: "Ciclo de Formación General (CFG) Licenciatura Sociocultural",
    lic85SOC: "Ciclo Común",
    lic85ARQ: "Ciclo Común",
    prof85: "Ciclo Común"
  }
  // Agregamos más datos según sea necesario...
]

export const getMateriasPorPlanYOrientacion = (plan: "2023" | "1985", orientacion: "profesorado" | "sociocultural" | "arqueologia") => {
  return equivalenciasData.filter(materia => {
    if (plan === "2023") {
      if (orientacion === "profesorado") return materia.prof23 !== ""
      if (orientacion === "sociocultural") return materia.lic23SOC !== ""
      if (orientacion === "arqueologia") return materia.lic23ARQ !== ""
    } else {
      if (orientacion === "profesorado") return materia.prof85 !== ""
      if (orientacion === "sociocultural") return materia.lic85SOC !== ""
      if (orientacion === "arqueologia") return materia.lic85ARQ !== ""
    }
    return false
  }).map(materia => ({
    cod85: materia.cod85,
    cod23: materia.cod23,
    nombre: plan === "2023" ? toTitleCase(materia.nombre2023) : toTitleCase(materia.nombre1985),
    nombreCorto: materia.nombreCorto,
    nombreSiglas: materia.nombreSiglas,
    ciclo: plan === "2023" 
      ? (orientacion === "profesorado" ? materia.prof23 : 
         orientacion === "sociocultural" ? materia.lic23SOC : materia.lic23ARQ)
      : (orientacion === "profesorado" ? materia.prof85 : 
         orientacion === "sociocultural" ? materia.lic85SOC : materia.lic85ARQ),
    electividad: "",
    area: "",
    correlatividad: ""
  }))
}
