"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"
import { toStartCase } from "@/lib/text-utils"
import { loadSampleData } from "@/lib/sample-data-loader"

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

interface CSVUploaderProps {
  onSuccess?: (message: string) => void
  onError?: (message: string) => void
}

export function CSVUploader({ onSuccess, onError }: CSVUploaderProps = {}) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)
  const [preview, setPreview] = useState<Asignatura[] | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setMessage(null)
      setPreview(null)
    }
  }

  const handleLoadSampleData = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const sampleData = await loadSampleData()

      const horariosData: HorariosData = {
        asignaturas: sampleData,
        periodo: {
          año: new Date().getFullYear().toString(),
          periodo: "1C"
        }
      }

      // Guardar en localStorage para desarrollo
      localStorage.setItem("horarios-antropologia", JSON.stringify(horariosData))

      setMessage({
        type: "success",
        content: `Datos de ejemplo cargados exitosamente en localStorage. ${sampleData.length} asignaturas disponibles para desarrollo.`
      })

      // Recargar la página para mostrar los nuevos datos
      setTimeout(() => {
        window.location.reload()
      }, 2000)

    } catch (error) {
      console.error("Error loading sample data:", error)
      setMessage({
        type: "error",
        content: "Error al cargar los datos de ejemplo. Por favor, intenta nuevamente."
      })
    } finally {
      setLoading(false)
    }
  }

  const procesarCSV = async () => {
    if (!file) {
      setMessage({ type: "error", content: "Por favor selecciona un archivo CSV" })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const text = await file.text()
      const lines = text.split(/\r?\n/).filter((line) => line.trim())

      if (lines.length < 2) {
        throw new Error("El archivo CSV debe tener al menos una fila de encabezados y una fila de datos")
      }

      function parseCSVLine(line: string): string[] {
        const result: string[] = []
        let current = ""
        let inQuotes = false

        for (let i = 0; i < line.length; i++) {
          const char = line[i]

          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"'
              i++ // Skip next quote
            } else {
              inQuotes = !inQuotes
            }
          } else if (char === "," && !inQuotes) {
            result.push(current.trim())
            current = ""
          } else {
            current += char
          }
        }

        result.push(current.trim())
        return result
      }

      const headers = parseCSVLine(lines[0])
      const data: Asignatura[] = []

      for (let i = 1; i < lines.length; i++) {
        const row = parseCSVLine(lines[i])
        console.log(`\nProcesando fila ${i}:`)

        if (row.length < headers.length) {
          console.log(`Fila ${i} saltada: datos incompletos`)
          continue
        }

        // Determinar tipo de asignatura y título
        const tipoAsignatura = row[headers.indexOf("Tipo de asignatura")] || ""
        console.log("Tipo de asignatura:", tipoAsignatura)

        let titulo = ""
        let catedra = ""
        let modalidadAprobacion = ""
        let modalidadCursada = ""
        let orientacion = ""

        // Determinar título según tipo - usar el nuevo formato de CSV
        if (tipoAsignatura === "Seminario regular") {
          titulo = row[headers.indexOf("Título del seminario")] || ""
          catedra = row[headers.indexOf("Cátedra del seminario")] || ""
          orientacion = row[headers.indexOf("Orientación del seminario")] || ""
          modalidadCursada = row[headers.indexOf("Modalidad de cursada del seminario")] || ""
          // Los seminarios regulares no tienen modalidad de aprobación específica en el CSV
          modalidadAprobacion = "Trabajo final"
        } else if (tipoAsignatura === "Seminario PST") {
          titulo = row[headers.indexOf("Título del seminario")] || ""
          catedra = row[headers.indexOf("Cátedra del seminario")] || ""
          orientacion = row[headers.indexOf("Orientación del seminario")] || ""
          modalidadCursada = row[headers.indexOf("Modalidad de cursada del seminario")] || ""
          // Los seminarios PST no tienen modalidad de aprobación específica en el CSV
          modalidadAprobacion = "Trabajo final"
        } else if (tipoAsignatura === "Materia o seminario anual") {
          titulo = row[headers.indexOf("Título de la asignatura anual")] || ""
          catedra = row[headers.indexOf("Cátedra de asignatura anual")] || ""
          modalidadCursada = row[headers.indexOf("Modalidad de cursada de la asignatura anual")] || ""
          // Las materias anuales no tienen modalidad de aprobación específica en el CSV
          modalidadAprobacion = "Trabajo final"
        } else if (tipoAsignatura === "Materia cuatrimestral regular") {
          titulo = row[headers.indexOf("Título de materia cuatrimestral")] || ""
          catedra = row[headers.indexOf("Cátedra de la materia")] || ""
          modalidadAprobacion = row[headers.indexOf("Modalidad de aprobación de la materia")] || ""
          modalidadCursada = row[headers.indexOf("Modalidad de cursada de la materia")] || ""
        } else if (tipoAsignatura === "Materia cuatrimestral optativa/electiva") {
          titulo = row[headers.indexOf("Título de materia optativa/electiva")] || ""
          catedra = row[headers.indexOf("Cátedra de la materia optativa/electiva")] || ""
          orientacion = row[headers.indexOf("Orientación (materia optativa/electiva)")] || ""
          modalidadAprobacion = row[headers.indexOf("Modalidad de aprobación (materia optativa/electiva)")] || ""
          modalidadCursada = row[headers.indexOf("Modalidad de cursada (materia optativa/electiva)")] || ""
        } else if (tipoAsignatura === "Materia cuatrimestral optativa (Exclusiva plan 1985)") {
          titulo = row[headers.indexOf("Título de materia optativa/electiva")] || "" // Intenta leer el título de la columna genérica de optativas
          catedra = row[headers.indexOf("Cátedra de la materia optativa/electiva")] || "" // Intenta leer la cátedra de la columna genérica de optativas
          orientacion = row[headers.indexOf("Orientación (materia optativa/electiva)")] || ""
          modalidadAprobacion = row[headers.indexOf("Modalidad de aprobación (materia optativa/electiva)")] || ""
          modalidadCursada = row[headers.indexOf("Modalidad de cursada (materia optativa/electiva)")] || ""
        }

        console.log("Modalidad de aprobación leída del CSV:", modalidadAprobacion)
        console.log("Tipo de asignatura:", tipoAsignatura)

        // Normalizar modalidad de aprobación
        if (!modalidadAprobacion || modalidadAprobacion.trim() === "") {
          // Solo asignar "Trabajo final" por defecto para seminarios
          if (tipoAsignatura === "Seminario regular" || tipoAsignatura === "Seminario PST" || tipoAsignatura === "Materia o seminario anual") {
            modalidadAprobacion = "Trabajo final"
          } else {
            // Para materias cuatrimestrales, usar "Examen final" por defecto si no se especifica
            modalidadAprobacion = "Examen final"
          }
        } else {
          // Normalizar texto para evitar inconsistencias
          const aprobacionLower = modalidadAprobacion.toLowerCase().trim()
          console.log("Procesando modalidad:", aprobacionLower)

          if (aprobacionLower.includes("promoción") || aprobacionLower.includes("promocion")) {
            modalidadAprobacion = "Promoción directa"
          } else if (aprobacionLower.includes("examen") || aprobacionLower.includes("exámen") || aprobacionLower === "examen final") {
            modalidadAprobacion = "Examen final"
          } else if (aprobacionLower.includes("trabajo") || aprobacionLower === "trabajo final") {
            modalidadAprobacion = "Trabajo final"
          } else {
            // Si no coincide con ningún patrón conocido, mantener el valor original normalizado
            modalidadAprobacion = "Examen final" // Por defecto para casos no reconocidos
          }
        }

        console.log("Modalidad de aprobación final asignada:", modalidadAprobacion)

        // Normalizar modalidad de cursada
        if (!modalidadCursada || modalidadCursada.trim() === "") {
          modalidadCursada = "Sede Puán"
        } else {
          // Normalizar texto para mantener las diferencias importantes
          const cursadaLower = modalidadCursada.toLowerCase().trim()
          if (cursadaLower.includes("30%") && cursadaLower.includes("virtual")) {
            modalidadCursada = "Presencial, con 30% de virtualidad asincrónica"
          } else if (cursadaLower.includes("virtual") && !cursadaLower.includes("30%")) {
            modalidadCursada = "Virtual"
          } else if (cursadaLower.includes("museo")) {
            modalidadCursada = "Sede Museo"
          } else if (cursadaLower.includes("tilcara")) {
            modalidadCursada = "Sede Tilcara"
          } else {
            modalidadCursada = "Sede Puán"
          }
        }

        console.log("Título determinado:", titulo)

        if (!titulo.trim()) {
          console.log(`Fila ${i} saltada: sin título de asignatura`)
          continue
        }

        // Procesar clases
        const clases: Clase[] = []
        let claseId = 1

        // Teóricos
        const teorico1Dia = row[headers.indexOf("Teórico 1 - Día")] || ""
        const teorico1Inicio = row[headers.indexOf("Teórico 1 - horario inicio")] || ""
        const teorico1Fin = row[headers.indexOf("Teórico 1 - horario finalización")] || ""

        console.log(`Procesando teóricos - Día: ${teorico1Dia}, Inicio: ${teorico1Inicio}, Fin: ${teorico1Fin}`)

        if (teorico1Dia && teorico1Inicio && teorico1Fin) {
          clases.push({
            id: `clase-${claseId++}`,
            tipo: "Teórico",
            numero: 1,
            dia: teorico1Dia,
            horario: `${teorico1Inicio} - ${teorico1Fin}`,
          })
          console.log(`Teórico 1 agregado: ${teorico1Dia} ${teorico1Inicio} - ${teorico1Fin}`)
        }

        // Teórico 2 (si existe)
        const teorico2Dia = row[headers.indexOf("Teórico 2 - Día")] || ""
        const teorico2Inicio = row[headers.indexOf("Teórico 2 - horario inicio")] || ""
        const teorico2Fin = row[headers.indexOf("Teórico 2 - horario finalización")] || ""

        if (teorico2Dia && teorico2Inicio && teorico2Fin) {
          clases.push({
            id: `clase-${claseId++}`,
            tipo: "Teórico",
            numero: 2,
            dia: teorico2Dia,
            horario: `${teorico2Inicio} - ${teorico2Fin}`,
          })
          console.log(`Teórico 2 agregado: ${teorico2Dia} ${teorico2Inicio} - ${teorico2Fin}`)
        }

        // Teórico-Prácticos
        const tp1Dia = row[headers.indexOf("Teórico-Práctico 1 - Día")] || ""
        const tp1Inicio = row[headers.indexOf("Teórico-Práctico 1 - horario inicio")] || ""
        const tp1Fin = row[headers.indexOf("Teórico-Práctico 1 - horario finalización")] || ""

        if (tp1Dia && tp1Inicio && tp1Fin) {
          clases.push({
            id: `clase-${claseId++}`,
            tipo: "Teórico-Práctico",
            numero: 1,
            dia: tp1Dia,
            horario: `${tp1Inicio} - ${tp1Fin}`,
          })
          console.log(`Teórico-Práctico 1 agregado: ${tp1Dia} ${tp1Inicio} - ${tp1Fin}`)
        }

        const tp2Dia = row[headers.indexOf("Teórico-Práctico 2 - Día")] || ""
        const tp2Inicio = row[headers.indexOf("Teórico-Práctico 2 - horario inicio")] || ""
        const tp2Fin = row[headers.indexOf("Teórico-Práctico 2 - horario finalización")] || ""

        if (tp2Dia && tp2Inicio && tp2Fin) {
          clases.push({
            id: `clase-${claseId++}`,
            tipo: "Teórico-Práctico",
            numero: 2,
            dia: tp2Dia,
            horario: `${tp2Inicio} - ${tp2Fin}`,
          })
          console.log(`Teórico-Práctico 2 agregado: ${tp2Dia} ${tp2Inicio} - ${tp2Fin}`)
        }

        // Prácticos (hasta 8 posibles)
        console.log("Procesando prácticos...")

        for (let p = 1; p <= 8; p++) {
          const practicoDia = row[headers.indexOf(`Práctico ${p} - Día`)] || ""
          const practicoInicio = row[headers.indexOf(`Práctico ${p} - horario inicio`)] || ""
          const practicoFin = row[headers.indexOf(`Práctico ${p} - horario finalización`)] || ""

          if (practicoDia && practicoInicio && practicoFin) {
            clases.push({
              id: `clase-${claseId++}`,
              tipo: "Práctico",
              numero: p,
              dia: practicoDia,
              horario: `${practicoInicio} - ${practicoFin}`,
            })
            console.log(`Práctico ${p} agregado: ${practicoDia} ${practicoInicio} - ${practicoFin}`)
          }
        }

        if (clases.length === 0) {
          console.log(`Fila ${i} saltada: sin clases válidas`)
          continue
        }

        // Determinar agrupaciones de clases leyendo desde el CSV
        const agrupacionClases: { [tipo: string]: "elegir" | "conjunto" } = {}

        // Leer valores específicos de agrupación desde las columnas exactas del CSV
        const agrupacionTeoricos = row[headers.indexOf("Indicar relación entre los dos horarios de teóricos")] || ""
        const agrupacionTeoricoPracticos = row[headers.indexOf("Indicar relación entre los dos horarios de teórico-prácticos")] || ""

        console.log("Agrupaciones leídas del CSV:")
        console.log("- Teóricos:", agrupacionTeoricos)
        console.log("- Teórico-Prácticos:", agrupacionTeoricoPracticos)

        // Obtener aclaraciones
        const aclaraciones = row[headers.indexOf("De ser necesario indicar aclaraciones (lugar de cursada, horario especial, modalidades particulares, etc.)")] || ""

        const asignatura: Asignatura = {
          id: `asignatura-${data.length + 1}`,
          materia: formatearTituloAsignatura(titulo, tipoAsignatura),
          catedra: catedra || "Sin especificar",
          tipoAsignatura: tipoAsignatura,
          modalidadAprobacion: modalidadAprobacion,
          modalidadCursada: modalidadCursada,
          orientacion: orientacion || undefined,
          aclaraciones: aclaraciones || undefined,
          clases: clases,
        }

        // Determinar agrupaciones de clases después de crear la asignatura
        const gruposClases = agruparClasesPorTipo(clases)
        gruposClases.forEach((grupo) => {
          if (grupo.clases.length > 1) {
            let agrupacionValue = ""

            if (grupo.tipo === "Teórico") {
              agrupacionValue = agrupacionTeoricos
            } else if (grupo.tipo === "Teórico-Práctico") {
              agrupacionValue = agrupacionTeoricoPracticos
            }

            // Determinar si es complementario o electivo basado en el valor del CSV
            const agrupacionLower = agrupacionValue.toLowerCase()

            if (agrupacionLower.includes("mismo teórico dividido") || 
                agrupacionLower.includes("conjunto") ||
                agrupacionLower.includes("complementario") ||
                agrupacionLower.includes("ambos") ||
                agrupacionLower.includes("los dos")) {
              agrupacionClases[grupo.tipo] = "conjunto"
              console.log(`${grupo.tipo} marcado como complementario (conjunto) - valor: "${agrupacionValue}"`)
            } else if (agrupacionLower.includes("alternativas") || 
                       agrupacionLower.includes("elegir") ||
                       agrupacionLower.includes("deben elegir") ||
                       agrupacionLower.includes("electivo") ||
                       agrupacionLower.includes("opción") ||
                       agrupacionLower.includes("opcional")) {
              agrupacionClases[grupo.tipo] = "elegir"
              console.log(`${grupo.tipo} marcado como electivo (elegir) - valor: "${agrupacionValue}"`)
            } else if (agrupacionValue.trim() !== "") {
              // Si hay información pero no coincide con los patrones conocidos, marcar como electivo por defecto
              agrupacionClases[grupo.tipo] = "elegir"
              console.log(`${grupo.tipo} con información no reconocida, marcado como electivo por defecto - valor: "${agrupacionValue}"`)
            }
            // Si no hay información específica, no establecer agrupación (comportamiento por defecto en la UI)
          }
        })

        if (Object.keys(agrupacionClases).length > 0) {
          asignatura.agrupacionClases = agrupacionClases
        }

        data.push(asignatura)
        console.log(`Asignatura creada: ${asignatura.materia}`)
      }

      if (data.length === 0) {
        throw new Error("No se pudieron procesar asignaturas del archivo CSV")
      }

      setPreview(data)
      setMessage({
        type: "success",
        content: `Archivo procesado exitosamente. ${data.length} asignaturas encontradas.`,
      })
    } catch (error) {
      console.error("Error procesando CSV:", error)
      setMessage({
        type: "error",
        content: `Error procesando el archivo: ${error instanceof Error ? error.message : "Error desconocido"}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const formatearTituloAsignatura = (titulo: string, tipoAsignatura: string): string => {
    // Aplicar toStartCase para capitalización adecuada (solo primera letra)
    let tituloFormateado = toStartCase(titulo)

    // Agregar prefijo según tipo de asignatura
    if (tipoAsignatura === "Seminario regular") {
      tituloFormateado = `Seminario: ${tituloFormateado}`
    } else if (tipoAsignatura === "Seminario PST") {
      tituloFormateado = `Seminario PST: ${tituloFormateado}`
    }

    return tituloFormateado
  }

  const guardarDatos = async () => {
    if (!preview) return

    const horariosData: HorariosData = {
      asignaturas: preview,
      periodo: {
        año: new Date().getFullYear().toString(),
        periodo: "1C",
      },
    }

    console.log('Attempting to save horarios data:', {
      asignaturas: horariosData.asignaturas.length,
      periodo: horariosData.periodo
    })

    try {
      // Enviar datos a la API con autenticación de admin
      const adminPassword = localStorage.getItem('admin-session') || ''
      const response = await fetch('/api/horarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(horariosData),
      })

      const responseData = await response.json()

      if (response.ok) {
        const successMessage = `Datos guardados exitosamente en Supabase. ${preview.length} asignaturas disponibles para todos los usuarios.`
        console.log('Save successful:', successMessage)

        setMessage({
          type: "success",
          content: successMessage,
        })
      } else {
        const errorDetail = responseData.error || 'Unknown error'
        console.error('Server error response:', errorDetail)
        throw new Error(errorDetail)
      }
    } catch (error) {
      console.error('Error saving horarios:', error)

      const errorMessage = error instanceof Error 
        ? `Error al guardar en Supabase: ${error.message}` 
        : `Error al guardar en Supabase. Por favor, intenta nuevamente.`

      setMessage({
        type: "error",
        content: errorMessage,
      })

      // Notificar al componente padre
      onError?.(errorMessage)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Cargar Horarios desde CSV
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input type="file" accept=".csv" onChange={handleFileChange} className="flex-1" />
            <Button onClick={procesarCSV} disabled={!file || loading} className="min-w-fit">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileSpreadsheet className="h-4 w-4 mr-2" />}
              Procesar CSV
            </Button>
          </div>

          {/* Botón para desarrollo - solo visible en localhost */}
          {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('replit')) && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Función de desarrollo:</p>
                <Badge variant="outline" className="text-xs">Solo desarrollo</Badge>
              </div>
              <Button 
                onClick={handleLoadSampleData} 
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileSpreadsheet className="h-4 w-4 mr-2" />}
                Cargar Datos de Ejemplo (localStorage)
              </Button>
            </div>
          )}



          {message && (
            <Alert className={message.type === "error" ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50"}>
              <div className="flex items-start gap-2">
                {message.type === "error" ? (
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                )}
                <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                  {message.content}
                </AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      {preview && (
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa de Datos - {preview.length} asignaturas procesadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {preview.map((asignatura, index) => (
                <div key={index} className="border rounded p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-sm text-blue-800">{asignatura.materia}</h4>
                    <Badge variant="outline" className="text-xs">
                      {asignatura.tipoAsignatura}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-xs">
                    <div>
                      <span className="font-medium text-gray-700">Cátedra:</span> 
                      <span className="text-gray-600 ml-1">{asignatura.catedra}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Modalidad Aprobación:</span> 
                      <span className="text-gray-600 ml-1">{asignatura.modalidadAprobacion}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Modalidad Cursada:</span> 
                      <span className="text-gray-600 ml-1">{asignatura.modalidadCursada}</span>
                    </div>
                    {asignatura.orientacion && (
                      <div>
                        <span className="font-medium text-gray-700">Orientación:</span> 
                        <span className="text-gray-600 ml-1">{asignatura.orientacion}</span>
                      </div>
                    )}
                  </div>

                  {asignatura.agrupacionClases && Object.keys(asignatura.agrupacionClases).length > 0 && (
                    <div className="mb-3 text-xs">
                      <span className="font-medium text-gray-700">Agrupaciones:</span>
                      <div className="ml-2 mt-1">
                        {Object.entries(asignatura.agrupacionClases).map(([tipo, agrupacion]) => (
                          <div key={tipo} className="text-gray-600">
                            • {tipo}: {agrupacion === "elegir" ? "Elegir una opción" : "Complementarios (ambos)"}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {asignatura.aclaraciones && (
                    <div className="mb-3 text-xs">
                      <span className="font-medium text-gray-700">Aclaraciones:</span>
                      <div className="text-gray-600 ml-1 mt-1 italic">{asignatura.aclaraciones}</div>
                    </div>
                  )}

                  <div className="border-t pt-2 mt-2">
                    <span className="font-medium text-gray-700 text-xs">Clases ({asignatura.clases.length}):</span>
                    <div className="mt-2 space-y-1">
                      {asignatura.clases.map((clase, claseIndex) => (
                        <div key={claseIndex} className="bg-white rounded p-2 text-xs border-l-2 border-blue-200">
                          <span className="font-medium text-blue-700">{clase.tipo} {clase.numero}</span>
                          <span className="text-gray-600 ml-2">• {clase.dia} {clase.horario}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button onClick={guardarDatos} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Guardar y Aplicar Datos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Helper function to group classes by type
function agruparClasesPorTipo(clases: Clase[]): { tipo: string; clases: Clase[] }[] {
  const grupos: { [tipo: string]: Clase[] } = {}

  clases.forEach((clase) => {
    if (!grupos[clase.tipo]) {
      grupos[clase.tipo] = []
    }
    grupos[clase.tipo].push(clase)
  })

  return Object.entries(grupos).map(([tipo, clases]) => ({ tipo, clases }))
}

// Helper function to check if two schedules overlap
function horariosSuperpuestos(horario1: string, horario2: string): boolean {
  const [inicio1, fin1] = horario1.split(" - ").map(h => parseInt(h))
  const [inicio2, fin2] = horario2.split(" - ").map(h => parseInt(h))

  return inicio1 < fin2 && inicio2 < fin1
}