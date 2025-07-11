import { Suspense } from "react"
import { CsvUploader } from "@/components/csv-uploader"
import { HorariosDisplay } from "@/components/horarios-display"
import { loadSampleData } from "@/lib/sample-data-loader"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { usePathname } from 'next/navigation'

export default function HomePage() {
  const pathname = usePathname()

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
          <div className="flex justify-between items-center py-3">
            {/* Menú hamburguesa para móviles */}
            <MobileNav>
              <div className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2"
                >
                  Oferta Horaria
                </a>
                {pathname !== "/planes-estudio" && (
                  <a
                    href="/planes-estudio"
                    className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2"
                  >
                    Planes de estudio
                  </a>
                )}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <a
                    href="https://filo.uba.ar"
                    className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200"
                  >
                    filo.uba.ar
                  </a>
                  <a
                    href="https://campus.filo.uba.ar/"
                    className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200"
                  >
                    Campus Virtual
                  </a>
                  <a
                    href="https://suiganew.filo.uba.ar/"
                    className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200"
                  >
                    Inscripciones - SUIGA
                  </a>
                </div>
              </div>
            </MobileNav>

            {/* Menú para pantallas grandes */}
            <div className="hidden lg:flex items-center space-x-4">
              {pathname !== "/planes-estudio" && (
                <a
                  href="/planes-estudio"
                  className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2"
                >
                  Planes de estudio
                </a>
              )}
            </div>
            <div className="hidden lg:flex space-x-8">
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
        <Suspense fallback={<div className="text-center py-8">Cargando horarios...</div>}>
          <HorariosDisplay />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}