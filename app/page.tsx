"use client"

import { HorariosDisplay } from "@/components/horarios-display"
import { PageLayout } from "@/components/layout/page-layout"
import { useEffect, useState } from "react"

export default function Home() {
  const [planesEstudiosHabilitado, setPlanesEstudiosHabilitado] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("planes-estudios-habilitado")
    setPlanesEstudiosHabilitado(stored !== "false")
  }, [])

  return (
    <PageLayout showPlanesEstudio={planesEstudiosHabilitado}>
      <HorariosDisplay />
      <AnnouncementModal />
    </PageLayout>
  )
}