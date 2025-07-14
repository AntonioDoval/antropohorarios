
import { MateriaDelPlan } from "../types/planes"

export const materiasProfesorado2023: MateriaDelPlan[] = [
  // CFG
  { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES", nombreCorto: "Epistemo", nombreSiglas: "EPIS", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "0733", cod23: "17002", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I", nombreCorto: "Historia y Teoría 1", nombreSiglas: "HTA1", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "0742", cod23: "17003", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II", nombreCorto: "Historia y Teoría 2", nombreSiglas: "HTA2", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "0730", cod23: "17004", nombre: "PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA", nombreCorto: "P. A. Soc. y Pol.", nombreSiglas: "PASYP", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "0736", cod23: "17005", nombre: "PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA", nombreCorto: "P. A. Económica", nombreSiglas: "PAE", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "0739", cod23: "17006", nombre: "PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA", nombreCorto: "P. Antrop. Simbólica", nombreSiglas: "PASIM", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA", nombreCorto: "Antrop. Biológica", nombreSiglas: "ABIO", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "0732", cod23: "17008", nombre: "INTRODUCCIÓN A LA ARQUEOLOGÍA", nombreCorto: "Intro. Arqueo.", nombreSiglas: "IARQ", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "", cod23: "17009", nombre: "ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD", nombreCorto: "Arqueo. Leg. y Com.", nombreSiglas: "ALC", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "" },
  { cod85: "SEM85", cod23: "PST23", nombre: "1 Seminario de Prácticas Socioeducativas Territorializadas (PST)", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación General (CFG)", electividad: "Variable", area: "", correlatividad: "" },

  // CFG - Con correlatividad básica
  { cod85: "", cod23: "17022", nombre: "AMÉRICA EN CONTEXTO", nombreCorto: "Am. en Contexto", nombreSiglas: "AEC", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "", cod23: "17049", nombre: "METODOLOGÍA DE LA INVESTIGACIÓN ANTROPOLÓGICA EN EDUCACIÓN", nombreCorto: "Met. Antrop. Educación", nombreSiglas: "METED", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },

  // CFG - Elección A (5 materias según orientación)
  { cod85: "0741", cod23: "17010", nombre: "SOCIEDADES, CULTURAS Y ESTADOS EN AMÉRICA PREHISPÁNICA Y COLONIAL", nombreCorto: "S. C. y E. en Am. Prehisp.", nombreSiglas: "SCEAP", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Sociocultural", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0734", cod23: "17013", nombre: "ANTROPOLOGÍA LINGÜÍSTICA", nombreCorto: "Antrop. Lingüística", nombreSiglas: "ALING", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Sociocultural", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0740", cod23: "17012", nombre: "PROCESOS CULTURALES, FOLKLORE Y PRÁCTICAS SUBALTERNAS", nombreCorto: "Proc. Cult. Folkore y P. Sub.", nombreSiglas: "PCFPS", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Sociocultural", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0745", cod23: "17014", nombre: "TEORÍA SOCIAL", nombreCorto: "Teoría Social", nombreSiglas: "TSOC", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Sociocultural", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0757, 0758", cod23: "17015", nombre: "TEORÍAS DE LA SUBJETIVIDAD", nombreCorto: "T. de la Subjetividad", nombreSiglas: "TSUBJ", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Sociocultural", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0735", cod23: "17011", nombre: "PUEBLOS INDÍGENAS AMERICANOS", nombreCorto: "P. Ind. Americanos", nombreSiglas: "PIA", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Sociocultural", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0751", cod23: "17035", nombre: "ARQUEOLOGÍA AMERICANA Y ARGENTINA I", nombreCorto: "Arqueo. Am y Arg. I", nombreSiglas: "ARQAM1", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Arqueología", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0712", cod23: "17036", nombre: "ARQUEOLOGÍA AMERICANA Y ARGENTINA II", nombreCorto: "Arqueo. Am y Arg. II", nombreSiglas: "ARQAM2", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Arqueología", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0754", cod23: "17037", nombre: "ARQUEOLOGÍA ARGENTINA", nombreCorto: "Arqueo. Argentina", nombreSiglas: "ARQARG", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Arqueología", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0750", cod23: "17034", nombre: "ARQUEOLOGÍA DE ÁFRICA, EURASIA Y OCEANÍA", nombreCorto: "Arqueo. de Af. Eura. y Oc.", nombreSiglas: "ARQAEO", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Arqueología", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0721", cod23: "17042", nombre: "METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA", nombreCorto: "Met. Arqueo.", nombreSiglas: "MTARQ", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Arqueología", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0722", cod23: "17038", nombre: "MATERIALES ARQUEOLÓGICOS Y SUS TECNOLOGÍAS", nombreCorto: "Mat. Arqueo. y sus Tec.", nombreSiglas: "MAT", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Arqueología", correlatividad: "Al menos 5 materias del CFG" },
  { cod85: "0752", cod23: "17039", nombre: "GEOLOGÍA PARA ARQUEÓLOGOS", nombreCorto: "Geo. para Arqueo.", nombreSiglas: "GPA", ciclo: "Ciclo de Formación General (CFG)", electividad: "Elección A, 5 materias", area: "Licenciatura Arqueología", correlatividad: "Al menos 5 materias del CFG" },

  // CFG - Con correlatividad avanzada
  { cod85: "", cod23: "17029", nombre: "ANTROPOLOGÍA Y EDUCACIÓN", nombreCorto: "Antrop. y Educación", nombreSiglas: "AYE", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },
  { cod85: "", cod23: "17050", nombre: "ANTROPOLOGÍA Y CONOCIMIENTO", nombreCorto: "Antrop. y Conocimiento", nombreSiglas: "AYC", ciclo: "Ciclo de Formación General (CFG)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },

  // CFE - Formación Específica
  { cod85: "", cod23: "ESI", nombre: "Seminario de Educación Sexual Integral", nombreCorto: "Sem. ESI", nombreSiglas: "ESI", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },
  { cod85: "DIDG", cod23: "DIDG", nombre: "Didáctica General", nombreCorto: "Did. General", nombreSiglas: "DIGEN", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },
  { cod85: "7127", cod23: "17051", nombre: "DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA", nombreCorto: "Did. Esp. y Pract. de Ens.", nombreSiglas: "DIDES", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },
  { cod85: "", cod23: "17052", nombre: "EXPERIENCIAS SOCIOEDUCATIVAS SITUADAS", nombreCorto: "Exp. Socioed. Situadas", nombreSiglas: "ESS", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },

  // CFE - Elección B
  { cod85: "", cod23: "", nombre: "Historia Social General de la Educación", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "Elección B", area: "Departamento de Ciencias de la Educación", correlatividad: "Al menos 10 materias del CFG" },
  { cod85: "", cod23: "", nombre: "Historia de la Educación Argentina", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "Elección B", area: "Departamento de Ciencias de la Educación", correlatividad: "Al menos 10 materias del CFG" },
  { cod85: "", cod23: "", nombre: "Política Educacional", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "Elección B", area: "Departamento de Ciencias de la Educación", correlatividad: "Al menos 10 materias del CFG" },
  { cod85: "SOCED", cod23: "SOCED", nombre: "Sociología de la Educación", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Específica (CFE)", electividad: "Elección B", area: "Departamento de Ciencias de la Educación", correlatividad: "Al menos 10 materias del CFG" }
]

// Exportar todas las demás matrices de datos aquí...
// (Continuaré con las demás en los siguientes archivos por brevedad)
