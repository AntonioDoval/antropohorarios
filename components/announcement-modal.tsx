
"use client"

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, X } from "lucide-react"
import 'react-quill/dist/quill.snow.css'

// Importar ReactQuill dinámicamente para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [announcement, setAnnouncement] = useState<{
    enabled: boolean
    title: string
    text: string
  } | null>(null)

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

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!announcement) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-uba-primary">
            {announcement.title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: announcement.text }}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleClose} className="bg-uba-primary hover:bg-uba-primary/90">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AnuncioModal({ open, onClose, anuncio }) {
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; content: string } | null>(null)

  // Configuración del editor Quill
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  }

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'color', 'background', 'link'
  ]

  useEffect(() => {
    if (anuncio) {
      setTitulo(anuncio.titulo)
      setContenido(anuncio.contenido)
      setFechaVencimiento(anuncio.fechaVencimiento)
    } else {
      setTitulo('')
      setContenido('')
      setFechaVencimiento('')
    }
  }, [anuncio])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch(`/api/anuncios${anuncio ? `/${anuncio.id}` : ''}`, {
        method: anuncio ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo,
          contenido,
          fechaVencimiento,
        }),
      })

      if (res.ok) {
        setMessage({
          type: 'success',
          content: `Anuncio ${anuncio ? 'actualizado' : 'creado'} con éxito.`,
        })
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        const errorData = await res.json()
        setMessage({
          type: 'error',
          content: errorData.message || 'Hubo un error al guardar el anuncio.',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage({
        type: 'error',
        content: 'Error inesperado al guardar el anuncio.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{anuncio ? 'Editar Anuncio' : 'Crear Anuncio'}</DialogTitle>
        </DialogHeader>
        {message && (
          <Alert variant={message.type}>
            {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{message.content}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="titulo" className="text-uba-primary">
              Título del Anuncio
            </Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título del anuncio"
              className="border-uba-primary/30 focus:border-uba-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenido" className="text-uba-primary">
              Contenido del Anuncio
            </Label>
            <div className="border border-uba-primary/30 rounded-md">
              <ReactQuill
                value={contenido}
                onChange={setContenido}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Escribe aquí el contenido del anuncio..."
                style={{ minHeight: '120px' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fechaVencimiento" className="text-uba-primary">
              Fecha de Vencimiento
            </Label>
            <Input
              type="date"
              id="fechaVencimiento"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              className="border-uba-primary/30 focus:border-uba-primary"
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Anuncio'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
