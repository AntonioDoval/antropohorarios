
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, FileQuestion } from "lucide-react"
import { PageLayout } from "@/components/layout/page-layout"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [planesEstudiosHabilitado, setPlanesEstudiosHabilitado] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("planes-estudios-habilitado")
    setPlanesEstudiosHabilitado(stored !== "false")
  }, [])

  return (
    <PageLayout showPlanesEstudio={planesEstudiosHabilitado}>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Card className="border-uba-primary/20 shadow-lg">
            <CardHeader className="bg-uba-primary text-white rounded-t-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FileQuestion className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">
                Página no encontrada
              </CardTitle>
              <p className="text-lg text-uba-secondary mt-2">
                Error 404
              </p>
            </CardHeader>
            
            <CardContent className="pt-8 pb-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-uba-primary mb-3">
                    ¡Ups! No pudimos encontrar lo que buscás
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    La página que estás intentando acceder no existe o fue movida. 
                    Puede que hayas ingresado una URL incorrecta o que el enlace esté desactualizado.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                  <Button asChild className="bg-uba-primary hover:bg-uba-primary/90 w-full sm:w-auto">
                    <Link href="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Ir al inicio
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => window.history.back()}
                    className="border-uba-primary text-uba-primary hover:bg-uba-primary/10 w-full sm:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver atrás
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-uba-primary mb-4">
                    Páginas útiles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link 
                      href="/" 
                      className="p-4 border rounded-lg hover:bg-uba-primary/5 hover:border-uba-primary/30 transition-colors"
                    >
                      <div className="font-medium text-uba-primary">Horarios de materias</div>
                      <div className="text-sm text-gray-600">Ver todos los horarios disponibles</div>
                    </Link>
                    
                    {planesEstudiosHabilitado && (
                      <Link 
                        href="/planes-estudio" 
                        className="p-4 border rounded-lg hover:bg-uba-primary/5 hover:border-uba-primary/30 transition-colors"
                      >
                        <div className="font-medium text-uba-primary">Planes de estudio</div>
                        <div className="text-sm text-gray-600">Consultar planes académicos</div>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Si el problema persiste, contactá al soporte técnico de la facultad.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageLayout>
  )
}
