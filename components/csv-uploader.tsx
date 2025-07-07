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

export function CSVUploader() {
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

      // Guardar datos de ejemplo en localStorage
      const horariosData: HorariosData = {
        asignaturas: sampleData,
        periodo: {
          año: new Date().getFullYear().toString(),
          periodo: "1C"
        }
      }

      localStorage.setItem("horarios-antropologia", JSON.stringify(horariosData))

      setMessage({
        type: "success",
        content: `Datos de ejemplo cargados exitosamente. ${sampleData.length} asignaturas disponibles.`
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

      console.log(`Procesando ${lines.length - 1} filas de datos`)
      console.log("Headers encontrados:", headers)

      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i])

        // Asegurar que tenemos suficientes columnas para procesar
        while (values.length < headers.length) {
          values.push("")
        }

        const row: Record<string, string> = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ""
        })

        console.log(`\nProcesando fila ${i}:`)

        // Obtener tipo de asignatura (columna C)
        const tipoAsignatura = row["Tipo de asignatura"]?.trim() || ""
        console.log("Tipo de asignatura:", tipoAsignatura)

        // Obtener título según el tipo de asignatura
        const tituloSeminario = row["Título del seminario"]?.trim() || ""
        const tituloAnual = row["Título de la asignatura anual"]?.trim() || ""
        const tituloCuatrimestral = row["Título de materia cuatrimestral"]?.trim() || ""
        const tituloOptativa = row["Título de materia optativa/electiva"]?.trim() || ""

        let titulo = ""

        // Determinar título según tipo de asignatura
        if (tipoAsignatura === "Seminario regular" && tituloSeminario) {
          titulo = tituloSeminario
        } else if (tipoAsignatura === "Materia o seminario anual" && tituloAnual) {
          titulo = tituloAnual
        } else if (tipoAsignatura === "Materia cuatrimestral regular" && tituloCuatrimestral) {
          titulo = tituloCuatrimestral
        } else if (tipoAsignatura === "Materia cuatrimestral optativa/electiva" && tituloOptativa) {
          titulo = tituloOptativa
        }

        console.log("Título determinado:", titulo)

        if (!titulo) {
          console.log(`Fila ${i} saltada: sin título de asignatura`)
          continue
        }

        // Obtener cátedra
        const catedra = row["Cátedra"]?.trim() || "No especificada"

        // Obtener modalidades
        const modalidadAprobacion = row["Modalidad de aprobación"]?.trim() || "No especificado"
        const modalidadCursada = row["Modalidad de cursada"]?.trim() || "Presencial"

        // Obtener orientación
        const orientacionAsignatura = row["Orientación de la asignatura"]?.trim() || undefined

        // Obtener aclaraciones
        const aclaraciones = row["De ser necesario indicar aclaraciones (lugar de cursada, horario especial, modalidades particulares, etc.)"]?.trim() || undefined

        // Procesar clases y agrupaciones
        const clases: Clase[] = []
        const agrupacionClases: { [tipo: string]: "elegir" | "conjunto" } = {}

        const tiposClase = ["Teórico", "Teórico-Práctico", "Práctico"]

        tiposClase.forEach((tipoClase) => {
          // Obtener días y horarios para este tipo de clase
          const diasKey = `Día/s de ${tipoClase.toLowerCase()}`
          const horariosKey = `Horarios de ${tipoClase.toLowerCase()}`
          const agrupacionKey = `Agrupación ${tipoClase.toLowerCase()}`

          const dias = row[diasKey]?.trim()
          const horarios = row[horariosKey]?.trim()
          const agrupacion = row[agrupacionKey]?.trim()

          if (dias && horarios) {
            console.log(`${tipoClase} - Días: ${dias}, Horarios: ${horarios}, Agrupación: ${agrupacion}`)

            // Dividir por punto y coma para múltiples clases
            const listaDias = dias.split(";").map((d) => d.trim()).filter(Boolean)
            const listaHorarios = horarios.split(";").map((h) => h.trim()).filter(Boolean)

            // Asegurar que tengamos la misma cantidad de días y horarios
            const cantidadClases = Math.min(listaDias.length, listaHorarios.length)

            if (cantidadClases > 0) {
              // Configurar agrupación
              if (agrupacion && agrupacion.toLowerCase().includes("conjunto")) {
                agrupacionClases[tipoClase] = "conjunto"
              } else if (cantidadClases > 1) {
                agrupacionClases[tipoClase] = "elegir"
              }

              // Crear clases
              for (let j = 0; j < cantidadClases; j++) {
                const claseId = `${data.length + 1}-${tipoClase.toLowerCase().replace("-", "")}-${j + 1}`
                clases.push({
                  id: claseId,
                  tipo: tipoClase,
                  numero: cantidadClases > 1 ? j + 1 : 0,
                  dia: listaDias[j] || listaDias[0],
                  horario: listaHorarios[j] || listaHorarios[0],
                })
              }
            }
          }
        })

        if (clases.length === 0) {
          console.log(`Fila ${i} saltada: sin clases válidas`)
          continue
        }

        // Aplicar formato de título personalizado
        const tituloFormateado = formatearTituloAsignatura(titulo, tipoAsignatura)

        const asignatura: Asignatura = {
          id: (data.length + 1).toString(),
          materia: tituloFormateado,
          catedra: catedra,
          tipoAsignatura: tipoAsignatura,
          modalidadAprobacion: modalidadAprobacion || "No especificado",
          modalidadCursada: modalidadCursada || "No especificado",
          orientacion: orientacionAsignatura || undefined,
          agrupacionClases: agrupacionClases,
          aclaraciones: aclaraciones || undefined,
          clases: clases,
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
    // Aplicar toStartCase para capitalización adecuada
    let tituloFormateado = toStartCase(titulo)

    // Agregar prefijo según tipo de asignatura
    if (tipoAsignatura === "Seminario regular") {
      tituloFormateado = `Seminario: ${tituloFormateado}`
    } else if (tipoAsignatura === "Seminario PST") {
      tituloFormateado = `Seminario PST: ${tituloFormateado}`
    }

    return tituloFormateado
  }

  const guardarDatos = () => {
    if (!preview) return

    const horariosData: HorariosData = {
      asignaturas: preview,
      periodo: {
        año: new Date().getFullYear().toString(),
        periodo: "1C",
      },
    }

    localStorage.setItem("horarios-antropologia", JSON.stringify(horariosData))

    setMessage({
      type: "success",
      content: "Datos guardados exitosamente. Recarga la página para ver los horarios.",
    })

    // Recargar la página después de 2 segundos
    setTimeout(() => {
      window.location.reload()
    }, 2000)
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

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-3">
              ¿No tienes un archivo CSV? Puedes cargar datos de ejemplo:
            </p>
            <Button 
              onClick={handleLoadSampleData} 
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Cargar Datos de Ejemplo
            </Button>
          </div>

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
            <CardTitle>Vista Previa de Datos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {preview.slice(0, 5).map((asignatura, index) => (
                <div key={index} className="border rounded p-3 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm">{asignatura.materia}</h4>
                    <Badge variant="outline" className="text-xs">
                      {asignatura.tipoAsignatura}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Cátedra: {asignatura.catedra}</p>
                  <p className="text-xs text-gray-600">Clases: {asignatura.clases.length}</p>
                </div>
              ))}
              {preview.length > 5 && (
                <p className="text-sm text-gray-500 text-center">
                  ... y {preview.length - 5} asignaturas más
                </p>
              )}
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