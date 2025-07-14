
import React from "react"
import { Switch } from "@/components/ui/switch"
import { PlanType, OrientacionType } from "@/lib/types/planes"

interface PlanSelectorProps {
  planSeleccionado: PlanType
  setPlanSeleccionado: (plan: PlanType) => void
  orientacionSeleccionada: OrientacionType
  setOrientacionSeleccionada: (orientacion: OrientacionType) => void
  orientacionPlan1985: "sociocultural" | "arqueologia"
  setOrientacionPlan1985: (orientacion: "sociocultural" | "arqueologia") => void
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  planSeleccionado,
  setPlanSeleccionado,
  orientacionSeleccionada,
  setOrientacionSeleccionada,
  orientacionPlan1985,
  setOrientacionPlan1985
}) => {
  return (
    <div className="bg-[#46bfb0]/15 border-[#46bfb0]/40 rounded-xl border p-4 mb-8">
      <h2 className="text-xl font-bold text-[#1c2554] mb-6">Seleccionar plan de estudios</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Plan selector */}
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <h4 className="text-xs font-semibold text-uba-primary mb-2">Plan</h4>
          <div className="flex items-center justify-center p-2 bg-[#1c2554] text-white rounded-lg">
            <div className="flex items-center space-x-2">
              <span className={`text-xs ${planSeleccionado === "1985" ? "font-bold" : "opacity-70"}`}>
                1985
              </span>
              <Switch
                checked={planSeleccionado === "2023"}
                onCheckedChange={(checked) => setPlanSeleccionado(checked ? "2023" : "1985")}
                className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600 scale-75"
              />
              <span className={`text-xs ${planSeleccionado === "2023" ? "font-bold" : "opacity-70"}`}>
                2023
              </span>
            </div>
          </div>
        </div>

        {/* Carrera */}
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <h4 className="text-xs font-semibold text-uba-primary mb-2">Carrera</h4>
          <div className="flex items-center justify-center p-2 bg-[#1c2554] text-white rounded-lg">
            <div className="flex items-center space-x-2">
              <span className={`text-xs ${orientacionSeleccionada === "profesorado" ? "font-bold" : "opacity-70"}`}>
                Profesorado
              </span>
              <Switch
                checked={orientacionSeleccionada !== "profesorado"}
                onCheckedChange={(checked) => setOrientacionSeleccionada(checked ? "sociocultural" : "profesorado")}
                className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600 scale-75"
              />
              <span className={`text-xs ${orientacionSeleccionada !== "profesorado" ? "font-bold" : "opacity-70"}`}>
                Licenciatura
              </span>
            </div>
          </div>
        </div>

        {/* Orientación */}
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <h4 className="text-xs font-semibold text-uba-primary mb-2">Orientación</h4>
          <div className="flex items-center justify-center p-2 bg-[#1c2554] text-white rounded-lg">
            <div className="flex items-center space-x-2">
              <span className={`text-xs ${
                (orientacionSeleccionada === "profesorado" && planSeleccionado === "2023")
                  ? "opacity-30" 
                  : (orientacionSeleccionada === "profesorado" && planSeleccionado === "1985")
                    ? (orientacionPlan1985 === "arqueologia" ? "font-bold" : "opacity-70")
                    : orientacionSeleccionada === "arqueologia" ? "font-bold" : "opacity-70"
              }`}>
                Arqueología
              </span>
              <Switch
                checked={
                  orientacionSeleccionada === "profesorado" && planSeleccionado === "1985" 
                    ? orientacionPlan1985 === "sociocultural"
                    : orientacionSeleccionada === "sociocultural"
                }
                onCheckedChange={(checked) => {
                  if (orientacionSeleccionada === "profesorado" && planSeleccionado === "1985") {
                    setOrientacionPlan1985(checked ? "sociocultural" : "arqueologia")
                  } else if (!(orientacionSeleccionada === "profesorado" && planSeleccionado === "2023")) {
                    setOrientacionSeleccionada(checked ? "sociocultural" : "arqueologia")
                  }
                }}
                disabled={orientacionSeleccionada === "profesorado" && planSeleccionado === "2023"}
                className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600 scale-75 disabled:opacity-30"
              />
              <span className={`text-xs ${
                (orientacionSeleccionada === "profesorado" && planSeleccionado === "2023")
                  ? "opacity-30" 
                  : (orientacionSeleccionada === "profesorado" && planSeleccionado === "1985")
                    ? (orientacionPlan1985 === "sociocultural" ? "font-bold" : "opacity-70")
                    : orientacionSeleccionada === "sociocultural" ? "font-bold" : "opacity-70"
              }`}>
                Sociocultural
              </span>
            </div>
          </div>
          {(orientacionSeleccionada === "profesorado" && planSeleccionado === "2023") && (
            <p className="text-xs text-gray-500 mt-2">
              Solo aplica para Licenciatura en plan 2023
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
