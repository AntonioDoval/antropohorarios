
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Announcement {
  enabled: boolean
  title: string
  text: string
}

export function AnnouncementModal() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch('/api/announcement')
        const data = await response.json()
        
        if (data.enabled && (data.title || data.text)) {
          setAnnouncement(data)
          setIsOpen(true)
        }
      } catch (error) {
        console.error('Error fetching announcement:', error)
      }
    }

    fetchAnnouncement()
  }, [])

  if (!announcement || !announcement.enabled) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-uba-primary pr-8">
            {announcement.title || 'Anuncio'}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div 
            className="text-gray-700 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: announcement.text }}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={() => setIsOpen(false)}
            className="bg-uba-primary hover:bg-uba-primary/90"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
