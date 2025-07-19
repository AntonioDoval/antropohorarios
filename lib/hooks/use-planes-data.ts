import { useState, useEffect } from "react"
import { MateriaDelPlan, PlanType, OrientacionType } from "../types/planes"
import { getMateriasPorPlanYOrientacion } from "../data/equivalencias-csv"

export const usePlanesData = (
  planSeleccionado: PlanType,
  orientacionSeleccionada: OrientacionType,
  orientacionPlan1985: "sociocultural" | "arqueologia"
) => {
  const [materias, setMaterias] = useState<MateriaDelPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true)
      try {
        // Usar orientación según el plan seleccionado
        const orientacion = planSeleccionado === "2023" 
          ? orientacionSeleccionada 
          : orientacionPlan1985

        const materiasFiltradas = getMateriasPorPlanYOrientacion(planSeleccionado, orientacion)
        setMaterias(materiasFiltradas)
      } catch (error) {
        console.error("Error cargando datos de planes:", error)
        setMaterias([])
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [planSeleccionado, orientacionSeleccionada, orientacionPlan1985])

  return { materias, loading }
}