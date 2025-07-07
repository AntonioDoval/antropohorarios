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

  // Agrupar materias por correlatividad dentro de un ciclo
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
        // Materias específicas para agrupar por separado
        if (materia.nombre === "Enfoque Cuantitativo de Investigación en Antropología Sociocultural" || 
            materia.nombre === "Ejercicio Profesional de la Antropología Sociocultural") {
          const especialKey = "materias_especiales"
          if (!gruposElectivos[especialKey]) {
            gruposElectivos[especialKey] = {
              titulo: "Una materia a elección entre:",
              materias: []
            }
          }
          gruposElectivos[especialKey].materias.push(materia)
        }
        // Agrupar por área con títulos específicos
        else if (materia.area && materia.area.trim()) {
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
      } else {
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

            {/* Contenido organizado por ciclos */}
            <div className="space-y-4">
                {ciclosOrdenados
                  .filter(ciclo => materiasPorCiclo[ciclo])
                  .map((ciclo) => {
                    const { materiasObligatorias, gruposElectivos } = agruparMateriasElectivas(materiasPorCiclo[ciclo])
                    const materiasPorCorrelatividad = getMateriasPorCorrelatividad(materiasObligatorias)

                    return (
                      <Card key={ciclo} className="border-2 border-gray-200">
                        <CardHeader className="bg-gray-50 py-3">
                          <CardTitle className="text-lg text-uba-primary">{ciclo}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Materias obligatorias agrupadas por correlatividad */}
                            {Object.entries(materiasPorCorrelatividad)
                              .sort(([a], [b]) => {
                                // Ordenar poniendo "Sin correlatividad" primero
                                if (a === "Sin correlatividad") return -1
                                if (b === "Sin correlatividad") return 1
                                return a.localeCompare(b)
                              })
                              .map(([correlatividad, materias]) => (
                                <div key={correlatividad} className="space-y-2">
                                  {correlatividad !== "Sin correlatividad" && (
                                    <div className="text-xs text-gray-500 italic mb-2 bg-gray-50 p-2 rounded">
                                      ▼ Correlatividad: {correlatividad}
                                    </div>
                                  )}
                                  {materias.map((materia, index) => (
                                    <div key={index} className="flex items-start gap-2 py-1">
                                      <span className="text-uba-primary font-medium text-sm mt-1">•</span>
                                      <div className="flex-1">
                                        <span className="text-sm text-gray-800">{materia.nombre}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                            {/* Título especial para sociocultural 2023 */}
                            {selectedPlan === "2023" && selectedCarrera === "licenciatura" && selectedOrientacion === "sociocultural" && Object.keys(gruposElectivos).filter(k => k.startsWith("area_")).length > 0 && (
                              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 mt-4">
                                <div className="text-sm font-medium text-blue-800 mb-3">
                                  Dos materias a elegir dentro de la misma área temática:
                                </div>
                                <div className="space-y-4">
                                  {Object.entries(gruposElectivos)
                                    .filter(([key]) => key.startsWith("area_"))
                                    .map(([key, grupo]) => (
                                    <div key={key} className="bg-white p-3 rounded border">
                                      <div className="text-sm font-medium text-blue-800 mb-1">
                                        {grupo.titulo}
                                      </div>
                                      {grupo.subtitle && (
                                        <div className="text-xs text-gray-600 mb-2 italic">
                                          ▼ {grupo.subtitle}
                                        </div>
                                      )}
                                      <div className="space-y-1">
                                        {grupo.materias.map((materia, index) => (
                                          <div key={index} className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium text-sm mt-1">•</span>
                                            <div className="flex-1">
                                              <span className="text-sm text-gray-800">{materia.nombre}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Título especial para profesorado 2023 */}
                            {selectedPlan === "2023" && selectedCarrera === "profesorado" && (Object.keys(gruposElectivos).includes("prof_arqueo") || Object.keys(gruposElectivos).includes("prof_socio")) && (
                              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 mt-4">
                                <div className="text-sm font-medium text-blue-800 mb-3">
                                  Cinco materias a elegir dentro de la oferta de cualquiera de las orientaciones de la Licenciatura:
                                </div>
                                <div className="space-y-3">
                                  {Object.entries(gruposElectivos)
                                    .filter(([key]) => key === "prof_arqueo" || key === "prof_socio")
                                    .map(([key, grupo]) => (
                                    <div key={key} className="bg-white p-3 rounded border">
                                      <div className="text-sm font-medium text-blue-800 mb-2">
                                        {grupo.titulo}
                                      </div>
                                      <div className="space-y-1">
                                        {grupo.materias.map((materia, index) => (
                                          <div key={index} className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium text-sm mt-1">•</span>
                                            <div className="flex-1">
                                              <span className="text-sm text-gray-800">{materia.nombre}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Grupos electivos individuales */}
                            {Object.entries(gruposElectivos)
                              .filter(([key]) => !key.startsWith("area_") && key !== "prof_arqueo" && key !== "prof_socio")
                              .map(([key, grupo]) => (
                              <div key={key} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                                <div className="text-sm font-medium text-blue-800 mb-2">
                                  {grupo.titulo}
                                </div>
                                {grupo.subtitle && (
                                  <div className="text-xs text-gray-600 mb-2 italic">
                                    ▼ {grupo.subtitle}
                                  </div>
                                )}
                                <div className="space-y-1">
                                  {grupo.materias.map((materia, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                      <span className="text-blue-600 font-medium text-sm mt-1">•</span>
                                      <div className="flex-1">
                                        <span className="text-sm text-gray-800">{materia.nombre}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
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
                    const materiasPorCorrelatividad = getMateriasPorCorrelatividad(materiasObligatorias)

                    return (
                      <Card key={ciclo} className="border-2 border-gray-200">
                        <CardHeader className="bg-gray-50 py-3">
                          <CardTitle className="text-lg text-uba-primary">{ciclo}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Materias obligatorias agrupadas por correlatividad */}
                            {Object.entries(materiasPorCorrelatividad)
                              .sort(([a], [b]) => {
                                // Ordenar poniendo "Sin correlatividad" primero
                                if (a === "Sin correlatividad") return -1
                                if (b === "Sin correlatividad") return 1
                                return a.localeCompare(b)
                              })
                              .map(([correlatividad, materias]) => (
                                <div key={correlatividad} className="space-y-2">
                                  {correlatividad !== "Sin correlatividad" && (
                                    <div className="text-xs text-gray-500 italic mb-2 bg-gray-50 p-2 rounded">
                                      ▼ Correlatividad: {correlatividad}
                                    </div>
                                  )}
                                  {materias.map((materia, index) => (
                                    <div key={index} className="flex items-start gap-2 py-1">
                                      <span className="text-uba-primary font-medium text-sm mt-1">•</span>
                                      <div className="flex-1">
                                        <span className="text-sm text-gray-800">{materia.nombre}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                            {/* Título especial para sociocultural 2023 */}
                            {selectedPlan === "2023" && selectedCarrera === "licenciatura" && selectedOrientacion === "sociocultural" && Object.keys(gruposElectivos).filter(k => k.startsWith("area_")).length > 0 && (
                              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 mt-4">
                                <div className="text-sm font-medium text-blue-800 mb-3">
                                  Dos materias a elegir dentro de la misma área temática:
                                </div>
                                <div className="space-y-4">
                                  {Object.entries(gruposElectivos)
                                    .filter(([key]) => key.startsWith("area_"))
                                    .map(([key, grupo]) => (
                                    <div key={key} className="bg-white p-3 rounded border">
                                      <div className="text-sm font-medium text-blue-800 mb-1">
                                        {grupo.titulo}
                                      </div>
                                      {grupo.subtitle && (
                                        <div className="text-xs text-gray-600 mb-2 italic">
                                          ▼ {grupo.subtitle}
                                        </div>
                                      )}
                                      <div className="space-y-1">
                                        {grupo.materias.map((materia, index) => (
                                          <div key={index} className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium text-sm mt-1">•</span>
                                            <div className="flex-1">
                                              <span className="text-sm text-gray-800">{materia.nombre}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Título especial para profesorado 2023 */}
                            {selectedPlan === "2023" && selectedCarrera === "profesorado" && (Object.keys(gruposElectivos).includes("prof_arqueo") || Object.keys(gruposElectivos).includes("prof_socio")) && (
                              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 mt-4">
                                <div className="text-sm font-medium text-blue-800 mb-3">
                                  Cinco materias a elegir dentro de la oferta de cualquiera de las orientaciones de la Licenciatura:
                                </div>
                                <div className="space-y-3">
                                  {Object.entries(gruposElectivos)
                                    .filter(([key]) => key === "prof_arqueo" || key === "prof_socio")
                                    .map(([key, grupo]) => (
                                    <div key={key} className="bg-white p-3 rounded border">
                                      <div className="text-sm font-medium text-blue-800 mb-2">
                                        {grupo.titulo}
                                      </div>
                                      <div className="space-y-1">
                                        {grupo.materias.map((materia, index) => (
                                          <div key={index} className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium text-sm mt-1">•</span>
                                            <div className="flex-1">
                                              <span className="text-sm text-gray-800">{materia.nombre}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Grupos electivos individuales */}
                            {Object.entries(gruposElectivos)
                              .filter(([key]) => !key.startsWith("area_") && key !== "prof_arqueo" && key !== "prof_socio")
                              .map(([key, grupo]) => (
                              <div key={key} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                                <div className="text-sm font-medium text-blue-800 mb-2">
                                  {grupo.titulo}
                                </div>
                                {grupo.subtitle && (
                                  <div className="text-xs text-gray-600 mb-2 italic">
                                    ▼ {grupo.subtitle}
                                  </div>
                                )}
                                <div className="space-y-1">
                                  {grupo.materias.map((materia, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                      <span className="text-blue-600 font-medium text-sm mt-1">•</span>
                                      <div className="flex-1">
                                        <span className="text-sm text-gray-800">{materia.nombre}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}