
import React from "react"
import { ConfiguracionPlan, SeccionPlan, TarjetaCiclo } from "@/lib/data/planes-config"
import { SectionCard } from "./section-card"
import { IdiomasSection } from "./idiomas-section"
import { MateriaDelPlan, PlanType } from "@/lib/types/planes"
import { MateriasList } from "./materias-list"

interface PlanBaseRendererProps {
  configuracion: ConfiguracionPlan
  materias: MateriaDelPlan[]
  plan: PlanType
}

export const PlanBaseRenderer: React.FC<PlanBaseRendererProps> = ({
  configuracion,
  materias,
  plan
}) => {
  const renderSeccion = (seccion: SeccionPlan) => {
    switch (seccion.tipo) {
      case 'descripcion':
      case 'perfil':
      case 'alcances':
        return (
          <SectionCard key={seccion.id} title={seccion.titulo}>
            <div className="p-4">
              {seccion.enDesarrollo ? (
                <p className="text-center text-gray-600 italic">
                  {seccion.contenido || 'Esta sección está en desarrollo.'}
                </p>
              ) : (
                <p className="text-gray-700">{seccion.contenido}</p>
              )}
            </div>
          </SectionCard>
        )

      case 'materias':
        return (
          <SectionCard key={seccion.id} title={seccion.titulo}>
            <div className="space-y-4">
              {seccion.tarjetas?.map((tarjeta) => (
                <div key={tarjeta.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">
                    {tarjeta.titulo}
                  </h3>
                  {tarjeta.descripcion && (
                    <p className="text-sm text-gray-600 mb-3 italic">
                      {tarjeta.descripcion}
                    </p>
                  )}
                  <div className="space-y-1">
                    {tarjeta.materias.map((materiaId, index) => {
                      // Si es un ID de materia, buscarla en el array
                      const materia = materias.find(m => 
                        m.cod23 === materiaId || 
                        m.cod85 === materiaId || 
                        m.nombre === materiaId
                      )
                      
                      if (materia) {
                        return (
                          <div key={`${materiaId}-${index}`} className={`py-2 px-3 rounded ${
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
                        )
                      }
                      
                      // Si no es una materia, renderizar como texto literal
                      return (
                        <div key={`${materiaId}-${index}`} className={`py-2 px-3 rounded ${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
                        }`}>
                          <span className="text-sm text-gray-900 leading-relaxed">
                            {materiaId}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )

      case 'idiomas':
        return <IdiomasSection key={seccion.id} />

      case 'links':
        return (
          <SectionCard key={seccion.id} title={seccion.titulo}>
            <div className="space-y-3 p-4">
              {seccion.links?.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">
                    {link.titulo}
                  </span>
                  {link.enDesarrollo ? (
                    <span className="text-xs text-gray-500 italic">En desarrollo</span>
                  ) : (
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Ver documento →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {configuracion.secciones.map(renderSeccion)}
    </div>
  )
}
