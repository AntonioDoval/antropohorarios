import type React from "react"
import type { Metadata } from "next"
import { Bitter } from "next/font/google"
import "./globals.css"

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Horarios - Ciencias Antropológicas UBA",
  description: "Horarios de asignaturas de la carrera de Ciencias Antropológicas - Universidad de Buenos Aires",
  generator: 'v0.dev',
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={bitter.variable}>
      <body className="font-bitter antialiased">{children}</body>
    </html>
  )
}
