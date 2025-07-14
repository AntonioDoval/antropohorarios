
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

export type PlanType = "2023" | "1985"
export type OrientacionType = "profesorado" | "sociocultural" | "arqueologia"
