
import React from "react"
import { MateriaDelPlan, PlanType } from "@/lib/types/planes"
import { MateriaCard } from "./materia-card"

interface MateriasListProps {
  materias: MateriaDelPlan[]
  plan: PlanType
  className?: string
}

export const MateriasList: React.FC<MateriasListProps> = ({ 
  materias, 
  plan, 
  className = "" 
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="space-y-1">
        {materias.map((materia, index) => (
          <MateriaCard 
            key={`${materia.cod23}-${index}`}
            materia={materia}
            index={index}
            plan={plan}
          />
        ))}
      </div>
    </div>
  )
}
