import { Mail, Facebook, Instagram, Twitter, Youtube, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-16">
      {/* Línea delgada del color secundario */}
      <div className="h-1 bg-uba-secondary"></div>

      {/* Contenido del footer */}
      <div className="bg-uba-primary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Información de contacto - arriba en móvil, derecha en desktop */}
            <div className="text-left order-1 md:order-2">
              <h3 className="text-white font-bold text-lg mb-3">Contacto</h3>

              <div className="text-white text-xs space-y-1 mb-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 text-uba-secondary flex-shrink-0" />
                  <span>5287-2829</span>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 text-uba-secondary flex-shrink-0" />
                  <span>Puán 480, 3° piso - 14:30 a 18:30 hs</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 text-uba-secondary flex-shrink-0" />
                  <span>depant@filo.uba.ar</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <a
                  href="https://facebook.com/depantropologia"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </a>

                <a
                  href="https://instagram.com/Antropo.Uba"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <a
                  href="https://twitter.com/AntropologiaUba"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </a>

                <a
                  href="https://www.youtube.com/@departamentocienciasantropolog"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Logo - abajo en móvil, izquierda en desktop */}
            <div className="flex-shrink-0 order-2 md:order-1">
              <img src="/images/footer-logo.svg" alt="UBA Filo Logo" className="h-12" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}