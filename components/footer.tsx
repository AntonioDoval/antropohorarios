import { Mail, Facebook, Instagram, Twitter, Youtube, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-16">
      {/* Línea delgada del color secundario */}
      <div className="h-1 bg-uba-secondary"></div>

      {/* Contenido del footer */}
      <div className="bg-uba-primary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo a la izquierda */}
            <div className="flex-shrink-0">
              <img src="/images/footer-logo.svg" alt="UBA Filo Logo" className="h-12" />
            </div>

            {/* Información de contacto a la derecha */}
            <div className="text-left">
              <h3 className="text-white font-bold text-lg mb-3">Contacto</h3>

              <div className="text-white text-xs space-y-1 mb-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 text-uba-secondary" />
                  <span>5287-2829</span>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 text-uba-secondary" />
                  <span>Puán 480, 3° piso - 14:30 a 18:30 hs</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 text-uba-secondary" />
                  <span>depant[at]filo.uba.ar</span>
                </div>
              </div>

              <div className="flex space-x-2"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}