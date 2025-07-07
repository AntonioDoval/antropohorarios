"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, BookOpen } from "lucide-react"
import { toStartCase } from "@/lib/text-utils"

interface MateriaDelPlan {
  cod85: string
  cod23: string
  nombre: string
  nombreCorto: string
  nombreSiglas: string
  ciclo: string
  electividad: string
  area: string
  correlatividad: string
}

interface PlanDeEstudios {
  año: string
  titulo: string
  orientacion: string
  materias: MateriaDelPlan[]
}

interface PlanConfig {
  id: string
  titulo: string
  año: string
  orientacion: string
  descripcion: string
  file: File | null
  loading: boolean
  message: { type: "success" | "error"; text: string } | null
  preview: PlanDeEstudios | null
}

export function PlanesUploader() {
  const [planes, setPlanes] = useState<PlanConfig[]>([
    {
      id: "plan-1985-lic-arqueo",
      titulo: "Plan 1985: Licenciatura - Orientación Arqueología",
      año: "1985",
      orientacion: "licenciatura-arqueologia",
      descripcion: "Plan específico para licenciatura en arqueología",
      file: null,
      loading: false,
      message: null,
      preview: null
    },
    {
      id: "plan-1985-lic-socio",
      titulo: "Plan 1985: Licenciatura - Orientación Sociocultural",
      año: "1985",
      orientacion: "licenciatura-sociocultural",
      descripcion: "Plan específico para licenciatura sociocultural",
      file: null,
      loading: false,
      message: null,
      preview: null
    },
        {
      id: "plan-1985-prof-arqueo",
      titulo: "Plan 1985: Profesorado - Orientación Arqueología",
      año: "1985",
      orientacion: "profesorado-arqueologia",
      descripcion: "Plan específico para profesorado en arqueología",
      file: null,
      loading: false,
      message: null,
      preview: null
    },
    {
      id: "plan-1985-prof-socio",
      titulo: "Plan 1985: Profesorado - Orientación Sociocultural",
      año: "1985",
      orientacion: "profesorado-sociocultural",
      descripcion: "Plan específico para profesorado sociocultural",
      file: null,
      loading: false,
      message: null,
      preview: null
    },
    {
      id: "plan-2023-prof",
      titulo: "Plan 2023: Profesorado",
      año: "2023",
      orientacion: "profesorado",
      descripcion: "Plan específico para profesorado",
      file: null,
      loading: false,
      message: null,
      preview: null
    },
    {
      id: "plan-2023-lic-arqueo",
      titulo: "Plan 2023: Licenciatura - Orientación Arqueología",
      año: "2023",
      orientacion: "licenciatura-arqueologia",
      descripcion: "Plan específico para licenciatura en arqueología",
      file: null,
      loading: false,
      message: null,
      preview: null
    },
    {
      id: "plan-2023-lic-socio",
      titulo: "Plan 2023: Licenciatura - Orientación Sociocultural",
      año: "2023",
      orientacion: "licenciatura-sociocultural",
      descripcion: "Plan específico para licenciatura sociocultural",
      file: null,
      loading: false,
      message: null,
      preview: null
    }
  ])

  const handleFileChange = (planId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    setPlanes(prevPlanes => 
      prevPlanes.map(plan => {
        if (plan.id === planId) {
          if (selectedFile && selectedFile.type === "text/csv") {
            return {
              ...plan,
              file: selectedFile,
              message: null
            }
          } else {
            return {
              ...plan,
              file: null,
              message: { type: "error", text: "Por favor selecciona un archivo CSV válido" }
            }
          }
        }
        return plan
      })
    )
  }

  const processCSV = async (planId: string) => {
    const plan = planes.find(p => p.id === planId)
    if (!plan?.file) return

    setPlanes(prevPlanes => 
      prevPlanes.map(p => 
        p.id === planId ? { ...p, loading: true, message: null } : p
      )
    )

    try {
      const text = await plan.file.text()
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length < 2) {
        throw new Error("El archivo CSV debe tener al menos una fila de encabezados y una fila de datos")
      }

      // Función para parsear una línea CSV correctamente
      const parseCSVLine = (line: string): string[] => {
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
      console.log("Headers encontrados:", headers)

      // Para plan 1985, usar headers diferentes
      const expectedHeaders = plan.año === "1985" 
        ? ["Cod85", "Cod23", "Nom85", "Nom85_corto", "Nom85_siglas", "Ciclo85", "Electividad85", "Area85", "Correlatividad85"]
        : ["Cod85", "Cod23", "Nom23", "Nom23_corto", "Nom23_siglas", "Ciclo23", "Electividad23", "Area23", "Correlatividad23"]

      const hasRequiredHeaders = expectedHeaders.every(header => headers.includes(header))

      if (!hasRequiredHeaders) {
        throw new Error(`El archivo CSV debe contener las columnas: ${expectedHeaders.join(", ")}`)
      }

      const materias: MateriaDelPlan[] = []

      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i])

        // Asegurar que tenemos suficientes columnas
        while (values.length < headers.length) {
          values.push("")
        }

        const row: Record<string, string> = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ""
        })

        const nombreField = plan.año === "1985" ? "Nom85" : "Nom23"
        const nombre = row[nombreField]?.trim()
        if (!nombre) {
          continue // Saltar filas sin nombre de materia
        }

        const nombreCortoField = plan.año === "1985" ? "Nom85_corto" : "Nom23_corto"
        const nombreSiglasField = plan.año === "1985" ? "Nom85_siglas" : "Nom23_siglas"
        const cicloField = plan.año === "1985" ? "Ciclo85" : "Ciclo23"
        const electividadField = plan.año === "1985" ? "Electividad85" : "Electividad23"
        const areaField = plan.año === "1985" ? "Area85" : "Area23"
        const correlatividadField = plan.año === "1985" ? "Correlatividad85" : "Correlatividad23"

        materias.push({
          cod85: row["Cod85"]?.trim() || "",
          cod23: row["Cod23"]?.trim() || "",
          nombre: toStartCase(nombre),
          nombreCorto: row[nombreCortoField]?.trim() || "",
          nombreSiglas: row[nombreSiglasField]?.trim() || "",
          ciclo: row[cicloField]?.trim() || "",
          electividad: row[electividadField]?.trim() || "",
          area: row[areaField]?.trim() || "",
          correlatividad: row[correlatividadField]?.trim() || "",
        })
      }

      if (materias.length === 0) {
        throw new Error("No se encontraron materias válidas en el archivo CSV")
      }

      // Determinar orientación para guardar
      let orientacionLabel = ""

      const orientacionMap: { [key: string]: string } = {
        "profesorado-sociocultural": "Profesorado - Orientación Sociocultural",
        "profesorado-arqueologia": "Profesorado - Orientación Arqueología", 
        "licenciatura-sociocultural": "Licenciatura en Antropología Sociocultural",
        "licenciatura-arqueologia": "Licenciatura en Arqueología",
        "profesorado": "Profesorado"
      }
      
      orientacionLabel = orientacionMap[plan.orientacion] || plan.orientacion

      const planProcesado: PlanDeEstudios = {
        año: plan.año,
        titulo: `Plan ${plan.año}`,
        orientacion: orientacionLabel,
        materias: materias,
      }

      setPlanes(prevPlanes => 
        prevPlanes.map(p => 
          p.id === planId ? {
            ...p,
            preview: planProcesado,
            message: {
              type: "success",
              text: `Se procesaron ${materias.length} materias para ${plan.titulo}. Revisa la vista previa y confirma para guardar.`,
            }
          } : p
        )
      )
    } catch (error) {
      console.error("Error procesando CSV:", error)
      setPlanes(prevPlanes => 
        prevPlanes.map(p => 
          p.id === planId ? {
            ...p,
            message: {
              type: "error",
              text: error instanceof Error ? error.message : "Error al procesar el archivo CSV",
            }
          } : p
        )
      )
    } finally {
      setPlanes(prevPlanes => 
        prevPlanes.map(p => 
          p.id === planId ? { ...p, loading: false } : p
        )
      )
    }
  }

  const saveData = (planId: string) => {
    const plan = planes.find(p => p.id === planId)
    if (!plan?.preview) return

    // Obtener datos existentes
    const existingData = localStorage.getItem("planes-estudios-antropologia")
    const planesActuales = existingData ? JSON.parse(existingData) : []

    // Buscar si ya existe un plan con la misma configuración
    const planExistenteIndex = planesActuales.findIndex(
      (existingPlan: PlanDeEstudios) => 
        existingPlan.año === plan.preview!.año && 
        existingPlan.orientacion === plan.preview!.orientacion
    )

    if (planExistenteIndex >= 0) {
      // Reemplazar plan existente
      planesActuales[planExistenteIndex] = plan.preview
    } else {
      // Agregar nuevo plan
      planesActuales.push(plan.preview)
    }

    localStorage.setItem("planes-estudios-antropologia", JSON.stringify(planesActuales))

    setPlanes(prevPlanes => 
      prevPlanes.map(p => 
        p.id === planId ? {
          ...p,
          message: {
            type: "success",
            text: "Plan de estudios guardado exitosamente.",
          },
          preview: null,
          file: null
        } : p
      )
    )
  }

  const clearAllData = () => {
    localStorage.removeItem("planes-estudios-antropologia")
    setPlanes(prevPlanes => 
      prevPlanes.map(p => ({
        ...p,
        message: {
          type: "success",
          text: "Todos los planes de estudios han sido eliminados.",
        },
        preview: null,
        file: null
      }))
    )
  }

  // Obtener planes guardados para mostrar en el resumen
  const planesGuardados = JSON.parse(localStorage.getItem("planes-estudios-antropologia") || "[]")

  return (
    <div className="space-y-6">
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-uba-primary">
            <BookOpen className="h-5 w-5" />
            Configuración del Plan de Estudios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {planes.map((plan) => (
              <Card key={plan.id} className="bg-white border border-gray-300">
                <CardHeader className="bg-uba-primary text-white">
                  <CardTitle className="text-sm font-medium">
                    {plan.titulo}
                  </CardTitle>
                  <p className="text-xs text-uba-secondary">
                    {plan.descripcion}
                  </p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileChange(plan.id, e)}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <Button
                      onClick={() => processCSV(plan.id)}
                      disabled={!plan.file || plan.loading}
                      className="bg-uba-primary hover:bg-uba-primary/90 text-white px-6"
                    >
                      {plan.loading ? "Procesando..." : "Cargar"}
                    </Button>
                    {plan.preview && (
                      <Button
                        onClick={() => saveData(plan.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6"
                      >
                        Confirmar
                      </Button>
                    )}
                  </div>

                  {plan.message && (
                    <Alert className={`mt-3 ${plan.message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
                      {plan.message.type === "error" ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <AlertDescription className={plan.message.type === "error" ? "text-red-800" : "text-green-800"}>
                        {plan.message.text}
                      </AlertDescription>
                    </Alert>
                  )}

                  {plan.preview && (
                    <div className="mt-4 p-3 bg-gray-50 rounded border">
                      <div className="text-sm font-medium text-uba-primary mb-2">
                        Vista previa: {plan.preview.materias.length} materias procesadas
                      </div>
                      <div className="max-h-32 overflow-y-auto text-xs text-gray-600">
                        {plan.preview.materias.slice(0, 5).map((materia, index) => (
                          <div key={index} className="mb-1">
                            {materia.nombre} ({materia.ciclo})
                          </div>
                        ))}
                        {plan.preview.materias.length > 5 && (
                          <div className="text-gray-500">... y {plan.preview.materias.length - 5} más</div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Button
              onClick={clearAllData}
              variant="destructive"
              className="w-full"
            >
              Limpiar Todos los Planes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de planes guardados */}
      {planesGuardados.length > 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-uba-primary">
              <FileText className="h-5 w-5" />
              Planes de Estudios Guardados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {planesGuardados.map((plan: PlanDeEstudios, index: number) => (
                <div key={index} className="border rounded p-3 bg-white text-sm">
                  <div className="font-medium text-uba-primary">{plan.titulo} - {plan.orientacion}</div>
                  <div className="text-gray-600 text-xs">
                    {plan.materias.length} materia{plan.materias.length !== 1 ? 's' : ''} registradas
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}