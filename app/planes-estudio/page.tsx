
"use client"

import React, { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"

interface MateriaDelPlan {
  cod85: string
  cod23: string
  nombre: string
  nombreCorto: string
  nombreSiglas: string
  ciclo: string
  electividad: string
  area: string
  correlatividad: string
}

export default function PlanesEstudioPage() {
  const [planSeleccionado, setPlanSeleccionado] = useState<"2023" | "1985">("2023")
  const [materias, setMaterias] = useState<MateriaDelPlan[]>([])

  useEffect(() => {
    // Datos del CSV parseados
    const materiasLicSocio2023: MateriaDelPlan[] = [
      { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES", nombreCorto: "Epistemo", nombreSiglas: "EPIS", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0733", cod23: "17002", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I", nombreCorto: "Historia y Teoría 1", nombreSiglas: "HTA1", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0742", cod23: "17003", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II", nombreCorto: "Historia y Teoría 2", nombreSiglas: "HTA2", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0730", cod23: "17004", nombre: "PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA", nombreCorto: "P. A. Soc. y Pol.", nombreSiglas: "PASYP", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0736", cod23: "17005", nombre: "PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA", nombreCorto: "P. A. Económica", nombreSiglas: "PAE", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0739", cod23: "17006", nombre: "PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA", nombreCorto: "P. Antrop. Simbólica", nombreSiglas: "PASIM", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA", nombreCorto: "Antrop. Biológica", nombreSiglas: "ABIO", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0732", cod23: "17008", nombre: "INTRODUCCIÓN A LA ARQUEOLOGÍA", nombreCorto: "Intro. Arqueo.", nombreSiglas: "IARQ", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "17009", nombre: "ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD", nombreCorto: "Arqueo. Leg. y Com.", nombreSiglas: "ALC", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEM85", cod23: "PST23", nombre: "1 Seminario de Prácticas Socioeducativas Territorializadas (PST)", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Variable", area: "", correlatividad: "" },
      { cod85: "0741", cod23: "17010", nombre: "SOCIEDADES, CULTURAS Y ESTADOS EN AMÉRICA PREHISPÁNICA Y COLONIAL", nombreCorto: "S. C. y E. en Am. Prehisp.", nombreSiglas: "SCEAP", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0735", cod23: "17011", nombre: "PUEBLOS INDÍGENAS AMERICANOS", nombreCorto: "P. Ind. Americanos", nombreSiglas: "PIA", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0740", cod23: "17012", nombre: "PROCESOS CULTURALES, FOLKLORE Y PRÁCTICAS SUBALTERNAS", nombreCorto: "Proc. Cult. Folkore y P. Sub.", nombreSiglas: "PCFPS", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0734", cod23: "17013", nombre: "ANTROPOLOGÍA LINGÜÍSTICA", nombreCorto: "Antrop. Lingüística", nombreSiglas: "ALING", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0745", cod23: "17014", nombre: "TEORÍA SOCIAL", nombreCorto: "Teoría Social", nombreSiglas: "TSOC", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0757, 0758", cod23: "17015", nombre: "TEORÍAS DE LA SUBJETIVIDAD", nombreCorto: "T. de la Subjetividad", nombreSiglas: "TSUBJ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "SEMSOC", cod23: "SEMSOC", nombre: "1 Seminario regular de Antropología Sociocultural", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Variable", area: "", correlatividad: "" },
      { cod85: "0744", cod23: "17016", nombre: "METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA", nombreCorto: "Met. e Inv. Antrop.", nombreSiglas: "MIA", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "0737", cod23: "17017", nombre: "ENFOQUE CUANTITATIVO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL", nombreCorto: "Enf. Cuantitativo", nombreSiglas: "CUANT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección A, 1 materia", area: "", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17018", nombre: "EJERCICIO PROFESIONAL DE LA ANTROPOLOGÍA SOCIOCULTURAL", nombreCorto: "Ej. Profesional Socio.", nombreSiglas: "EPAS", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección A, 1 materia", area: "", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "OPT85", cod23: "ELE23", nombre: "1 materia electiva de cualquier orientación, carrera o facultad de la UBA", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "17019", nombre: "CONQUISTAS, RESISTENCIAS Y MEMORIAS INDÍGENAS", nombreCorto: "Conq. Res. y Mem. Ind.", nombreSiglas: "CRMI", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Antropología histórica y memoria", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17020", nombre: "PUEBLOS INDÍGENAS Y ESTADOS", nombreCorto: "P. Ind. y Estados", nombreSiglas: "PIE", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Antropología histórica y memoria", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17021", nombre: "ANTROPOLOGÍAS LATINOAMERICANAS", nombreCorto: "A. Latinoamericanas", nombreSiglas: "ALAT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Antropología histórica y memoria", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17022", nombre: "AMÉRICA EN CONTEXTO", nombreCorto: "Am. en Contexto", nombreSiglas: "AEC", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Antropología histórica y memoria", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17023", nombre: "CAPITALISMO ACTUAL, TRABAJO Y TRABAJADORES", nombreCorto: "Cap. Trab. y Trabajadores", nombreSiglas: "CATT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos culturales, ideología y poder", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17024", nombre: "CONFIGURACIONES SOCIOAMBIENTALES Y TERRITORIALES EN EL ESPACIO URBANO Y RURAL", nombreCorto: "Conf. Soc. y Terr.", nombreSiglas: "SOCTER", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos culturales, ideología y poder", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17025", nombre: "RELACIONES DE GÉNERO Y ORGANIZACIÓN SOCIAL DE LOS CUIDADOS", nombreCorto: "Rel. de Género y Cuidados", nombreSiglas: "RGEN", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos culturales, ideología y poder", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17026", nombre: "ANTROPOLOGÍA DEL ESTADO Y LAS POLÍTICAS PÚBLICAS", nombreCorto: "A. del Estado y Pol. Pub.", nombreSiglas: "AEST", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos políticos, instituciones y prácticas", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17027", nombre: "SUJETOS SOCIALES Y POLÍTICOS EN PERSPECTIVA ANTROPOLÓGICA", nombreCorto: "Suj. Soc. y Pol.", nombreSiglas: "SUJ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos políticos, instituciones y prácticas", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17028", nombre: "ABORDAJES ANTROPOLÓGICOS DE LA SALUD Y LAS BIOCIENCIAS", nombreCorto: "Salud y Biociencias", nombreSiglas: "SALUD", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos políticos, instituciones y prácticas", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17029", nombre: "ANTROPOLOGÍA Y EDUCACIÓN", nombreCorto: "Antrop. y Educación", nombreSiglas: "AYE", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos políticos, instituciones y prácticas", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17030", nombre: "DINÁMICAS CONTEMPORÁNEAS DEL CAMPO DE LA CULTURA", nombreCorto: "D. Cont. en el C. de la Cult.", nombreSiglas: "CULT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos socioeconómicos: producción, reproducción y transformación social", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17031", nombre: "DISCURSO, IMAGEN Y ALTERIDAD", nombreCorto: "Disc. Im. y Alteridad", nombreSiglas: "DIA", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos socioeconómicos: producción, reproducción y transformación social", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17032", nombre: "RELIGIONES, MITOS Y RITUALES EN LA MODERNIDAD", nombreCorto: "Relig. Mitos y Rituales", nombreSiglas: "RIT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos socioeconómicos: producción, reproducción y transformación social", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "0746", cod23: "17033", nombre: "SEMINARIO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL", nombreCorto: "Sem. Inv. Antrop. Socio.", nombreSiglas: "SIASOC", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG, incluyendo METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA" }
    ]

    setMaterias(materiasLicSocio2023)
  }, [])

  // Función para convertir a title case
  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  // Función para obtener materias por ciclo
  const getMateriasByCiclo = (ciclo: string) => {
    return materias.filter(materia => materia.ciclo.includes(ciclo))
  }

  // Función para obtener materias por área temática
  const getMateriasByArea = (area: string) => {
    return materias.filter(materia => 
      materia.ciclo.includes("CFO") && 
      materia.area === area &&
      materia.electividad.includes("Elección B")
    )
  }

  // Función para renderizar una materia con colores alternados
  const renderMateria = (materia: MateriaDelPlan, index: number) => (
    <div key={materia.cod23} className={`flex items-start gap-2 py-2 px-3 rounded ${
      index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
    }`}>
      <span className="text-gray-600 mt-0.5">•</span>
      <span className="text-sm text-gray-900 leading-relaxed">
        {toTitleCase(materia.nombre)}
      </span>
    </div>
  )

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
            <MobileNav>
              <div className="flex flex-col space-y-4">
                <a href="/" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                  🏠 Horarios
                </a>
                <a href="/planes-estudio" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                  📚 Planes de estudio / Trayectoria
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <a href="https://filo.uba.ar" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">filo.uba.ar</a>
                  <a href="https://campus.filo.uba.ar/" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">Campus Virtual</a>
                  <a href="https://suiganew.filo.uba.ar/" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">Inscripciones - SUIGA</a>
                </div>
              </div>
            </MobileNav>

            <div className="hidden lg:flex items-center space-x-4">
              <a href="/" className="text-white hover:text-uba-secondary transition-all duration-200 flex items-center gap-2">
                🏠 Horarios
              </a>
              <a href="/planes-estudio" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                📚 Planes de estudio / Trayectoria
              </a>
            </div>
            <div className="hidden lg:flex space-x-8">
              <a href="https://filo.uba.ar" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">filo.uba.ar</a>
              <span className="text-white">|</span>
              <a href="https://campus.filo.uba.ar/" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">Campus Virtual</a>
              <span className="text-white">|</span>
              <a href="https://suiganew.filo.uba.ar/" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">Inscripciones - SUIGA</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <main className="py-8">
          {/* Selector de plan */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className={`text-lg font-medium ${planSeleccionado === "1985" ? "text-uba-primary" : "text-gray-500"}`}>
                Plan 1985
              </span>
              <Switch
                checked={planSeleccionado === "2023"}
                onCheckedChange={(checked) => setPlanSeleccionado(checked ? "2023" : "1985")}
                className="data-[state=checked]:bg-uba-primary"
              />
              <span className={`text-lg font-medium ${planSeleccionado === "2023" ? "text-uba-primary" : "text-gray-500"}`}>
                Plan 2023
              </span>
            </div>
          </div>

          {planSeleccionado === "2023" ? (
            <div className="space-y-6">
              {/* Ciclo de Formación General (CFG) */}
              <div className="bg-gray-50 border border-gray-300 rounded-lg">
                <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                  <h2 className="text-lg font-bold text-gray-800">
                    Ciclo de Formación General (CFG)
                  </h2>
                </div>
                <div className="p-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-1">
                      {getMateriasByCiclo("CFG").map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ciclo de Formación Orientada (CFO) */}
              <div className="bg-gray-50 border border-gray-300 rounded-lg">
                <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                  <h2 className="text-lg font-bold text-gray-800">
                    Ciclo de Formación Orientada (CFO)
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  
                  {/* Materias básicas del CFO */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-1">
                      {getMateriasByCiclo("CFO").filter(materia => 
                        !materia.electividad || 
                        materia.electividad === "Variable"
                      ).map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>

                  {/* Correlatividad: Al menos 5 materias del CFG */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 italic mb-3">
                      • Correlatividad: Al menos 5 materias del CFG
                    </div>
                    <div className="space-y-1">
                      {getMateriasByCiclo("CFO").filter(materia => 
                        materia.correlatividad === "Al menos 5 materias del CFG"
                      ).map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>

                  {/* Correlatividad: Al menos 10 materias del CFG */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 italic mb-3">
                      • Correlatividad: Al menos 10 materias del CFG
                    </div>
                    <div className="space-y-1">
                      {getMateriasByCiclo("CFO").filter(materia => 
                        materia.correlatividad === "Al menos 10 materias del CFG"
                      ).map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>

                  {/* Una materia a elegir entre */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 italic mb-3">
                      • Una materia a elegir entre:
                    </div>
                    <div className="space-y-1">
                      {getMateriasByCiclo("CFO").filter(materia => 
                        materia.electividad === "Elección A, 1 materia"
                      ).map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>

                  {/* Materia electiva */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-1">
                      {getMateriasByCiclo("CFO").filter(materia => 
                        materia.nombre.includes("materia electiva")
                      ).map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>

                  {/* Dos materias a elegir dentro de la misma área temática */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 italic mb-4">
                      • Dos materias a elegir dentro de la misma área temática:
                    </div>
                    
                    {/* Antropología histórica y memoria */}
                    <div className="mb-4">
                      <div className="font-medium text-blue-700 mb-2 text-sm underline">
                        Antropología histórica y memoria
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <div className="space-y-1">
                          {getMateriasByArea("Antropología histórica y memoria").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>

                    {/* Procesos culturales, ideología y poder */}
                    <div className="mb-4">
                      <div className="font-medium text-blue-700 mb-2 text-sm underline">
                        Procesos culturales, ideología y poder
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <div className="space-y-1">
                          {getMateriasByArea("Procesos culturales, ideología y poder").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>

                    {/* Procesos políticos, instituciones y prácticas */}
                    <div className="mb-4">
                      <div className="font-medium text-blue-700 mb-2 text-sm underline">
                        Procesos políticos, instituciones y prácticas
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <div className="space-y-1">
                          {getMateriasByArea("Procesos políticos, instituciones y prácticas").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>

                    {/* Procesos socioeconómicos */}
                    <div className="mb-4">
                      <div className="font-medium text-blue-700 mb-2 text-sm underline">
                        Procesos socioeconómicos: producción, reproducción y transformación social
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <div className="space-y-1">
                          {getMateriasByArea("Procesos socioeconómicos: producción, reproducción y transformación social").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seminario de investigación */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 italic mb-3">
                      • Correlatividad: Al menos 10 materias del CFG, incluyendo Metodología e Investigación Antropológica
                    </div>
                    <div className="space-y-1">
                      {getMateriasByCiclo("CFO").filter(materia => 
                        materia.correlatividad.includes("METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA")
                      ).map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Idiomas */}
              <div className="bg-gray-50 border border-gray-300 rounded-lg">
                <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                  <h2 className="text-lg font-bold text-gray-800">
                    Idiomas
                  </h2>
                </div>
                <div className="p-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-1">
                      <div className="flex items-start gap-2 py-2 px-3 rounded bg-gray-50">
                        <span className="text-gray-600 mt-0.5">•</span>
                        <span className="text-sm text-gray-900 leading-relaxed">Tres Niveles De Un Idioma Anglosajón</span>
                      </div>
                      <div className="flex items-start gap-2 py-2 px-3 rounded bg-blue-50">
                        <span className="text-gray-600 mt-0.5">•</span>
                        <span className="text-sm text-gray-900 leading-relaxed">Tres Niveles De Un Idioma Latino</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-3xl font-bold text-uba-primary mb-4">Plan de Estudios 1985</h2>
              <p className="text-gray-600">Esta sección está en construcción.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
