
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Calendar, Info, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { 
  getPlanesDeEstudios, 
  enrichAsignaturasWithPlanInfo,
  getAsignaturasPorCiclo,
  filtrarAsignaturasPorOrientacion,
  type AsignaturaConPlan,
  type PlanDeEstudios 
} from "@/lib/planes-utils"

interface Filtros {
  plan: string
  orientacion: string
}

export default function PlanesEstudioPage() {
  const [planes, setPlanes] = useState<PlanDeEstudios[]>([])
  const [asignaturas, setAsignaturas] = useState<AsignaturaConPlan[]>([])
  const [filtros, setFiltros] = useState<Filtros>({
    plan: "",
    orientacion: ""
  })
  const [asignaturasPorCiclo, setAsignaturasPorCiclo] = useState<{ [ciclo: string]: AsignaturaConPlan[] }>({})

  useEffect(() => {
    const planesData = getPlanesDeEstudios()
    setPlanes(planesData)

    // Si hay datos de horarios en localStorage, procesarlos
    const horariosData = localStorage.getItem("horarios-data")
    if (horariosData) {
      try {
        const data = JSON.parse(horariosData)
        const asignaturasEnriquecidas = enrichAsignaturasWithPlanInfo(data.asignaturas || [])
        setAsignaturas(asignaturasEnriquecidas)
      } catch (error) {
        console.error("Error al procesar datos de horarios:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (asignaturas.length > 0 && filtros.orientacion) {
      const asignaturasFiltradas = filtrarAsignaturasPorOrientacion(asignaturas, [filtros.orientacion])
      const porCiclo = getAsignaturasPorCiclo(asignaturasFiltradas, filtros.orientacion)
      setAsignaturasPorCiclo(porCiclo)
    } else {
      setAsignaturasPorCiclo({})
    }
  }, [asignaturas, filtros])

  const planesDisponibles = Array.from(new Set(planes.map(p => p.año))).sort()
  const orientacionesDisponibles = planes
    .filter(p => filtros.plan === "" || p.año === filtros.plan)
    .map(p => p.orientacion)

  const renderCorrelatividades = (correlatividad: string) => {
    if (!correlatividad || correlatividad.trim() === "") return null
    
    return (
      <div className="mt-2 text-sm text-gray-600">
        <span className="font-medium">Correlatividades:</span> {correlatividad}
      </div>
    )
  }

  const renderAsignaturas = (asignaturasDelCiclo: AsignaturaConPlan[], ciclo: string) => {
    const electivas = asignaturasDelCiclo.filter(a => 
      a.planInfo?.electividad?.toLowerCase().includes("electiv") || 
      a.planInfo?.electividad?.toLowerCase().includes("optativ")
    )
    const obligatorias = asignaturasDelCiclo.filter(a => 
      !a.planInfo?.electividad?.toLowerCase().includes("electiv") && 
      !a.planInfo?.electividad?.toLowerCase().includes("optativ")
    )

    return (
      <div className="space-y-4">
        {obligatorias.length > 0 && (
          <div>
            <h4 className="font-medium text-uba-primary mb-2">Asignaturas Obligatorias</h4>
            <div className="grid gap-2">
              {obligatorias.map(asignatura => (
                <Card key={asignatura.id} className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{asignatura.materia}</h5>
                      {asignatura.catedra && (
                        <p className="text-sm text-gray-600">Cátedra: {asignatura.catedra}</p>
                      )}
                      {asignatura.planInfo?.area && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {asignatura.planInfo.area}
                        </Badge>
                      )}
                      {renderCorrelatividades(asignatura.planInfo?.correlatividad || "")}
                    </div>
                    <div className="ml-4 text-right">
                      {asignatura.planInfo?.equivalencia?.cod23 && (
                        <div className="text-xs text-gray-500">
                          Código: {asignatura.planInfo.equivalencia.cod23}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {electivas.length > 0 && (
          <div>
            <h4 className="font-medium text-uba-primary mb-2">Asignaturas Electivas/Optativas</h4>
            <div className="grid gap-2">
              {electivas.map(asignatura => (
                <Card key={asignatura.id} className="p-3 bg-yellow-50 border-yellow-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{asignatura.materia}</h5>
                      {asignatura.catedra && (
                        <p className="text-sm text-gray-600">Cátedra: {asignatura.catedra}</p>
                      )}
                      <Badge variant="outline" className="mt-1 text-xs bg-yellow-100">
                        {asignatura.planInfo?.electividad}
                      </Badge>
                      {asignatura.planInfo?.area && (
                        <Badge variant="outline" className="mt-1 ml-1 text-xs">
                          {asignatura.planInfo.area}
                        </Badge>
                      )}
                      {renderCorrelatividades(asignatura.planInfo?.correlatividad || "")}
                    </div>
                    <div className="ml-4 text-right">
                      {asignatura.planInfo?.equivalencia?.cod23 && (
                        <div className="text-xs text-gray-500">
                          Código: {asignatura.planInfo.equivalencia.cod23}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
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

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-uba-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Oferta Horaria
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="bg-uba-primary text-white hover:bg-uba-primary/90">
                <Calendar className="h-4 w-4 mr-2" />
                Oferta horaria
              </Button>
            </Link>
          </div>

          <h2 className="text-4xl font-bold text-uba-primary mb-2">
            Planes de Estudio y Trayectoria
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Explorá los planes de estudio según año y orientación. Consultá las asignaturas organizadas por ciclo, 
            sus correlatividades y la información específica de cada carrera.
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-uba-primary">
              <BookOpen className="h-5 w-5" />
              Seleccionar Plan y Orientación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Plan de Estudios
                </label>
                <Select
                  value={filtros.plan}
                  onValueChange={(value) => setFiltros(prev => ({ ...prev, plan: value, orientacion: "" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {planesDisponibles.map(plan => (
                      <SelectItem key={plan} value={plan}>
                        Plan {plan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Orientación
                </label>
                <Select
                  value={filtros.orientacion}
                  onValueChange={(value) => setFiltros(prev => ({ ...prev, orientacion: value }))}
                  disabled={!filtros.plan}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar orientación" />
                  </SelectTrigger>
                  <SelectContent>
                    {orientacionesDisponibles.map(orientacion => (
                      <SelectItem key={orientacion} value={orientacion}>
                        {orientacion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenido según selección */}
        {!filtros.plan || !filtros.orientacion ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Selecciona un plan de estudios y una orientación para ver las asignaturas organizadas por ciclo.
            </AlertDescription>
          </Alert>
        ) : Object.keys(asignaturasPorCiclo).length === 0 ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No se encontraron asignaturas para la selección actual. Asegúrate de haber cargado los datos de horarios y planes de estudio.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            {Object.entries(asignaturasPorCiclo)
              .sort(([a], [b]) => {
                // Ordenar ciclos: números primero, luego alfabético
                const aNum = parseInt(a)
                const bNum = parseInt(b)
                if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum
                if (!isNaN(aNum)) return -1
                if (!isNaN(bNum)) return 1
                return a.localeCompare(b)
              })
              .map(([ciclo, asignaturasDelCiclo]) => (
                <Card key={ciclo}>
                  <CardHeader>
                    <CardTitle className="text-uba-primary">
                      {ciclo === "Sin clasificar" ? "Sin clasificar" : `${ciclo}° Ciclo`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderAsignaturas(asignaturasDelCiclo, ciclo)}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
