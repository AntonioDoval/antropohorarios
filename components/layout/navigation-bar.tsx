
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

interface NavigationBarProps {
  showPlanesEstudio?: boolean
  showAdminButtons?: boolean
  onLogout?: () => void
}

export function NavigationBar({ 
  showPlanesEstudio = true, 
  showAdminButtons = false, 
  onLogout 
}: NavigationBarProps) {
  return (
    <nav className="bg-uba-primary border-t-4 border-uba-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <MobileNav>
            <div className="flex flex-col space-y-4">
              {showPlanesEstudio && (
                <Link href="/planes-estudio" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                  Planes de estudio
                </Link>
              )}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <a href="https://filo.uba.ar" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">filo.uba.ar</a>
                <a href="https://campus.filo.uba.ar/" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">Campus Virtual</a>
                <a href="https://suiganew.filo.uba.ar/" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">Inscripciones - SUIGA</a>
              </div>
            </div>
          </MobileNav>

          <div className="hidden md:flex items-center space-x-4">
            {showPlanesEstudio && (
              <Link href="/planes-estudio" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                Planes de estudio
              </Link>
            )}
          </div>

          {showAdminButtons ? (
            <div className="flex gap-3">
              <Link href="/">
                <Button className="bg-uba-secondary text-white font-bold hover:bg-white hover:text-uba-secondary transition-colors duration-200">
                  Ver Horarios Públicos
                </Button>
              </Link>
              <Button
                onClick={onLogout}
                className="bg-uba-secondary text-white font-bold hover:bg-white hover:text-uba-secondary transition-colors duration-200"
              >
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex space-x-8">
              <a href="https://filo.uba.ar" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">filo.uba.ar</a>
              <span className="text-white">|</span>
              <a href="https://campus.filo.uba.ar/" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">Campus Virtual</a>
              <span className="text-white">|</span>
              <a href="https://suiganew.filo.uba.ar/" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">Inscripciones - SUIGA</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
