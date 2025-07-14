
import { ConfiguracionPlan, estructuraBasePlan } from "../planes-config"

export const configuracionLicSociocultural2023: ConfiguracionPlan = {
  id: 'lic-sociocultural-2023',
  titulo: 'Plan de Estudios 2023 - Licenciatura en Antropología Sociocultural',
  descripcion: 'Licenciatura en Antropología con orientación Sociocultural - Plan 2023',
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
              titulo: 'Ciclo de Formación Orientada (CFO) - Orientación Sociocultural',
              descripcion: 'Materias específicas de la orientación sociocultural',
              materias: [
                'PST23', // 1 Seminario de Prácticas Socioeducativas Territorializadas
                '17010', // SOCIEDADES, CULTURAS Y ESTADOS EN AMÉRICA PREHISPÁNICA Y COLONIAL
                '17011', // PUEBLOS INDÍGENAS AMERICANOS
                '17012', // PROCESOS CULTURALES, FOLKLORE Y PRÁCTICAS SUBALTERNAS
                '17013', // ANTROPOLOGÍA LINGÜÍSTICA
                '17014', // TEORÍA SOCIAL
                '17015', // TEORÍAS DE LA SUBJETIVIDAD
                'SEMSOC', // 1 Seminario regular de Antropología Sociocultural
                '17016', // METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA
                'ELE23'  // 1 materia electiva de cualquier orientación, carrera o facultad de la UBA
              ]
            },
            {
              id: 'cfo-eleccion-a',
              titulo: 'CFO - Elección A: 1 materia',
              descripcion: 'Elegir 1 materia entre las siguientes opciones',
              materias: [
                '17017', // ENFOQUE CUANTITATIVO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL
                '17018'  // EJERCICIO PROFESIONAL DE LA ANTROPOLOGÍA SOCIOCULTURAL
              ]
            },
            {
              id: 'cfo-eleccion-b-historia',
              titulo: 'CFO - Elección B: Antropología histórica y memoria (2 materias)',
              descripcion: 'Elegir 2 materias del área de Antropología histórica y memoria',
              materias: [
                '17019', // CONQUISTAS, RESISTENCIAS Y MEMORIAS INDÍGENAS
                '17020', // PUEBLOS INDÍGENAS Y ESTADOS
                '17021', // ANTROPOLOGÍAS LATINOAMERICANAS
                '17022'  // AMÉRICA EN CONTEXTO
              ]
            },
            {
              id: 'cfo-eleccion-b-cultura',
              titulo: 'CFO - Elección B: Procesos culturales, ideología y poder (2 materias)',
              descripcion: 'Elegir 2 materias del área de Procesos culturales, ideología y poder',
              materias: [
                '17023', // CAPITALISMO ACTUAL, TRABAJO Y TRABAJADORES
                '17024', // CONFIGURACIONES SOCIOAMBIENTALES Y TERRITORIALES EN EL ESPACIO URBANO Y RURAL
                '17025'  // RELACIONES DE GÉNERO Y ORGANIZACIÓN SOCIAL DE LOS CUIDADOS
              ]
            },
            {
              id: 'cfo-eleccion-b-politicos',
              titulo: 'CFO - Elección B: Procesos políticos, instituciones y prácticas (2 materias)',
              descripcion: 'Elegir 2 materias del área de Procesos políticos, instituciones y prácticas',
              materias: [
                '17026', // ANTROPOLOGÍA DEL ESTADO Y LAS POLÍTICAS PÚBLICAS
                '17027', // SUJETOS SOCIALES Y POLÍTICOS EN PERSPECTIVA ANTROPOLÓGICA
                '17028', // ABORDAJES ANTROPOLÓGICOS DE LA SALUD Y LAS BIOCIENCIAS
                '17029'  // ANTROPOLOGÍA Y EDUCACIÓN
              ]
            },
            {
              id: 'cfo-eleccion-b-socioeconomicos',
              titulo: 'CFO - Elección B: Procesos socioeconómicos (2 materias)',
              descripcion: 'Elegir 2 materias del área de Procesos socioeconómicos: producción, reproducción y transformación social',
              materias: [
                '17030', // DINÁMICAS CONTEMPORÁNEAS DEL CAMPO DE LA CULTURA
                '17031', // DISCURSO, IMAGEN Y ALTERIDAD
                '17032'  // RELIGIONES, MITOS Y RITUALES EN LA MODERNIDAD
              ]
            },
            {
              id: 'cfo-seminario-investigacion',
              titulo: 'CFO - Seminario de Investigación',
              descripcion: 'Seminario final de investigación',
              materias: [
                '17033' // SEMINARIO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL
              ]
            }
          ]
        }
      }
      return seccion
    })
  ]
}
