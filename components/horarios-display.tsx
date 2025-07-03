"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, BookOpen, Calendar, FileText, Info, Notebook, Search, X } from "lucide-react"
import { 
  enrichAsignaturasWithPlanInfo, 
  getAsignaturasPorCiclo, 
  filtrarAsignaturasPorOrientacion,
  getOrientacionesDisponibles,
  type AsignaturaConPlan 
} from "@/lib/planes-utils"

interface Clase {
  id: string
  tipo: string
  numero: number
  dia: string
  horario: string
}

interface Asignatura {
  id: string
  materia: string
  catedra: string
  tipoAsignatura?: string
  modalidadAprobacion: string
  modalidadCursada: string
  orientacion?: string
  agrupacionClases?: { [tipo: string]: "elegir" | "conjunto" }
  aclaraciones?: string
  clases: Clase[]
}

interface PeriodoInfo {
  año: string
  periodo: string
}

interface HorariosData {
  asignaturas: Asignatura[]
  periodo: PeriodoInfo
}

interface Filtros {
  busqueda: string
  tiposAsignatura: string[]
  modalidadAprobacion: string // Cambio a string singular para selección única
  orientaciones: string[]
  planEstudios: "2023" | "1985"
}

interface Seleccion {
  asignaturas: string[] // IDs de asignaturas seleccionadas
  clases: { [asignaturaId: string]: { [tipoClase: string]: string } } // asignaturaId -> tipoClase -> claseId
}

export function HorariosDisplay() {
  const [data, setData] = useState<HorariosData | null>(null)
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState<Filtros>({
    busqueda: "",
    tiposAsignatura: [],
    modalidadAprobacion: "todas", // Por defecto "todas"
    orientaciones: [],
    planEstudios: "2023",
  })
  const [seleccion, setSeleccion] = useState<Seleccion>({
    asignaturas: [],
    clases: {},
  })
  const [asignaturasEnriquecidas, setAsignaturasEnriquecidas] = useState<AsignaturaConPlan[]>([])

  useEffect(() => {
    const savedData = localStorage.getItem("horarios-antropologia")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Manejar formato anterior (solo array) y nuevo formato (objeto con período)
        if (Array.isArray(parsedData)) {
          setData({
            asignaturas: parsedData,
            periodo: { año: new Date().getFullYear().toString(), periodo: "1C" },
          })
        } else {
          setData(parsedData)
        }
      } catch (error) {
        console.error("Error parsing saved data:", error)
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (data?.asignaturas) {
      const enriched = enrichAsignaturasWithPlanInfo(data.asignaturas)
      setAsignaturasEnriquecidas(enriched)
    }
  }, [data])

  // Función para obtener el icono según el tipo de asignatura
  const getAsignaturaIcon = (asignatura: Asignatura, isSelected = false) => {
    const tipoAsignatura = asignatura.tipoAsignatura || ""
    const titulo = asignatura.materia.toLowerCase()
    const iconColor = isSelected ? "text-[#1c2554]" : "text-uba-secondary"

    // Lista de asignaturas anuales específicas
    const asignaturasAnuales = [
      "didáctica especial y prácticas de la enseñanza",
      "seminario de investigación en antropologia sociocultural",
      "seminario de investigacion en arqueologia",
      "metodología e investigación antropológica",
      "metodología y técnicas de la investigación arqueológica",
    ]

    const esAsignaturaAnual = asignaturasAnuales.some((asigAnual) => titulo.includes(asigAnual.toLowerCase()))

    if (tipoAsignatura === "Seminario PST") {
      return <Notebook className={`h-5 w-5 ${iconColor}`} />
    } else if (tipoAsignatura === "Seminario regular") {
      return <FileText className={`h-5 w-5 ${iconColor}`} />
    } else if (esAsignaturaAnual || tipoAsignatura === "Asignatura anual") {
      return <Calendar className={`h-5 w-5 ${iconColor}`} />
    } else {
      // Materias cuatrimestrales
      return <BookOpen className={`h-5 w-5 ${iconColor}`} />
    }
  }

  // Función para agrupar clases por tipo
  const agruparClasesPorTipo = (clases: Clase[]) => {
    const grupos: { [tipo: string]: Clase[] } = {}

    clases.forEach((clase) => {
      if (!grupos[clase.tipo]) {
        grupos[clase.tipo] = []
      }
      grupos[clase.tipo].push(clase)
    })

    // Ordenar los grupos por tipo (Teórico, Teórico-Práctico, Práctico)
    const ordenTipos = ["Teórico", "Teórico-Práctico", "Práctico"]
    const gruposOrdenados: { tipo: string; clases: Clase[] }[] = []

    ordenTipos.forEach((tipo) => {
      if (grupos[tipo]) {
        gruposOrdenados.push({ tipo, clases: grupos[tipo] })
      }
    })

    return gruposOrdenados
  }

  // Función para determinar si un grupo de clases requiere selección
  const requiereSeleccion = (asignatura: Asignatura, tipoClase: string, cantidadClases: number) => {
    if (cantidadClases <= 1) return false

    const agrupacion = asignatura.agrupacionClases?.[tipoClase]

    // Si está explícitamente marcado como conjunto, no requiere selección
    if (agrupacion === "conjunto") return false

    // Si está explícitamente marcado como elegir, requiere selección
    if (agrupacion === "elegir") return true

    // Si no hay información específica y hay múltiples clases, asumir que requiere selección (lógica por defecto)
    return cantidadClases > 1
  }

  // Función para obtener valores únicos para los filtros
  const getValoresUnicos = (asignaturas: AsignaturaConPlan[]) => {
    const tiposAsignatura = [...new Set(asignaturas.map((a) => a.tipoAsignatura).filter(Boolean))]
    
    // Agregar "Seminario PST" si no existe
    if (!tiposAsignatura.includes("Seminario PST")) {
      tiposAsignatura.push("Seminario PST")
    }

    const modalidadesAprobacion = [
      ...new Set(
        asignaturas
          .map((a) => {
            // Si no está especificada o es "NO CORRESPONDE", asignar "Trabajo final"
            if (!a.modalidadAprobacion || 
                a.modalidadAprobacion === "NO CORRESPONDE" || 
                a.modalidadAprobacion === "No corresponde" || 
                a.modalidadAprobacion.toLowerCase() === "no especificada") {
              return "Trabajo final"
            }
            return a.modalidadAprobacion
          })
          .filter(Boolean),
      ),
    ]

    return {
      tiposAsignatura: tiposAsignatura.sort(),
      modalidadesAprobacion: modalidadesAprobacion.sort(),
    }
  }

  // Función para obtener orientaciones disponibles según el plan
  const getOrientacionesPorPlan = (plan: "2023" | "1985"): string[] => {
    if (plan === "1985") {
      return [
        "Profesorado - Orientación Sociocultural",
        "Profesorado - Orientación Arqueología",
        "Licenciatura en Antropología Sociocultural",
        "Licenciatura en Arqueología"
      ]
    }
    return [
      "Profesorado",
      "Licenciatura en Antropología Sociocultural", 
      "Licenciatura en Arqueología"
    ]
  }

  // Opciones para orientación según el plan seleccionado
  const opcionesOrientacion = getOrientacionesPorPlan(filtros.planEstudios)

  // Función para filtrar asignaturas
  const filtrarAsignaturas = (asignaturas: AsignaturaConPlan[]) => {
    return asignaturas.filter((asignatura) => {
      // Obtener el nombre según el plan seleccionado para la búsqueda
      const nombreParaBusqueda = getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios)

      // Filtro por búsqueda
      const coincideBusqueda =
        filtros.busqueda === "" ||
        nombreParaBusqueda.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        asignatura.catedra.toLowerCase().includes(filtros.busqueda.toLowerCase())

      // Filtro por tipo de asignatura
      const coincideTipo =
        filtros.tiposAsignatura.length === 0 ||
        (asignatura.tipoAsignatura && filtros.tiposAsignatura.includes(asignatura.tipoAsignatura))

      // Filtro por modalidad de aprobación
      const coincideModalidad = (() => {
        if (filtros.modalidadAprobacion === "todas") return true
        
        const modalidadReal = (!asignatura.modalidadAprobacion || 
                              asignatura.modalidadAprobacion === "NO CORRESPONDE" || 
                              asignatura.modalidadAprobacion === "No corresponde" || 
                              asignatura.modalidadAprobacion.toLowerCase() === "no especificada") 
                              ? "Trabajo final" 
                              : asignatura.modalidadAprobacion
        
        return modalidadReal === filtros.modalidadAprobacion
      })()

      // Filtro por orientación según el plan seleccionado
      const coincideOrientacion = (() => {
        if (filtros.orientaciones.length === 0) return true

        if (filtros.planEstudios === "1985") {
          // Para plan 1985, verificar si la orientación de la asignatura coincide con las seleccionadas
          // y que tenga equivalencia para el plan 1985
          const tieneEquivalencia = asignatura.planInfo?.equivalencia?.nombrePlan85 || asignatura.planInfo?.equivalencia?.cod85
          if (!tieneEquivalencia) return false
          
          // Si no hay orientaciones seleccionadas, mostrar todas las que tengan equivalencia
          if (filtros.orientaciones.length === 0) return true
          
          // Verificar si alguna de las orientaciones de la asignatura coincide con las seleccionadas
          return asignatura.planInfo?.orientaciones && 
                 asignatura.planInfo.orientaciones.some(orient => filtros.orientaciones.includes(orient))
        } else {
          // Para plan 2023, usar la lógica existente
          return asignatura.planInfo?.orientaciones && 
                 asignatura.planInfo.orientaciones.some(orient => filtros.orientaciones.includes(orient))
        }
      })()

      return coincideBusqueda && coincideTipo && coincideModalidad && coincideOrientacion
    })
  }

  // Función para obtener el nombre de la asignatura según el plan seleccionado
  const getNombreAsignaturaPorPlan = (asignatura: AsignaturaConPlan, plan: "2023" | "1985"): string => {
    if (plan === "1985") {
      // Usar el nombre equivalente del plan 1985 si existe
      return asignatura.planInfo?.equivalencia?.nombrePlan85 || asignatura.materia
    }
    // Para plan 2023, usar el nombre actual o el nombre del plan 2023
    return asignatura.planInfo?.equivalencia?.nombrePlan23 || asignatura.materia
  }

  // Función para filtrar asignaturas por plan de estudios
  const filtrarAsignaturasPorPlan = (asignaturas: AsignaturaConPlan[], plan: "2023" | "1985"): AsignaturaConPlan[] => {
    if (plan === "2023") {
      return asignaturas // Mostrar todas las asignaturas para plan 2023
    }

    // Para plan 1985, solo mostrar asignaturas que tienen equivalencia
    return asignaturas.filter(asignatura => 
      asignatura.planInfo?.equivalencia?.nombrePlan85 || 
      asignatura.planInfo?.equivalencia?.cod85
    )
  }

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      tiposAsignatura: [],
      modalidadAprobacion: "todas",
      orientaciones: [],
      planEstudios: filtros.planEstudios, // Mantener el plan seleccionado
    })
  }

  // Función para manejar cambios en checkboxes
  const toggleFiltro = (tipo: "tiposAsignatura" | "orientaciones", valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [tipo]: prev[tipo].includes(valor) ? prev[tipo].filter((item) => item !== valor) : [...prev[tipo], valor],
    }))
  }

  // Funciones para manejar selección
  const toggleAsignatura = (asignaturaId: string) => {
    setSeleccion((prev) => {
      const isSelected = prev.asignaturas.includes(asignaturaId)

      if (isSelected) {
        // Deseleccionar asignatura y limpiar sus clases
        return {
          asignaturas: prev.asignaturas.filter((id) => id !== asignaturaId),
          clases: { ...prev.clases, [asignaturaId]: {} },
        }
      } else {
        // Seleccionar asignatura
        return {
          ...prev,
          asignaturas: [...prev.asignaturas, asignaturaId],
        }
      }
    })
  }

  const seleccionarClase = (asignaturaId: string, tipoClase: string, claseId: string) => {
    setSeleccion((prev) => {
      const nuevasClases = {
        ...prev.clases,
        [asignaturaId]: {
          ...prev.clases[asignaturaId],
          [tipoClase]: claseId,
        },
      }

      // Si la asignatura no está seleccionada, agregarla
      const nuevasAsignaturas = prev.asignaturas.includes(asignaturaId)
        ? prev.asignaturas
        : [...prev.asignaturas, asignaturaId]

      return {
        asignaturas: nuevasAsignaturas,
        clases: nuevasClases,
      }
    })
  }

  // Función para obtener tipos de clases faltantes
  const getClasesFaltantes = (asignatura: Asignatura, clasesSeleccionadas: { [tipoClase: string]: string }) => {
    const gruposClases = agruparClasesPorTipo(asignatura.clases)
    const tiposFaltantes: string[] = []

    gruposClases.forEach((grupo) => {
      const agrupacion = asignatura.agrupacionClases?.[grupo.tipo]

      // Solo marcar como faltante si requiere selección y no se ha seleccionado
      if (agrupacion === "elegir" && grupo.clases.length > 1 && !clasesSeleccionadas[grupo.tipo]) {
        // Usar nombres completos en plural
        const nombreCompleto =
          grupo.tipo === "Teórico"
            ? "Teóricos"
            : grupo.tipo === "Teórico-Práctico"
              ? "Teórico-Prácticos"
              : grupo.tipo === "Práctico"
                ? "Prácticos"
                : grupo.tipo
        tiposFaltantes.push(nombreCompleto)
      } else if (!agrupacion && grupo.clases.length > 1 && !clasesSeleccionadas[grupo.tipo]) {
        // Lógica por defecto para clases sin especificación (asumen que requieren selección)
        const nombreCompleto =
          grupo.tipo === "Teórico"
            ? "Teóricos"
            : grupo.tipo === "Teórico-Práctico"
              ? "Teórico-Prácticos"
              : grupo.tipo === "Práctico"
                ? "Prácticos"
                : grupo.tipo
        tiposFaltantes.push(nombreCompleto)
      }
      // Si agrupacion === "conjunto", nunca marcar como faltante
    })

    return tiposFaltantes
  }

  // Función para detectar superposiciones horarias
  const detectarSuperposiciones = () => {
    if (!data) return []

    const clasesSeleccionadas: Array<{
      asignatura: string
      clase: string
      dia: string
      inicio: number
      fin: number
    }> = []

    // Recopilar todas las clases seleccionadas
    seleccion.asignaturas.forEach((asignaturaId) => {
      const asignatura = asignaturasEnriquecidas.find((a) => a.id === asignaturaId)
      if (!asignatura) return

      const clasesAsignatura = seleccion.clases[asignaturaId] || {}
      const gruposClases = agruparClasesPorTipo(asignatura.clases)

      gruposClases.forEach((grupo) => {
        const agrupacion = asignatura.agrupacionClases?.[grupo.tipo]

        if (agrupacion === "conjunto") {
          // Si es conjunto, agregar todas las clases del grupo
          grupo.clases.forEach((clase) => {
            const horarioParts = clase.horario.split(" - ")
            const inicio = parseInt(horarioParts[0].split(":")[0])
            const fin = parseInt(horarioParts[1].split(":")[0])

            clasesSeleccionadas.push({
              asignatura: getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios),
              clase: `${clase.tipo} ${grupo.clases.length > 1 ? grupo.clases.indexOf(clase) + 1 : ""}`.trim(),
              dia: clase.dia,
              inicio,
              fin
            })
          })
        } else {
          // Para clases que requieren selección o únicas
          if (grupo.clases.length === 1) {
            const clase = grupo.clases[0]
            const horarioParts = clase.horario.split(" - ")
            const inicio = parseInt(horarioParts[0].split(":")[0])
            const fin = parseInt(horarioParts[1].split(":")[0])

            clasesSeleccionadas.push({
              asignatura: getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios),
              clase: clase.tipo,
              dia: clase.dia,
              inicio,
              fin
            })
          } else {
            const claseSeleccionadaId = clasesAsignatura[grupo.tipo]
            if (claseSeleccionadaId) {
              const clase = grupo.clases.find((c) => c.id === claseSeleccionadaId)
              if (clase) {
                const horarioParts = clase.horario.split(" - ")
                const inicio = parseInt(horarioParts[0].split(":")[0])
                const fin = parseInt(horarioParts[1].split(":")[0])

                clasesSeleccionadas.push({
                  asignatura: getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios),
                  clase: `${clase.tipo} ${clase.numero}`,
                  dia: clase.dia,
                  inicio,
                  fin
                })
              }
            }
          }
        }
      })
    })

    // Detectar superposiciones
    const superposiciones: Array<{
      clase1: string
      clase2: string
      dia: string
      horario: string
    }> = []

    for (let i = 0; i < clasesSeleccionadas.length; i++) {
      for (let j = i + 1; j < clasesSeleccionadas.length; j++) {
        const clase1 = clasesSeleccionadas[i]
        const clase2 = clasesSeleccionadas[j]

        // Verificar si son el mismo día y se superponen horarios
        if (clase1.dia === clase2.dia) {
          const haySuper = (clase1.inicio < clase2.fin && clase1.fin > clase2.inicio)

          if (haySuper) {
            superposiciones.push({
              clase1: `${clase1.asignatura} (${clase1.clase})`,
              clase2: `${clase2.asignatura} (${clase2.clase})`,
              dia: clase1.dia,
              horario: `${Math.max(clase1.inicio, clase2.inicio)}:00-${Math.min(clase1.fin, clase2.fin)}:00`
            })
          }
        }
      }
    }

    return superposiciones
  }

  // Función para limpiar selección
  const limpiarSeleccion = () => {
    setSeleccion({
      asignaturas: [],
      clases: {},
    })
  }

  // Función para obtener la selección formateada
  const getSeleccionFormateada = () => {
    if (!data) return []

    const resultado: Array<{
      asignatura: string
      catedra: string
      clases: Array<{ nombre: string; dia: string; horario: string }>
      tiposFaltantes?: string[]
    }> = []

    seleccion.asignaturas.forEach((asignaturaId) => {
      const asignatura = asignaturasEnriquecidas.find((a) => a.id === asignaturaId)
      if (!asignatura) return

      const clasesSeleccionadas: Array<{ nombre: string; dia: string; horario: string }> = []
      const clasesAsignatura = seleccion.clases[asignaturaId] || {}
      const gruposClases = agruparClasesPorTipo(asignatura.clases)
      const tiposFaltantes = getClasesFaltantes(asignatura, clasesAsignatura)

      gruposClases.forEach((grupo) => {
        const agrupacion = asignatura.agrupacionClases?.[grupo.tipo]

        if (agrupacion === "conjunto") {
          // Si es conjunto, mostrar todas las clases del grupo
          grupo.clases.forEach((clase, index) => {
            clasesSeleccionadas.push({
              nombre: grupo.clases.length > 1 
                ? `${clase.tipo} ${index + 1}` 
                : (clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero}`),
              dia: clase.dia,
              horario: clase.horario,
            })
          })
        } else if (agrupacion === "elegir") {
          // Si requiere selección, mostrar solo la seleccionada
          const claseSeleccionadaId = clasesAsignatura[grupo.tipo]
          if (claseSeleccionadaId) {
            const clase = grupo.clases.find((c) => c.id === claseSeleccionadaId)
            if (clase) {
              clasesSeleccionadas.push({
                nombre: clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero}`,
                dia: clase.dia,
                horario: clase.horario,
              })
            }
          }
        } else {
          // Lógica por defecto: si hay una sola clase, mostrarla; si hay múltiples, aplicar lógica anterior
          if (grupo.clases.length === 1) {
            grupo.clases.forEach((clase) => {
              clasesSeleccionadas.push({
                nombre: clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero}`,
                dia: clase.dia,
                horario: clase.horario,
              })
            })
          } else {
            // Para múltiples clases sin especificación, mantener lógica de selección
            const claseSeleccionadaId = clasesAsignatura[grupo.tipo]
            if (claseSeleccionadaId) {
              const clase = grupo.clases.find((c) => c.id === claseSeleccionadaId)
              if (clase) {
                clasesSeleccionadas.push({
                  nombre: clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero}`,
                  dia: clase.dia,
                  horario: clase.horario,
                })
              }
            }
          }
        }
      })

      resultado.push({
        asignatura: getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios),
        catedra: asignatura.catedra,
        clases: clasesSeleccionadas,
        tiposFaltantes: tiposFaltantes.length > 0 ? tiposFaltantes : undefined,
      })
    })

    // Ordenar por título de asignatura
    return resultado.sort((a, b) => a.asignatura.localeCompare(b.asignatura))
  }

  if (loading) {
    return <div className="text-center py-8 text-uba-primary">Cargando horarios...</div>
  }

  if (!data || data.asignaturas.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-uba-primary mb-2">No hay horarios cargados</h2>
        <p className="text-gray-600 mb-4">Aún no se han cargado los horarios del cuatrimestre.</p>
      </div>
    )
  }

  const getPeriodoText = (periodo: string) => {
    switch (periodo) {
      case "1C":
        return "1er Cuatrimestre"
      case "2C":
        return "2do Cuatrimestre"
      case "BV":
        return "Bimestre de Verano"
      default:
        return periodo
    }
  }

  // Filtrar por plan de estudios primero, luego ordenar alfabéticamente y aplicar filtros
  const asignaturasPorPlan = filtrarAsignaturasPorPlan(asignaturasEnriquecidas, filtros.planEstudios)
  const asignaturasOrdenadas = [...asignaturasPorPlan].sort((a, b) => {
    const nombreA = getNombreAsignaturaPorPlan(a, filtros.planEstudios)
    const nombreB = getNombreAsignaturaPorPlan(b, filtros.planEstudios)
    return nombreA.localeCompare(nombreB)
  })
  const asignaturasFiltradas = filtrarAsignaturas(asignaturasOrdenadas)
  const valoresUnicos = getValoresUnicos(asignaturasEnriquecidas)

  const seleccionFormateada = getSeleccionFormateada()

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Header section con márgenes reducidos */}
        <div className="mb-4">
          <p className="text-gray-500 text-lg mb-1">Oferta de Asignaturas</p>
          <h1 className="text-5xl font-bold text-uba-primary mb-2">
            {getPeriodoText(data.periodo.periodo)} {data.periodo.año}
          </h1>
        <h2 className="text-2xl font-semibold text-uba-primary mb-2">¡Planificá tus horarios!</h2>
          <p className="text-gray-700 text-lg mb-3 leading-relaxed">
            Seleccioná las <span className="font-semibold">asignaturas</span> que te interesan, eligiendo la{" "}
            <span className="font-semibold">comisión de prácticos</span> que prefieras. Abajo podés visualizar la lista de{" "}
            <span className="font-semibold">tu selección</span> y ver cómo quedaría tu{" "}
            <span className="font-semibold">cronograma</span> semanal.
          </p>

          {/* Alert de aclaración más grande y amarillo */}
          <Alert className="border-yellow-300 bg-yellow-100 p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl mt-0.5">⚠️</div>
              <AlertDescription className="text-gray-800 text-base">
                <span className="font-semibold">Aclaración:</span> esta herramienta es para visualizar y planificar
                horarios. Para realizar las inscripciones debés hacerlo por{" "}
                <a
                  href="https://suiganew.filo.uba.ar/"
                  className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SUIGA
                </a>
                .
              </AlertDescription>
            </div>
          </Alert>
        </div>

      {/* Buscador y filtros */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Switch para Plan de Estudios */}
            <div className="flex items-center justify-between p-4 bg-[#1c2554] text-white rounded-lg border">
              <div className="flex items-center space-x-4">
                <h4 className="text-base font-medium">Plan de Estudios</h4>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${filtros.planEstudios === "1985" ? "font-medium" : "opacity-70"}`}>
                    1985
                  </span>
                  <Switch
                    checked={filtros.planEstudios === "2023"}
                    onCheckedChange={(checked) => {
                      setFiltros((prev) => ({ 
                        ...prev, 
                        planEstudios: checked ? "2023" : "1985",
                        orientaciones: [] // Limpiar orientaciones al cambiar de plan
                      }))
                    }}
                    className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600"
                  />
                  <span className={`text-sm ${filtros.planEstudios === "2023" ? "font-medium" : "opacity-70"}`}>
                    2023
                  </span>
                </div>
              </div>
              <p className="text-xs opacity-80">
                {filtros.planEstudios === "2023" ? "Plan 2023 - Nombres actuales" : "Plan 1985 - Nombres históricos"}
              </p>
            </div>

            {/* Campo de búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre de asignatura o cátedra..."
                value={filtros.busqueda}
                onChange={(e) => setFiltros((prev) => ({ ...prev, busqueda: e.target.value }))}
                className="pl-10 bg-white"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Filtros por tipo de asignatura */}
              {valoresUnicos.tiposAsignatura.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-uba-primary mb-3">Tipo de asignatura</h4>
                  <div className="space-y-2">
                    {valoresUnicos.tiposAsignatura.map((tipo) => (
                      <div key={tipo} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tipo-${tipo}`}
                          checked={filtros.tiposAsignatura.includes(tipo)}
                          onCheckedChange={() => toggleFiltro("tiposAsignatura", tipo)}
                        />
                        <label htmlFor={`tipo-${tipo}`} className="text-sm text-gray-700 cursor-pointer">
                          {tipo}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Filtros por orientación */}
              <div>
                <h4 className="text-sm font-medium text-uba-primary mb-3">Carrera/Orientación</h4>
                <div className="space-y-2">
                  {opcionesOrientacion.map((orientacion) => (
                    <div key={orientacion} className="flex items-center space-x-2">
                      <Checkbox
                        id={`orientacion-${orientacion}`}
                        checked={filtros.orientaciones.includes(orientacion)}
                        onCheckedChange={() => toggleFiltro("orientaciones", orientacion)}
                      />
                      <label htmlFor={`orientacion-${orientacion}`} className="text-sm text-gray-700 cursor-pointer">
                        {orientacion}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filtros por modalidad de aprobación */}
              <div>
                <h4 className="text-sm font-medium text-uba-primary mb-3">Modalidad de aprobación</h4>
                <RadioGroup
                  value={filtros.modalidadAprobacion}
                  onValueChange={(value) => setFiltros((prev) => ({ ...prev, modalidadAprobacion: value }))}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="todas" id="modalidad-todas" />
                      <label htmlFor="modalidad-todas" className="text-sm text-gray-700 cursor-pointer">
                        Todas
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Examen final" id="modalidad-examen" />
                      <label htmlFor="modalidad-examen" className="text-sm text-gray-700 cursor-pointer">
                        Examen final
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Promoción directa" id="modalidad-promocion" />
                      <label htmlFor="modalidad-promocion" className="text-sm text-gray-700 cursor-pointer">
                        Promoción directa
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Trabajo final" id="modalidad-trabajo" />
                      <label htmlFor="modalidad-trabajo" className="text-sm text-gray-700 cursor-pointer">
                        Trabajo final
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Botón para limpiar filtros */}
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm text-gray-600 italic">
                Mostrando {asignaturasFiltradas.length} de {asignaturasEnriquecidas.length} asignaturas
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={limpiarFiltros}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advertencias de superposición */}
      {(() => {
        const superposiciones = detectarSuperposiciones()
        return superposiciones.length > 0 ? (
          <Alert className="border-red-300 bg-red-50">
            <div className="flex items-start gap-3">
              <div className="text-2xl mt-0.5">⚠️</div>
              <AlertDescription className="text-red-800">
                <div className="font-semibold mb-2">Detectamos superposiciones horarias:</div>
                <ul className="space-y-1">
                  {superposiciones.map((superposicion, index) => (
                    <li key={index} className="text-sm">
                      • <strong>{superposicion.dia}</strong> ({superposicion.horario}): {superposicion.clase1} y {superposicion.clase2}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </div>
          </Alert>
        ) : null
      })()}

      {/* Lista de asignaturas */}
      <div className="columns-1 md:columns-2 xl:columns-3 gap-4 space-y-4">
        {asignaturasFiltradas.length === 0 ? (
          <div className="text-center py-12 col-span-full">
            <h3 className="text-lg font-semibold text-uba-primary mb-2">No se encontraron asignaturas</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda.</p>
          </div>
        ) : (
          asignaturasFiltradas.map((asignatura) => {
            const isSelected = seleccion.asignaturas.includes(asignatura.id)
            return (
              <Card key={asignatura.id} className={`break-inside-avoid mb-4 transition-all duration-200 ${
                isSelected 
                  ? "border-uba-secondary border-2 shadow-lg bg-uba-secondary/5" 
                  : "border-uba-primary/20 hover:border-uba-primary/40"
              }`}>
                <CardHeader className={`pb-3 rounded-t-lg transition-all duration-200 ${
                  isSelected 
                    ? "bg-[#46bfb0] text-white border-2 border-[#46bfb0]" 
                    : "bg-uba-primary text-white"
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                      {getAsignaturaIcon(asignatura, isSelected)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight">{getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios)}</CardTitle>
                        <div className="text-xs text-white/90 mt-1">
                          <span className="font-medium">Cátedra:</span> {asignatura.catedra}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      {/* Tooltip de correlatividad */}
                      {asignatura.planInfo?.correlatividad && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-white opacity-70 hover:opacity-100 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p><strong>Correlatividad:</strong> {asignatura.planInfo.correlatividad}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleAsignatura(asignatura.id)}
                        className={`${
                          isSelected 
                            ? "border-blue-200 data-[state=checked]:bg-blue-200 data-[state=checked]:border-blue-200 data-[state=checked]:text-blue-700"
                            : "border-white data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-uba-secondary"
                        }`}
                      />
                    </div>
                  </div>
                </CardHeader>
              <CardContent className="space-y-3 pt-3">
                {/* Características de la asignatura */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs bg-uba-secondary/20 text-uba-primary">
                    {asignatura.modalidadCursada}
                  </Badge>
                  {/* Mostrar modalidad de aprobación procesada */}
                  <Badge variant="outline" className="text-xs border-uba-primary text-uba-primary">
                    {(!asignatura.modalidadAprobacion || 
                      asignatura.modalidadAprobacion === "NO CORRESPONDE" || 
                      asignatura.modalidadAprobacion === "No corresponde" || 
                      asignatura.modalidadAprobacion.toLowerCase() === "no especificada") 
                      ? "Trabajo final" 
                      : asignatura.modalidadAprobacion}
                  </Badge>
                </div>

                {asignatura.aclaraciones && (
                  <div className="text-xs text-uba-primary bg-uba-secondary/10 p-2 rounded">
                    <em>{asignatura.aclaraciones}</em>
                  </div>
                )}

                {/* Clases agrupadas por tipo */}
                <div className="space-y-2">
                  {agruparClasesPorTipo(asignatura.clases).map((grupo) => {
                    const requiereElegir = requiereSeleccion(asignatura, grupo.tipo, grupo.clases.length)
                    
                    // Función para obtener colores según tipo de clase
                    const getClassColors = (tipo: string, isSelected: boolean) => {
                      switch (tipo) {
                        case "Teórico":
                          return isSelected 
                            ? "bg-gray-200 border-gray-400 text-gray-800"
                            : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                        case "Teórico-Práctico":
                          return isSelected
                            ? "bg-gray-100 border-gray-300 text-gray-700"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        case "Práctico":
                          return isSelected
                            ? "bg-blue-100 border-blue-300 text-blue-800"
                            : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                        default:
                          return isSelected
                            ? "bg-gray-100 border-gray-300 text-gray-800"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }
                    }

                    return (
                      <div key={grupo.tipo}>
                        {requiereElegir ? (
                          <RadioGroup
                            value={seleccion.clases[asignatura.id]?.[grupo.tipo] || ""}
                            onValueChange={(value) => seleccionarClase(asignatura.id, grupo.tipo, value)}
                          >
                            <div className="space-y-1">
                              {grupo.clases.map((clase) => {
                                const isClassSelected = seleccion.clases[asignatura.id]?.[grupo.tipo] === clase.id
                                return (
                                  <div key={clase.id} className={`border rounded p-2 transition-all duration-200 ${
                                    getClassColors(clase.tipo, isClassSelected)
                                  }`}>
                                    <div className="flex justify-between items-start mb-1">
                                      <Badge variant="outline" className={`text-xs border-current`}>
                                        {clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero}`}
                                      </Badge>
                                      <div className="flex items-center">
                                        <RadioGroupItem
                                          value={clase.id}
                                          id={clase.id}
                                          className="data-[state=checked]:bg-current data-[state=checked]:border-current"
                                        />
                                      </div>
                                    </div>
                                    <div className="text-xs space-y-0.5">
                                      <div className="flex items-center gap-1">
                                        <span className="font-medium">{clase.dia}</span>
                                        <span className="opacity-75">{clase.horario}</span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </RadioGroup>
                        ) : (
                          <div className="space-y-1">
                            {grupo.clases.map((clase, index) => (
                              <div key={clase.id} className={`border rounded p-2 transition-all duration-200 ${
                                getClassColors(clase.tipo, isSelected)
                              }`}>
                                <div className="flex justify-between items-start mb-1">
                                  <Badge variant="outline" className="text-xs border-current">
                                    {grupo.clases.length > 1 && asignatura.agrupacionClases?.[grupo.tipo] === "conjunto"
                                      ? `${clase.tipo} ${index + 1}`
                                      : clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero}`}
                                  </Badge>
                                  {grupo.clases.length > 1 && asignatura.agrupacionClases?.[grupo.tipo] === "conjunto" && (
                                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                                      Complementario
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs space-y-0.5">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium">{clase.dia}</span>
                                    <span className="opacity-75">{clase.horario}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                {/* Mensaje de clases faltantes */}
                {seleccion.asignaturas.includes(asignatura.id) &&
                  (() => {
                    const tiposFaltantes = getClasesFaltantes(asignatura, seleccion.clases[asignatura.id] || {})
                    return tiposFaltantes.length > 0 ? (
                      <div className="text-red-600 text-xs italic p-2 bg-red-50 rounded border border-red-200">
                        Falta seleccionar horario de{" "}
                        {tiposFaltantes.map((tipo, index) => (
                          <span key={tipo}>
                            <span className="font-bold italic">{tipo}</span>
                            {index < tiposFaltantes.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    ) : null
                  })()}
              </CardContent>
            </Card>
            )
          })
        )}
      </div>

      {/* Línea divisoria */}
      {seleccionFormateada.length > 0 && <div className="border-t border-gray-300 my-8"></div>}

      {/* Tu Selección */}
      {seleccionFormateada.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-uba-primary">Tu Selección</h2>
            <Button
              onClick={limpiarSeleccion}
              variant="destructive"
              size="sm"
              className="text-white"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar Selección
            </Button>
          </div>

          {/* Advertencias de superposición en Tu Selección */}
          {(() => {
            const superposiciones = detectarSuperposiciones()
            return superposiciones.length > 0 ? (
              <Alert className="border-red-300 bg-red-50 mb-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl mt-0.5">⚠️</div>
                  <AlertDescription className="text-red-800">
                    <div className="font-semibold mb-2">Hay superposiciones horarias en tu selección:</div>
                    <ul className="space-y-1">
                      {superposiciones.map((superposicion, index) => (
                        <li key={index} className="text-sm">
                          • <strong>{superposicion.dia}</strong> ({superposicion.horario}): {superposicion.clase1} y {superposicion.clase2}
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </div>
              </Alert>
            ) : null
          })()}

          <Card className="bg-uba-secondary/10 border-uba-secondary/30">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {seleccionFormateada.map((item, index) => (
                  <div key={index} className="border-l-4 border-uba-secondary pl-4">
                    <h4 className="font-semibold text-uba-primary">{item.asignatura}</h4>
                    <p className="text-sm text-gray-600 mb-2">Cátedra: {item.catedra}</p>
                    <div className="space-y-1">
                      {item.clases.map((clase, claseIndex) => (
                        <div key={claseIndex} className="text-sm bg-white p-2 rounded border">
                          <span className="font-medium text-uba-primary">{clase.nombre}</span>
                          <span className="text-gray-600 ml-2">
                            {clase.dia} {clase.horario}
                          </span>
                        </div>
                      ))}
                    </div>
                    {item.tiposFaltantes && (
                      <div className="text-red-600 text-sm italic mt-2 p-2 bg-red-50 rounded border border-red-200">
                        Falta seleccionar horario de{" "}
                        {item.tiposFaltantes.map((tipo, index) => (
                          <span key={tipo}>
                            <span className="font-bold italic">{tipo}</span>
                            {index < item.tiposFaltantes.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cronograma Semanal */}
      {seleccionFormateada.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-uba-primary">Tu Cronograma Semanal</h2>
          </div>

          {(() => {
            // Generar datos del cronograma
            const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
            const horariosCompletos: Array<{
              asignatura: string
              catedra: string
              clase: string
              dia: string
              inicio: number
              fin: number
              color: string
            }> = []

            // Paleta de colores para diferentes asignaturas
            const colores = [
              "bg-blue-200 text-blue-800 border-blue-300",
              "bg-green-200 text-green-800 border-green-300", 
              "bg-purple-200 text-purple-800 border-purple-300",
              "bg-yellow-200 text-yellow-800 border-yellow-300",
              "bg-pink-200 text-pink-800 border-pink-300",
              "bg-indigo-200 text-indigo-800 border-indigo-300",
              "bg-red-200 text-red-800 border-red-300",
              "bg-teal-200 text-teal-800 border-teal-300"
            ]

            // Recopilar todas las clases seleccionadas con colores
            seleccion.asignaturas.forEach((asignaturaId, asignaturaIndex) => {
              const asignatura = asignaturasEnriquecidas.find((a) => a.id === asignaturaId)
              if (!asignatura) return

              const clasesAsignatura = seleccion.clases[asignaturaId] || {}
              const gruposClases = agruparClasesPorTipo(asignatura.clases)
              const colorAsignatura = colores[asignaturaIndex % colores.length]

              gruposClases.forEach((grupo) => {
                const agrupacion = asignatura.agrupacionClases?.[grupo.tipo]

                if (agrupacion === "conjunto") {
                  // Si es conjunto, agregar todas las clases del grupo
                  grupo.clases.forEach((clase) => {
                    const horarioParts = clase.horario.split(" - ")
                    const inicio = parseInt(horarioParts[0].split(":")[0])
                    const fin = parseInt(horarioParts[1].split(":")[0])

                    horariosCompletos.push({
                      asignatura: getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios),
                      catedra: asignatura.catedra,
                      clase: `${clase.tipo} ${grupo.clases.length > 1 ? grupo.clases.indexOf(clase) + 1 : ""}`.trim(),
                      dia: clase.dia,
                      inicio,
                      fin,
                      color: colorAsignatura
                    })
                  })
                } else {
                  // Para clases que requieren selección o únicas
                  if (grupo.clases.length === 1) {
                    const clase = grupo.clases[0]
                    const horarioParts = clase.horario.split(" - ")
                    const inicio = parseInt(horarioParts[0].split(":")[0])
                    const fin = parseInt(horarioParts[1].split(":")[0])

                    horariosCompletos.push({
                      asignatura: getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios),
                      catedra: asignatura.catedra,
                      clase: clase.tipo,
                      dia: clase.dia,
                      inicio,
                      fin,
                      color: colorAsignatura
                    })
                  } else {
                    const claseSeleccionadaId = clasesAsignatura[grupo.tipo]
                    if (claseSeleccionadaId) {
                      const clase = grupo.clases.find((c) => c.id === claseSeleccionadaId)
                      if (clase) {
                        const horarioParts = clase.horario.split(" - ")
                        const inicio = parseInt(horarioParts[0].split(":")[0])
                        const fin = parseInt(horarioParts[1].split(":")[0])

                        horariosCompletos.push({
                          asignatura: getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios),
                          catedra: asignatura.catedra,
                          clase: `${clase.tipo} ${clase.numero}`,
                          dia: clase.dia,
                          inicio,
                          fin,
                          color: colorAsignatura
                        })
                      }
                    }
                  }
                }
              })
            })

            // Determinar rango de horarios (8:00 a 22:00)
            const horaInicio = 8
            const horaFin = 22
            const intervalos = []
            for (let hora = horaInicio; hora < horaFin; hora += 2) {
              intervalos.push({
                inicio: hora,
                fin: hora + 2,
                label: `${hora}:00-${hora + 2}:00`
              })
            }

            return (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="overflow-x-auto">
                      {/* Indicador de scroll para pantallas pequeñas */}
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden"></div>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none z-20 md:hidden">
                        →
                      </div>
                      <table className="w-full min-w-[900px]">
                      <thead>
                        <tr className="bg-uba-primary text-white">
                          <th className="border border-gray-300 p-3 text-center font-semibold text-sm min-w-[100px]">
                            Horario
                          </th>
                          {diasSemana.map((dia) => (
                            <th key={dia} className="border border-gray-300 p-3 text-center font-semibold text-sm min-w-[140px]">
                              {dia}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {intervalos.map((intervalo) => (
                          <tr key={intervalo.label} className="h-20">
                            <td className="border border-gray-300 p-2 text-center font-medium text-sm bg-gray-50 text-uba-primary">
                              {intervalo.label}
                            </td>
                            {diasSemana.map((dia) => {
                              const clasesEnIntervalo = horariosCompletos.filter(
                                (clase) =>
                                  clase.dia === dia &&
                                  clase.inicio < intervalo.fin &&
                                  clase.fin > intervalo.inicio
                              )

                              return (
                                <td key={dia} className="border border-gray-300 p-1 align-top relative">
                                  {clasesEnIntervalo.map((clase, index) => {
                                    // Calcular posición y altura proporcional
                                    const inicioRelativo = Math.max(clase.inicio, intervalo.inicio) - intervalo.inicio
                                    const finRelativo = Math.min(clase.fin, intervalo.fin) - intervalo.inicio
                                    const alturaTotal = intervalo.fin - intervalo.inicio
                                    
                                    const topPercent = (inicioRelativo / alturaTotal) * 100
                                    const heightPercent = ((finRelativo - inicioRelativo) / alturaTotal) * 100

                                    return (
                                      <div
                                        key={index}
                                        className={`absolute left-1 right-1 rounded-md border-2 p-1 text-xs overflow-hidden ${clase.color}`}
                                        style={{
                                          top: `${topPercent}%`,
                                          height: `${heightPercent}%`,
                                          minHeight: '24px'
                                        }}
                                      >
                                        <div className="font-semibold text-xs leading-tight mb-0.5 truncate">
                                          {clase.asignatura.length > 25 
                                            ? `${clase.asignatura.substring(0, 22)}...`
                                            : clase.asignatura
                                          }
                                        </div>
                                        <div className="text-xs leading-tight truncate">
                                          {clase.clase}
                                        </div>
                                        <div className="text-xs opacity-75 truncate">
                                          {clase.inicio}:00-{clase.fin}:00
                                        </div>
                                      </div>
                                    )
                                  })}
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Leyenda de colores */}
                  <div className="p-4 bg-gray-50 border-t">
                    <h4 className="text-sm font-semibold text-uba-primary mb-3">Leyenda de asignaturas:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {seleccionFormateada.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border-2 ${colores[index % colores.length]}`}></div>
                          <span className="text-sm text-gray-700 truncate">
                            {item.asignatura} ({item.catedra})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })()}
        </div>
      )}
      </div>
    </TooltipProvider>
  )
}