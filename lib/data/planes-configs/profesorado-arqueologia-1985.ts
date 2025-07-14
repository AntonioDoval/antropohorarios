
import { ConfiguracionPlan, estructuraBasePlan } from "../planes-config"

export const configuracionProfArqueologia1985: ConfiguracionPlan = {
  id: 'prof-arqueologia-1985',
  titulo: 'Plan de Estudios 1985 - Profesorado en Antropología con orientación en Arqueología',
  descripcion: 'Profesorado en Antropología con orientación en Arqueología - Plan 1985',
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
              id: 'orientacion-arqueologia',
              titulo: 'Ciclo Orientación Arqueología',
              descripcion: 'Materias específicas de la orientación en arqueología',
              materias: [
                '0748', // TEORÍA ARQUEOLÓGICA CONTEMPORÁNEA
                '0721', // METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA
                '0750', // PREHISTORIA DEL VIEJO MUNDO
                '0751', // PREHISTORIA AMERICANA Y ARGENTINA I
                '0752', // GEOLOGÍA GENERAL Y GEOMORFOLOGÍA DEL CUARTARIO
                '0712', // PREHISTORIA AMERICANA Y ARGENTINA II
                '0753', // MODELOS Y MÉTODOS DE ANÁLISIS EN ECONOMÍA PREHISTÓRICA
                '0722', // ERGOLOGÍA Y TECNOLOGÍA
                '0754', // ARQUEOLOGÍA ARGENTINA
                '1 materia electiva de cualquier orientación, carrera o facultad de la UBA',
                '1 Seminario Regular de la orientación en Arqueología'
              ]
            },
            {
              id: 'profesorado',
              titulo: 'Profesorado',
              descripcion: 'Materias específicas del profesorado',
              materias: [
                'Didáctica General',
                '7127' // DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA
              ]
            }
          ]
        }
      }
      return seccion
    })
  ]
}
