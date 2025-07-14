
import { ConfiguracionPlan, estructuraBasePlan } from "../planes-config"

export const configuracionLicArqueologia2023: ConfiguracionPlan = {
  id: 'lic-arqueologia-2023',
  titulo: 'Plan de Estudios 2023 - Licenciatura en Antropología con orientación en Arqueología',
  descripcion: 'Licenciatura en Antropología con orientación en Arqueología - Plan 2023',
  secciones: [
    ...estructuraBasePlan.secciones.map(seccion => {
      if (seccion.id === 'materias') {
        return {
          ...seccion,
          tarjetas: [
            {
              id: 'cfg',
              titulo: 'Ciclo de Formación General (CFG)',
              descripcion: 'Materias básicas comunes a todas las orientaciones',
              materias: [
                '17001', // EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES
                '17002', // HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I
                '17003', // HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II
                '17004', // PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA
                '17005', // PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA
                '17006', // PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA
                '17007', // ANTROPOLOGÍA BIOLÓGICA
                '17008', // INTRODUCCIÓN A LA ARQUEOLOGÍA
                '17009'  // ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD
              ]
            },
            {
              id: 'cfo-orientacion',
              titulo: 'Ciclo de Formación Orientada (CFO) - Orientación Arqueología',
              descripcion: 'Materias específicas de la orientación en arqueología',
              materias: [
                'PST23', // 1 Seminario de Prácticas Socioeducativas Territorializadas
                '17034', // ARQUEOLOGÍA DE ÁFRICA, EURASIA Y OCEANÍA
                '17035', // ARQUEOLOGÍA AMERICANA Y ARGENTINA I
                '17036', // ARQUEOLOGÍA AMERICANA Y ARGENTINA II
                '17037', // ARQUEOLOGÍA ARGENTINA
                '17038', // MATERIALES ARQUEOLÓGICOS Y SUS TECNOLOGÍAS
                '17039', // GEOLOGÍA PARA ARQUEÓLOGOS
                '17040', // TEORÍAS ARQUEOLÓGICAS CONTEMPORÁNEAS
                '17041', // MODELOS Y MÉTODOS DE ANÁLISIS EN ARQUEOLOGÍA
                '17042', // METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA
                '17043', // MÉTODOS CUANTITATIVOS EN ARQUEOLOGÍA
                'SEMARQ' // 1 Seminario Regular de la orientación en Arqueología
              ]
            },
            {
              id: 'cfo-eleccion-a',
              titulo: 'CFO - Elección A: 2 materias',
              descripcion: 'Elegir 2 materias entre las siguientes opciones especializadas',
              materias: [
                '17044', // EJERCICIO PROFESIONAL DE LA ARQUEOLOGÍA
                '17045', // MATERIALES BIOLÓGICOS EN ARQUEOLOGÍA
                '17046', // ARQUEOLOGÍA DE TIEMPOS MODERNOS
                '17047'  // ESTUDIOS INTERDISCIPLINARIOS EN ARQUEOLOGÍA
              ]
            },
            {
              id: 'cfo-seminario-investigacion',
              titulo: 'CFO - Seminario de Investigación',
              descripcion: 'Seminario final de investigación con trabajo de campo y laboratorio',
              materias: [
                '17048' // SEMINARIO DE INVESTIGACIÓN EN ARQUEOLOGÍA, TRABAJO DE CAMPO Y LABORATORIO
              ]
            }
          ]
        }
      }
      return seccion
    })
  ]
}
