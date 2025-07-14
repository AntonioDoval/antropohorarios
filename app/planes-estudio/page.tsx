"use client"

import React, { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { PlanSelector } from "@/components/planes/plan-selector"
import { PlanTitle } from "@/components/planes/plan-title"
import { PlanContentRenderer } from "@/components/planes/plan-content-renderer"
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
    <div className="min-h-screen bg-white">
      {/* Header principal */}
      <header className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Círculo con ANT */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#c44928] rounded-full flex items-center justify-center flex-shrink-0 aspect-square">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-none">ANT</span>
              </div>

              {/* Texto principal */}
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#c44928] leading-tight">
                  Ciencias Antropológicas
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#c44928]">
                  <span className="font-bold">.UBA</span><span className="font-normal">FILO</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de navegación */}
      <nav className="bg-uba-primary border-t-4 border-uba-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <MobileNav>
              <div className="flex flex-col space-y-4">
                <a href="/" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                  Ver oferta horaria
                </a>
                <a href="/planes-estudio" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                  Planes de estudio
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <a href="https://filo.uba.ar" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">filo.uba.ar</a>
                  <a href="https://campus.filo.uba.ar/" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">Campus Virtual</a>
                  <a href="https://suiganew.filo.uba.ar/" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">Inscripciones - SUIGA</a>
                </div>
              </div>
            </MobileNav>

            <div className="hidden lg:flex items-center space-x-4">
              <a href="/" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                Ver oferta horaria
              </a>
            </div>
            <div className="hidden lg:flex space-x-8">
              <a href="https://filo.uba.ar" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">filo.uba.ar</a>
              <span className="text-white">|</span>
              <a href="https://campus.filo.uba.ar/" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">Campus Virtual</a>
              <span className="text-white">|</span>
              <a href="https://suiganew.filo.uba.ar/" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">Inscripciones - SUIGA</a>
            </div>
          </div>
        </div>
      </nav>

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

          <PlanContentRenderer
            planSeleccionado={planSeleccionado}
            orientacionSeleccionada={orientacionSeleccionada}
            orientacionPlan1985={orientacionPlan1985}
            materias={materias}
          />
        </main>
      </div>

      <Footer />
    </div>
  )
}