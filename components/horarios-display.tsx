"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, BookOpen, Calendar, ChevronDown, FileText, Info, Notebook, Search, X } from "lucide-react"
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
  modalidadesAprobacion: string[]
  planEstudios: "2023" | "1985"
  horariosSeleccionados: { [dia: string]: number[] }
}

interface Seleccion {
  asignaturas: string[]
  clases: { [asignaturaId: string]: { [tipoClase: string]: string } }
}

export function HorariosDisplay() {
  const [data, setData] = useState<HorariosData | null>(null)
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState<Filtros>({
    busqueda: "",
    tiposAsignatura: [],
    modalidadesAprobacion: [],
    planEstudios: "2023",
    horariosSeleccionados: {},
  })
  const [mostrarFiltroHorarios, setMostrarFiltroHorarios] = useState(false)
  const [seleccion, setSeleccion] = useState<Seleccion>({
    asignaturas: [],
    clases: {},
  })
  const [asignaturasEnriquecidas, setAsignaturasEnriquecidas] = useState<AsignaturaConPlan[]>([])

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        // En desarrollo, primero intentar cargar desde localStorage
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('replit'))) {
          const localData = localStorage.getItem("horarios-antropologia")
          if (localData) {
            try {
              const parsedData = JSON.parse(localData)
              console.log('Cargando datos desde localStorage para desarrollo:', parsedData)
              setData(parsedData)
              setLoading(false)
              return
            } catch (parseError) {
              console.error('Error parsing localStorage data:', parseError)
            }
          }
        }

        // Si no hay datos locales, hacer llamada a la API
        const response = await fetch('/api/horarios')
        const horarios = await response.json()
        setData(horarios)
      } catch (error) {
        console.error('Error fetching horarios:', error)
        setData({
          asignaturas: [],
          periodo: { año: new Date().getFullYear().toString(), periodo: "1C" },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHorarios()
    
    // Polling cada 30 segundos para detectar cambios (solo si no estamos usando localStorage)
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('replit'))) {
        const localData = localStorage.getItem("horarios-antropologia")
        if (localData) {
          return // No hacer polling si tenemos datos locales
        }
      }
      fetchHorarios()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (data?.asignaturas) {
      const enriched = enrichAsignaturasWithPlanInfo(data.asignaturas)
      setAsignaturasEnriquecidas(enriched)
    }
  }, [data])

  // Listener para cambios en localStorage en desarrollo
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('replit'))) {
      const handleStorageChange = () => {
        const localData = localStorage.getItem("horarios-antropologia")
        if (localData) {
          try {
            const parsedData = JSON.parse(localData)
            console.log('Datos actualizados en localStorage, recargando:', parsedData)
            setData(parsedData)
          } catch (parseError) {
            console.error('Error parsing updated localStorage data:', parseError)
          }
        }
      }

      // Escuchar cambios en localStorage
      window.addEventListener('storage', handleStorageChange)
      
      return () => {
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [])

  const getAsignaturaIcon = (asignatura: Asignatura, isSelected = false) => {
    const tipoAsignatura = asignatura.tipoAsignatura || ""
    const titulo = asignatura.materia.toLowerCase()
    const iconColor = isSelected ? "text-[#1c2554]" : "text-uba-secondary"

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
      return <BookOpen className={`h-5 w-5 ${iconColor}`} />
    }
  }

  const agruparClasesPorTipo = (clases: Clase[]) => {
    const grupos: { [tipo: string]: Clase[] } = {}

    clases.forEach((clase) => {
      if (!grupos[clase.tipo]) {
        grupos[clase.tipo] = []
      }
      grupos[clase.tipo].push(clase)
    })

    const ordenTipos = ["Teórico", "Teórico-Práctico", "Práctico"]
                const gruposOrdenados: { tipo: string; clases: Clase[] }[] = []

                ordenTipos.forEach((tipo) => {
                  if (grupos[tipo]) {
                    gruposOrdenados.push({ tipo, clases: grupos[tipo] })
                  }
                })

                return gruposOrdenados
  }

  const requiereSeleccion = (asignatura: Asignatura, tipoClase: string, cantidadClases: number) => {
    if (cantidadClases <= 1) return false

    const agrupacion = asignatura.agrupacionClases?.[tipoClase]

    if (agrupacion === "conjunto") return false
    if (agrupacion === "elegir") return true

    return cantidadClases > 1
  }

  const getValoresUnicos = (asignaturas: AsignaturaConPlan[]) => {
    // Tipos de asignatura en el orden solicitado
    const tiposAsignatura = [
      "Materia cuatrimestral",
      "Seminario regular", 
      "Seminario PST",
      "Materia o seminario anual"
    ]

    const modalidadesAprobacion = [
      ...new Set(
        asignaturas
          .map((a) => a.modalidadAprobacion || "Trabajo final")
          .filter(Boolean),
      ),
    ]

    return {
      tiposAsignatura,
      modalidadesAprobacion: modalidadesAprobacion.sort(),
    }
  }



  const tieneHorarioEnSlot = (horario: string, bloqueInicio: number) => {
    const [inicio, fin] = horario.split(" - ").map(h => parseInt(h.split(":")[0]))
    const bloqueFin = bloqueInicio + 2
    return inicio < bloqueFin && fin > bloqueInicio
  }

  const asignaturaCoincideConHorarios = (asignatura: Asignatura) => {
    if (Object.keys(filtros.horariosSeleccionados).length === 0) return true

    const gruposClases = agruparClasesPorTipo(asignatura.clases)

    // Para cada tipo de clase, verificar si hay al menos una opción en los horarios seleccionados
    for (const grupo of gruposClases) {
      let tieneOpcionValida = false

      for (const clase of grupo.clases) {
        const dia = clase.dia
        const horariosDelDia = filtros.horariosSeleccionados[dia] || []

        if (horariosDelDia.length > 0) {
          const claseCoincide = horariosDelDia.some(bloque => 
            tieneHorarioEnSlot(clase.horario, bloque)
          )
          if (claseCoincide) {
            tieneOpcionValida = true
            break
          }
        }
      }

      // Si hay horarios seleccionados pero este tipo de clase no tiene opciones válidas
      const hayHorariosSeleccionados = Object.values(filtros.horariosSeleccionados).some(h => h.length > 0)
      if (hayHorariosSeleccionados && !tieneOpcionValida) {
        return false
      }
    }

    return true
  }

  const claseEstaOscurecida = (clase: Clase) => {
    if (Object.keys(filtros.horariosSeleccionados).length === 0) return false

    const horariosDelDia = filtros.horariosSeleccionados[clase.dia] || []
    if (horariosDelDia.length === 0) return false

    return !horariosDelDia.some(bloque => 
      tieneHorarioEnSlot(clase.horario, bloque)
    )
  }

  const filtrarAsignaturas = (asignaturas: AsignaturaConPlan[]) => {
    return asignaturas.filter((asignatura) => {
      const nombreParaBusqueda = getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios)

      const coincideBusqueda =
        filtros.busqueda === "" ||
        nombreParaBusqueda.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        asignatura.catedra.toLowerCase().includes(filtros.busqueda.toLowerCase())

      const coincideTipo = (() => {
        if (filtros.tiposAsignatura.length === 0) return true

        if (!asignatura.tipoAsignatura) return false

        // Agrupar materias cuatrimestrales regulares y optativas bajo "Materia cuatrimestral"
        if (filtros.tiposAsignatura.includes("Materia cuatrimestral")) {
          if (asignatura.tipoAsignatura === "Materia cuatrimestral regular" || 
              asignatura.tipoAsignatura === "Materia cuatrimestral optativa/electiva") {
            return true
          }
        }

        return filtros.tiposAsignatura.includes(asignatura.tipoAsignatura)
      })()

      const coincideModalidad = (() => {
        if (filtros.modalidadesAprobacion.length === 0) return true

        const modalidadReal = asignatura.modalidadAprobacion || "Trabajo final"

        return filtros.modalidadesAprobacion.includes(modalidadReal)
      })()

      const coincideHorarios = asignaturaCoincideConHorarios(asignatura)

      return coincideBusqueda && coincideTipo && coincideModalidad && coincideHorarios
    })
  }

  const getNombreAsignaturaPorPlan = (asignatura: AsignaturaConPlan, plan: "2023" | "1985"): string => {
    if (plan === "1985") {
      // Para plan 1985, usar el nombre específico si existe, sino el nombre original
      const nombrePlan85 = asignatura.planInfo?.equivalencia?.nombrePlan85
      if (nombrePlan85 && nombrePlan85.trim() !== '') {
        return nombrePlan85
      }
    } else {
      // Para plan 2023, usar el nombre específico si existe, sino el nombre original
      const nombrePlan23 = asignatura.planInfo?.equivalencia?.nombrePlan23
      if (nombrePlan23 && nombrePlan23.trim() !== '') {
        return nombrePlan23
      }
    }
    // Fallback al nombre original de la asignatura
    return asignatura.materia
  }

  const filtrarAsignaturasPorPlan = (asignaturas: AsignaturaConPlan[], plan: "2023" | "1985"): AsignaturaConPlan[] => {
    if (plan === "2023") {
      // Para plan 2023, excluir materias optativas exclusivas del plan 1985
      return asignaturas.filter(asignatura => 
        asignatura.tipoAsignatura !== "Materia cuatrimestral optativa (Exclusiva plan 1985)"
      )
    }

    // Para plan 1985, incluir todas las asignaturas
    // Las materias optativas exclusivas del plan 1985 solo son válidas para este plan
    return asignaturas
  }

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      tiposAsignatura: [],
      modalidadesAprobacion: [],
      planEstudios: filtros.planEstudios,
      horariosSeleccionados: {},
    })
  }

  const toggleFiltro = (tipo: "tiposAsignatura" | "modalidadesAprobacion", valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [tipo]: prev[tipo].includes(valor) ? prev[tipo].filter((item) => item !== valor) : [...prev[tipo], valor],
    }))
  }

  const toggleHorario = (dia: string, bloque: number) => {
    setFiltros((prev) => {
      const horariosDelDia = prev.horariosSeleccionados[dia] || []
      const nuevosHorarios = horariosDelDia.includes(bloque)
        ? horariosDelDia.filter(h => h !== bloque)
        : [...horariosDelDia, bloque]

      return {
        ...prev,
        horariosSeleccionados: {
          ...prev.horariosSeleccionados,
          [dia]: nuevosHorarios
        }
      }
    })
  }

  const toggleAsignatura = (asignaturaId: string) => {
    setSeleccion((prev) => {
      const isSelected = prev.asignaturas.includes(asignaturaId)

      if (isSelected) {
        return {
          asignaturas: prev.asignaturas.filter((id) => id !== asignaturaId),
          clases: { ...prev.clases, [asignaturaId]: {} },
        }
      } else {
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

      const nuevasAsignaturas = prev.asignaturas.includes(asignaturaId)
        ? prev.asignaturas
        : [...prev.asignaturas, asignaturaId]

      return {
        asignaturas: nuevasAsignaturas,
        clases: nuevasClases,
      }
    })
  }

  const getClasesFaltantes = (asignatura: Asignatura, clasesSeleccionadas: { [tipoClase: string]: string }) => {
    const gruposClases = agruparClasesPorTipo(asignatura.clases)
    const tiposFaltantes: string[] = []

    gruposClases.forEach((grupo) => {
      const agrupacion = asignatura.agrupacionClases?.[grupo.tipo]

      if (agrupacion === "elegir" && grupo.clases.length > 1 && !clasesSeleccionadas[grupo.tipo]) {
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
    })

    return tiposFaltantes
  }

  const detectarSuperposiciones = () => {
    if (!data) return []

    const clasesSeleccionadas: Array<{
      asignatura: string
      clase: string
      dia: string
      inicio: number
      fin: number
    }> = []

    seleccion.asignaturas.forEach((asignaturaId) => {
      const asignatura = asignaturasEnriquecidas.find((a) => a.id === asignaturaId)
      if (!asignatura) return

      const clasesAsignatura = seleccion.clases[asignaturaId] || {}
      const gruposClases = agruparClasesPorTipo(asignatura.clases)

      gruposClases.forEach((grupo) => {
        const agrupacion = asignatura.agrupacionClases?.[grupo.tipo]

        if (agrupacion === "conjunto") {
          grupo.clases.forEach((clase) => {
            const horarioParts = clase.horario.split(" - ")
            const inicio = parseInt(horarioParts[0].split(":")[0])
            const fin = parseInt(horarioParts[1].split(":")[0])

            clasesSeleccionadas.push({
              asignatura: getNombreAsignaturaPorPlan(asignatura, filtros.planEstudios),
              clase: `${clase.tipo} ${grupo.clases.length > 1 ? String.fromCharCode(65 + grupo.clases.indexOf(clase)) : ""}`.trim(),
              dia: clase.dia,
              inicio,
              fin
            })
          })
        } else {
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
                  clase: `${clase.tipo} ${clase.numero || ""}`.trim(),
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

  const limpiarSeleccion = () => {
    setSeleccion({
      asignaturas: [],
      clases: {},
    })
  }

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
          grupo.clases.forEach((clase, index) => {
            clasesSeleccionadas.push({
              nombre: grupo.clases.length > 1 
                ? `${clase.tipo} ${String.fromCharCode(65 + index)}` 
                : (clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero || ""}`),
              dia: clase.dia,
              horario: clase.horario,
            })
          })
        } else if (agrupacion === "elegir") {
          const claseSeleccionadaId = clasesAsignatura[grupo.tipo]
          if (claseSeleccionadaId) {
            const clase = grupo.clases.find((c) => c.id === claseSeleccionadaId)
            if (clase) {
              clasesSeleccionadas.push({
                nombre: clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero || ""}`,
                dia: clase.dia,
                horario: clase.horario,
              })
            }
          }
        } else {
          if (grupo.clases.length === 1) {
            grupo.clases.forEach((clase) => {
              clasesSeleccionadas.push({
                nombre: clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero || ""}`,
                dia: clase.dia,
                horario: clase.horario,
              })
            })
          } else {
            const claseSeleccionadaId = clasesAsignatura[grupo.tipo]
            if (claseSeleccionadaId) {
              const clase = grupo.clases.find((c) => c.id === claseSeleccionadaId)
              if (clase) {
                clasesSeleccionadas.push({
                  nombre: clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero || ""}`,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="space-y-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-uba-primary mb-2">
            Oferta de Asignaturas - Ciencias Antropológicas (FFyL-UBA)
          </h1>
          <p className="text-gray-600 text-lg mb-3">
            Período actual: <span className="font-semibold text-uba-primary">
              {getPeriodoText(data.periodo.periodo)} {data.periodo.año}
            </span>
          </p>
          
          <h2 className="text-xl font-semibold text-uba-primary mb-2">¡Planificá tus horarios!</h2>
          <p className="text-gray-700 text-base mb-3 leading-relaxed">
            Seleccioná las <span className="font-semibold">asignaturas</span> que te interesan, eligiendo la{" "}
            <span className="font-semibold">comisión de prácticos</span> que prefieras. Abajo podés visualizar la lista de{" "}
            <span className="font-semibold">tu selección</span> y ver cómo quedaría tu{" "}
            <span className="font-semibold">cronograma</span> semanal.
          </p>

          <Alert className="border-yellow-300 bg-yellow-100 p-3">
            <div className="flex items-start gap-3">
              <div className="text-xl mt-0.5">⚠️</div>
              <AlertDescription className="text-gray-800 text-sm">
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

      <Card className="bg-[#46bfb0]/15 border-[#46bfb0]/40 rounded-xl">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
            {/* Search and Plan Selector */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por asignatura o cátedra..."
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros((prev) => ({ ...prev, busqueda: e.target.value }))}
                  className="pl-10 bg-white h-9 text-sm"
                />
              </div>

              <div className="flex items-center justify-center p-2 bg-[#1c2554] text-white rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium">Plan de Estudios:</span>
                  <span className={`text-xs ${filtros.planEstudios === "1985" ? "font-bold" : "opacity-70"}`}>
                    1985
                  </span>
                  <Switch
                    checked={filtros.planEstudios === "2023"}
                    onCheckedChange={(checked) => {
                      setFiltros((prev) => ({ 
                        ...prev, 
                        planEstudios: checked ? "2023" : "1985"
                      }))
                    }}
                    className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600 scale-75"
                  />
                  <span className={`text-xs ${filtros.planEstudios === "2023" ? "font-bold" : "opacity-70"}`}>
                    2023
                  </span>
                </div>
              </div>
            </div>

            {/* Tipo de asignatura */}
            {valoresUnicos.tiposAsignatura.length > 0 && (
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-xs font-semibold text-uba-primary mb-2">Tipo de asignatura</h4>
                <div className="space-y-1.5">
                  {valoresUnicos.tiposAsignatura.map((tipo) => (
                    <div key={tipo} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tipo-${tipo}`}
                        checked={filtros.tiposAsignatura.includes(tipo)}
                        onCheckedChange={() => toggleFiltro("tiposAsignatura", tipo)}
                        className="h-3.5 w-3.5"
                      />
                      <label htmlFor={`tipo-${tipo}`} className="text-xs text-gray-700 cursor-pointer leading-snug">
                        {tipo}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modalidad de aprobación */}
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <h4 className="text-xs font-semibold text-uba-primary mb-2">Modalidad de aprobación</h4>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="modalidad-examen"
                    checked={filtros.modalidadesAprobacion.includes("Examen final")}
                    onCheckedChange={() => toggleFiltro("modalidadesAprobacion", "Examen final")}
                    className="h-3.5 w-3.5"
                  />
                  <label htmlFor="modalidad-examen" className="text-xs text-gray-700 cursor-pointer leading-snug">
                    Examen final
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="modalidad-promocion"
                    checked={filtros.modalidadesAprobacion.includes("Promoción directa")}
                    onCheckedChange={() => toggleFiltro("modalidadesAprobacion", "Promoción directa")}
                    className="h-3.5 w-3.5"
                  />
                  <label htmlFor="modalidad-promocion" className="text-xs text-gray-700 cursor-pointer leading-snug">
                    Promoción directa
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="modalidad-trabajo"
                    checked={filtros.modalidadesAprobacion.includes("Trabajo final")}
                    onCheckedChange={() => toggleFiltro("modalidadesAprobacion", "Trabajo final")}
                    className="h-3.5 w-3.5"
                  />
                  <label htmlFor="modalidad-trabajo" className="text-xs text-gray-700 cursor-pointer leading-snug">
                    Trabajo final
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Filtro de horarios por día */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setMostrarFiltroHorarios(!mostrarFiltroHorarios)}
                className="flex items-center gap-2 text-sm font-semibold text-uba-primary hover:text-uba-secondary transition-colors"
              >
                <span>Filtrar por horarios</span>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mostrarFiltroHorarios ? 'rotate-180' : ''
                  }`} 
                />
              </button>
            </div>

            {mostrarFiltroHorarios && (
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="grid grid-cols-6 gap-1 text-xs">
                  {/* Header row */}{["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(dia => (
                    <div key={dia} className="font-medium text-center text-uba-primary py-1 truncate">
                      <span className="hidden md:inline">{dia}</span>                      <span className="md:hidden">{dia.substring(0, 3)}</span>
                    </div>
                  ))}

                  {/* Time slot rows */}
                  {Array.from({ length: 7 }, (_, i) => {
                    const horaInicio = 8 + (i * 2)
                    const horaFin = horaInicio + 2
                    return (
                      <React.Fragment key={i}>
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(dia => {
                          const isSelected = (filtros.horariosSeleccionados[dia] || []).includes(horaInicio)
                          return (
                            <button
                              key={`${dia}-${horaInicio}`}
                              onClick={() => toggleHorario(dia, horaInicio)}
                              className={`h-10 w-full rounded border transition-all duration-200 text-xs font-medium ${
                                isSelected
                                  ? "bg-uba-secondary text-white border-uba-secondary shadow-sm"
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-600"
                              }`}
                            >
                              {horaInicio} a {horaFin}
                            </button>
                          )
                        })}
                      </React.Fragment>
                    )
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Seleccioná los bloques horarios para filtrar las asignaturas que tengan opciones en esos horarios.
                </p>
              </div>
            )}
          </div>

          {/* Footer with count and clear button */}
          <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 font-medium">
              Mostrando {asignaturasFiltradas.length} de {asignaturasEnriquecidas.length} asignaturas
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={limpiarFiltros}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white h-7 px-3 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-min" style={{ gridAutoFlow: 'row' }}>
        {asignaturasFiltradas.length === 0 ? (
          <div className="text-center py-12 col-span-full">
            <h3 className="text-lg font-semibold text-uba-primary mb-2">No se encontraron asignaturas</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda.</p>
          </div>
        ) : (
          asignaturasFiltradas.map((asignatura) => {
            const isSelected = seleccion.asignaturas.includes(asignatura.id)
            return (
              <Card key={asignatura.id} className={`@container transition-all duration-200 ${
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
                <div className="flex flex-wrap gap-1 mb-2">
                  {/* Badge de modalidad de cursada */}
                  {(() => {
                    const modalidadCursada = asignatura.modalidadCursada || "Sede Puán"

                    if (modalidadCursada.toLowerCase() === "virtual" || 
                        (modalidadCursada.toLowerCase().includes("virtual") && 
                        !modalidadCursada.includes("30%"))) {
                      return (
                        <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700 border-teal-300 px-1.5 py-0.5">
                          Virtual
                        </Badge>
                      )
                    } else if (modalidadCursada.includes("30%") && modalidadCursada.toLowerCase().includes("virtual")) {
                      return (
                        <>
                          <Badge variant="secondary" className="text-xs bg-sky-100 text-sky-700 border-sky-300 px-1.5 py-0.5">
                            30% virtualidad
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-300 px-1.5 py-0.5">
                            Sede Puán
                          </Badge>
                        </>
                      )
                    } else if (modalidadCursada.toLowerCase().includes("museo")) {
                      return (
                        <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 border-amber-300 px-1.5 py-0.5">
                          Sede Museo
                        </Badge>
                      )
                    } else if (modalidadCursada.toLowerCase().includes("tilcara")) {
                      return (
                        <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-300 px-1.5 py-0.5">
                          Sede Tilcara
                        </Badge>
                      )
                    } else {
                      return (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-300 px-1.5 py-0.5">
                          Sede Puán
                        </Badge>
                      )
                    }
                  })()}

                  {/* Badge de modalidad de aprobación */}
                  {(() => {
                    const modalidad = asignatura.modalidadAprobacion || "Trabajo final"

                    if (modalidad === "Promoción directa" || modalidad.toLowerCase().includes("promoción")) {
                      return (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-300 px-1.5 py-0.5">
                          Promoción directa
                        </Badge>
                      )
                    } else if (modalidad === "Examen final" || modalidad.toLowerCase().includes("examen")) {
                      return (
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-300 px-1.5 py-0.5">
                          Examen final
                        </Badge>
                      )
                    } else {
                      return (
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-300 px-1.5 py-0.5">
                          Trabajo final
                        </Badge>
                      )
                    }
                  })()}

                  {/* Badge de Optativa para materias exclusivas del plan 1985 */}
                  {asignatura.tipoAsignatura === "Materia cuatrimestral optativa (Exclusiva plan 1985)" && (
                    <Badge variant="secondary" className="text-xs bg-violet-100 text-violet-700 border-violet-300 px-1.5 py-0.5">
                      Optativa
                    </Badge>
                  )}
                </div>



                {asignatura.aclaraciones && (
                  <div className="text-xs text-uba-primary bg-uba-secondary/10 p-2 rounded">
                    <em>{asignatura.aclaraciones}</em>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {agruparClasesPorTipo(asignatura.clases).map((grupo) => {
                    const requiereElegir = requiereSeleccion(asignatura, grupo.tipo, grupo.clases.length)

                    const getClassColors = (tipo: string, isSelected: boolean, isDimmed: boolean = false) => {
                      const baseColors = (() => {
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
                      })()

                      return isDimmed ? `${baseColors} opacity-50` : baseColors
                    }

                    return (
                      <div key={grupo.tipo} className="sm:col-span-1">
                        {requiereElegir ? (
                          <RadioGroup
                            value={seleccion.clases[asignatura.id]?.[grupo.tipo] || ""}
                            onValueChange={(value) => seleccionarClase(asignatura.id, grupo.tipo, value)}
                          >
                            <div className="space-y-1">
                              {grupo.clases.map((clase) => {
                                const isClassSelected = seleccion.clases[asignatura.id]?.[grupo.tipo] === clase.id
                                const isDimmed = claseEstaOscurecida(clase)
                                return (
                                  <div key={clase.id} className={`border rounded p-2 transition-all duration-200 ${
                                    getClassColors(clase.tipo, isClassSelected, isDimmed)
                                  }`}>
                                    <div className="flex justify-between items-start mb-1">
                                      <Badge variant="outline" className="text-xs border-current px-2 py-0.5">
                                        {grupo.clases.length === 1 
                                          ? clase.tipo
                                          : clase.numero && clase.numero > 0 ? `${clase.tipo} ${clase.numero}` : clase.tipo}
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
                                        <span className="opacity-75">{clase.horario} hs</span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </RadioGroup>
                        ) : (
                          <div className="space-y-1">
                            {grupo.clases.map((clase, index) => {
                              const isDimmed = claseEstaOscurecida(clase)
                              return (
                              <div key={clase.id} className={`border rounded p-2 transition-all duration-200 ${
                                getClassColors(clase.tipo, isSelected, isDimmed)
                              }`}>
                                <div className="flex justify-between items-start mb-1">
                                  <Badge variant="outline" className="text-xs border-current px-2 py-0.5">
                                    {grupo.clases.length > 1 && asignatura.agrupacionClases?.[grupo.tipo] === "conjunto"
                                      ? `${clase.tipo} ${String.fromCharCode(65 + index)}` // A, B, C, etc.
                                      : grupo.clases.length === 1 
                                        ? clase.tipo
                                        : clase.numero && clase.numero > 0 ? `${clase.tipo} ${clase.numero}` : clase.tipo}
                                  </Badge>
                                  {grupo.clases.length > 1 && asignatura.agrupacionClases?.[grupo.tipo] === "conjunto" && (
                                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-600 border-yellow-200 px-2 py-0.5">
                                      <span className="hidden [@container_(min-width:200px)]:inline">Complementario</span>
                                      <span className="[@container_(min-width:200px)]:hidden">Compl.</span>
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs space-y-0.5">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium">{clase.dia}</span>
                                    <span className="opacity-75">{clase.horario} hs</span>
                                  </div>
                                </div>
                              </div>
                            )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
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

      {seleccionFormateada.length > 0 && <div className="border-t border-gray-300 my-8"></div>}

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
                            {clase.dia} {clase.horario} hs
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

      {seleccionFormateada.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-uba-primary">Tu Cronograma Semanal</h2>
          </div>

          {(() => {
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

            seleccion.asignaturas.forEach((asignaturaId, asignaturaIndex) => {
              const asignatura = asignaturasEnriquecidas.find((a) => a.id === asignaturaId)
              if (!asignatura) return

              const clasesAsignatura = seleccion.clases[asignaturaId] || {}
              const gruposClases = agruparClasesPorTipo(asignatura.clases)
              const colorAsignatura = colores[asignaturaIndex % colores.length]

              gruposClases.forEach((grupo) => {
                const agrupacion = asignatura.agrupacionClases?.[grupo.tipo]

                if (agrupacion === "conjunto") {
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
                          clase: `${clase.tipo} ${clase.numero || ""}`.trim(),
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
                                          {clase.inicio}:00-{clase.fin}:00 hs
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
      </div>
    </TooltipProvider>
  )
}