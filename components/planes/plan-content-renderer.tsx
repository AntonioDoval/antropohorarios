
import React from "react"
import { MateriaDelPlan, PlanType, OrientacionType } from "@/lib/types/planes"
import { 
  getMateriasByCiclo, 
  getMateriasByArea, 
  getMateriasElectivasArqueologia,
  getTituloOrientacion 
} from "@/lib/utils/planes-utils"
import { SectionCard } from "./section-card"
import { MateriasList } from "./materias-list"
import { CorrelationSection } from "./correlation-section"
import { IdiomasSection } from "./idiomas-section"

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

      <IdiomasSection />
    </div>
  )

  const renderPlanEnDesarrollo = () => (
    <div className="space-y-6">
      <SectionCard 
        title={`Plan de Estudios ${planSeleccionado} - ${getTituloOrientacion(planSeleccionado, orientacionSeleccionada)}`}
      >
        <p className="text-center text-gray-600">
          Esta sección está en desarrollo. Por favor selecciona Plan 2023 - Profesorado para ver el contenido completo.
        </p>
      </SectionCard>
    </div>
  )

  const renderPlanGeneral = () => (
    <div className="space-y-6">
      <SectionCard 
        title={`Plan de Estudios ${planSeleccionado} - ${getTituloOrientacion(planSeleccionado, orientacionSeleccionada)}`}
      >
        <div className="space-y-4">
          {/* Materias por ciclo */}
          {Array.from(new Set(materias.map(m => m.ciclo))).map(ciclo => (
            <div key={ciclo} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">{ciclo}</h3>
              <div className="space-y-1">
                {materias
                  .filter(m => m.ciclo === ciclo)
                  .map((materia, index) => (
                    <div key={`${materia.cod23}-${index}`} className={`py-2 px-3 rounded ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
                    }`}>
                      <span className="text-sm text-gray-900 leading-relaxed">
                        {materia.nombre.toLowerCase().charAt(0).toUpperCase() + materia.nombre.toLowerCase().slice(1)}
                      </span>
                      {materia.correlatividad && (
                        <div className="text-xs text-blue-600 mt-1">
                          Correlatividad: {materia.correlatividad}
                        </div>
                      )}
                      {materia.electividad && (
                        <div className="text-xs text-green-600 mt-1">
                          {materia.electividad}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <IdiomasSection />
    </div>
  )

  // Lógica para decidir qué renderizar
  if (planSeleccionado === "2023" && orientacionSeleccionada === "profesorado") {
    return renderPlan2023Profesorado()
  } else {
    return renderPlanGeneral()
  }
}
