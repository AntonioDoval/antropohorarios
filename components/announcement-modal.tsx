
"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AnnouncementData {
  enabled: boolean
  title: string
  content: string
}

export function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [announcement, setAnnouncement] = useState<AnnouncementData | null>(null)

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch('/api/announcement')
        if (response.ok) {
          const data = await response.json()
          if (data.enabled && (data.title || data.content)) {
            setAnnouncement(data)
            setIsOpen(true)
          }
        }
      } catch (error) {
        console.error("Error loading announcement:", error)
      }
    }

    fetchAnnouncement()
  }, [])

  if (!announcement) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-uba-primary pr-8">
            {announcement.title || "Anuncio"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 p-1 h-6 w-6"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="pt-2">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {announcement.content}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
