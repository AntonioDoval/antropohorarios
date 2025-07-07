"use client"

import type React from "react"

import { useState } from "react"
import { CSVUploader } from "@/components/csv-uploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated = useState(false)
  const [password, setPassword = useState("")
  const [error, setError = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "kulaypotlach") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Contraseña incorrecta")
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
    <div className="min-h-screen bg-white">
      {/* Header principal */}
      <header className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-4">
            {/* Columna izquierda vacía */}
            <div className="col-span-2"></div>

            {/* Columna central con contenido */}
            <div className="col-span-8 text-center relative">
              <h1 className="text-6xl font-bold text-uba-primary mb-4">Ciencias Antropológicas</h1>
              <div className="flex justify-end">
                <img
                  src="/images/uba-filo-header.png"
                  alt="UBA Filo - Facultad de Filosofía y Letras"
                  className="h-8"
                />
              </div>
            </div>

            {/* Columna derecha vacía */}
            <div className="col-span-2"></div>
          </div>
        </div>
      </header>

      {/* Barra de navegación */}
      <nav className="bg-uba-primary border-t-4 border-uba-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-3">
            <div className="flex gap-3">
              <Link href="/">
                <Button className="bg-uba-secondary text-white font-bold hover:bg-white hover:text-uba-secondary transition-colors duration-200">
                  Ver Horarios Públicos
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-uba-secondary text-white font-bold hover:bg-white hover:text-uba-secondary transition-colors duration-200"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="horarios" className="w-full">
          <TabsList className="grid w-full grid-cols-1 mb-6">
            <TabsTrigger value="horarios" className="text-lg font-medium">
              Actualizar Horarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="horarios">
            <CSVUploader />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}