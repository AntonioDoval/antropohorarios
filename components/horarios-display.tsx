"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertTriangle, BookOpen, Calendar, FileText, Notebook, Search, X } from "lucide-react"

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
  orientaciones: string[]
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
    modalidadesAprobacion: [],
    orientaciones: [],
  })
  const [seleccion, setSeleccion] = useState<Seleccion>({
    asignaturas: [],
    clases: {},
  })

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

  // Función para obtener el icono según el tipo de asignatura
  const getAsignaturaIcon = (asignatura: Asignatura) => {
    const tipoAsignatura = asignatura.tipoAsignatura || ""
    const titulo = asignatura.materia.toLowerCase()

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
      return <Notebook className="h-5 w-5 text-uba-secondary" />
    } else if (tipoAsignatura === "Seminario regular") {
      return <FileText className="h-5 w-5 text-uba-secondary" />
    } else if (esAsignaturaAnual || tipoAsignatura === "Asignatura anual") {
      return <Calendar className="h-5 w-5 text-uba-secondary" />
    } else {
      // Materias cuatrimestrales
      return <BookOpen className="h-5 w-5 text-uba-secondary" />
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
  const getValoresUnicos = (asignaturas: Asignatura[]) => {
    const tiposAsignatura = [...new Set(asignaturas.map((a) => a.tipoAsignatura).filter(Boolean))]
    const modalidadesAprobacion = [
      ...new Set(
        asignaturas
          .map((a) => a.modalidadAprobacion)
          .filter((m) => m && m !== "NO CORRESPONDE" && m !== "No corresponde"),
      ),
    ]

    return {
      tiposAsignatura: tiposAsignatura.sort(),
      modalidadesAprobacion: modalidadesAprobacion.sort(),
    }
  }

  // Opciones fijas para orientación
  const opcionesOrientacion = [
    "Profesorado",
    "Licenciatura - Orientación Arqueológica",
    "Licenciatura - Orientación Sociocultural",
  ]

  // Función para filtrar asignaturas
  const filtrarAsignaturas = (asignaturas: Asignatura[]) => {
    return asignaturas.filter((asignatura) => {
      // Filtro por búsqueda
      const coincideBusqueda =
        filtros.busqueda === "" ||
        asignatura.materia.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        asignatura.catedra.toLowerCase().includes(filtros.busqueda.toLowerCase())

      // Filtro por tipo de asignatura
      const coincideTipo =
        filtros.tiposAsignatura.length === 0 ||
        (asignatura.tipoAsignatura && filtros.tiposAsignatura.includes(asignatura.tipoAsignatura))

      // Filtro por modalidad de aprobación
      const coincideModalidad =
        filtros.modalidadesAprobacion.length === 0 ||
        filtros.modalidadesAprobacion.includes(asignatura.modalidadAprobacion)

      // Filtro por orientación
      const coincideOrientacion =
        filtros.orientaciones.length === 0 ||
        (asignatura.orientacion && filtros.orientaciones.includes(asignatura.orientacion))

      return coincideBusqueda && coincideTipo && coincideModalidad && coincideOrientacion
    })
  }

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      tiposAsignatura: [],
      modalidadesAprobacion: [],
      orientaciones: [],
    })
  }

  // Función para manejar cambios en checkboxes
  const toggleFiltro = (tipo: "tiposAsignatura" | "modalidadesAprobacion" | "orientaciones", valor: string) => {
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
      const asignatura = data.asignaturas.find((a) => a.id === asignaturaId)
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
              asignatura: asignatura.materia,
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
              asignatura: asignatura.materia,
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
                  asignatura: asignatura.materia,
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
      const asignatura = data.asignaturas.find((a) => a.id === asignaturaId)
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
        asignatura: asignatura.materia,
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

  // Ordenar asignaturas alfabéticamente y aplicar filtros
  const asignaturasOrdenadas = [...data.asignaturas].sort((a, b) => a.materia.localeCompare(b.materia))
  const asignaturasFiltradas = filtrarAsignaturas(asignaturasOrdenadas)
  const valoresUnicos = getValoresUnicos(data.asignaturas)
  const seleccionFormateada = getSeleccionFormateada()

  return (
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

              {/* Filtros por modalidad de aprobación */}
              {valoresUnicos.modalidadesAprobacion.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-uba-primary mb-3">Modalidad de aprobación</h4>
                  <div className="space-y-2">
                    {valoresUnicos.modalidadesAprobacion.map((modalidad) => (
                      <div key={modalidad} className="flex items-center space-x-2">
                        <Checkbox
                          id={`modalidad-${modalidad}`}
                          checked={filtros.modalidadesAprobacion.includes(modalidad)}
                          onCheckedChange={() => toggleFiltro("modalidadesAprobacion", modalidad)}
                        />
                        <label htmlFor={`modalidad-${modalidad}`} className="text-sm text-gray-700 cursor-pointer">
                          {modalidad}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Filtros por orientación */}
              <div>
                <h4 className="text-sm font-medium text-uba-primary mb-3">Orientación</h4>
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
            </div>

            {/* Botón para limpiar filtros */}
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm text-gray-600 italic">
                Mostrando {asignaturasFiltradas.length} de {data.asignaturas.length} asignaturas
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
      <div className="space-y-6">
        {asignaturasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-uba-primary mb-2">No se encontraron asignaturas</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda.</p>
          </div>
        ) : (
          asignaturasFiltradas.map((asignatura) => {
            const isSelected = seleccion.asignaturas.includes(asignatura.id)
            return (
              <Card key={asignatura.id} className={`w-full transition-all duration-200 ${
                isSelected 
                  ? "border-uba-secondary border-2 shadow-lg bg-uba-secondary/5" 
                  : "border-uba-primary/20 hover:border-uba-primary/40"
              }`}>
                <CardHeader className={`pb-4 rounded-t-lg transition-all duration-200 ${
                  isSelected 
                    ? "bg-uba-secondary text-white" 
                    : "bg-uba-primary text-white"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getAsignaturaIcon(asignatura)}
                      <div>
                        <CardTitle className="text-xl">{asignatura.materia}</CardTitle>
                        <div className="text-sm text-white">
                          <span className="font-medium">Cátedra:</span> {asignatura.catedra}
                        </div>
                      </div>
                    </div>
                    <div className="mr-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleAsignatura(asignatura.id)}
                        className="border-white data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-uba-secondary"
                      />
                    </div>
                  </div>
                </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {/* Características de la asignatura */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs bg-uba-secondary/20 text-uba-primary">
                    {asignatura.modalidadCursada}
                  </Badge>
                  {/* Solo mostrar modalidad de aprobación si NO es "No corresponde" */}
                  {asignatura.modalidadAprobacion !== "NO CORRESPONDE" &&
                    asignatura.modalidadAprobacion !== "No corresponde" && (
                      <Badge variant="outline" className="text-xs border-uba-primary text-uba-primary">
                        {asignatura.modalidadAprobacion}
                      </Badge>
                    )}
                </div>

                {asignatura.aclaraciones && (
                  <div className="text-sm text-uba-primary bg-uba-secondary/10 p-3 rounded-lg">
                    <em>{asignatura.aclaraciones}</em>
                  </div>
                )}

                {/* Clases agrupadas por tipo */}
                <div className="space-y-3">
                  {agruparClasesPorTipo(asignatura.clases).map((grupo) => {
                    const requiereElegir = requiereSeleccion(asignatura, grupo.tipo, grupo.clases.length)

                    return (
                      <div key={grupo.tipo}>
                        {requiereElegir ? (
                          <RadioGroup
                            value={seleccion.clases[asignatura.id]?.[grupo.tipo] || ""}
                            onValueChange={(value) => seleccionarClase(asignatura.id, grupo.tipo, value)}
                          >
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                              {grupo.clases.map((clase) => {
                                const isClassSelected = seleccion.clases[asignatura.id]?.[grupo.tipo] === clase.id
                                return (
                                  <div key={clase.id} className={`border rounded-lg p-3 transition-all duration-200 ${
                                    isClassSelected 
                                      ? "border-uba-secondary bg-uba-secondary/10 shadow-md" 
                                      : "border-uba-primary/20 bg-gray-50 hover:border-uba-primary/40"
                                  }`}>
                                    <div className="flex justify-between items-start mb-2">
                                      <Badge variant="outline" className={`text-xs ${
                                        isClassSelected 
                                          ? "border-uba-secondary text-uba-secondary" 
                                          : "border-uba-primary/50 text-uba-primary"
                                      }`}>
                                        {clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero}`}
                                      </Badge>
                                      <div className="flex items-center">
                                        <RadioGroupItem
                                          value={clase.id}
                                          id={clase.id}
                                          className={`${
                                            isClassSelected 
                                              ? "data-[state=checked]:bg-uba-secondary data-[state=checked]:border-uba-secondary" 
                                              : "data-[state=checked]:bg-uba-primary data-[state=checked]:border-uba-primary"
                                          }`}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                                  <div className="text-sm text-gray-600 space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-uba-primary">{clase.dia}</span>
                                        <span>{clase.horario}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </RadioGroup>
                        ) : (
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {grupo.clases.map((clase, index) => (
                              <div key={clase.id} className={`border rounded-lg p-3 transition-all duration-200 ${
                                isSelected 
                                  ? "border-uba-secondary/30 bg-uba-secondary/10" 
                                  : "border-uba-primary/20 bg-gray-50"
                              }`}>
                                <div className="flex justify-between items-start mb-2">
                                  <Badge variant="outline" className={`text-xs ${
                                    isSelected 
                                      ? "border-uba-secondary/50 text-uba-secondary" 
                                      : "border-uba-primary/50 text-uba-primary"
                                  }`}>
                                    {grupo.clases.length > 1 && asignatura.agrupacionClases?.[grupo.tipo] === "conjunto"
                                      ? `${clase.tipo} ${index + 1}`
                                      : clase.numero === 0 ? clase.tipo : `${clase.tipo} ${clase.numero}`}
                                  </Badge>
                                  {grupo.clases.length > 1 && asignatura.agrupacionClases?.[grupo.tipo] === "conjunto" && (
                                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                      Complementario
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-uba-primary">{clase.dia}</span>
                                    <span>{clase.horario}</span>
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
                      <div className="text-red-600 text-sm italic mt-3 p-2 bg-red-50 rounded border border-red-200">
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
    </div>
  )
}
