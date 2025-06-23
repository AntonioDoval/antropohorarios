"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toStartCase } from "@/lib/text-utils"

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
  agrupacionClases?: { [tipo: string]: "elegir" | "conjunto" } // Agregar esta línea
  aclaraciones?: string
  clases: Clase[]
}

interface PeriodoInfo {
  año: string
  periodo: string
}

export function CSVUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [preview, setPreview] = useState<Asignatura[]>([])
  const [periodoInfo, setPeriodoInfo] = useState<PeriodoInfo>({
    año: new Date().getFullYear().toString(),
    periodo: "1C",
  })

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
    if (!file) return

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

        // Obtener título de las columnas D, G, J, N (ignorar las vacías)
        const tituloSeminario = row["Título del seminario"]?.trim() || ""
        const tituloAnual = row["Título de la asignatura anual"]?.trim() || ""
        const tituloCuatrimestral = row["Título de materia cuatrimestral"]?.trim() || ""
        const tituloOptativa = row["Título de materia optativa/electiva"]?.trim() || ""

        let titulo = tituloSeminario || tituloAnual || tituloCuatrimestral || tituloOptativa || ""

        // Agregar prefijo para seminarios
        if (tipoAsignatura === "Seminario regular" && titulo) {
          titulo = "Seminario: " + titulo
        } else if (tipoAsignatura === "Seminario PST" && titulo) {
          titulo = "Seminario PST: " + titulo
        }

        console.log("Título determinado:", titulo)

        if (!titulo) {
          console.log(`Fila ${i} saltada: sin título de asignatura`)
          continue
        }

        // Obtener cátedra de las columnas E, H, K, O (ignorar las vacías)
        const catedraSeminario = row["Cátedra del seminario"]?.trim() || ""
        const catedraAnual = row["Cátedra de asignatura anual"]?.trim() || ""
        const catedraCuatrimestral = row["Cátedra de la materia"]?.trim() || ""
        const catedraOptativa = row["Cátedra de la materia optativa/electiva"]?.trim() || ""

        const catedra = catedraSeminario || catedraAnual || catedraCuatrimestral || catedraOptativa || ""

        console.log("Cátedra:", catedra)

        // Obtener modalidad de cursada de las columnas F, I, M, Q
        const modalidadCursadaSeminario = row["Modalidad de cursada del seminario"]?.trim() || ""
        const modalidadCursadaAnual = row["Modalidad de cursada de la asignatura anual"]?.trim() || ""
        const modalidadCursadaCuatrimestral = row["Modalidad de cursada de la materia"]?.trim() || ""
        const modalidadCursadaOptativa = row["Modalidad de cursada (materia optativa/electiva)"]?.trim() || ""

        const modalidadCursada =
          modalidadCursadaSeminario ||
          modalidadCursadaAnual ||
          modalidadCursadaCuatrimestral ||
          modalidadCursadaOptativa ||
          ""

        console.log("Modalidad de cursada:", modalidadCursada)

        // Obtener modalidad de aprobación de las columnas L, P
        const modalidadAprobacionCuatrimestral = row["Modalidad de aprobación de la materia"]?.trim() || ""
        const modalidadAprobacionOptativa = row["Modalidad de aprobación (materia optativa/electiva)"]?.trim() || ""

        // Lista de asignaturas anuales específicas
        const asignaturasAnuales = [
          "didáctica especial y prácticas de la enseñanza",
          "seminario de investigación en antropologia sociocultural",
          "seminario de investigacion en arqueologia",
          "metodología e investigación antropológica",
          "metodología y técnicas de la investigación arqueológica",
        ]

        let modalidadAprobacion = ""

        // Verificar si es una asignatura anual específica (comparación insensible a mayúsculas)
        const esAsignaturaAnual = asignaturasAnuales.some((asigAnual) =>
          titulo.toLowerCase().includes(asigAnual.toLowerCase()),
        )

        // Asignar modalidad de aprobación
        if (esAsignaturaAnual || tipoAsignatura === "Seminario regular" || tipoAsignatura === "Seminario PST") {
          modalidadAprobacion = "NO CORRESPONDE"
        } else {
          // Para otros tipos, usar el valor del CSV
          modalidadAprobacion = modalidadAprobacionCuatrimestral || modalidadAprobacionOptativa || "No especificado"
        }

        console.log("Modalidad de aprobación:", modalidadAprobacion)

        const clases: Clase[] = []

        // Procesar Teóricos (hasta 2)
        for (let num = 1; num <= 2; num++) {
          const diaKey = `Teórico ${num} - Día`
          const inicioKey = `Teórico ${num} - horario inicio`
          const finKey = `Teórico ${num} - horario finalización`

          const dia = row[diaKey]?.trim()
          const inicio = row[inicioKey]?.trim()
          const fin = row[finKey]?.trim()

          if (dia && inicio && fin && dia !== "" && inicio !== "" && fin !== "") {
            const inicioNum = Number.parseInt(inicio)
            const finNum = Number.parseInt(fin)

            if (!isNaN(inicioNum) && !isNaN(finNum)) {
              const horario = `${inicioNum.toString().padStart(2, "0")}:00 - ${finNum.toString().padStart(2, "0")}:00`

              clases.push({
                id: `teorico-${num}-${Date.now()}-${Math.random()}`,
                tipo: "Teórico",
                numero: num,
                dia: dia,
                horario: horario,
              })
            }
          }
        }

        // Procesar Teórico-Prácticos (hasta 2)
        for (let num = 1; num <= 2; num++) {
          const diaKey = `Teórico-Práctico ${num} - Día`
          const inicioKey = `Teórico-Práctico ${num} - horario inicio`
          const finKey = `Teórico-Práctico ${num} - horario finalización`

          const dia = row[diaKey]?.trim()
          const inicio = row[inicioKey]?.trim()
          const fin = row[finKey]?.trim()

          if (dia && inicio && fin && dia !== "" && inicio !== "" && fin !== "") {
            const inicioNum = Number.parseInt(inicio)
            const finNum = Number.parseInt(fin)

            if (!isNaN(inicioNum) && !isNaN(finNum)) {
              const horario = `${inicioNum.toString().padStart(2, "0")}:00 - ${finNum.toString().padStart(2, "0")}:00`

              clases.push({
                id: `teorico-practico-${num}-${Date.now()}-${Math.random()}`,
                tipo: "Teórico-Práctico",
                numero: num,
                dia: dia,
                horario: horario,
              })
            }
          }
        }

        // Procesar Prácticos (hasta 8)
        for (let num = 1; num <= 8; num++) {
          const diaKey = `Práctico ${num} - Día`
          const inicioKey = `Práctico ${num} - horario inicio`
          const finKey = `Práctico ${num} - horario finalización`

          const dia = row[diaKey]?.trim()
          const inicio = row[inicioKey]?.trim()
          const fin = row[finKey]?.trim()

          if (dia && inicio && fin && dia !== "" && inicio !== "" && fin !== "") {
            const inicioNum = Number.parseInt(inicio)
            const finNum = Number.parseInt(fin)

            if (!isNaN(inicioNum) && !isNaN(finNum)) {
              const horario = `${inicioNum.toString().padStart(2, "0")}:00 - ${finNum.toString().padStart(2, "0")}:00`

              clases.push({
                id: `practico-${num}-${Date.now()}-${Math.random()}`,
                tipo: "Práctico",
                numero: num,
                dia: dia,
                horario: horario,
              })
            }
          }
        }

        // Leer información de relación entre clases de las columnas V y AE
        const relacionTeoricos = row["Indicar relación entre los dos horarios de teóricos"]?.trim() || ""
        const relacionTeoricoPracticos = row["Indicar relación entre los dos horarios de teórico-prácticos"]?.trim() || ""

        console.log("Relación entre teóricos:", relacionTeoricos)
        console.log("Relación entre teórico-prácticos:", relacionTeoricoPracticos)

        // Determinar si las clases deben agruparse
        const agrupacionClases: { [tipo: string]: "elegir" | "conjunto" } = {}

        // Para teóricos: analizar la relación
        if (relacionTeoricos && clases.filter(c => c.tipo === "Teórico").length > 1) {
          const relacionTeoricosLower = relacionTeoricos.toLowerCase()
          if (
            relacionTeoricosLower.includes("mismo") || 
            relacionTeoricosLower.includes("dividido") ||
            relacionTeoricosLower.includes("conjunto") ||
            relacionTeoricosLower.includes("complementario") ||
            relacionTeoricosLower.includes("se dicta en dos horarios") ||
            relacionTeoricosLower.includes("son complementarios")
          ) {
            agrupacionClases["Teórico"] = "conjunto"
            console.log("Teóricos marcados como conjunto")
          } else if (
            relacionTeoricosLower.includes("elegir") ||
            relacionTeoricosLower.includes("opción") ||
            relacionTeoricosLower.includes("alternativa") ||
            relacionTeoricosLower.includes("deben elegir") ||
            relacionTeoricosLower.includes("estudiantes deben elegir")
          ) {
            agrupacionClases["Teórico"] = "elegir"
            console.log("Teóricos marcados como elegir")
          }
        }

        // Para teórico-prácticos: analizar la relación
        if (relacionTeoricoPracticos && clases.filter(c => c.tipo === "Teórico-Práctico").length > 1) {
          const relacionTeoricoPracticosLower = relacionTeoricoPracticos.toLowerCase()
          if (
            relacionTeoricoPracticosLower.includes("mismo") ||
            relacionTeoricoPracticosLower.includes("dividido") ||
            relacionTeoricoPracticosLower.includes("conjunto") ||
            relacionTeoricoPracticosLower.includes("complementario") ||
            relacionTeoricoPracticosLower.includes("se dicta en dos horarios") ||
            relacionTeoricoPracticosLower.includes("son complementarios")
          ) {
            agrupacionClases["Teórico-Práctico"] = "conjunto"
            console.log("Teórico-prácticos marcados como conjunto")
          } else if (
            relacionTeoricoPracticosLower.includes("elegir") ||
            relacionTeoricoPracticosLower.includes("opción") ||
            relacionTeoricoPracticosLower.includes("alternativa") ||
            relacionTeoricoPracticosLower.includes("deben elegir") ||
            relacionTeoricoPracticosLower.includes("estudiantes deben elegir")
          ) {
            agrupacionClases["Teórico-Práctico"] = "elegir"
            console.log("Teórico-prácticos marcados como elegir")
          }
        }

        console.log(`Clases encontradas: ${clases.length}`)
        console.log("Agrupación de clases:", agrupacionClases)

        // Ajustar numeración para tipos con una sola clase
        const tiposClase = ["Teórico", "Teórico-Práctico", "Práctico"]
        tiposClase.forEach((tipo) => {
          const clasesDelTipo = clases.filter((c) => c.tipo === tipo)
          if (clasesDelTipo.length === 1) {
            clasesDelTipo[0].numero = 0 // No mostrar número si hay solo una clase
          }
        })

        // Agregar la asignatura (cada fila es una asignatura)
        data.push({
          id: `asignatura-${i}-${Date.now()}`,
          materia: toStartCase(titulo),
          catedra: toStartCase(catedra || "Sin especificar"),
          tipoAsignatura: tipoAsignatura || "No especificado",
          modalidadAprobacion: modalidadAprobacion || "No especificado",
          modalidadCursada: modalidadCursada || "No especificado",
          agrupacionClases: agrupacionClases, // Agregar esta nueva propiedad
          aclaraciones:
            row[
              "De ser necesario indicar aclaraciones (lugar de cursada, horario especial, modalidades particulares, etc.)"
            ]?.trim() || "",
          clases: clases,
        })

        console.log(`Asignatura agregada: "${titulo}" - Cátedra: "${catedra}"`)
      }

      console.log(`\nTotal de asignaturas procesadas: ${data.length}`)

      if (data.length === 0) {
        throw new Error(
          "No se encontraron asignaturas válidas en el archivo CSV. Verifica que las columnas tengan datos.",
        )
      }

      setPreview(data)
      setMessage({
        type: "success",
        text: `Se procesaron ${data.length} asignaturas con ${data.reduce((total, asig) => total + asig.clases.length, 0)} clases en total. Revisa la vista previa y confirma para guardar.`,
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
    const dataToSave = {
      asignaturas: preview,
      periodo: periodoInfo,
    }
    localStorage.setItem("horarios-antropologia", JSON.stringify(dataToSave))
    setMessage({
      type: "success",
      text: "Horarios guardados exitosamente. Los cambios ya están disponibles en el sitio público.",
    })
    setPreview([])
    setFile(null)
  }

  const clearData = () => {
    localStorage.removeItem("horarios-antropologia")
    setMessage({
      type: "success",
      text: "Datos actuales limpiados exitosamente.",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-uba-primary">
            <Calendar className="h-5 w-5" />
            Configuración del Período
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="año" className="text-uba-primary">
                Año
              </Label>
              <Input
                id="año"
                type="number"
                value={periodoInfo.año}
                onChange={(e) => setPeriodoInfo((prev) => ({ ...prev, año: e.target.value }))}
                min="2020"
                max="2030"
                className="mt-1 bg-white"
              />
            </div>
            <div>
              <Label htmlFor="periodo" className="text-uba-primary">
                Período
              </Label>
              <Select
                value={periodoInfo.periodo}
                onValueChange={(value) => setPeriodoInfo((prev) => ({ ...prev, periodo: value }))}
              >
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1C">Primer Cuatrimestre</SelectItem>
                  <SelectItem value="2C">Segundo Cuatrimestre</SelectItem>
                  <SelectItem value="BV">Bimestre de Verano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-lg font-bold bg-uba-secondary text-uba-primary p-4 rounded-lg">
            <strong>Período actual:</strong> {periodoInfo.periodo} {periodoInfo.año}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-uba-primary">
            <Upload className="h-5 w-5" />
            Cargar Archivo CSV
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="csv-file" className="text-uba-primary">
              Seleccionar archivo CSV
            </Label>
            <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} className="mt-1 bg-white" />
            <p className="text-sm text-gray-600 mt-1">
              El archivo debe incluir columnas: materia, codigo, dia, horario, aula, profesor, cuatrimestre
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={processCSV}
              disabled={!file || loading}
              className="w-full bg-uba-primary hover:bg-uba-primary/90"
            >
              {loading ? "Procesando..." : "Procesar CSV"}
            </Button>

            <Button
              onClick={clearData}
              variant="destructive"
              className="w-full"
            >
              Limpiar Datos Actuales
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

      {preview.length > 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-uba-primary">
              <FileText className="h-5 w-5" />
              Vista Previa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Botón confirmar arriba */}
            <div className="mb-6">
              <Button onClick={saveData} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg">
                ✓ Confirmar y Guardar Horarios
              </Button>
            </div>

            {/* Resumen simplificado */}
            <div className="bg-white p-4 rounded-lg border mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-uba-primary">
                  {preview.length} asignaturas procesadas
                </div>
                <div className="text-lg text-gray-600 mt-1">
                  {preview.reduce((total, asig) => total + asig.clases.length, 0)} clases en total
                </div>
              </div>
            </div>

            {/* Lista completa de asignaturas */}
            <div className="max-h-80 overflow-y-auto mb-6">
              <div className="grid gap-2">
                {preview.map((asignatura, index) => (
                  <div key={index} className="border rounded p-3 bg-white text-sm">
                    <div className="font-medium text-uba-primary">{asignatura.materia}</div>
                    <div className="text-gray-600 text-xs">
                      Cátedra: {asignatura.catedra} | {asignatura.clases.length} clase{asignatura.clases.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón confirmar abajo */}
            <Button onClick={saveData} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg">
              ✓ Confirmar y Guardar Horarios
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}