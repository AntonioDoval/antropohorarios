
import { ConfiguracionPlan, estructuraBasePlan } from "../planes-config"

export const configuracionProfesorado2023: ConfiguracionPlan = {
  id: 'profesorado-2023',
  titulo: 'Plan de Estudios 2023 - Profesorado en Antropología',
  descripcion: 'Profesorado en Antropología - Plan 2023',
  secciones: [
    ...estructuraBasePlan.secciones.map(seccion => {
      if (seccion.id === 'materias') {
        return {
          ...seccion,
          tarjetas: [
            {
              id: 'cfg-basicas',
              titulo: 'Ciclo de Formación General (CFG) - Materias Básicas',
              descripcion: 'Materias obligatorias del ciclo de formación general sin correlatividades',
              materias: [
                '17001', // EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES
                '17002', // HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I
                '17003', // HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II
                '17004', // PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA
                '17005', // PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA
                '17006', // PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA
                '17007', // ANTROPOLOGÍA BIOLÓGICA
                '17008', // INTRODUCCIÓN A LA ARQUEOLOGÍA
                '17009', // ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD
                'PST23'  // 1 Seminario de Prácticas Socioeducativas Territorializadas
              ]
            },
            {
              id: 'cfg-correlativas-basicas',
              titulo: 'CFG - Con Correlatividad: Al menos 5 materias del CFG',
              descripcion: 'Materias que requieren haber cursado al menos 5 materias del CFG',
              materias: [
                '17022', // AMÉRICA EN CONTEXTO
                '17049'  // METODOLOGÍA DE LA INVESTIGACIÓN ANTROPOLÓGICA EN EDUCACIÓN
              ]
            },
            {
              id: 'cfg-eleccion-a',
              titulo: 'CFG - Elección A: 5 materias según orientación',
              descripcion: 'Elegir 5 materias de las siguientes opciones según la orientación deseada',
              materias: [
                // Licenciatura Sociocultural
                '17010', // SOCIEDADES, CULTURAS Y ESTADOS EN AMÉRICA PREHISPÁNICA Y COLONIAL
                '17013', // ANTROPOLOGÍA LINGÜÍSTICA
                '17012', // PROCESOS CULTURALES, FOLKLORE Y PRÁCTICAS SUBALTERNAS
                '17014', // TEORÍA SOCIAL
                '17015', // TEORÍAS DE LA SUBJETIVIDAD
                '17011', // PUEBLOS INDÍGENAS AMERICANOS
                // Licenciatura Arqueología
                '17035', // ARQUEOLOGÍA AMERICANA Y ARGENTINA I
                '17036', // ARQUEOLOGÍA AMERICANA Y ARGENTINA II
                '17037', // ARQUEOLOGÍA ARGENTINA
                '17034', // ARQUEOLOGÍA DE ÁFRICA, EURASIA Y OCEANÍA
                '17042', // METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA
                '17038', // MATERIALES ARQUEOLÓGICOS Y SUS TECNOLOGÍAS
                '17039'  // GEOLOGÍA PARA ARQUEÓLOGOS
              ]
            },
            {
              id: 'cfg-correlativas-avanzadas',
              titulo: 'CFG - Con Correlatividad: Al menos 10 materias del CFG',
              descripcion: 'Materias que requieren haber cursado al menos 10 materias del CFG',
              materias: [
                '17029', // ANTROPOLOGÍA Y EDUCACIÓN
                '17050'  // ANTROPOLOGÍA Y CONOCIMIENTO
              ]
            },
            {
              id: 'cfe-obligatorias',
              titulo: 'Ciclo de Formación Específica (CFE) - Obligatorias',
              descripcion: 'Materias obligatorias del profesorado',
              materias: [
                'ESI',   // Seminario de Educación Sexual Integral
                'DIDG',  // Didáctica General
                '17051', // DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA
                '17052'  // EXPERIENCIAS SOCIOEDUCATIVAS SITUADAS
              ]
            },
            {
              id: 'cfe-eleccion-b',
              titulo: 'CFE - Elección B: Departamento de Ciencias de la Educación',
              descripcion: 'Elegir 1 materia del Departamento de Ciencias de la Educación',
              materias: [
                'Historia Social General de la Educación',
                'Historia de la Educación Argentina',
                'Política Educacional',
                'SOCED' // Sociología de la Educación
              ]
            }
          ]
        }
      }
      return seccion
    })
  ]
}
