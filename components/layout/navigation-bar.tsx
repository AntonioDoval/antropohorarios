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
    <nav style={{ backgroundColor: '#c44928' }} className="border-t-4 border-uba-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-3"> {/* Changed to justify-end */}
          <MobileNav>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <a href="https://filo.uba.ar" className="text-uba-red hover:text-uba-orange font-medium transition-all duration-200 transform hover:translate-x-1">filo.uba.ar</a>
                <a href="https://campus.filo.uba.ar/" className="text-uba-red hover:text-uba-orange font-medium transition-all duration-200 transform hover:translate-x-1">Campus Virtual</a>
                <a href="https://suiganew.filo.uba.ar/" className="text-uba-red hover:text-uba-orange font-medium transition-all duration-200 transform hover:translate-x-1">Inscripciones - SUIGA</a>
              </div>
            </div>
          </MobileNav>

          {showAdminButtons ? (
            <div className="flex gap-3">
              <Link href="/">
                <Button className="bg-uba-orange text-white font-bold hover:bg-white hover:text-uba-primary transition-colors duration-200">
                  Ver Horarios Públicos
                </Button>
              </Link>
              <Button
                onClick={onLogout}
                className="bg-uba-orange text-white font-bold hover:bg-white hover:text-uba-primary transition-colors duration-200"
              >
                Cerrar Sesión
              </Button>
            </div>
          ) : (
      <div className="hidden md:flex items-center justify-end space-x-8 ml-auto">
        <a href="https://filo.uba.ar" className="text-white hover:font-bold text-sm transition-transform duration-200 transform hover:scale-110">filo.uba.ar</a>
        <span className="text-white">|</span>
        <a href="https://campus.filo.uba.ar/" className="text-white hover:font-bold text-sm transition-transform duration-200 transform hover:scale-110">Campus Virtual</a>
        <span className="text-white">|</span>
        <a href="https://suiganew.filo.uba.ar/" className="text-white hover:font-bold text-sm transition-transform duration-200 transform hover:scale-110">Inscripciones - SUIGA</a>
      </div>
          )}
        </div>
      </div>
    </nav>
  )
}