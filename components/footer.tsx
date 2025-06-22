import { Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

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

            {/* Redes sociales a la derecha */}
            <div className="text-center">
              <h3 className="text-white font-bold text-lg mb-3">¡Seguinos en redes!</h3>

              <div className="flex space-x-3">
                <a
                  href="mailto:depantropologia@gmail.com"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>

                <a
                  href="https://facebook.com/depantropologia"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>

                <a
                  href="https://instagram.com/Antropo.Uba"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>

                <a
                  href="https://twitter.com/AntropologiaUba"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>

                <a
                  href="https://www.youtube.com/@departamentocienciasantropolog"
                  className="text-uba-secondary hover:text-white transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
