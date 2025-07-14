
import { useState, useEffect } from "react"
import { MateriaDelPlan, PlanType, OrientacionType } from "../types/planes"
import { getMateriasPorSeleccion } from "../data/planes-data"

export const usePlanesData = (
  planSeleccionado: PlanType,
  orientacionSeleccionada: OrientacionType,
  orientacionPlan1985: "sociocultural" | "arqueologia"
) => {
  const [materias, setMaterias] = useState<MateriaDelPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    try {
      const materiasData = getMateriasPorSeleccion(
        planSeleccionado,
        orientacionSeleccionada,
        orientacionPlan1985
      )
      setMaterias(materiasData)
    } catch (error) {
      console.error("Error al cargar datos de planes:", error)
      setMaterias([])
    } finally {
      setLoading(false)
    }
  }, [planSeleccionado, orientacionSeleccionada, orientacionPlan1985])

  return { materias, loading }
}
