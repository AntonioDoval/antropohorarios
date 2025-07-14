
import { ConfiguracionPlan, estructuraBasePlan } from "../planes-config"

export const configuracionLicSociocultural1985: ConfiguracionPlan = {
  id: 'lic-sociocultural-1985',
  titulo: 'Plan de Estudios 1985 - Licenciatura en Antropología Sociocultural',
  descripcion: 'Licenciatura en Antropología con orientación Sociocultural - Plan 1985',
  secciones: [
    ...estructuraBasePlan.secciones.map(seccion => {
      if (seccion.id === 'materias') {
        return {
          ...seccion,
          tarjetas: [
            {
              id: 'ciclo-comun',
              titulo: 'Ciclo Común',
              descripcion: 'Materias básicas comunes del plan 1985',
              materias: [
                '0730', // ANTROPOLOGÍA SISTEMÁTICA I
                'Historia Social General',
                '0732', // FUNDAMENTOS DE PREHISTORIA
                '0733', // HISTORIA DE LA TEORÍA ANTROPOLÓGICA
                '0734', // ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA
                '0735', // SISTEMAS SOCIOCULTURALES DE AMÉRICA I
                '0736', // ANTROPOLOGÍA SISTEMÁTICA II
                '0737', // MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA
                '0738', // ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA
                '0739', // ANTROPOLOGÍA SISTEMÁTICA III
                '0740'  // FOLKLORE GENERAL
              ]
            },
            {
              id: 'orientacion-sociocultural',
              titulo: 'Ciclo Orientación Sociocultural',
              descripcion: 'Materias específicas de la orientación sociocultural',
              materias: [
                '0741', // SISTEMAS SOCIOCULTURALES DE AMÉRICA II
                '0742', // TEORÍAS ANTROPOLÓGICAS CONTEMPORÁNEAS
                '0743', // EPISTEMOLOGÍA Y MÉTODOS DE INVESTIGACIÓN SOCIAL
                '0744', // METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN DE CAMPO
                '1 materia electiva de cualquier orientación, carrera o facultad de la UBA',
                '1 materia electiva de cualquier orientación, carrera o facultad de la UBA',
                '1 Seminario Regular de la orientación Sociocultural',
                '1 Seminario Regular de la orientación Sociocultural',
                '1 Seminario Regular de la orientación Sociocultural'
              ]
            },
            {
              id: 'eleccion-a',
              titulo: 'Elección A',
              descripcion: 'Elegir entre las siguientes materias de psicología',
              materias: [
                '0757', // PSICOLOGÍA GENERAL
                '0758'  // PSICOLOGÍA EVOLUTIVA
              ]
            },
            {
              id: 'eleccion-b',
              titulo: 'Elección B',
              descripcion: 'Elegir entre las siguientes materias complementarias',
              materias: [
                '0745', // TEORÍA SOCIOLÓGICA
                'Sociología de la Educación'
              ]
            },
            {
              id: 'licenciatura-sociocultural',
              titulo: 'Licenciatura Sociocultural',
              descripcion: 'Seminario final de investigación',
              materias: [
                '0746' // SEMINARIO DE INVESTIGACIÓN ANUAL (ORIENTACIÓN SOCIOCULTURAL)
              ]
            }
          ]
        }
      }
      return seccion
    })
  ]
}
