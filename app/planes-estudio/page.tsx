"use client"

import React, { useState, useEffect } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { PlanSelector } from "@/components/planes/plan-selector"
import { SectionCard } from "@/components/planes/section-card"
import { MateriasList } from "@/components/planes/materias-list"
import { CorrelationSection } from "@/components/planes/correlation-section"
import { MateriaDelPlan, PlanType, OrientacionType } from "@/lib/types/planes"
import { 
  getMateriasByCiclo, 
  getMateriasByArea, 
  getMateriasElectivasArqueologia,
  getTituloOrientacion 
} from "@/lib/utils/planes-utils"
import { materiasProfesorado2023 } from "@/lib/data/planes-data"

export default function PlanesEstudioPage() {
  const [planSeleccionado, setPlanSeleccionado] = useState<PlanType>("2023")
  const [orientacionSeleccionada, setOrientacionSeleccionada] = useState<OrientacionType>("profesorado")
  const [orientacionPlan1985, setOrientacionPlan1985] = useState<"sociocultural" | "arqueologia">("sociocultural")
  const [materias, setMaterias] = useState<MateriaDelPlan[]>([])

  useEffect(() => {
    // Por ahora solo cargar los datos del profesorado 2023
    // Aquí se cargarían todos los datos según la selección
    setMaterias(materiasProfesorado2023)
  }, [planSeleccionado, orientacionSeleccionada, orientacionPlan1985])

  const renderPlan2023Profesorado = () => (
    <div className="space-y-6">
      <SectionCard title="Ciclo de Formación General (CFG) - Profesorado 2023">
        <MateriasList 
          materias={getMateriasByCiclo(materias, "CFG", planSeleccionado, orientacionSeleccionada)
            .filter(m => !m.correlatividad && !m.electividad)} 
          plan={planSeleccionado}
        />
      </SectionCard>

      <SectionCard title="Materias con Correlatividades">
        <div className="space-y-4">
          <CorrelationSection
            materias={materias}
            plan={planSeleccionado}
            correlatividad="Al menos 5 materias del CFG"
            descripcion="Correlatividad: Al menos 5 materias del CFG"
          />
          <CorrelationSection
            materias={materias}
            plan={planSeleccionado}
            correlatividad="Al menos 10 materias del CFG"
            descripcion="Correlatividad: Al menos 10 materias del CFG"
          />
        </div>
      </SectionCard>

      <SectionCard title="Elección A - 5 materias según orientación">
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-700 italic mb-3">
              • Licenciatura Sociocultural
            </div>
            <MateriasList 
              materias={materias.filter(m => m.area === "Licenciatura Sociocultural")} 
              plan={planSeleccionado}
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-700 italic mb-3">
              • Licenciatura Arqueología
            </div>
            <MateriasList 
              materias={materias.filter(m => m.area === "Licenciatura Arqueología")} 
              plan={planSeleccionado}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Ciclo de Formación Específica (CFE) - Profesorado">
        <div className="space-y-4">
          <MateriasList 
            materias={getMateriasByCiclo(materias, "CFE", planSeleccionado, orientacionSeleccionada)
              .filter(m => !m.electividad)} 
            plan={planSeleccionado}
          />

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-700 italic mb-3">
              • Elección B - Departamento de Ciencias de la Educación
            </div>
            <MateriasList 
              materias={materias.filter(m => m.electividad === "Elección B")} 
              plan={planSeleccionado}
            />
          </div>
        </div>
      </SectionCard>
    </div>
  )

  const renderIdiomasSection = () => (
    <SectionCard title="Idiomas">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="space-y-1">
          <div className="py-2 px-3 rounded bg-gray-50">
            <span className="text-sm text-gray-900 leading-relaxed">
              Tres niveles de un idioma anglosajón
            </span>
          </div>
          <div className="py-2 px-3 rounded bg-blue-50">
            <span className="text-sm text-gray-900 leading-relaxed">
              Tres niveles de un idioma latino
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  )

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

          {/* Título del plan seleccionado */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#1c2554]">
              Plan {planSeleccionado} - {getTituloOrientacion(planSeleccionado, orientacionSeleccionada)} - Orientación en {
                planSeleccionado === "2023" 
                  ? (orientacionSeleccionada === "profesorado" ? "General" :
                     orientacionSeleccionada === "sociocultural" ? "Antropología Sociocultural" : "Arqueología")
                  : (orientacionSeleccionada === "profesorado" 
                      ? (orientacionPlan1985 === "sociocultural" ? "Antropología Sociocultural" : "Arqueología")
                      : orientacionSeleccionada === "sociocultural" ? "Antropología Sociocultural" : "Arqueología")
              }
            </h3>
          </div>

          {planSeleccionado === "2023" && orientacionSeleccionada === "profesorado" ? (
            <>
              {renderPlan2023Profesorado()}
              {renderIdiomasSection()}
            </>
          ) : (
            <div className="space-y-6">
              <SectionCard 
                title={`Plan de Estudios ${planSeleccionado} - ${getTituloOrientacion(planSeleccionado, orientacionSeleccionada)}`}
              >
                <p className="text-center text-gray-600">
                  Esta sección está en desarrollo. Por favor selecciona Plan 2023 - Profesorado para ver el contenido completo.
                </p>
              </SectionCard>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}