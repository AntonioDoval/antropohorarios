
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
import React from "react"
import { MateriaDelPlan } from "@/lib/types/planes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MateriasListProps {
  materias: MateriaDelPlan[]
}

export const MateriasList: React.FC<MateriasListProps> = ({ materias }) => {
  // Agrupar materias por ciclo
  const materiasPorCiclo = materias.reduce((acc, materia) => {
    const ciclo = materia.ciclo || "Sin ciclo"
    if (!acc[ciclo]) {
      acc[ciclo] = []
    }
    acc[ciclo].push(materia)
    return acc
  }, {} as Record<string, MateriaDelPlan[]>)

  if (materias.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay materias disponibles para esta configuración.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(materiasPorCiclo).map(([ciclo, materiasDelCiclo]) => (
        <Card key={ciclo} className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">{ciclo}</CardTitle>
            <CardDescription>
              {materiasDelCiclo.length} materia{materiasDelCiclo.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {materiasDelCiclo.map((materia) => (
                <div 
                  key={`${materia.cod85}-${materia.cod23}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {materia.nombre}
                    </h4>
                    {materia.nombreCorto && (
                      <p className="text-sm text-gray-600">
                        {materia.nombreCorto} ({materia.nombreSiglas})
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {materia.cod23 && <div>2023: {materia.cod23}</div>}
                      {materia.cod85 && <div>1985: {materia.cod85}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
