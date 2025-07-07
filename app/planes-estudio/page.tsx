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

    let orientacionBuscada = ""
    if (selectedCarrera === "profesorado") {
      if (selectedPlan === "1985") {
        orientacionBuscada = selectedOrientacion === "arqueologia" 
          ? "Profesorado - Orientación Arqueología"
          : "Profesorado - Orientación Sociocultural"
      } else {
        orientacionBuscada = "Profesorado"
      }
    } else {
      orientacionBuscada = orientacionMap[selectedOrientacion]
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

  // Agrupar materias por correlatividad
  const getMateriasPorCorrelatividad = (materias: MateriaDelPlan[]) => {
    const grupos: { [correlatividad: string]: MateriaDelPlan[] } = {}

    materias.forEach(materia => {
      const correlatividad = materia.correlatividad?.trim() || "Sin correlatividad"
      if (!grupos[correlatividad]) {
        grupos[correlatividad] = []
      }
      grupos[correlatividad].push(materia)
    })

    return grupos
  }

  // Agrupar materias electivas
  const agruparMateriasElectivas = (materias: MateriaDelPlan[]) => {
    const materiasObligatorias: MateriaDelPlan[] = []
    const gruposElectivos: { [key: string]: { titulo: string; materias: MateriaDelPlan[] } } = {}

    materias.forEach(materia => {
      if (materia.electividad === "Obligatoria" || !materia.electividad) {
        materiasObligatorias.push(materia)
        return
      }

      // Lógica específica por plan y carrera
      if (selectedPlan === "2023" && selectedCarrera === "licenciatura" && selectedOrientacion === "sociocultural") {
        // Agrupar por área con títulos específicos
        if (materia.area && materia.area.trim()) {
          const areaKey = `area_${materia.area}`
          if (!gruposElectivos[areaKey]) {
            gruposElectivos[areaKey] = {
              titulo: materia.area, // Usar el título del área directamente
              materias: []
            }
          }
          gruposElectivos[areaKey].materias.push(materia)
        } else {
          materiasObligatorias.push(materia)
        }
      } else if (selectedPlan === "2023" && selectedCarrera === "profesorado") {
        // Agrupar por tipo de elección
        if (materia.nombre.toLowerCase().includes("arqueolog")) {
          const orientacionKey = "prof_arqueo"
          if (!gruposElectivos[orientacionKey]) {
            gruposElectivos[orientacionKey] = {
              titulo: "Orientación Arqueología",
              materias: []
            }
          }
          gruposElectivos[orientacionKey].materias.push(materia)
        } else {
          const orientacionKey = "prof_socio"
          if (!gruposElectivos[orientacionKey]) {
            gruposElectivos[orientacionKey] = {
              titulo: "Orientación Sociocultural",
              materias: []
            }
          }
          gruposElectivos[orientacionKey].materias.push(materia)
        } 
         if (materia.electividad.includes("Elección B")) {
          if (!gruposElectivos["eleccion_b"]) {
            gruposElectivos["eleccion_b"] = {
              titulo: "2 materias a elección del Departamento de Cs. de la Educación",
              materias: []
            }
          }
          gruposElectivos["eleccion_b"].materias.push(materia)
        } else {
          materiasObligatorias.push(materia)
        }
      } else if (selectedPlan === "2023" && selectedCarrera === "licenciatura" && selectedOrientacion === "arqueologia") {
          if(materia.electividad.includes("Electivas")){
              const electivasKey = `electivas`;
              if(!gruposElectivos[electivasKey]){
                  gruposElectivos[electivasKey] = {
                      titulo: "Dos materias a elegir entre:",
                      materias: []
                  }
              }
              gruposElectivos[electivasKey].materias.push(materia);
          } else {
              materiasObligatorias.push(materia);
          }
      }
      else {
        // Para otros casos, agrupar por electividad similar
        const electividadKey = `electiva_${materia.electividad}`
        if (!gruposElectivos[electividadKey]) {
          gruposElectivos[electividadKey] = {
            titulo: "Una asignatura a elegir entre:",
            materias: []
          }
        }
        gruposElectivos[electividadKey].materias.push(materia)
      }
    })

    return { materiasObligatorias, gruposElectivos }
  }

  const planActual = getCurrentPlan()
  const materiasPorCiclo = planActual ? getMateriasPorCiclo(planActual.materias) : {}
  const materiasPorCorrelatividad = planActual ? getMateriasPorCorrelatividad(planActual.materias) : {}

  // Obtener título completo del plan
  const getTituloCompleto = () => {
    if (selectedCarrera === "profesorado") {
      if (selectedPlan === "1985") {
        return selectedOrientacion === "arqueologia" 
          ? "Profesorado - Orientación Arqueología" 
          : "Profesorado - Orientación Sociocultural"
      }
      return "Profesorado"
    }
    return selectedOrientacion === "arqueologia" 
      ? "Licenciatura - Orientación Arqueología" 
      : "Licenciatura - Orientación Sociocultural"
  }

  const ciclosOrdenados = ["Ciclo de Formación General (CFG)", "Ciclo Profesional Común (CPC)", "Ciclo de Especialización", "Ciclo de Formación Orientado (CFO)", "Idiomas"]

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
              {(selectedCarrera === "licenciatura" || (selectedCarrera === "profesorado" && selectedPlan === "1985")) && (
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

            {/* Contenido organizado por ciclos con correlatividades */}
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Columna principal - Materias (3 columnas) */}
              <div className="lg:col-span-3 space-y-4">
                {ciclosOrdenados
                  .filter(ciclo => materiasPorCiclo[ciclo])
                  .map((ciclo) => {
                    const { materiasObligatorias, gruposElectivos } = agruparMateriasElectivas(materiasPorCiclo[ciclo])

                    return (
                      <Card key={ciclo} className="border-2 border-gray-200">
                        <CardHeader className="bg-gray-50 py-3">
                          <CardTitle className="text-lg text-uba-primary">{ciclo}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Materias obligatorias */}
                            {materiasObligatorias.length > 0 && (
                              <ul className="space-y-2">
                                {materiasObligatorias.map((materia, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-uba-primary font-medium text-sm mt-1">•</span>
                                    <div className="flex-1">
                                      <span className="text-sm text-gray-800">{materia.nombre}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Título especial para sociocultural 2023 */}
                            {selectedPlan === "2023" && selectedCarrera === "licenciatura" && selectedOrientacion === "sociocultural" && Object.keys(gruposElectivos).length > 0 && (
                              <div className="text-sm font-medium text-blue-800 mb-2">
                                Dos asignaturas a elegir de una misma área:
                              </div>
                            )}

                            {/* Título especial para profesorado 2023 */}
                            {selectedPlan === "2023" && selectedCarrera === "profesorado" && (Object.keys(gruposElectivos).includes("prof_arqueo") || Object.keys(gruposElectivos).includes("prof_socio")) && (
                              <div className="text-sm font-medium text-blue-800 mb-2">
                                Cinco materias a elegir dentro de la oferta de cualquiera de las orientaciones de la Licenciatura:
                              </div>
                            )}

                            {/* Grupos electivos */}
                            {Object.entries(gruposElectivos).map(([key, grupo]) => (
                              <div key={key} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                                <div className="text-sm font-medium text-blue-800 mb-2">
                                  {grupo.titulo}
                                </div>
                                <ul className="space-y-1">
                                  {grupo.materias.map((materia, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="text-blue-600 font-medium text-sm mt-1">•</span>
                                      <div className="flex-1">
                                        <span className="text-sm text-gray-800">{materia.nombre}</span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                {/* Materias de otros ciclos no estándar */}
                {Object.keys(materiasPorCiclo)
                  .filter(ciclo => !ciclosOrdenados.includes(ciclo))
                  .map((ciclo) => {
                    const { materiasObligatorias, gruposElectivos } = agruparMateriasElectivas(materiasPorCiclo[ciclo])

                    return (
                      <Card key={ciclo} className="border-2 border-gray-200">
                        <CardHeader className="bg-gray-50 py-3">
                          <CardTitle className="text-lg text-uba-primary">{ciclo}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Materias obligatorias */}
                            {materiasObligatorias.length > 0 && (
                              <ul className="space-y-2">
                                {materiasObligatorias.map((materia, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-uba-primary font-medium text-sm mt-1">•</span>
                                    <div className="flex-1">
                                      <span className="text-sm text-gray-800">{materia.nombre}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Título especial para sociocultural 2023 */}
                            {selectedPlan === "2023" && selectedCarrera === "licenciatura" && selectedOrientacion === "sociocultural" && Object.keys(gruposElectivos).length > 0 && (
                              <div className="text-sm font-medium text-blue-800 mb-2">
                                Dos asignaturas a elegir de una misma área:
                              </div>
                            )}

                            {/* Título especial para profesorado 2023 */}
                            {selectedPlan === "2023" && selectedCarrera === "profesorado" && (Object.keys(gruposElectivos).includes("prof_arqueo") || Object.keys(gruposElectivos).includes("prof_socio")) && (
                              <div className="text-sm font-medium text-blue-800 mb-2">
                                Cinco materias a elegir dentro de la oferta de cualquiera de las orientaciones de la Licenciatura:
                              </div>
                            )}

                            {/* Grupos electivos */}
                            {Object.entries(gruposElectivos).map(([key, grupo]) => (
                              <div key={key} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                                <div className="text-sm font-medium text-blue-800 mb-2">
                                  {grupo.titulo}
                                </div>
                                <ul className="space-y-1">
                                  {grupo.materias.map((materia, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="text-blue-600 font-medium text-sm mt-1">•</span>
                                      <div className="flex-1">
                                        <span className="text-sm text-gray-800">{materia.nombre}</span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>

              {/* Columna lateral - Correlatividades (1 columna) */}
              <div className="lg:col-span-1">
                <Card className="border-2 border-gray-200 sticky top-4">
                  <CardHeader className="bg-gray-50 py-3">
                    <CardTitle className="text-lg text-uba-primary">Correlatividades</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {Object.entries(materiasPorCorrelatividad)
                        .filter(([correlatividad]) => correlatividad !== "Sin correlatividad")
                        .map(([correlatividad, materias]) => (
                        <div key={correlatividad} className="text-sm">
                          <div className="font-medium text-uba-primary mb-2 bg-blue-50 p-2 rounded text-xs">
                            {correlatividad}
                          </div>
                          <div className="space-y-1">
                            {materias.map((materia, index) => (
                              <div key={index} className="text-xs text-gray-600 pl-2 border-l-2 border-gray-200">
                                {materia.nombre}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {Object.keys(materiasPorCorrelatividad).filter(c => c !== "Sin correlatividad").length === 0 && (
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