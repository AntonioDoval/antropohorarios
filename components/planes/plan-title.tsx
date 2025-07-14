
import React from "react"
import { PlanType, OrientacionType } from "@/lib/types/planes"
import { getTituloOrientacion } from "@/lib/utils/planes-utils"

interface PlanTitleProps {
  planSeleccionado: PlanType
  orientacionSeleccionada: OrientacionType
  orientacionPlan1985: "sociocultural" | "arqueologia"
}

export const PlanTitle: React.FC<PlanTitleProps> = ({
  planSeleccionado,
  orientacionSeleccionada,
  orientacionPlan1985
}) => {
  const getOrientacionText = () => {
    if (planSeleccionado === "2023") {
      if (orientacionSeleccionada === "profesorado") return "General"
      if (orientacionSeleccionada === "sociocultural") return "Antropología Sociocultural"
      return "Arqueología"
    } else {
      if (orientacionSeleccionada === "profesorado") {
        return orientacionPlan1985 === "sociocultural" ? "Antropología Sociocultural" : "Arqueología"
      }
      return orientacionSeleccionada === "sociocultural" ? "Antropología Sociocultural" : "Arqueología"
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-[#1c2554]">
        Plan {planSeleccionado} - {getTituloOrientacion(planSeleccionado, orientacionSeleccionada)} - Orientación en {getOrientacionText()}
      </h3>
    </div>
  )
}
