"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import type React from "react"

import { CSVUploader } from "@/components/csv-uploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lock, AlertCircle, CheckCircle, Download } from "lucide-react"
import jsPDF from 'jspdf'
import Link from "next/link"
import { PageLayout } from "@/components/layout/page-layout"
import { AnnouncementEditModal } from "@/components/admin-announcement-modal"

// Importar ReactQuill dinámicamente para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [planesEstudiosHabilitado, setPlanesEstudiosHabilitado] = useState(true)
  const [año, setAño] = useState("")
  const [cuatrimestre, setCuatrimestre] = useState("")
  const [periodoMessage, setPeriodoMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)
  const [planesMessage, setPlanesMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)
  const [csvMessage, setCsvMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)
  const [announcementEnabled, setAnnouncementEnabled] = useState(false)
  const [announcementTitle, setAnnouncementTitle] = useState("")
  const [announcementText, setAnnouncementText] = useState("")
  const [announcementMessage, setAnnouncementMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("planes-estudios-habilitado")
    setPlanesEstudiosHabilitado(stored !== "false")

    // Cargar período actual desde la API
    const fetchPeriodo = async () => {
      try {
        const response = await fetch('/api/horarios')
        const data = await response.json()
        if (data.periodo) {
          setAño(data.periodo.año || "")
          setCuatrimestre(data.periodo.periodo || "")
        }
      } catch (error) {
        console.error("Error loading period data:", error)
      }
    }

    // Cargar anuncio actual
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch('/api/announcement')
        const data = await response.json()
        setAnnouncementEnabled(data.enabled || false)
        setAnnouncementTitle(data.title || "")
        setAnnouncementText(data.text || "")
      } catch (error) {
        console.error("Error loading announcement data:", error)
      }
    }

    fetchPeriodo()
    fetchAnnouncement()
  }, [])

  const handleTogglePlanesEstudios = (enabled: boolean) => {
    setPlanesEstudiosHabilitado(enabled)
    localStorage.setItem("planes-estudios-habilitado", enabled.toString())
    // Limpiar mensajes de otros componentes
    setPeriodoMessage(null)
    setCsvMessage(null)
  }

  const handleUpdateAnnouncement = async () => {
    try {
      const adminPassword = localStorage.getItem('admin-session') || ''

      if (!adminPassword) {
        setAnnouncementMessage({
          type: "error",
          content: "Sesión de administrador no válida"
        })
        return
      }

      console.log('Sending announcement update:', { enabled: announcementEnabled, title: announcementTitle?.substring(0, 50), text: announcementText?.substring(0, 50) })

      const response = await fetch('/api/announcement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify({
          enabled: announcementEnabled,
          title: announcementTitle,
          text: announcementText
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Announcement updated successfully:', result)
        setAnnouncementMessage({
          type: "success",
          content: "Anuncio actualizado exitosamente"
        })
        setPeriodoMessage(null)
        setCsvMessage(null)
        setPlanesMessage(null)
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.error || `Error HTTP ${response.status}`
        console.error('Server error:', errorData)
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error("Error updating announcement:", error)
      setAnnouncementMessage({
        type: "error",
        content: `Error al actualizar el anuncio: ${error instanceof Error ? error.message : 'Error desconocido'}`
      })
      setPeriodoMessage(null)
      setCsvMessage(null)
      setPlanesMessage(null)
    }
  }

  const handleUpdatePeriodo = async () => {
    if (!año || !cuatrimestre) {
      setPeriodoMessage({
        type: "error",
        content: "Por favor, selecciona tanto el año como el cuatrimestre"
      })
      return
    }

    // Limpiar mensajes de otros componentes
    setPlanesMessage(null)
    setCsvMessage(null)

    try {
      // Obtener datos actuales de la API
      const currentResponse = await fetch('/api/horarios')
      const currentData = await currentResponse.json()

      const data = {
        asignaturas: currentData.asignaturas || [],
        periodo: { año, periodo: cuatrimestre }
      }

      // Guardar en API con autenticación de admin
      const adminPassword = localStorage.getItem('admin-session') || ''
      const response = await fetch('/api/horarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setPeriodoMessage({
          type: "success",
          content: `Período académico actualizado a ${año} - ${cuatrimestre} en Supabase`
        })
      } else {
        throw new Error('Error saving period data to server')
      }

    } catch (error) {
      console.error("Error updating period:", error)
      setPeriodoMessage({
        type: "error",
        content: "Error al actualizar el período. Por favor, intenta nuevamente."
      })
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setError("")
        // Guardar la contraseña en localStorage para futuras solicitudes
        localStorage.setItem('admin-session', password)
      } else {
        setError("Contraseña incorrecta")
        setPassword("")
      }
    } catch (error) {
      setError("Error al verificar la contraseña")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
    setError("")
    localStorage.removeItem('admin-session')
  }

  const generatePDF = async () => {
    try {
      // Obtener datos actuales
      const response = await fetch('/api/horarios')
      const horariosData = await response.json()

      if (!horariosData || !horariosData.asignaturas || horariosData.asignaturas.length === 0) {
        setPeriodoMessage({
          type: "error",
          content: "No hay datos de horarios para generar el PDF"
        })
        return
      }

      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.width
      const pageHeight = pdf.internal.pageSize.height
      const margin = 20
      let currentY = 30

      // Set Bitter font for the entire document
      pdf.setFont('times', 'normal') // Using Times as fallback since Bitter isn't available in jsPDF by default

      // Header del PDF
      pdf.setFontSize(22)
      pdf.setTextColor(28, 37, 84) // UBA Primary color
      pdf.text('Oferta de Asignaturas y Horarios', pageWidth / 2, currentY, { align: 'center' })

      currentY += 12
      pdf.setFontSize(16)
      pdf.setTextColor(70, 191, 176) // UBA Secondary color
      pdf.text('Ciencias Antropológicas (FFyL-UBA)', pageWidth / 2, currentY, { align: 'center' })

      currentY += 8
      pdf.setFontSize(14)
      pdf.setTextColor(100, 100, 100)
      pdf.text('---', pageWidth / 2, currentY, { align: 'center' })

      currentY += 10
      const periodoText = horariosData.periodo?.periodo === "1C" ? "1er Cuatrimestre" : 
                          horariosData.periodo?.periodo === "2C" ? "2do Cuatrimestre" : 
                          horariosData.periodo?.periodo === "BV" ? "Bimestre de Verano" : 
                          horariosData.periodo?.periodo || ''
      pdf.text(`Período actual: ${periodoText} ${horariosData.periodo?.año || ''}`, pageWidth / 2, currentY, { align: 'center' })

      currentY += 20

      // Línea separadora
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin, currentY, pageWidth - margin, currentY)
      currentY += 15

      // Función auxiliar para obtener nombre por plan
      const obtenerNombrePorPlan = (nombreOriginal: string, planCodigo: string) => {
        // Aquí puedes implementar la lógica de equivalencias si tienes los datos
        // Por ahora devolvemos el nombre original
        return nombreOriginal
      }

      // Organizar asignaturas por planes
      const planes = [
        { codigo: "1985", nombre: "Plan de estudios 1985" },
        { codigo: "2023", nombre: "Plan de estudios 2023" }
      ]

      for (const plan of planes) {
        // Verificar si necesitamos nueva página
        if (currentY > pageHeight - 40) {
          pdf.addPage()
          currentY = 30
        }

        // Título del plan
        pdf.setFontSize(18)
        pdf.setTextColor(28, 37, 84)
        pdf.text(plan.nombre, margin, currentY)
        currentY += 15

        // Filtrar asignaturas relevantes para este plan
        const asignaturasDelPlan = horariosData.asignaturas.filter((asignatura: any) => {
          if (plan.codigo === "2023") {
            return asignatura.tipoAsignatura !== "Materia cuatrimestral optativa (Exclusiva plan 1985)"
          }
          return true // Plan 1985 incluye todas las asignaturas
        })

        // Ordenar alfabéticamente
        asignaturasDelPlan.sort((a: any, b: any) => a.materia.localeCompare(b.materia))

        for (const asignatura of asignaturasDelPlan) {
          // Verificar si necesitamos nueva página
          const espacioNecesario = 25 + (asignatura.clases?.length || 0) * 6
          if (currentY + espacioNecesario > pageHeight - 20) {
            pdf.addPage()
            currentY = 30

            // Repetir título del plan en nueva página
            pdf.setFontSize(18)
            pdf.setTextColor(28, 37, 84)
            pdf.text(`${plan.nombre} (continuación)`, margin, currentY)
            currentY += 15
          }

          // Nombre de la materia
          pdf.setFontSize(12)
          pdf.setTextColor(0, 0, 0)
          const nombreMateria = obtenerNombrePorPlan(asignatura.materia, plan.codigo)
          const maxWidth = pageWidth - 2 * margin
          const nombreLines = pdf.splitTextToSize(nombreMateria, maxWidth)

          pdf.text(nombreLines, margin, currentY)
          currentY += nombreLines.length * 6

          // Cátedra
          pdf.setFontSize(10)
          pdf.setTextColor(100, 100, 100)
          pdf.text(`Cátedra: ${asignatura.catedra}`, margin + 5, currentY)
          currentY += 6

          // Modalidades
          const modalidadTexto = `${asignatura.modalidadAprobacion || 'N/A'} | ${asignatura.modalidadCursada || 'N/A'}`
          pdf.text(`Modalidad: ${modalidadTexto}`, margin + 5, currentY)
          currentY += 6

          // Clases
          if (asignatura.clases && asignatura.clases.length > 0) {
            pdf.text('Horarios:', margin + 5, currentY)
            currentY += 5

            asignatura.clases.forEach((clase: any) => {
              const claseTexto = `${clase.tipo}${clase.numero ? ' ' + clase.numero : ''}: ${clase.dia} ${clase.horario} hs`
              pdf.text(`  • ${claseTexto}`, margin + 10, currentY)
              currentY += 5
            })
          }

          // Aclaraciones si existen
          if (asignatura.aclaraciones) {
            pdf.setTextColor(150, 150, 150)
            pdf.text(`Nota: ${asignatura.aclaraciones}`, margin + 5, currentY)
            currentY += 6
            pdf.setTextColor(100, 100, 100)
          }

          currentY += 8 // Espacio entre asignaturas
        }

        currentY += 15 // Espacio entre planes
      }

      // Footer en todas las páginas
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(150, 150, 150)
        pdf.text('Generado desde el Sistema de Horarios de Antropología - FFyL UBA', margin, pageHeight - 15)
        pdf.text(new Date().toLocaleString('es-AR'), pageWidth - margin, pageHeight - 15, { align: 'right' })
        pdf.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
      }

      // Descargar PDF
      const fileName = `horarios-antropologia-${horariosData.periodo?.año || 'actual'}-${horariosData.periodo?.periodo || ''}.pdf`
      pdf.save(fileName)

      setPeriodoMessage({
        type: "success",
        content: "PDF generado exitosamente"
      })
      setCsvMessage(null)
      setPlanesMessage(null)

    } catch (error) {
      console.error("Error generando PDF:", error)
      setPeriodoMessage({
        type: "error",
        content: "Error al generar el PDF. Por favor, intenta nuevamente."
      })
      setCsvMessage(null)
      setPlanesMessage(null)
    }
  }

  // Definir módulos y formatos de ReactQuill
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults and custom
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background',
    'align'
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md border-uba-primary/20">
          <CardHeader className="text-center bg-uba-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" />
              Acceso Administrativo
            </CardTitle>
            <p className="text-sm text-uba-secondary">Ingresa la contraseña para continuar</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-uba-primary">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  className="mt-1 border-uba-primary/30 focus:border-uba-primary"
                  required
                />
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-uba-primary hover:bg-uba-primary/90">
                Ingresar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-uba-secondary hover:text-uba-primary">
                ← Volver a horarios públicos
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <PageLayout showPlanesEstudio={false} showAdminButtons={true} onLogout={handleLogout}>
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Combined Messages Display */}
        {(periodoMessage || csvMessage || planesMessage || announcementMessage) && (
          <Alert className={`${
            (periodoMessage?.type || csvMessage?.type || planesMessage?.type || announcementMessage?.type) === "success" 
              ? "border-green-200 bg-green-50" 
              : "border-red-200 bg-red-50"
          }`}>
            {(periodoMessage?.type || csvMessage?.type || planesMessage?.type || announcementMessage?.type) === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={
              (periodoMessage?.type || csvMessage?.type || planesMessage?.type || announcementMessage?.type) === "success" ? "text-green-800" : "text-red-800"
            }>
              {periodoMessage?.content || csvMessage?.content || planesMessage?.content || announcementMessage?.content}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Grid Layout */}
        <div className="grid gap-6">
          {/* Announcement Management */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm text-slate-700 mb-3">Gestión de Anuncios</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={announcementEnabled}
                    onCheckedChange={(checked) => {
                      setAnnouncementEnabled(checked)
                      setAnnouncementMessage(null)
                      setPeriodoMessage(null)
                      setCsvMessage(null)
                      setPlanesMessage(null)
                    }}
                  />
                  <Label className="text-sm">Habilitar anuncio</Label>
                </div>
                <div>
                  <Label htmlFor="announcement-title" className="text-xs text-slate-600">Título</Label>
                  <Input
                    id="announcement-title"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    placeholder="Título del anuncio"
                    className="h-8 text-sm mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="announcement-text" className="text-xs text-slate-600">Contenido</Label>
                  <div className="mt-1 border border-gray-300 rounded-md">
                    <ReactQuill
                      value={announcementText}
                      onChange={setAnnouncementText}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Contenido del anuncio..."
                      theme="snow"
                      style={{ 
                        minHeight: '120px',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleUpdateAnnouncement}
                  size="sm"
                  className="w-full h-8 bg-uba-secondary hover:bg-uba-secondary/90 text-white"
                >
                  Guardar Anuncio
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Period & PDF Controls - Compact Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-slate-700 mb-3">Período Académico</h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Input
                    type="number"
                    value={año}
                    onChange={(e) => setAño(e.target.value)}
                    placeholder="2024"
                    className="h-8 text-sm"
                    min="2020"
                    max="2030"
                  />
                  <Select value={cuatrimestre} onValueChange={setCuatrimestre}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1C">1C</SelectItem>
                      <SelectItem value="2C">2C</SelectItem>
                      <SelectItem value="BV">BV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleUpdatePeriodo}
                  size="sm"
                  className="w-full h-8 bg-uba-primary hover:bg-uba-primary/90"
                >
                  Actualizar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-slate-700 mb-3">Generar PDF</h3>
                <p className="text-xs text-slate-600 mb-3">
                  Descarga PDF con horarios organizados por planes de estudio
                </p>
                <Button 
                  onClick={generatePDF}
                  size="sm"
                  className="w-full h-8 bg-uba-secondary hover:bg-uba-secondary/90 text-white"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Descargar PDF
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CSV Upload Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <CSVUploader onSuccess={(message) => {
                setCsvMessage({ type: "success", content: message })
                setPeriodoMessage(null)
                setPlanesMessage(null)
              }} onError={(message) => {
                setCsvMessage({ type: "error", content: message })
                setPeriodoMessage(null)
                setPlanesMessage(null)
              }} />
            </CardContent>
          </Card>

          {/* Development & Danger Zone - Collapsible */}
          <div className="space-y-4">
            {/* Test Connection - Dev Only */}
            {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('replit')) && (
              <Card className="border-blue-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-blue-700">Test Supabase</h3>
                      <p className="text-xs text-blue-600">Verificar conexión con base de datos</p>
                    </div>
                    <Button 
                      onClick={async () => {
                        try {
                          console.log('Testing Supabase connection...')
                          const response = await fetch('/api/horarios')
                          const data = await response.json()

                          if (response.ok) {
                            setCsvMessage({
                              type: "success",
                              content: `Conexión exitosa. ${data.asignaturas?.length || 0} asignaturas`
                            })
                          } else {
                            throw new Error('Error en la respuesta del servidor')
                          }

                          setPeriodoMessage(null)
                          setPlanesMessage(null)
                        } catch (error) {
                          console.error("Error testing Supabase connection:", error)
                          setCsvMessage({
                            type: "error", 
                            content: "Error al conectar con Supabase"
                          })
                          setPeriodoMessage(null)
                          setPlanesMessage(null)
                        }
                      }}
                      size="sm"
                      variant="outline"
                      className="h-8 text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      🔗 Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Danger Zone */}
            <Card className="border-red-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-red-700">Limpiar datos cargados</h3>
                    <p className="text-xs text-red-600">Peligro: esta acción es irreversible</p>
                  </div>
                  <Button 
                    onClick={async () => {
                      if (confirm("¿Eliminar TODOS los datos? Esta acción no se puede deshacer.")) {
                        try {
                          const adminPassword = localStorage.getItem('admin-session') || ''
                          const response = await fetch('/api/horarios', {
                            method: 'DELETE',
                            headers: {
                              'x-admin-password': adminPassword,
                            }
                          })

                          if (response.ok) {
                            setCsvMessage({
                              type: "success",
                              content: "Datos eliminados exitosamente"
                            })
                          } else {
                            throw new Error('Error deleting data')
                          }

                          setPeriodoMessage(null)
                          setPlanesMessage(null)
                        } catch (error) {
                          console.error("Error limpiando datos:", error)
                          setCsvMessage({
                            type: "error", 
                            content: "Error al eliminar datos"
                          })
                          setPeriodoMessage(null)
                          setPlanesMessage(null)
                        }
                      }
                    }}
                    size="sm"
                    variant="destructive"
                    className="h-8"
                  >
                    Limpiar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </PageLayout>
  )
}