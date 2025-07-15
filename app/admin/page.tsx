"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CSVUploader } from "@/components/csv-uploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lock, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { PageLayout } from "@/components/layout/page-layout"

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

  useEffect(() => {
    const stored = localStorage.getItem("planes-estudios-habilitado")
    setPlanesEstudiosHabilitado(stored !== "false")
    
    // Cargar período actual
    const horariosData = localStorage.getItem("horarios-antropologia")
    if (horariosData) {
      try {
        const data = JSON.parse(horariosData)
        if (data.periodo) {
          setAño(data.periodo.año || "")
          setCuatrimestre(data.periodo.periodo || "")
        }
      } catch (error) {
        console.error("Error loading period data:", error)
      }
    }
  }, [])

  const handleTogglePlanesEstudios = (enabled: boolean) => {
    setPlanesEstudiosHabilitado(enabled)
    localStorage.setItem("planes-estudios-habilitado", enabled.toString())
    // Limpiar mensajes de otros componentes
    setPeriodoMessage(null)
    setCsvMessage(null)
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
      // Obtener datos actuales
      const horariosData = localStorage.getItem("horarios-antropologia")
      let data = { asignaturas: [], periodo: { año, periodo: cuatrimestre } }
      
      if (horariosData) {
        const existingData = JSON.parse(horariosData)
        data.asignaturas = existingData.asignaturas || []
      }
      
      data.periodo = { año, periodo: cuatrimestre }

      // Guardar en localStorage
      localStorage.setItem("horarios-antropologia", JSON.stringify(data))

      // Guardar en API
      const response = await fetch('/api/horarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setPeriodoMessage({
          type: "success",
          content: `Período académico actualizado a ${año} - ${cuatrimestre}`
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
  }

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sección de Período Académico */}
        <Card>
          <CardHeader>
            <CardTitle>Configurar Período Académico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="año" className="text-uba-primary">
                  Año
                </Label>
                <Input
                  id="año"
                  type="number"
                  value={año}
                  onChange={(e) => setAño(e.target.value)}
                  placeholder="2024"
                  className="mt-1 border-uba-primary/30 focus:border-uba-primary"
                  min="2020"
                  max="2030"
                />
              </div>
              <div>
                <Label htmlFor="cuatrimestre" className="text-uba-primary">
                  Período
                </Label>
                <Select value={cuatrimestre} onValueChange={setCuatrimestre}>
                  <SelectTrigger className="mt-1 border-uba-primary/30 focus:border-uba-primary">
                    <SelectValue placeholder="Seleccionar cuatrimestre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1C">1C (Primer Cuatrimestre)</SelectItem>
                    <SelectItem value="2C">2C (Segundo Cuatrimestre)</SelectItem>
                    <SelectItem value="BV">BV (Bimestre de verano)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleUpdatePeriodo}
              className="w-full bg-uba-primary hover:bg-uba-primary/90"
            >
              Actualizar Período Académico
            </Button>

            {periodoMessage && (
              <Alert className={`${
                periodoMessage.type === "success" 
                  ? "border-green-200 bg-green-50" 
                  : "border-red-200 bg-red-50"
              }`}>
                {periodoMessage.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={
                  periodoMessage.type === "success" ? "text-green-800" : "text-red-800"
                }>
                  {periodoMessage.content}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Sección de Actualizar Horarios */}
        <div className="space-y-4">
          <CSVUploader onSuccess={(message) => {
            setCsvMessage({ type: "success", content: message })
            setPeriodoMessage(null)
            setPlanesMessage(null)
          }} onError={(message) => {
            setCsvMessage({ type: "error", content: message })
            setPeriodoMessage(null)
            setPlanesMessage(null)
          }} />
          
          {csvMessage && (
            <Alert className={`${
              csvMessage.type === "success" 
                ? "border-green-200 bg-green-50" 
                : "border-red-200 bg-red-50"
            }`}>
              {csvMessage.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={
                csvMessage.type === "success" ? "text-green-800" : "text-red-800"
              }>
                {csvMessage.content}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Sección de Limpiar Datos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">Limpiar Datos de Horarios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <p className="text-sm text-red-800 mb-4">
                <strong>⚠️ Atención:</strong> Esta acción eliminará todos los horarios guardados tanto del servidor como del almacenamiento local. 
                Esta acción no se puede deshacer.
              </p>
              
              <Button 
                onClick={async () => {
                  if (confirm("¿Estás seguro de que quieres eliminar todos los datos de horarios? Esta acción no se puede deshacer.")) {
                    try {
                      // Intentar limpiar del servidor
                      await fetch('/api/horarios', {
                        method: 'DELETE'
                      })
                      
                      // Limpiar localStorage
                      localStorage.removeItem("horarios-antropologia")
                      
                      setCsvMessage({
                        type: "success",
                        content: "Todos los datos de horarios han sido eliminados exitosamente."
                      })
                      setPeriodoMessage(null)
                      setPlanesMessage(null)
                      
                      // Recargar después de 2 segundos
                      setTimeout(() => {
                        window.location.reload()
                      }, 2000)
                    } catch (error) {
                      console.error("Error limpiando datos:", error)
                      setCsvMessage({
                        type: "error", 
                        content: "Error al limpiar datos del servidor, pero se limpiaron los datos locales."
                      })
                      setPeriodoMessage(null)
                      setPlanesMessage(null)
                    }
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                🗑️ Eliminar Todos los Horarios
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sección de Planes de Estudios */}
        <Card>
          <CardHeader>
            <CardTitle>Habilitar/Deshabilitar sección Planes de Estudios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${!planesEstudiosHabilitado ? 'text-red-600' : 'text-gray-500'}`}>
                  Deshabilitado
                </span>
                <Switch
                  checked={planesEstudiosHabilitado}
                  onCheckedChange={handleTogglePlanesEstudios}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
                <span className={`text-sm font-medium ${planesEstudiosHabilitado ? 'text-green-600' : 'text-gray-500'}`}>
                  Habilitado
                </span>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                setPlanesMessage({
                  type: "success",
                  content: planesEstudiosHabilitado ? "Sección de Planes de Estudio habilitada." : "Sección de Planes de Estudio deshabilitada."
                });
                // Limpiar mensajes de otros componentes
                setPeriodoMessage(null);
                setCsvMessage(null);
              }} 
              className="w-full bg-uba-primary hover:bg-uba-primary/90"
            >
              Aplicar Configuración
            </Button>

            {planesMessage && (
              <Alert className={`${
                planesMessage.type === "success" 
                  ? "border-green-200 bg-green-50" 
                  : "border-red-200 bg-red-50"
              }`}>
                {planesMessage.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={
                  planesMessage.type === "success" ? "text-green-800" : "text-red-800"
                }>
                  {planesMessage.content}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </main>
    </PageLayout>
  )
}