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

export async function loadSampleData() {
  return []
}

export function loadSampleHorarios(): SampleHorario[] {
  const horarios: SampleHorario[] = [
    {
      id: "1",
      materia: "ANTROPOLOGÍA BIOLÓGICA",
      catedra: "Avena",
      tipoAsignatura: "Materia cuatrimestral",
      modalidadAprobacion: "Examen final",
      modalidadCursada: "Presencial",
      aclaraciones: "Se cursa en el Museo Etnográfico.",
      agrupacionClases: { "Práctico": "elegir" },
      clases: [
        { id: "1-t1", tipo: "Teórico", numero: 1, dia: "Lunes", horario: "8:00 - 12:00" },
        { id: "1-p1", tipo: "Práctico", numero: 1, dia: "Martes", horario: "10:00 - 12:00" },
        { id: "1-p2", tipo: "Práctico", numero: 2, dia: "Miércoles", horario: "14:00 - 16:00" }
      ]
    },
    {
      id: "2",
      materia: "Antropología del Trabajo",
      catedra: "Palermo",
      tipoAsignatura: "Seminario regular",
      modalidadAprobacion: "Trabajo final",
      modalidadCursada: "Virtual",
      agrupacionClases: {},
      clases: [
        { id: "2-t1", tipo: "Teórico", numero: 1, dia: "Miércoles", horario: "16:00 - 20:00" }
      ]
    },
    {
      id: "3",
      materia: "DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA",
      catedra: "Lischetti",
      tipoAsignatura: "Asignatura anual",
      modalidadAprobacion: "Trabajo final",
      modalidadCursada: "Presencial, con 30% de virtualidad asincrónica",
      aclaraciones: "Durante el segundo cuatrimestre, se informarán oportunamente los horarios de los talleres",
      agrupacionClases: { "Teórico": "elegir", "Práctico": "elegir" },
      clases: [
        { id: "3-t1", tipo: "Teórico", numero: 1, dia: "Miércoles", horario: "18:00 - 22:00" },
        { id: "3-t2", tipo: "Teórico", numero: 2, dia: "Viernes", horario: "10:00 - 14:00" },
        { id: "3-tp1", tipo: "Teórico-Práctico", numero: 1, dia: "Miércoles", horario: "12:00 - 14:00" },
        { id: "3-p1", tipo: "Práctico", numero: 1, dia: "Viernes", horario: "8:00 - 10:00" },
        { id: "3-p2", tipo: "Práctico", numero: 2, dia: "Sábado", horario: "8:00 - 10:00" }
      ]
    },
    {
      id: "4",
      materia: "Problemáticas contemporáneas del Estado",
      catedra: "Balbi",
      tipoAsignatura: "Seminario PST",
      modalidadAprobacion: "Promoción directa",
      modalidadCursada: "Presencial",
      agrupacionClases: {},
      clases: [
        { id: "4-t1", tipo: "Teórico", numero: 1, dia: "Jueves", horario: "16:00 - 20:00" },
        { id: "4-p1", tipo: "Práctico", numero: 1, dia: "Miércoles", horario: "8:00 - 10:00" }
      ]
    },
    {
      id: "5",
      materia: "PUEBLOS INDÍGENAS AMERICANOS",
      catedra: "Lenton",
      tipoAsignatura: "Materia cuatrimestral",
      modalidadAprobacion: "Examen final",
      modalidadCursada: "Presencial",
      agrupacionClases: { "Teórico": "conjunto" },
      clases: [
        { id: "5-t1", tipo: "Teórico", numero: 1, dia: "Lunes", horario: "14:00 - 16:00" },
        { id: "5-t2", tipo: "Teórico", numero: 2, dia: "Sábado", horario: "14:00 - 18:00" }
      ]
    },
    {
      id: "6",
      materia: "TEORÍAS DE LA SUBJETIVIDAD",
      catedra: "Pérez",
      tipoAsignatura: "Materia cuatrimestral",
      modalidadAprobacion: "Examen final",
      modalidadCursada: "Presencial",
      agrupacionClases: { "Teórico": "elegir", "Práctico": "elegir" },
      clases: [
        { id: "6-t1", tipo: "Teórico", numero: 1, dia: "Viernes", horario: "8:00 - 12:00" },
        { id: "6-t2", tipo: "Teórico", numero: 2, dia: "Miércoles", horario: "12:00 - 16:00" },
        { id: "6-p1", tipo: "Práctico", numero: 1, dia: "Miércoles", horario: "10:00 - 12:00" },
        { id: "6-p2", tipo: "Práctico", numero: 2, dia: "Viernes", horario: "18:00 - 20:00" }
      ]
    },
    {
      id: "7",
      materia: "PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA",
      catedra: "Balbi",
      tipoAsignatura: "Materia cuatrimestral",
      modalidadAprobacion: "Promoción directa",
      modalidadCursada: "Presencial",
      agrupacionClases: { "Práctico": "elegir" },
      clases: [
        { id: "7-t1", tipo: "Teórico", numero: 1, dia: "Miércoles", horario: "16:00 - 20:00" },
        { id: "7-p1", tipo: "Práctico", numero: 1, dia: "Miércoles", horario: "14:00 - 16:00" },
        { id: "7-p2", tipo: "Práctico", numero: 2, dia: "Miércoles", horario: "20:00 - 22:00" },
        { id: "7-p3", tipo: "Práctico", numero: 3, dia: "Martes", horario: "18:00 - 20:00" }
      ]
    },
    {
      id: "8",
      materia: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I",
      catedra: "Roca",
      tipoAsignatura: "Materia cuatrimestral",
      modalidadAprobacion: "Examen final",
      modalidadCursada: "Presencial",
      agrupacionClases: { "Práctico": "elegir" },
      clases: [
        { id: "8-t1", tipo: "Teórico", numero: 1, dia: "Jueves", horario: "16:00 - 20:00" },
        { id: "8-p1", tipo: "Práctico", numero: 1, dia: "Jueves", horario: "14:00 - 16:00" },
        { id: "8-p2", tipo: "Práctico", numero: 2, dia: "Jueves", horario: "20:00 - 22:00" }
      ]
    },
    {
      id: "9",
      materia: "INTRODUCCIÓN A LA ARQUEOLOGÍA",
      catedra: "Lanza/Pineau",
      tipoAsignatura: "Materia cuatrimestral",
      modalidadAprobacion: "Examen final",
      modalidadCursada: "Presencial",
      agrupacionClases: { "Teórico": "conjunto", "Práctico": "elegir" },
      clases: [
        { id: "9-t1", tipo: "Teórico", numero: 1, dia: "Martes", horario: "10:00 - 12:00" },
        { id: "9-t2", tipo: "Teórico", numero: 2, dia: "Jueves", horario: "10:00 - 12:00" },
        { id: "9-p1", tipo: "Práctico", numero: 1, dia: "Martes", horario: "12:00 - 14:00" },
        { id: "9-p2", tipo: "Práctico", numero: 2, dia: "Jueves", horario: "12:00 - 14:00" }
      ]
    },
    {
      id: "10",
      materia: "Seminario: Problemas de Parentesco en Antropología",
      catedra: "Sendon / Smietniasky",
      tipoAsignatura: "Seminario regular",
      modalidadAprobacion: "Trabajo final",
      modalidadCursada: "Virtual",
      orientacion: "Sociocultural",
      agrupacionClases: {},
      clases: [
        { id: "10-t1", tipo: "Teórico", numero: 1, dia: "Jueves", horario: "10:00 - 14:00" }
      ]
    },
    {
      id: "11",
      materia: "GEOLOGÍA PARA ARQUEÓLOGOS",
      catedra: "Pérez",
      tipoAsignatura: "Materia cuatrimestral",
      modalidadAprobacion: "Examen final",
      modalidadCursada: "Presencial, con 30% de virtualidad asincrónica",
      aclaraciones: "Se cursa en el Museo Etnográfico J. B. Ambrosetti.",
      agrupacionClases: { "Práctico": "elegir" },
      clases: [
        { id: "11-t1", tipo: "Teórico", numero: 1, dia: "Martes", horario: "18:00 - 22:00" },
        { id: "11-p1", tipo: "Práctico", numero: 1, dia: "Miércoles", horario: "10:00 - 14:00" },
        { id: "11-p2", tipo: "Práctico", numero: 2, dia: "Jueves", horario: "18:00 - 22:00" }
      ]
    }
  ]

  const horariosData = {
    asignaturas: horarios,
    periodo: { año: "2025", periodo: "1C" }
  }

  localStorage.setItem("horarios-antropologia", JSON.stringify(horariosData))
  return horarios
}