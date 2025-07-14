
import React from "react"
import { MateriaDelPlan, PlanType } from "@/lib/types/planes"
import { MateriasList } from "./materias-list"

interface CorrelationSectionProps {
  materias: MateriaDelPlan[]
  plan: PlanType
  correlatividad: string
  descripcion: string
}

export const CorrelationSection: React.FC<CorrelationSectionProps> = ({
  materias,
  plan,
  correlatividad,
  descripcion
}) => {
  const filteredMaterias = materias.filter(m => m.correlatividad === correlatividad)
  
  if (filteredMaterias.length === 0) return null

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="text-sm font-medium text-blue-700 italic mb-3">
        • {descripcion}
      </div>
      <div className="space-y-1">
        {filteredMaterias.map((materia, index) => (
          <div key={`${materia.cod23}-${index}`} className={`py-2 px-3 rounded ${
            index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
          }`}>
            <span className="text-sm text-gray-900 leading-relaxed">
              {materia.nombre.toLowerCase().charAt(0).toUpperCase() + materia.nombre.toLowerCase().slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
