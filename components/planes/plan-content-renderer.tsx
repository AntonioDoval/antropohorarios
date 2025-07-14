import React from "react"
import { MateriaDelPlan, PlanType, OrientacionType } from "@/lib/types/planes"
import { PlanBaseRenderer } from "./plan-base-renderer"
import { getConfiguracionPlan } from "@/lib/data/planes-configs"

interface PlanContentRendererProps {
  planSeleccionado: PlanType
  orientacionSeleccionada: OrientacionType
  orientacionPlan1985: "sociocultural" | "arqueologia"
  materias: MateriaDelPlan[]
}

export const PlanContentRenderer: React.FC<PlanContentRendererProps> = ({
  planSeleccionado,
  orientacionSeleccionada,
  orientacionPlan1985,
  materias
}) => {
  const configuracion = getConfiguracionPlan(
    planSeleccionado, 
    orientacionSeleccionada, 
    orientacionPlan1985
  )

  return (
    <PlanBaseRenderer 
      configuracion={configuracion}
      materias={materias}
      plan={planSeleccionado}
    />
  )
}