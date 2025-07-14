
import React from "react"
import { SectionCard } from "./section-card"

export const IdiomasSection: React.FC = () => {
  return (
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
}
