
"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PlanesEstudioPage() {
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
          <h1 className="text-4xl font-bold text-uba-primary mb-2">Asignaturas</h1>
          <Badge className="bg-orange-500 text-white text-lg px-4 py-2">PROFESORADO</Badge>
        </div>

        {/* Ciclo de Formación General */}
        <Card className="mb-8 border-2 border-orange-300">
          <CardHeader className="bg-orange-100">
            <CardTitle className="text-xl text-uba-primary flex items-center gap-2">
              <span className="text-orange-600">+</span>
              Ciclo de Formación General (CFG)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Materias obligatorias */}
              <div className="lg:col-span-2">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Epistemología de las Ciencias Sociales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Historia y Teoría de la Antropología I</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Historia y Teoría de la Antropología II</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Problemas de Antropología Social y Política</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Problemas de Antropología Económica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Problemas de Antropología Simbólica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Antropología Biológica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Introducción a la Arqueología</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Arqueología, Legislación y Comunidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>1 Seminario de Prácticas Socioeducativas Territorializadas (PST)</span>
                  </li>
                </ul>

                <Separator className="my-4" />

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>América en contexto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Metodología de la investigación antropológica en educación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="font-semibold">5 materias</span> a elección entre la oferta de licenciatura:
                  </li>
                </ul>

                {/* Orientaciones */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-300 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Orientación Sociocultural:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Sociedades, Culturas Y Estados De América Prehispánica Y Colonial</li>
                      <li>• Antropología Lingüística</li>
                      <li>• Procesos Culturales, Folklore Y Prácticas Subalternas</li>
                      <li>• Teoría Social</li>
                      <li>• Teorías de la Subjetividad</li>
                      <li>• Pueblos Indígenas Americanos</li>
                    </ul>
                  </div>
                  <div className="border border-gray-300 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Orientación en Arqueología:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Arqueología Americana Y Argentina I</li>
                      <li>• Arqueología Americana Y Argentina II</li>
                      <li>• Arqueología Argentina</li>
                      <li>• Arqueología de Eurasia Y Oceanía</li>
                      <li>• Metodología Y Técnicas de la Investigación Arqueológica</li>
                      <li>• Geología Para Arqueólogos</li>
                      <li>• Materiales Arqueológicos Y Sus Tecnologías</li>
                    </ul>
                  </div>
                </div>

                <ul className="space-y-2 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Antropología y Educación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Antropología y Conocimiento</span>
                  </li>
                </ul>
              </div>

              {/* Correlatividades */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Correlatividades</h4>
                  <p className="text-sm text-gray-600 italic mb-2">Para cursar debe tener:</p>
                  <p className="text-sm text-gray-600 font-semibold">CBC aprobado</p>
                  
                  <div className="mt-6 text-sm text-gray-600">
                    <p className="italic">Al menos 5 materias cursadas del CFG</p>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="italic">Al menos 10 materias cursadas del CFG</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ciclo de Formación Específica */}
        <Card className="mb-8 border-2 border-orange-300">
          <CardHeader className="bg-orange-100">
            <CardTitle className="text-xl text-uba-primary flex items-center gap-2">
              <span className="text-orange-600">+</span>
              Ciclo de Formación Específica (CFE)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Seminario de Educación Sexual Integral</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Didáctica General</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Didáctica Especial y Prácticas de la Enseñanza</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Experiencias Socioeducativas Situadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="font-semibold">2 materias</span> a elección del Departamento de Cs. de la Educación:
                  </li>
                </ul>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-300 p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                      <li>• Historia Social General de la Educación</li>
                      <li>• Historia de la Educación Argentina</li>
                    </ul>
                  </div>
                  <div className="border border-gray-300 p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                      <li>• Política Educacional</li>
                      <li>• Sociología de la Educación</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">+ Idiomas**</h4>
                  <ul className="text-sm space-y-1 text-blue-700">
                    <li>• 3 niveles de un idioma anglosajón</li>
                    <li>• 3 niveles de un idioma latino</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Correlatividades</h4>
                  <p className="text-sm text-gray-600 italic mb-2">Para cursar debe tener:</p>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="italic">Al menos 10 materias cursadas del CFG</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
