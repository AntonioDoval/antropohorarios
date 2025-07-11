"use client"

import React, { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"

export default function PlanesEstudioPage() {
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
                  🏠 Horarios
                </a>
                <a
                  href="/planes-estudio"
                  className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2"
                >
                  📚 Planes de estudio / Trayectoria
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
                href="/"
                className="text-white hover:text-uba-secondary transition-all duration-200 flex items-center gap-2"
              >
                🏠 Horarios
              </a>
              <a
                href="/planes-estudio"
                className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2"
              >
                📚 Planes de estudio / Trayectoria
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

      <div className="max-w-7xl mx-auto p-6">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-uba-primary mb-4">Planes de Estudio</h2>
            <p className="text-gray-600">Esta sección está en construcción.</p>
          </div>
        </main>
      </div>
    </div>
  )
}