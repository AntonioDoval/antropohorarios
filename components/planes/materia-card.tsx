
import React from "react"
import { MateriaDelPlan, PlanType } from "@/lib/types/planes"
import { toSentenceCase, isVariableMateria } from "@/lib/utils/planes-utils"
import { getContenidoMinimo } from "@/lib/contenidos-minimos"

interface MateriaCardProps {
  materia: MateriaDelPlan
  index: number
  plan: PlanType
}

export const MateriaCard: React.FC<MateriaCardProps> = ({ materia, index, plan }) => {
  const isVariable = isVariableMateria(materia)
  const contenido = plan === "2023" ? getContenidoMinimo(materia.cod23) : null

  if (!isVariable && contenido && plan === "2023") {
    return (
      <div className={`py-2 px-3 rounded relative group ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
      }`}>
        <span className="text-sm text-gray-900 leading-relaxed cursor-help">
          {toSentenceCase(materia.nombre)}
        </span>

        {/* Tooltip */}
        <div className="absolute left-0 top-full mt-2 w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <h4 className="font-bold text-sm text-[#1c2554] mb-2">
            {materia.nombre}
          </h4>
          <div className="text-xs text-gray-700 leading-relaxed max-h-48 overflow-y-auto">
            {contenido.contenido}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`py-2 px-3 rounded ${
      index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
    }`}>
      <span className="text-sm text-gray-900 leading-relaxed">
        {toSentenceCase(materia.nombre)}
      </span>
    </div>
  )
}
