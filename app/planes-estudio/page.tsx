
"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PlanesEstudioPage() {
  const [planSeleccionado, setPlanSeleccionado] = useState<"2023" | "1985">("2023")

  const materiasLicSocio2023 = [
    // Ciclo de Formación General (CFG)
    { codigo: "17001", nombre: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES", corto: "Epistemo", siglas: "EPIS", ciclo: "CFG" },
    { codigo: "17002", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I", corto: "Historia y Teoría 1", siglas: "HTA1", ciclo: "CFG" },
    { codigo: "17003", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II", corto: "Historia y Teoría 2", siglas: "HTA2", ciclo: "CFG" },
    { codigo: "17004", nombre: "PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA", corto: "P. A. Soc. y Pol.", siglas: "PASYP", ciclo: "CFG" },
    { codigo: "17005", nombre: "PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA", corto: "P. A. Económica", siglas: "PAE", ciclo: "CFG" },
    { codigo: "17006", nombre: "PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA", corto: "P. Antrop. Simbólica", siglas: "PASIM", ciclo: "CFG" },
    { codigo: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA", corto: "Antrop. Biológica", siglas: "ABIO", ciclo: "CFG" },
    { codigo: "17008", nombre: "INTRODUCCIÓN A LA ARQUEOLOGÍA", corto: "Intro. Arqueo.", siglas: "IARQ", ciclo: "CFG" },
    { codigo: "17009", nombre: "ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD", corto: "Arqueo. Leg. y Com.", siglas: "ALC", ciclo: "CFG" },
  ]

  const materiasCFO = [
    // Primeras materias del CFO
    { codigo: "PST23", nombre: "1 Seminario de Prácticas Socioeducativas Territorializadas (PST)", tipo: "Variable", correlatividad: "" },
    { codigo: "17010", nombre: "SOCIEDADES, CULTURAS Y ESTADOS EN AMÉRICA PREHISPÁNICA Y COLONIAL", corto: "S. C. y E. en Am. Prehisp.", correlatividad: "Al menos 5 materias del CFG" },
    { codigo: "17011", nombre: "PUEBLOS INDÍGENAS AMERICANOS", corto: "P. Ind. Americanos", correlatividad: "Al menos 5 materias del CFG" },
    { codigo: "17012", nombre: "PROCESOS CULTURALES, FOLKLORE Y PRÁCTICAS SUBALTERNAS", corto: "Proc. Cult. Folkore y P. Sub.", correlatividad: "Al menos 5 materias del CFG" },
    { codigo: "17013", nombre: "ANTROPOLOGÍA LINGÜÍSTICA", corto: "Antrop. Lingüística", correlatividad: "Al menos 5 materias del CFG" },
    { codigo: "17014", nombre: "TEORÍA SOCIAL", corto: "Teoría Social", correlatividad: "Al menos 5 materias del CFG" },
    { codigo: "17015", nombre: "TEORÍAS DE LA SUBJETIVIDAD", corto: "T. de la Subjetividad", correlatividad: "Al menos 5 materias del CFG" },
    { codigo: "SEMSOC", nombre: "1 Seminario regular de Antropología Sociocultural", tipo: "Variable", correlatividad: "" },
    { codigo: "17016", nombre: "METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA", corto: "Met. e Inv. Antrop.", correlatividad: "Al menos 10 materias del CFG" },
  ]

  const eleccionesA = [
    { codigo: "17017", nombre: "ENFOQUE CUANTITATIVO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL", corto: "Enf. Cuantitativo", correlatividad: "Al menos 10 materias del CFG" },
    { codigo: "17018", nombre: "EJERCICIO PROFESIONAL DE LA ANTROPOLOGÍA SOCIOCULTURAL", corto: "Ej. Profesional Socio.", correlatividad: "Al menos 10 materias del CFG" },
  ]

  const eleccionesB = {
    "Antropología histórica y memoria": [
      { codigo: "17019", nombre: "CONQUISTAS, RESISTENCIAS Y MEMORIAS INDÍGENAS", corto: "Conq. Res. y Mem. Ind." },
      { codigo: "17020", nombre: "PUEBLOS INDÍGENAS Y ESTADOS", corto: "P. Ind. y Estados" },
      { codigo: "17021", nombre: "ANTROPOLOGÍAS LATINOAMERICANAS", corto: "A. Latinoamericanas" },
      { codigo: "17022", nombre: "AMÉRICA EN CONTEXTO", corto: "Am. en Contexto" },
    ],
    "Procesos culturales, ideología y poder": [
      { codigo: "17023", nombre: "CAPITALISMO ACTUAL, TRABAJO Y TRABAJADORES", corto: "Cap. Trab. y Trabajadores" },
      { codigo: "17024", nombre: "CONFIGURACIONES SOCIOAMBIENTALES Y TERRITORIALES EN EL ESPACIO URBANO Y RURAL", corto: "Conf. Soc. y Terr." },
      { codigo: "17025", nombre: "RELACIONES DE GÉNERO Y ORGANIZACIÓN SOCIAL DE LOS CUIDADOS", corto: "Rel. de Género y Cuidados" },
    ],
    "Procesos políticos, instituciones y prácticas": [
      { codigo: "17026", nombre: "ANTROPOLOGÍA DEL ESTADO Y LAS POLÍTICAS PÚBLICAS", corto: "A. del Estado y Pol. Pub." },
      { codigo: "17027", nombre: "SUJETOS SOCIALES Y POLÍTICOS EN PERSPECTIVA ANTROPOLÓGICA", corto: "Suj. Soc. y Pol." },
      { codigo: "17028", nombre: "ABORDAJES ANTROPOLÓGICOS DE LA SALUD Y LAS BIOCIENCIAS", corto: "Salud y Biociencias" },
      { codigo: "17029", nombre: "ANTROPOLOGÍA Y EDUCACIÓN", corto: "Antrop. y Educación" },
    ],
    "Procesos socioeconómicos: producción, reproducción y transformación social": [
      { codigo: "17030", nombre: "DINÁMICAS CONTEMPORÁNEAS DEL CAMPO DE LA CULTURA", corto: "D. Cont. en el C. de la Cult." },
      { codigo: "17031", nombre: "DISCURSO, IMAGEN Y ALTERIDAD", corto: "Disc. Im. y Alteridad" },
      { codigo: "17032", nombre: "RELIGIONES, MITOS Y RITUALES EN LA MODERNIDAD", corto: "Relig. Mitos y Rituales" },
    ]
  }

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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-uba-primary mb-6 text-center">Planes de Estudio</h2>
          
          {/* Selector de plan */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center p-4 bg-[#1c2554] text-white rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">Plan de Estudios:</span>
                <span className={`text-lg ${planSeleccionado === "1985" ? "font-bold" : "opacity-70"}`}>
                  1985
                </span>
                <Switch
                  checked={planSeleccionado === "2023"}
                  onCheckedChange={(checked) => {
                    setPlanSeleccionado(checked ? "2023" : "1985")
                  }}
                  className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600"
                />
                <span className={`text-lg ${planSeleccionado === "2023" ? "font-bold" : "opacity-70"}`}>
                  2023
                </span>
              </div>
            </div>
          </div>

          {planSeleccionado === "2023" ? (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-uba-primary mb-2">Licenciatura en Ciencias Antropológicas</h3>
                <h4 className="text-xl font-semibold text-uba-secondary">Orientación Sociocultural</h4>
                <p className="text-gray-600 mt-2">Plan 2023</p>
              </div>

              {/* Ciclo de Formación General */}
              <Card className="border-2 border-uba-primary/20">
                <CardHeader className="bg-uba-primary/10">
                  <CardTitle className="text-xl text-uba-primary">Ciclo de Formación General (CFG)</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-3">
                    {materiasLicSocio2023.map((materia) => (
                      <div key={materia.codigo} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-uba-primary text-white border-uba-primary text-xs">
                              {materia.codigo}
                            </Badge>
                            <h4 className="font-medium text-gray-900">{materia.nombre}</h4>
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            <span className="font-medium">{materia.corto}</span> • <span className="text-xs font-mono">{materia.siglas}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ciclo de Formación Orientada */}
              <Card className="border-2 border-uba-secondary/20">
                <CardHeader className="bg-uba-secondary/10">
                  <CardTitle className="text-xl text-uba-secondary">Ciclo de Formación Orientada (CFO)</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  
                  {/* Materias básicas del CFO */}
                  <div>
                    <h4 className="font-semibold text-uba-secondary mb-4">Materias obligatorias</h4>
                    <div className="grid gap-3">
                      {materiasCFO.map((materia) => (
                        <div key={materia.codigo} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="bg-uba-secondary text-white border-uba-secondary text-xs">
                                {materia.codigo}
                              </Badge>
                              <h4 className="font-medium text-gray-900">{materia.nombre}</h4>
                            </div>
                            {materia.corto && (
                              <div className="mt-1 text-sm text-gray-600">
                                <span className="font-medium">{materia.corto}</span>
                              </div>
                            )}
                            {materia.correlatividad && (
                              <div className="mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                Correlatividad: {materia.correlatividad}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Materia electiva */}
                  <div>
                    <h4 className="font-semibold text-uba-secondary mb-4">Materia electiva</h4>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-orange-500 text-white border-orange-500 text-xs">
                          ELE23
                        </Badge>
                        <h4 className="font-medium text-gray-900">1 materia electiva de cualquier orientación, carrera o facultad de la UBA</h4>
                      </div>
                    </div>
                  </div>

                  {/* Elección A */}
                  <div>
                    <h4 className="font-semibold text-uba-secondary mb-4">Elección A <span className="text-sm font-normal">(1 materia)</span></h4>
                    <div className="grid gap-3">
                      {eleccionesA.map((materia) => (
                        <div key={materia.codigo} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-500 text-xs">
                                {materia.codigo}
                              </Badge>
                              <h4 className="font-medium text-gray-900">{materia.nombre}</h4>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              <span className="font-medium">{materia.corto}</span>
                            </div>
                            <div className="mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              Correlatividad: {materia.correlatividad}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Elección B por áreas */}
                  <div>
                    <h4 className="font-semibold text-uba-secondary mb-4">Elección B <span className="text-sm font-normal">(2 materias de la misma área temática)</span></h4>
                    <div className="space-y-6">
                      {Object.entries(eleccionesB).map(([area, materias]) => (
                        <div key={area}>
                          <h5 className="font-medium text-gray-800 mb-3 text-sm">{area}</h5>
                          <div className="grid gap-2 ml-4">
                            {materias.map((materia) => (
                              <div key={materia.codigo} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="bg-purple-500 text-white border-purple-500 text-xs">
                                      {materia.codigo}
                                    </Badge>
                                    <h4 className="font-medium text-gray-900 text-sm">{materia.nombre}</h4>
                                  </div>
                                  <div className="mt-1 text-xs text-gray-600">
                                    <span className="font-medium">{materia.corto}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seminario final */}
                  <div>
                    <h4 className="font-semibold text-uba-secondary mb-4">Seminario de investigación</h4>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-green-500 text-white border-green-500 text-xs">
                          17033
                        </Badge>
                        <h4 className="font-medium text-gray-900">SEMINARIO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL</h4>
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">Sem. Inv. Antrop. Socio.</span>
                      </div>
                      <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        Correlatividad: Al menos 10 materias del CFG, incluyendo METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA
                      </div>
                    </div>
                  </div>

                  {/* Idiomas */}
                  <div>
                    <h4 className="font-semibold text-uba-secondary mb-4">Idiomas</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">• Tres niveles de un idioma extranjero</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">• Tres niveles de un idioma latino</p>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-uba-primary mb-4">Plan de Estudios 1985</h3>
              <p className="text-gray-600 text-lg">Sección en construcción</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
