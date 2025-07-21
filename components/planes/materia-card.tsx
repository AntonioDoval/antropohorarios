import React from "react"
import { MateriaDelPlan, PlanType } from "@/lib/types/planes"

interface MateriaCardProps {
  materia: MateriaDelPlan
  index: number
  plan: PlanType
}

export const MateriaCard: React.FC<MateriaCardProps> = ({ materia, index, plan }) => {
  const formatNombreMateria = (nombre: string) => {
    // Preservar números romanos y mejorar el formato general
    return nombre
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
      // Preservar números romanos comunes
      .replace(/\b(I|Ii|II|Iii|III|Iv|IV|V|Vi|VI|Vii|VII|Viii|VIII|Ix|IX|X)\b/g, (match) => match.toUpperCase())
      // Preservar artículos y preposiciones en minúscula (excepto al inicio)
      .replace(/\b(De|Del|La|Las|Los|El|En|Y|A|Con|Por|Para|Desde|Hasta|Sobre|Bajo|Ante|Tras|Durante|Mediante|Según|Sin|So|Como|Entre|Hacia|Contra)\b/g, 
        (word) => word.toLowerCase())
      // Asegurar que la primera letra esté en mayúscula
      .replace(/^./, (char) => char.toUpperCase())
  }

  const getNombreParaPlan = (materia: MateriaDelPlan, plan: PlanType) => {
    // Si es plan 2023, usar el nombre principal
    if (plan === "2023") {
      return materia.nombre
    }

    // Si es plan 1985, usar nombreCorto si existe, sino el nombre principal
    return materia.nombreCorto || materia.nombre
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 text-sm">
          {formatNombreMateria(getNombreParaPlan(materia, plan))}
        </h4>
        {materia.nombreSiglas && (
          <p className="text-xs text-gray-600 mt-1">
            {materia.nombreSiglas}
          </p>
        )}
      </div>
      <div className="text-right ml-4">
        <div className="text-xs text-gray-500">
          {plan === "2023" && materia.cod23 && <div>Cód: {materia.cod23}</div>}
          {plan === "1985" && materia.cod85 && <div>Cód: {materia.cod85}</div>}
        </div>
      </div>
    </div>
  )
}