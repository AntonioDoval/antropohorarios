
"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, BookOpen } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export function PlanesUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [preview, setPreview] = useState<PlanDeEstudios | null>(null)
  const [planConfig, setPlanConfig] = useState({
    año: "2023",
    orientacion: "",
  })

  const orientaciones = [
    { value: "profesorado", label: "Profesorado" },
    { value: "licenciatura-sociocultural", label: "Licenciatura en Antropología Sociocultural" },
    { value: "licenciatura-arqueologia", label: "Licenciatura en Arqueología" },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      setMessage(null)
    } else {
      setMessage({ type: "error", text: "Por favor selecciona un archivo CSV válido" })
    }
  }

  const processCSV = async () => {
    if (!file || !planConfig.orientacion) {
      setMessage({ type: "error", text: "Por favor selecciona un archivo y una orientación" })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const text = await file.text()
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

      // Verificar que tenemos las columnas esperadas
      const expectedHeaders = ["Cod85", "Cod23", "Nom23", "Nom23_corto", "Nom23_siglas", "Ciclo23", "Electividad23", "Area23", "Correlatividad23"]
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

        const nombre = row["Nom23"]?.trim()
        if (!nombre) {
          continue // Saltar filas sin nombre de materia
        }

        materias.push({
          cod85: row["Cod85"]?.trim() || "",
          cod23: row["Cod23"]?.trim() || "",
          nombre: toStartCase(nombre),
          nombreCorto: row["Nom23_corto"]?.trim() || "",
          nombreSiglas: row["Nom23_siglas"]?.trim() || "",
          ciclo: row["Ciclo23"]?.trim() || "",
          electividad: row["Electividad23"]?.trim() || "",
          area: row["Area23"]?.trim() || "",
          correlatividad: row["Correlatividad23"]?.trim() || "",
        })
      }

      if (materias.length === 0) {
        throw new Error("No se encontraron materias válidas en el archivo CSV")
      }

      const orientacionLabel = orientaciones.find(o => o.value === planConfig.orientacion)?.label || planConfig.orientacion

      const planProcesado: PlanDeEstudios = {
        año: planConfig.año,
        titulo: `Plan ${planConfig.año}`,
        orientacion: orientacionLabel,
        materias: materias,
      }

      setPreview(planProcesado)
      setMessage({
        type: "success",
        text: `Se procesaron ${materias.length} materias para ${orientacionLabel}. Revisa la vista previa y confirma para guardar.`,
      })
    } catch (error) {
      console.error("Error procesando CSV:", error)
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error al procesar el archivo CSV",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveData = () => {
    if (!preview) return

    // Obtener datos existentes
    const existingData = localStorage.getItem("planes-estudios-antropologia")
    const planesActuales = existingData ? JSON.parse(existingData) : []

    // Buscar si ya existe un plan con la misma configuración
    const planExistenteIndex = planesActuales.findIndex(
      (plan: PlanDeEstudios) => plan.año === preview.año && plan.orientacion === preview.orientacion
    )

    if (planExistenteIndex >= 0) {
      // Reemplazar plan existente
      planesActuales[planExistenteIndex] = preview
    } else {
      // Agregar nuevo plan
      planesActuales.push(preview)
    }

    localStorage.setItem("planes-estudios-antropologia", JSON.stringify(planesActuales))
    setMessage({
      type: "success",
      text: "Plan de estudios guardado exitosamente.",
    })
    setPreview(null)
    setFile(null)
  }

  const clearAllData = () => {
    localStorage.removeItem("planes-estudios-antropologia")
    setMessage({
      type: "success",
      text: "Todos los planes de estudios han sido eliminados.",
    })
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="año-plan" className="text-uba-primary">
                Año del Plan
              </Label>
              <Select
                value={planConfig.año}
                onValueChange={(value) => setPlanConfig((prev) => ({ ...prev, año: value }))}
              >
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue placeholder="Seleccionar año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="1985">1985</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="orientacion" className="text-uba-primary">
                Título/Orientación
              </Label>
              <Select
                value={planConfig.orientacion}
                onValueChange={(value) => setPlanConfig((prev) => ({ ...prev, orientacion: value }))}
              >
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue placeholder="Seleccionar orientación" />
                </SelectTrigger>
                <SelectContent>
                  {orientaciones.map((orientacion) => (
                    <SelectItem key={orientacion.value} value={orientacion.value}>
                      {orientacion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-uba-primary">
            <Upload className="h-5 w-5" />
            Cargar Archivo CSV del Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="csv-plan" className="text-uba-primary">
              Seleccionar archivo CSV
            </Label>
            <Input id="csv-plan" type="file" accept=".csv" onChange={handleFileChange} className="mt-1 bg-white" />
            <p className="text-sm text-gray-600 mt-1">
              El archivo debe incluir columnas: Cod85, Cod23, Nom23, Nom23_corto, Nom23_siglas, Ciclo23, Electividad23, Area23, Correlatividad23
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={processCSV}
              disabled={!file || !planConfig.orientacion || loading}
              className="w-full bg-uba-primary hover:bg-uba-primary/90"
            >
              {loading ? "Procesando..." : "Procesar CSV"}
            </Button>
            
            <Button
              onClick={clearAllData}
              variant="destructive"
              className="w-full"
            >
              Limpiar Todos los Planes
            </Button>
          </div>

          {message && (
            <Alert className={message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}
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

      {/* Vista previa */}
      {preview && (
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-uba-primary">
              <FileText className="h-5 w-5" />
              Vista Previa del Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Botón confirmar arriba */}
            <div className="mb-6">
              <Button onClick={saveData} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg">
                ✓ Confirmar y Guardar Plan de Estudios
              </Button>
            </div>

            {/* Resumen */}
            <div className="bg-white p-4 rounded-lg border mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-uba-primary">
                  {preview.titulo} - {preview.orientacion}
                </div>
                <div className="text-lg text-gray-600 mt-1">
                  {preview.materias.length} materias procesadas
                </div>
              </div>
            </div>

            {/* Lista de materias */}
            <div className="max-h-80 overflow-y-auto mb-6">
              <div className="grid gap-2">
                {preview.materias.map((materia, index) => (
                  <div key={index} className="border rounded p-3 bg-white text-sm">
                    <div className="font-medium text-uba-primary">{materia.nombre}</div>
                    <div className="text-gray-600 text-xs grid grid-cols-2 gap-2 mt-1">
                      <span>Código 2023: {materia.cod23}</span>
                      <span>Código 1985: {materia.cod85}</span>
                      <span>Ciclo: {materia.ciclo}</span>
                      <span>Área: {materia.area || "No especificada"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón confirmar abajo */}
            <Button onClick={saveData} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg">
              ✓ Confirmar y Guardar Plan de Estudios
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
