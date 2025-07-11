import { Suspense } from "react"
import { HorariosDisplay } from "@/components/horarios-display"
import { loadSampleData } from "@/lib/sample-data-loader"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header principal */}
      <header className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Círculo con ANT */}
              <div className="w-20 h-20 sm:w-18 sm:h-18 md:w-15 md:h-15 lg:w-22 lg:h-22 bg-[#c44928] rounded-full flex items-center justify-center flex-shrink-0 aspect-square">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-none">ANT</span>
              </div>
              
              {/* Texto principal */}
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#c44928] leading-tight">
                  Ciencias Antropológicas
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#c44928]">
                  <span className="font-bold">.UBA</span><span className="font-normal">FILO</span>
                </p>
              </div>
            </div>
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
                  Ver oferta horaria
                </a>
                <a
                  href="/planes-estudio"
                  className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2"
                >
                  Ver planes de estudio
                </a>
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
              <a
                href="/planes-estudio"
                className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2"
              >
                Ver planes de estudio
              </a>
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