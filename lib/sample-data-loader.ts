import { AsignaturaConPlan } from "./planes-utils"

export interface SampleHorario {
  id: string
  materia: string
  catedra: string
  tipoAsignatura: string
  modalidadAprobacion: string
  modalidadCursada: string
  orientacion?: string
  agrupacionClases?: { [tipo: string]: "elegir" | "conjunto" }
  aclaraciones?: string
  clases: Array<{
    id: string
    tipo: string
    numero: number
    dia: string
    horario: string
  }>
}

export function loadSamplePlanes() {
  const planes = [
    {
      año: "2023",
      titulo: "Profesorado en Ciencias Antropológicas",
      orientacion: "Profesorado",
      materias: [
        { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES", nombreCorto: "Epistemo", nombreSiglas: "EPIS", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0733", cod23: "17002", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I", nombreCorto: "Historia y Teoría 1", nombreSiglas: "HTA1", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0742", cod23: "17003", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II", nombreCorto: "Historia y Teoría 2", nombreSiglas: "HTA2", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0730", cod23: "17004", nombre: "PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA", nombreCorto: "P. A. Soc. y Pol.", nombreSiglas: "PASYP", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0736", cod23: "17005", nombre: "PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA", nombreCorto: "P. A. Económica", nombreSiglas: "PAE", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0739", cod23: "17006", nombre: "PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA", nombreCorto: "P. Antrop. Simbólica", nombreSiglas: "PASIM", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA", nombreCorto: "Antrop. Biológica", nombreSiglas: "ABIO", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0732", cod23: "17008", nombre: "INTRODUCCIÓN A LA ARQUEOLOGÍA", nombreCorto: "Intro. Arqueo.", nombreSiglas: "IARQ", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "", cod23: "17009", nombre: "ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD", nombreCorto: "Arqueo. Leg. y Com.", nombreSiglas: "ALC", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "7127", cod23: "17051", nombre: "DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA", nombreCorto: "Did. Esp. y Pract. de Ens.", nombreSiglas: "DIDES", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" }
      ]
    },
    {
      año: "2023",
      titulo: "Licenciatura en Antropología Sociocultural",
      orientacion: "Licenciatura en Antropología Sociocultural",
      materias: [
        { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES", nombreCorto: "Epistemo", nombreSiglas: "EPIS", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0733", cod23: "17002", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I", nombreCorto: "Historia y Teoría 1", nombreSiglas: "HTA1", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0742", cod23: "17003", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II", nombreCorto: "Historia y Teoría 2", nombreSiglas: "HTA2", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0730", cod23: "17004", nombre: "PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA", nombreCorto: "P. A. Soc. y Pol.", nombreSiglas: "PASYP", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0736", cod23: "17005", nombre: "PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA", nombreCorto: "P. A. Económica", nombreSiglas: "PAE", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0739", cod23: "17006", nombre: "PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA", nombreCorto: "P. Antrop. Simbólica", nombreSiglas: "PASIM", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA", nombreCorto: "Antrop. Biológica", nombreSiglas: "ABIO", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0735", cod23: "17011", nombre: "PUEBLOS INDÍGENAS AMERICANOS", nombreCorto: "P. Ind. Americanos", nombreSiglas: "PIA", ciclo: "Ciclo de Formación Orientada (CFO)", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
        { cod85: "0744", cod23: "17016", nombre: "METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA", nombreCorto: "Met. e Inv. Antrop.", nombreSiglas: "MIA", ciclo: "Ciclo de Formación Orientada (CFO)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },
        { cod85: "0746", cod23: "17033", nombre: "SEMINARIO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL", nombreCorto: "Sem. Inv. Antrop. Socio.", nombreSiglas: "SIASOC", ciclo: "Ciclo de Formación Orientada (CFO)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG, incluyendo METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA" }
      ]
    },
    {
      año: "2023",
      titulo: "Licenciatura en Arqueología",
      orientacion: "Licenciatura en Arqueología",
      materias: [
        { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES", nombreCorto: "Epistemo", nombreSiglas: "EPIS", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0733", cod23: "17002", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I", nombreCorto: "Historia y Teoría 1", nombreSiglas: "HTA1", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0732", cod23: "17008", nombre: "INTRODUCCIÓN A LA ARQUEOLOGÍA", nombreCorto: "Intro. Arqueo.", nombreSiglas: "IARQ", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
        { cod85: "0721", cod23: "17042", nombre: "METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA", nombreCorto: "Met. Arqueo.", nombreSiglas: "MTARQ", ciclo: "Ciclo de Formación Orientada (CFO)", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
        { cod85: "0755", cod23: "17048", nombre: "SEMINARIO DE INVESTIGACIÓN EN ARQUEOLOGÍA, TRABAJO DE CAMPO Y LABORATORIO", nombreCorto: "Sem. Inv. Arqueo.", nombreSiglas: "SIARQ", ciclo: "Ciclo de Formación Orientada (CFO)", electividad: "", area: "", correlatividad: "Al menos 10 materias aprobadas en total, incluyendo Metodología y Técnicas de Inv. Arqueológica, Teorías Arqueológicas Contemporáneas y Arqueología Argentina" }
      ]
    },
    {
      año: "1985",
      titulo: "Profesorado en Ciencias Antropológicas - Orientación Sociocultural",
      orientacion: "Profesorado - Orientación Sociocultural",
      materias: [
        { cod85: "0730", cod23: "17004", nombre: "ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA)", nombreCorto: "", nombreSiglas: "SIST1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
        { cod85: "0732", cod23: "17008", nombre: "FUNDAMENTOS DE PREHISTORIA", nombreCorto: "", nombreSiglas: "FUND", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
        { cod85: "0733", cod23: "17002", nombre: "HISTORIA DE LA TEORÍA ANTROPOLÓGICA", nombreCorto: "", nombreSiglas: "HTA", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
        { cod85: "0741", cod23: "17010", nombre: "SISTEMAS SOCIOCULTURALES DE AMÉRICA II (AGRICULTORES MEDIOS Y SOCIEDADES ESTATALES)", nombreCorto: "", nombreSiglas: "SOCIO2", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
        { cod85: "0742", cod23: "17003", nombre: "TEORÍAS ANTROPOLÓGICAS CONTEMPORÁNEAS", nombreCorto: "", nombreSiglas: "TAC", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
        { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA Y MÉTODOS DE INVESTIGACIÓN SOCIAL", nombreCorto: "", nombreSiglas: "EPIST", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
        { cod85: "0744", cod23: "17016", nombre: "METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN DE CAMPO", nombreCorto: "", nombreSiglas: "METSOC", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
        { cod85: "7127", cod23: "17051", nombre: "DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA", nombreCorto: "Did. Esp. y Pract. de Ens.", nombreSiglas: "DIDES", ciclo: "Profesorado", electividad: "", area: "", correlatividad: "" }
      ]
    }
  ]

  localStorage.setItem("planes-estudios-antropologia", JSON.stringify(planes))
  return planes
}

export async function loadSampleData(): Promise<SampleHorario[]> {
  // Datos de ejemplo para desarrollo
  const sampleHorarios: SampleHorario[] = [
    {
      id: "sample-1",
      materia: "Epistemología de las Ciencias Sociales",
      catedra: "García",
      tipoAsignatura: "Materia cuatrimestral regular",
      modalidadAprobacion: "Examen final",
      modalidadCursada: "Sede Puán",
      clases: [
        {
          id: "clase-1",
          tipo: "Teórico",
          numero: 1,
          dia: "Lunes",
          horario: "14:00 - 16:00"
        },
        {
          id: "clase-2",
          tipo: "Práctico",
          numero: 1,
          dia: "Martes",
          horario: "16:00 - 18:00"
        },
        {
          id: "clase-3",
          tipo: "Práctico",
          numero: 2,
          dia: "Miércoles",
          horario: "18:00 - 20:00"
        }
      ]
    },
    {
      id: "sample-2",
      materia: "Historia y Teoría de la Antropología I",
      catedra: "Rodriguez",
      tipoAsignatura: "Materia cuatrimestral regular",
      modalidadAprobacion: "Promoción directa",
      modalidadCursada: "Sede Puán",
      agrupacionClases: {
        "Práctico": "elegir"
      },
      clases: [
        {
          id: "clase-4",
          tipo: "Teórico",
          numero: 1,
          dia: "Martes",
          horario: "10:00 - 12:00"
        },
        {
          id: "clase-5",
          tipo: "Práctico",
          numero: 1,
          dia: "Jueves",
          horario: "14:00 - 16:00"
        },
        {
          id: "clase-6",
          tipo: "Práctico",
          numero: 2,
          dia: "Viernes",
          horario: "16:00 - 18:00"
        }
      ]
    },
    {
      id: "sample-3",
      materia: "Seminario: Antropología Urbana",
      catedra: "Martínez",
      tipoAsignatura: "Seminario regular",
      modalidadAprobacion: "Trabajo final",
      modalidadCursada: "Sede Puán",
      orientacion: "Sociocultural",
      clases: [
        {
          id: "clase-7",
          tipo: "Teórico-Práctico",
          numero: 1,
          dia: "Miércoles",
          horario: "18:00 - 22:00"
        }
      ]
    },
    {
      id: "sample-4",
      materia: "Introducción a la Arqueología",
      catedra: "López",
      tipoAsignatura: "Materia cuatrimestral regular",
      modalidadAprobacion: "Examen final",
      modalidadCursada: "Virtual",
      clases: [
        {
          id: "clase-8",
          tipo: "Teórico",
          numero: 1,
          dia: "Lunes",
          horario: "16:00 - 18:00"
        },
        {
          id: "clase-9",
          tipo: "Teórico-Práctico",
          numero: 1,
          dia: "Jueves",
          horario: "10:00 - 12:00"
        }
      ]
    },
    {
      id: "sample-5",
      materia: "Problemas de Antropología Social y Política",
      catedra: "Fernández",
      tipoAsignatura: "Materia cuatrimestral regular",
      modalidadAprobacion: "Promoción directa",
      modalidadCursada: "Presencial, con 30% de virtualidad asincrónica",
      agrupacionClases: {
        "Teórico": "conjunto"
      },
      clases: [
        {
          id: "clase-10",
          tipo: "Teórico",
          numero: 1,
          dia: "Viernes",
          horario: "8:00 - 10:00"
        },
        {
          id: "clase-11",
          tipo: "Teórico",
          numero: 2,
          dia: "Viernes",
          horario: "10:00 - 12:00"
        },
        {
          id: "clase-12",
          tipo: "Práctico",
          numero: 1,
          dia: "Lunes",
          horario: "18:00 - 20:00"
        }
      ]
    }
  ]

  console.log(`Cargando ${sampleHorarios.length} horarios de ejemplo para desarrollo`)
  return sampleHorarios
}

export function loadSampleHorarios(): SampleHorario[] {
  return []
}