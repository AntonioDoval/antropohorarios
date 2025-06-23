
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Left side - Study Plans button */}
          <div>
            <Link href="/planes-estudio">
              <Button variant="ghost" className="text-uba-primary hover:bg-uba-primary hover:text-white">
                Planes de estudio y trayectoria
              </Button>
            </Link>
          </div>

          {/* Right side - External links */}
          <div className="flex space-x-4">
            <a
              href="http://www.filo.uba.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-uba-primary hover:text-uba-primary/80 text-sm font-medium"
            >
              Filo UBA
            </a>
            <a
              href="https://campus.uba.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-uba-primary hover:text-uba-primary/80 text-sm font-medium"
            >
              Campus
            </a>
            <a
              href="https://www.uba.ar/inscripciones/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-uba-primary hover:text-uba-primary/80 text-sm font-medium"
            >
              Inscripciones
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
