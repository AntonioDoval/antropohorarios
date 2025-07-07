"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, FileText } from "lucide-react"
import { Footer } from "@/components/footer"
import { getPlanesDeEstudios, type PlanDeEstudios, type MateriaDelPlan } from "@/lib/planes-utils"

export default function PlanesEstudioPage() {
  const [selectedPlan, setSelectedPlan] = useState("2023")
  const [selectedCarrera, setSelectedCarrera] = useState("licenciatura")
  const [selectedOrientacion, setSelectedOrientacion] = useState("sociocultural")
  const [planesData, setPlanesData] = useState<PlanDeEstudios[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const planes = getPlanesDeEstudios()
    setPlanesData(planes)
    setLoading(false)
  }, [])

  // Obtener el plan actual basado en la selección
  const getCurrentPlan = (): PlanDeEstudios | null => {
    const orientacionMap: { [key: string]: string } = {
      "arqueologia": "Licenciatura en Arqueología",
      "sociocultural": "Licenciatura en Antropología Sociocultural",
      "profesorado": "Profesorado"
    }

    const orientacionBuscada = selectedCarrera === "profesorado" 
      ? "Profesorado" 
      : orientacionMap[selectedOrientacion]

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

  const planActual = getCurrentPlan()
  const materiasPorCiclo = planActual ? getMateriasPorCiclo(planActual.materias) : {}

  // Obtener título completo del plan
  const getTituloCompleto = () => {
    if (selectedCarrera === "profesorado") {
      return "Profesorado"
    }
    return selectedOrientacion === "arqueologia" 
      ? "Licenciatura - Orientación Arqueología" 
      : "Licenciatura - Orientación Sociocultural"
  }

  const ciclosOrdenados = ["Ciclo de Formación General (CFG)", "Ciclo Profesional Común (CPC)", "Ciclo de Especialización", "Ciclo de Formación Orientado (CFO)"]

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
        {/* Control Panel */}
        <Card className="mb-8 bg-gray-50">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-uba-primary mb-6">Plan de Estudios</h2>

            {/* Plan Toggle */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <span className={`text-lg font-medium ${selectedPlan === "2023" ? "text-uba-primary" : "text-gray-500"}`}>
                  2023
                </span>
                <Switch
                  checked={selectedPlan === "1985"}
                  onCheckedChange={(checked) => {
                    setSelectedPlan(checked ? "1985" : "2023")
                  }}
                  className="data-[state=checked]:bg-uba-primary"
                />
                <span className={`text-lg font-medium ${selectedPlan === "1985" ? "text-uba-primary" : "text-gray-500"}`}>
                  1985
                </span>
              </div>
            </div>

            {/* Carrera and Orientación */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Carrera */}
              <div>
                <h3 className="text-lg font-medium text-uba-primary mb-3">Carrera</h3>
                <div className="flex items-center space-x-4">
                  <span className={`text-base ${selectedCarrera === "profesorado" ? "text-uba-primary font-medium" : "text-gray-500"}`}>
                    Profesorado
                  </span>
                  <Switch
                    checked={selectedCarrera === "licenciatura"}
                    onCheckedChange={(checked) => {
                      setSelectedCarrera(checked ? "licenciatura" : "profesorado")
                    }}
                    className="data-[state=checked]:bg-uba-secondary"
                  />
                  <span className={`text-base ${selectedCarrera === "licenciatura" ? "text-uba-primary font-medium" : "text-gray-500"}`}>
                    Licenciatura
                  </span>
                </div>
              </div>

              {/* Orientación */}
              {selectedCarrera === "licenciatura" && (
                <div>
                  <h3 className="text-lg font-medium text-uba-primary mb-3">Orientación</h3>
                  <div className="flex items-center space-x-4">
                    <span className={`text-base ${selectedOrientacion === "arqueologia" ? "text-uba-primary font-medium" : "text-gray-500"}`}>
                      Arqueología
                    </span>
                    <Switch
                      checked={selectedOrientacion === "sociocultural"}
                      onCheckedChange={(checked) => {
                        setSelectedOrientacion(checked ? "sociocultural" : "arqueologia")
                      }}
                      className="data-[state=checked]:bg-uba-primary"
                    />
                    <span className={`text-base ${selectedOrientacion === "sociocultural" ? "text-uba-primary font-medium" : "text-gray-500"}`}>
                      Sociocultural
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

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
            <div className="bg-uba-primary text-white py-4 px-6 rounded-lg">
              <h1 className="text-2xl font-bold">
                {getTituloCompleto()} (plan {selectedPlan})
              </h1>
            </div>

            {/* Contenido organizado por ciclos */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Columna principal - Materias */}
              <div className="lg:col-span-2 space-y-4">
                {ciclosOrdenados
                  .filter(ciclo => materiasPorCiclo[ciclo])
                  .map((ciclo) => (
                  <Card key={ciclo} className="border-2 border-gray-200">
                    <CardHeader className="bg-gray-50 py-3">
                      <CardTitle className="text-lg text-uba-primary">{ciclo}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ul className="space-y-2">
                        {materiasPorCiclo[ciclo].map((materia, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-uba-primary font-medium text-sm mt-1">•</span>
                            <div className="flex-1">
                              <span className="text-sm text-gray-800">{materia.nombre}</span>
                              {materia.electividad && materia.electividad !== "Obligatoria" && (
                                <Badge variant="secondary" className="ml-2 text-xs bg-yellow-100 text-yellow-800">
                                  {materia.electividad}
                                </Badge>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}

                {/* Materias de otros ciclos no estándar */}
                {Object.keys(materiasPorCiclo)
                  .filter(ciclo => !ciclosOrdenados.includes(ciclo))
                  .map((ciclo) => (
                  <Card key={ciclo} className="border-2 border-gray-200">
                    <CardHeader className="bg-gray-50 py-3">
                      <CardTitle className="text-lg text-uba-primary">{ciclo}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ul className="space-y-2">
                        {materiasPorCiclo[ciclo].map((materia, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-uba-primary font-medium text-sm mt-1">•</span>
                            <div className="flex-1">
                              <span className="text-sm text-gray-800">{materia.nombre}</span>
                              {materia.electividad && materia.electividad !== "Obligatoria" && (
                                <Badge variant="secondary" className="ml-2 text-xs bg-yellow-100 text-yellow-800">
                                  {materia.electividad}
                                </Badge>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Columna lateral - Correlatividades */}
              <div className="lg:col-span-1">
                <Card className="border-2 border-gray-200 sticky top-4">
                  <CardHeader className="bg-gray-50 py-3">
                    <CardTitle className="text-lg text-uba-primary italic">Correlatividades</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Mostrar correlatividades relevantes */}
                      {planActual && planActual.materias
                        .filter(materia => materia.correlatividad && materia.correlatividad.trim())
                        .slice(0, 10)
                        .map((materia, index) => (
                        <div key={index} className="text-sm">
                          <div className="font-medium text-uba-primary mb-1">
                            {materia.nombre}
                          </div>
                          <div className="text-gray-600 text-xs bg-blue-50 p-2 rounded">
                            {materia.correlatividad}
                          </div>
                        </div>
                      ))}

                      {planActual && planActual.materias.filter(m => m.correlatividad && m.correlatividad.trim()).length === 0 && (
                        <div className="text-sm text-gray-500 italic">
                          No hay información de correlatividades disponible para este plan.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}