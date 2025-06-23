import { Suspense } from "react"
import { HorariosDisplay } from "@/components/horarios-display"
import { Footer } from "@/components/footer"

export default function HomePage() {
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
          <div className="flex justify-center space-x-8 py-3">
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
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-center py-8">Cargando horarios...</div>}>
          <HorariosDisplay />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
