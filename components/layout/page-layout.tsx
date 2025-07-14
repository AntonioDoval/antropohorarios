
import React from "react"
import { Header } from "./header"
import { NavigationBar } from "./navigation-bar"
import { Footer } from "@/components/footer"

interface PageLayoutProps {
  children: React.ReactNode
  showPlanesEstudio?: boolean
  showAdminButtons?: boolean
  onLogout?: () => void
}

export function PageLayout({ 
  children, 
  showPlanesEstudio = true, 
  showAdminButtons = false, 
  onLogout 
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NavigationBar 
        showPlanesEstudio={showPlanesEstudio}
        showAdminButtons={showAdminButtons}
        onLogout={onLogout}
      />
      {children}
      <Footer />
    </div>
  )
}
