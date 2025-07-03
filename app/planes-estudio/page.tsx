
"use client"

import { useState, useEffect } from "react"
import { initializeDefaultData } from "@/lib/default-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, GraduationCap, Users, FileText } from "lucide-react"
import { Footer } from "@/components/footer"
import { getPlanesDeEstudios, getAsignaturasPorCiclo, type PlanDeEstudios, type MateriaDelPlan } from "@/lib/planes-utils"

export default function PlanesEstudioPage() {
  const [selectedPlan, setSelectedPlan] = useState("2023")
  const [selectedCarrera, setSelectedCarrera] = useState("licenciatura")
  const [selectedOrientacion, setSelectedOrientacion] = useState("arqueologia")
  const [planesData, setPlanesData] = useState<PlanDeEstudios[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeDefaultData()
    const planes = getPlanesDeEstudios()
    setPlanesData(planes)
    setLoading(false)
  }, [])

  // Obtener el plan actual basado en la selección
  const getCurrentPlan = (): PlanDeEstudios | null => {
    let orientacionBuscada = ""

    if (selectedCarrera === "profesorado") {
      if (selectedPlan === "1985") {
        // Para profesorado 1985, incluir orientación
        orientacionBuscada = selectedOrientacion === "arqueologia" 
          ? "Profesorado - Orientación Arqueología"
          : "Profesorado - Orientación Sociocultural"
      } else {
        // Para profesorado 2023, sin orientación específica
        orientacionBuscada = "Profesorado"
      }
    } else if (selectedCarrera === "licenciatura") {
      orientacionBuscada = selectedOrientacion === "arqueologia" 
        ? "Licenciatura en Arqueología"
        : "Licenciatura en Antropología Sociocultural"
    }

    return planesData.find(plan => 
      plan.año === selectedPlan && 
      plan.orientacion === orientacionBuscada
    ) || null
  }

  // Agrupar materias por ciclo
  const getMateriasPorCiclo = (materias: MateriaDelPlan[]) => {
    const grupos: { [ciclo: string]: MateriaDelPlan[] } = {}
    
    materias.forEach(materia => {
      const ciclo = materia.ciclo || "Sin especificar"
      if (!grupos[ciclo]) {
        grupos[ciclo] = []
      }
      grupos[ciclo].push(materia)
    })

    return grupos
  }

  // Agrupar materias por área
  const getMateriasPorArea = (materias: MateriaDelPlan[]) => {
    const grupos: { [area: string]: MateriaDelPlan[] } = {}
    
    materias.forEach(materia => {
      const area = materia.area || "General"
      if (!grupos[area]) {
        grupos[area] = []
      }
      grupos[area].push(materia)
    })

    return grupos
  }

  const planActual = getCurrentPlan()
  const materiasPorCiclo = planActual ? getMateriasPorCiclo(planActual.materias) : {}
  const materiasPorArea = planActual ? getMateriasPorArea(planActual.materias) : {}

  // Obtener título completo del plan
  const getTituloCompleto = () => {
    if (selectedCarrera === "profesorado") {
      if (selectedPlan === "1985") {
        return selectedOrientacion === "arqueologia" 
          ? "Profesorado - Orientación Arqueología" 
          : "Profesorado - Orientación Sociocultural"
      } else {
        return "Profesorado"
      }
    }
    return selectedOrientacion === "arqueologia" 
      ? "Licenciatura - Orientación Arqueología" 
      : "Licenciatura - Orientación Sociocultural"
  }

  const ciclosOrdenados = ["Ciclo de Formación General (CFG)", "Ciclo Profesional Común (CPC)", "Ciclo de Especialización"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header principal */}
      <header className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2"></div>
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
            <div className="col-span-2"></div>
          </div>
        </div>
      </header>

      {/* Barra de navegación */}
      <nav className="bg-uba-primary border-t-4 border-uba-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Oferta Horaria
              </a>
            </div>
            <div className="flex space-x-8">
              <a
                href="https://filo.uba.ar"
                className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200"
              >
                filo.uba.ar
              </a>
              <span className="text-white">|</span>
              <a
                href="https://campus.filo.uba.ar/"
                className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200"
              >
                Campus Virtual
              </a>
              <span className="text-white">|</span>
              <a
                href="https://suiganew.filo.uba.ar/"
                className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200"
              >
                Inscripciones - SUIGA
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de la sección */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-uba-primary mb-4">Plan de Estudios</h1>
          
          {/* Controles de selección */}
          <div className="space-y-6">
            {/* Plan de estudios */}
            <div>
              <div className="flex gap-2">
                <Button
                  variant={selectedPlan === "1985" ? "default" : "outline"}
                  onClick={() => setSelectedPlan("1985")}
                  className={selectedPlan === "1985" ? "bg-gray-600 text-white" : "text-gray-600 border-gray-600"}
                >
                  1985
                </Button>
                <Button
                  variant={selectedPlan === "2023" ? "default" : "outline"}
                  onClick={() => setSelectedPlan("2023")}
                  className={selectedPlan === "2023" ? "bg-uba-secondary text-white" : "text-uba-secondary border-uba-secondary"}
                >
                  2023
                </Button>
              </div>
            </div>

            {/* Carrera */}
            <div>
              <h3 className="text-lg font-medium text-uba-primary mb-3">Carrera</h3>
              <div className="flex gap-2">
                <Button
                  variant={selectedCarrera === "profesorado" ? "default" : "outline"}
                  onClick={() => setSelectedCarrera("profesorado")}
                  className={selectedCarrera === "profesorado" ? "bg-uba-secondary text-white" : "text-uba-secondary border-uba-secondary"}
                >
                  Profesorado
                </Button>
                <Button
                  variant={selectedCarrera === "licenciatura" ? "default" : "outline"}
                  onClick={() => setSelectedCarrera("licenciatura")}
                  className={selectedCarrera === "licenciatura" ? "bg-uba-secondary text-white" : "text-uba-secondary border-uba-secondary"}
                >
                  Licenciatura
                </Button>
              </div>
            </div>

            {/* Orientación (para licenciatura y profesorado 1985) */}
            {(selectedCarrera === "licenciatura" || (selectedCarrera === "profesorado" && selectedPlan === "1985")) && (
              <div>
                <h3 className="text-lg font-medium text-uba-primary mb-3">Orientación</h3>
                <div className="flex gap-2">
                  <Button
                    variant={selectedOrientacion === "arqueologia" ? "default" : "outline"}
                    onClick={() => setSelectedOrientacion("arqueologia")}
                    className={selectedOrientacion === "arqueologia" ? "bg-uba-secondary text-white" : "text-uba-secondary border-uba-secondary"}
                  >
                    Arqueología
                  </Button>
                  <Button
                    variant={selectedOrientacion === "sociocultural" ? "default" : "outline"}
                    onClick={() => setSelectedOrientacion("sociocultural")}
                    className={selectedOrientacion === "sociocultural" ? "bg-uba-secondary text-white" : "text-uba-secondary border-uba-secondary"}
                  >
                    Sociocultural
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contenido del plan */}
        {loading ? (
          <div className="text-center py-8 text-uba-primary">Cargando planes de estudio...</div>
        ) : !planActual ? (
          <Alert className="border-yellow-300 bg-yellow-100">
            <AlertDescription className="text-gray-800">
              <strong>Plan no disponible:</strong> No se encontró información para el plan {selectedPlan} de {getTituloCompleto()}. 
              Asegúrate de haber cargado los datos del plan en la sección de administración.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            {/* Título del plan seleccionado */}
            <Card className="bg-uba-primary text-white">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <GraduationCap className="h-8 w-8" />
                  {getTituloCompleto()} (plan {selectedPlan})
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Materias organizadas por ciclo */}
            <div className="space-y-6">
              {ciclosOrdenados
                .filter(ciclo => materiasPorCiclo[ciclo])
                .map((ciclo) => (
                <Card key={ciclo} className="border-uba-primary/30">
                  <CardHeader className="bg-uba-primary/10">
                    <CardTitle className="text-xl text-uba-primary flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {ciclo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      {materiasPorCiclo[ciclo].map((materia, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-uba-primary text-lg">{materia.nombre}</h4>
                            <div className="flex flex-wrap gap-2">
                              {materia.electividad && materia.electividad !== "Obligatoria" && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  {materia.electividad}
                                </Badge>
                              )}
                              {materia.area && (
                                <Badge variant="outline" className="border-uba-primary text-uba-primary">
                                  {materia.area}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Código 2023:</span> {materia.cod23 || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Código 1985:</span> {materia.cod85 || "N/A"}
                            </div>
                          </div>

                          {materia.correlatividad && materia.correlatividad.trim() && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <h5 className="font-medium text-blue-800 mb-1">Correlatividades</h5>
                              <p className="text-sm text-blue-700">{materia.correlatividad}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Materias de otros ciclos no estándar */}
              {Object.keys(materiasPorCiclo)
                .filter(ciclo => !ciclosOrdenados.includes(ciclo))
                .map((ciclo) => (
                <Card key={ciclo} className="border-uba-primary/30">
                  <CardHeader className="bg-uba-primary/10">
                    <CardTitle className="text-xl text-uba-primary flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {ciclo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      {materiasPorCiclo[ciclo].map((materia, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-uba-primary text-lg">{materia.nombre}</h4>
                            <div className="flex flex-wrap gap-2">
                              {materia.electividad && materia.electividad !== "Obligatoria" && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  {materia.electividad}
                                </Badge>
                              )}
                              {materia.area && (
                                <Badge variant="outline" className="border-uba-primary text-uba-primary">
                                  {materia.area}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Código 2023:</span> {materia.cod23 || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Código 1985:</span> {materia.cod85 || "N/A"}
                            </div>
                          </div>

                          {materia.correlatividad && materia.correlatividad.trim() && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <h5 className="font-medium text-blue-800 mb-1">Correlatividades</h5>
                              <p className="text-sm text-blue-700">{materia.correlatividad}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resumen por áreas */}
            {Object.keys(materiasPorArea).length > 1 && (
              <Card className="border-uba-secondary/30">
                <CardHeader className="bg-uba-secondary/10">
                  <CardTitle className="text-xl text-uba-primary flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Distribución por Áreas
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(materiasPorArea).map(([area, materias]) => (
                      <div key={area} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-uba-primary mb-2">{area}</h4>
                        <p className="text-sm text-gray-600">
                          {materias.length} materia{materias.length !== 1 ? 's' : ''}
                        </p>
                        <div className="mt-2 space-y-1">
                          {materias.slice(0, 3).map((materia, index) => (
                            <p key={index} className="text-xs text-gray-500 truncate">
                              {materia.nombre}
                            </p>
                          ))}
                          {materias.length > 3 && (
                            <p className="text-xs text-gray-400">
                              y {materias.length - 3} más...
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
