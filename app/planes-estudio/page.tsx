
"use client"

import React, { useState } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { PlanSelector } from "@/components/planes/plan-selector"
import { PlanTitle } from "@/components/planes/plan-title"
import { MateriasList } from "@/components/planes/materias-list"
import { PlanType, OrientacionType } from "@/lib/types/planes"
import { usePlanesData } from "@/lib/hooks/use-planes-data"

export default function PlanesEstudioPage() {
  const [planSeleccionado, setPlanSeleccionado] = useState<PlanType>("2023")
  const [orientacionSeleccionada, setOrientacionSeleccionada] = useState<OrientacionType>("profesorado")
  const [orientacionPlan1985, setOrientacionPlan1985] = useState<"sociocultural" | "arqueologia">("sociocultural")

  const { materias, loading } = usePlanesData(planSeleccionado, orientacionSeleccionada, orientacionPlan1985)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Cargando planes de estudio...</div>
        </div>
      </div>
    )
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-6">
        <main className="py-8">
          <PlanSelector
            planSeleccionado={planSeleccionado}
            setPlanSeleccionado={setPlanSeleccionado}
            orientacionSeleccionada={orientacionSeleccionada}
            setOrientacionSeleccionada={setOrientacionSeleccionada}
            orientacionPlan1985={orientacionPlan1985}
            setOrientacionPlan1985={setOrientacionPlan1985}
          />

          <PlanTitle
            planSeleccionado={planSeleccionado}
            orientacionSeleccionada={orientacionSeleccionada}
            orientacionPlan1985={orientacionPlan1985}
          />

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Materias del Plan</h2>
            <MateriasList materias={materias} />
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
