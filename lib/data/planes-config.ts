
export interface SeccionPlan {
  id: string
  titulo: string
  tipo: 'materias' | 'descripcion' | 'perfil' | 'alcances' | 'idiomas' | 'links'
  enDesarrollo?: boolean
  contenido?: string
  tarjetas?: TarjetaCiclo[]
  links?: LinkDocumento[]
}

export interface TarjetaCiclo {
  id: string
  titulo: string
  descripcion?: string
  materias: string[] // IDs de materias o texto literal
  estilo?: 'normal' | 'electiva' | 'correlativa'
}

export interface LinkDocumento {
  titulo: string
  url?: string
  enDesarrollo?: boolean
}

export interface ConfiguracionPlan {
  id: string
  titulo: string
  descripcion: string
  secciones: SeccionPlan[]
}

// Estructura base visual para todos los planes
export const estructuraBasePlan: Omit<ConfiguracionPlan, 'id' | 'titulo' | 'descripcion'> = {
  secciones: [
    {
      id: 'descripcion',
      titulo: 'Descripción del Plan',
      tipo: 'descripcion',
      enDesarrollo: true,
      contenido: 'Esta sección está en desarrollo.'
    },
    {
      id: 'materias',
      titulo: 'Plan de Estudios',
      tipo: 'materias',
      tarjetas: [] // Se define en cada plan específico
    },
    {
      id: 'idiomas',
      titulo: 'Idiomas',
      tipo: 'idiomas'
    },
    {
      id: 'perfil',
      titulo: 'Perfil del Graduado',
      tipo: 'perfil',
      enDesarrollo: true,
      contenido: 'Esta sección está en desarrollo.'
    },
    {
      id: 'alcances',
      titulo: 'Alcances del Título',
      tipo: 'alcances',
      enDesarrollo: true,
      contenido: 'Esta sección está en desarrollo.'
    },
    {
      id: 'documentacion',
      titulo: 'Documentación',
      tipo: 'links',
      links: [
        {
          titulo: 'Resolución',
          enDesarrollo: true
        },
        {
          titulo: 'Documentación detallada',
          enDesarrollo: true
        }
      ]
    }
  ]
}
