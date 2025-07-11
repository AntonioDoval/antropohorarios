"use client"

import React, { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { getContenidoMinimo } from "@/lib/contenidos-minimos"

interface MateriaDelPlan {
  cod85: string
  cod23: string
  nombre: string
  nombreCorto: string
  nombreSiglas: string
  ciclo: string
  electividad: string
  area: string
  correlatividad: string
}

export default function PlanesEstudioPage() {
  const [planSeleccionado, setPlanSeleccionado] = useState<"2023" | "1985">("2023")
  const [orientacionSeleccionada, setOrientacionSeleccionada] = useState<"profesorado" | "sociocultural" | "arqueologia">("profesorado")
  const [orientacionPlan1985, setOrientacionPlan1985] = useState<"sociocultural" | "arqueologia">("sociocultural")
  const [materias, setMaterias] = useState<MateriaDelPlan[]>([])

  useEffect(() => {
    // Plan 2023 - Profesorado
    const materiasProfesorado2023: MateriaDelPlan[] = [
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

    // Plan 2023 - Licenciatura Sociocultural
    const materiasLicSocio2023: MateriaDelPlan[] = [
      { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES", nombreCorto: "Epistemo", nombreSiglas: "EPIS", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0733", cod23: "17002", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I", nombreCorto: "Historia y Teoría 1", nombreSiglas: "HTA1", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0742", cod23: "17003", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II", nombreCorto: "Historia y Teoría 2", nombreSiglas: "HTA2", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0730", cod23: "17004", nombre: "PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA", nombreCorto: "P. A. Soc. y Pol.", nombreSiglas: "PASYP", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0736", cod23: "17005", nombre: "PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA", nombreCorto: "P. A. Económica", nombreSiglas: "PAE", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0739", cod23: "17006", nombre: "PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA", nombreCorto: "P. Antrop. Simbólica", nombreSiglas: "PASIM", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA", nombreCorto: "Antrop. Biológica", nombreSiglas: "ABIO", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0732", cod23: "17008", nombre: "INTRODUCCIÓN A LA ARQUEOLOGÍA", nombreCorto: "Intro. Arqueo.", nombreSiglas: "IARQ", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "17009", nombre: "ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD", nombreCorto: "Arqueo. Leg. y Com.", nombreSiglas: "ALC", ciclo: "Ciclo de Formación General (CFG) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEM85", cod23: "PST23", nombre: "1 Seminario de Prácticas Socioeducativas Territorializadas (PST)", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Variable", area: "", correlatividad: "" },
      { cod85: "0741", cod23: "17010", nombre: "SOCIEDADES, CULTURAS Y ESTADOS EN AMÉRICA PREHISPÁNICA Y COLONIAL", nombreCorto: "S. C. y E. en Am. Prehisp.", nombreSiglas: "SCEAP", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0735", cod23: "17011", nombre: "PUEBLOS INDÍGENAS AMERICANOS", nombreCorto: "P. Ind. Americanos", nombreSiglas: "PIA", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0740", cod23: "17012", nombre: "PROCESOS CULTURALES, FOLKLORE Y PRÁCTICAS SUBALTERNAS", nombreCorto: "Proc. Cult. Folkore y P. Sub.", nombreSiglas: "PCFPS", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0734", cod23: "17013", nombre: "ANTROPOLOGÍA LINGÜÍSTICA", nombreCorto: "Antrop. Lingüística", nombreSiglas: "ALING", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0745", cod23: "17014", nombre: "TEORÍA SOCIAL", nombreCorto: "Teoría Social", nombreSiglas: "TSOC", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "0757, 0758", cod23: "17015", nombre: "TEORÍAS DE LA SUBJETIVIDAD", nombreCorto: "T. de la Subjetividad", nombreSiglas: "TSUBJ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 5 materias del CFG" },
      { cod85: "SEMSOC", cod23: "SEMSOC", nombre: "1 Seminario regular de Antropología Sociocultural", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Variable", area: "", correlatividad: "" },
      { cod85: "0744", cod23: "17016", nombre: "METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA", nombreCorto: "Met. e Inv. Antrop.", nombreSiglas: "MIA", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "0737", cod23: "17017", nombre: "ENFOQUE CUANTITATIVO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL", nombreCorto: "Enf. Cuantitativo", nombreSiglas: "CUANT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección A, 1 materia", area: "", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17018", nombre: "EJERCICIO PROFESIONAL DE LA ANTROPOLOGÍA SOCIOCULTURAL", nombreCorto: "Ej. Profesional Socio.", nombreSiglas: "EPAS", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección A, 1 materia", area: "", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "OPT85", cod23: "ELE23", nombre: "1 materia electiva de cualquier orientación, carrera o facultad de la UBA", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "17019", nombre: "CONQUISTAS, RESISTENCIAS Y MEMORIAS INDÍGENAS", nombreCorto: "Conq. Res. y Mem. Ind.", nombreSiglas: "CRMI", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Antropología histórica y memoria", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17020", nombre: "PUEBLOS INDÍGENAS Y ESTADOS", nombreCorto: "P. Ind. y Estados", nombreSiglas: "PIE", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Antropología histórica y memoria", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17021", nombre: "ANTROPOLOGÍAS LATINOAMERICANAS", nombreCorto: "A. Latinoamericanas", nombreSiglas: "ALAT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Antropología histórica y memoria", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17022", nombre: "AMÉRICA EN CONTEXTO", nombreCorto: "Am. en Contexto", nombreSiglas: "AEC", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Antropología histórica y memoria", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17023", nombre: "CAPITALISMO ACTUAL, TRABAJO Y TRABAJADORES", nombreCorto: "Cap. Trab. y Trabajadores", nombreSiglas: "CATT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos culturales, ideología y poder", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17024", nombre: "CONFIGURACIONES SOCIOAMBIENTALES Y TERRITORIALES EN EL ESPACIO URBANO Y RURAL", nombreCorto: "Conf. Soc. y Terr.", nombreSiglas: "SOCTER", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos culturales, ideología y poder", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17025", nombre: "RELACIONES DE GÉNERO Y ORGANIZACIÓN SOCIAL DE LOS CUIDADOS", nombreCorto: "Rel. de Género y Cuidados", nombreSiglas: "RGEN", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos culturales, ideología y poder", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17026", nombre: "ANTROPOLOGÍA DEL ESTADO Y LAS POLÍTICAS PÚBLICAS", nombreCorto: "A. del Estado y Pol. Pub.", nombreSiglas: "AEST", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos políticos, instituciones y prácticas", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17027", nombre: "SUJETOS SOCIALES Y POLÍTICOS EN PERSPECTIVA ANTROPOLÓGICA", nombreCorto: "Suj. Soc. y Pol.", nombreSiglas: "SUJ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos políticos, instituciones y prácticas", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17028", nombre: "ABORDAJES ANTROPOLÓGICOS DE LA SALUD Y LAS BIOCIENCIAS", nombreCorto: "Salud y Biociencias", nombreSiglas: "SALUD", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos políticos, instituciones y prácticas", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17029", nombre: "ANTROPOLOGÍA Y EDUCACIÓN", nombreCorto: "Antrop. y Educación", nombreSiglas: "AYE", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos políticos, instituciones y prácticas", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17030", nombre: "DINÁMICAS CONTEMPORÁNEAS DEL CAMPO DE LA CULTURA", nombreCorto: "D. Cont. en el C. de la Cult.", nombreSiglas: "CULT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos socioeconómicos: producción, reproducción y transformación social", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17031", nombre: "DISCURSO, IMAGEN Y ALTERIDAD", nombreCorto: "Disc. Im. y Alteridad", nombreSiglas: "DIA", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos socioeconómicos: producción, reproducción y transformación social", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "", cod23: "17032", nombre: "RELIGIONES, MITOS Y RITUALES EN LA MODERNIDAD", nombreCorto: "Relig. Mitos y Rituales", nombreSiglas: "RIT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "Elección B, 2 materias de la misma área", area: "Procesos socioeconómicos: producción, reproducción y transformación social", correlatividad: "Al menos 10 materias del CFG" },
      { cod85: "0746", cod23: "17033", nombre: "SEMINARIO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL", nombreCorto: "Sem. Inv. Antrop. Socio.", nombreSiglas: "SIASOC", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "Al menos 10 materias del CFG, incluyendo METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA" }
    ]

    // Plan 2023 - Licenciatura Arqueología
    const materiasLicArqueo2023: MateriaDelPlan[] = [
      // CFG
      { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES", nombreCorto: "Epistemo", nombreSiglas: "EPIS", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0733", cod23: "17002", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I", nombreCorto: "Historia y Teoría 1", nombreSiglas: "HTA1", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0742", cod23: "17003", nombre: "HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II", nombreCorto: "Historia y Teoría 2", nombreSiglas: "HTA2", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0730", cod23: "17004", nombre: "PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA", nombreCorto: "P. A. Soc. y Pol.", nombreSiglas: "PASYP", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0736", cod23: "17005", nombre: "PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA",```
nombreCorto: "P. A. Económica", nombreSiglas: "PAE", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0739", cod23: "17006", nombre: "PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA", nombreCorto: "P. Antrop. Simbólica", nombreSiglas: "PASIM", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA", nombreCorto: "Antrop. Biológica", nombreSiglas: "ABIO", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0732", cod23: "17008", nombre: "INTRODUCCIÓN A LA ARQUEOLOGÍA", nombreCorto: "Intro. Arqueo.", nombreSiglas: "IARQ", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "17009", nombre: "ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD", nombreCorto: "Arqueo. Leg. y Com.", nombreSiglas: "ALC", ciclo: "Ciclo de Formación General (CFG) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" },

      // CFO - Variable
      { cod85: "SEM85", cod23: "PST23", nombre: "1 Seminario de Prácticas Socioeducativas Territorializadas (PST)", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "Variable", area: "", correlatividad: "" },

      // CFO - Obligatorias con correlatividad básica
      { cod85: "0750", cod23: "17034", nombre: "ARQUEOLOGÍA DE ÁFRICA, EURASIA Y OCEANÍA", nombreCorto: "Arqueo. de Af. Eura. y Oc.", nombreSiglas: "ARQAEO", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
      { cod85: "0751", cod23: "17035", nombre: "ARQUEOLOGÍA AMERICANA Y ARGENTINA I", nombreCorto: "Arqueo. Am y Arg. I", nombreSiglas: "ARQAM1", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
      { cod85: "0712", cod23: "17036", nombre: "ARQUEOLOGÍA AMERICANA Y ARGENTINA II", nombreCorto: "Arqueo. Am y Arg. II", nombreSiglas: "ARQAM2", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
      { cod85: "0754", cod23: "17037", nombre: "ARQUEOLOGÍA ARGENTINA", nombreCorto: "Arqueo. Argentina", nombreSiglas: "ARQARG", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
      { cod85: "0722", cod23: "17038", nombre: "MATERIALES ARQUEOLÓGICOS Y SUS TECNOLOGÍAS", nombreCorto: "Mat. Arqueo. y sus Tec.", nombreSiglas: "MAT", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
      { cod85: "0752", cod23: "17039", nombre: "GEOLOGÍA PARA ARQUEÓLOGOS", nombreCorto: "Geo. para Arqueo.", nombreSiglas: "GPA", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
      { cod85: "0748", cod23: "17040", nombre: "TEORÍAS ARQUEOLÓGICAS CONTEMPORÁNEAS", nombreCorto: "T. Arqueo. Contemp.", nombreSiglas: "TARQC", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
      { cod85: "0753", cod23: "17041", nombre: "MODELOS Y MÉTODOS DE ANÁLISIS EN ARQUEOLOGÍA", nombreCorto: "Mod. y Met. Arqueo.", nombreSiglas: "MYM", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },
      { cod85: "0721", cod23: "17042", nombre: "METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA", nombreCorto: "Met. Arqueo.", nombreSiglas: "MTARQ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología" },

      // CFO - Con correlatividad avanzada
      { cod85: "0737", cod23: "17043", nombre: "MÉTODOS CUANTITATIVOS EN ARQUEOLOGÍA", nombreCorto: "Met. Cuanti. Arqueo.", nombreSiglas: "MCARQ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología y Metodología y Técnicas de Inv. Arqueológica" },
      { cod85: "SEMARQ", cod23: "SEMARQ", nombre: "1 Seminario Regular de la orientación en Arqueología", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "Variable", area: "", correlatividad: "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología y Metodología y Técnicas de Inv. Arqueológica" },

      // CFO - Elección A (2 materias)
      { cod85: "", cod23: "17044", nombre: "EJERCICIO PROFESIONAL DE LA ARQUEOLOGÍA", nombreCorto: "Ej. Profesional Arqueo.", nombreSiglas: "EPARQ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "Elección A, 2 materias", area: "", correlatividad: "Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías" },
      { cod85: "", cod23: "17045", nombre: "MATERIALES BIOLÓGICOS EN ARQUEOLOGÍA", nombreCorto: "Mat. Bio. en Arqueo.", nombreSiglas: "MBA", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "Elección A, 2 materias", area: "", correlatividad: "Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías" },
      { cod85: "", cod23: "17046", nombre: "ARQUEOLOGÍA DE TIEMPOS MODERNOS", nombreCorto: "Arq. de T. Modernos", nombreSiglas: "ATM", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "Elección A, 2 materias", area: "", correlatividad: "Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías" },
      { cod85: "", cod23: "17047", nombre: "ESTUDIOS INTERDISCIPLINARIOS EN ARQUEOLOGÍA", nombreCorto: "Est. Interdisciplinarios Arq.", nombreSiglas: "EIARQ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "Elección A, 2 materias", area: "", correlatividad: "Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías" },

      // CFO - Seminario final
      { cod85: "0755", cod23: "17048", nombre: "SEMINARIO DE INVESTIGACIÓN EN ARQUEOLOGÍA, TRABAJO DE CAMPO Y LABORATORIO", nombreCorto: "Sem. Inv. Arqueo.", nombreSiglas: "SIARQ", ciclo: "Ciclo de Formación Orientada (CFO) Licenciatura Arqueología", electividad: "", area: "", correlatividad: "Al menos 10 materias aprobadas en total, incluyendo Metodología y Técnicas de Inv. Arqueológica, Teorías Arqueológicas Contemporáneas y Arqueología Argentina" }
    ]

    // Plan 1985 - Profesorado Sociocultural
    const materiasProfesorado1985Socio: MateriaDelPlan[] = [
      // Ciclo Común
      { cod85: "0730", cod23: "17004", nombre: "ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA)", nombreCorto: "", nombreSiglas: "SIST1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "", nombre: "Historia Social General", nombreCorto: "", nombreSiglas: "HSG", ciclo: "Ciclo Común", electividad: "", area: "Departamento de Historia", correlatividad: "" },
      { cod85: "0732", cod23: "17008", nombre: "FUNDAMENTOS DE PREHISTORIA", nombreCorto: "", nombreSiglas: "FUND", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0733", cod23: "17002", nombre: "HISTORIA DE LA TEORÍA ANTROPOLÓGICA", nombreCorto: "", nombreSiglas: "HTA", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0734", cod23: "17013", nombre: "ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA", nombreCorto: "", nombreSiglas: "LING", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0735", cod23: "17011", nombre: "SISTEMAS SOCIOCULTURALES DE AMÉRICA I (CAZADORES, RECOLECTORES, AGRICULTORES INCIPIENTES)", nombreCorto: "", nombreSiglas: "SOCIO1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0736", cod23: "17005", nombre: "ANTROPOLOGÍA SISTEMÁTICA II (ANTROPOLOGÍA ECONÓMICA)", nombreCorto: "", nombreSiglas: "SIST2", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0737", cod23: "17017", nombre: "MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA", nombreCorto: "", nombreSiglas: "CUANTSOC", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA", nombreCorto: "", nombreSiglas: "BIO", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0739", cod23: "17006", nombre: "ANTROPOLOGÍA SISTEMÁTICA III (SISTEMAS SIMBÓLICOS)", nombreCorto: "", nombreSiglas: "SIST3", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0740", cod23: "17012", nombre: "FOLKLORE GENERAL", nombreCorto: "", nombreSiglas: "FOLK", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },

      // Ciclo Orientación Sociocultural
      { cod85: "0741", cod23: "17010", nombre: "SISTEMAS SOCIOCULTURALES DE AMÉRICA II (AGRICULTORES MEDIOS Y SOCIEDADES ESTATALES)", nombreCorto: "", nombreSiglas: "SOCIO2", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0742", cod23: "17003", nombre: "TEORÍAS ANTROPOLÓGICAS CONTEMPORÁNEAS", nombreCorto: "", nombreSiglas: "TAC", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA Y MÉTODOS DE INVESTIGACIÓN SOCIAL", nombreCorto: "", nombreSiglas: "EPIST", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0744", cod23: "17016", nombre: "METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN DE CAMPO", nombreCorto: "", nombreSiglas: "METSOC", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0757", cod23: "17015", nombre: "PSICOLOGÍA GENERAL", nombreCorto: "", nombreSiglas: "PSIGEN", ciclo: "Ciclo Orientación Sociocultural", electividad: "Elección A", area: "", correlatividad: "" },
      { cod85: "0758", cod23: "17015", nombre: "PSICOLOGÍA EVOLUTIVA", nombreCorto: "", nombreSiglas: "PSIEV", ciclo: "Ciclo Orientación Sociocultural", electividad: "Elección A", area: "Departamento de Ciencias de la Educación", correlatividad: "" },
      { cod85: "0745", cod23: "17014", nombre: "TEORÍA SOCIOLÓGICA", nombreCorto: "", nombreSiglas: "TSOC", ciclo: "Ciclo Orientación Sociocultural", electividad: "Elección B", area: "", correlatividad: "" },
      { cod85: "SOCED", cod23: "SOCED", nombre: "Sociología de la Educación", nombreCorto: "", nombreSiglas: "SOCED", ciclo: "Ciclo Orientación Sociocultural", electividad: "Elección B", area: "Departamento de Ciencias de la Educación", correlatividad: "" },
      { cod85: "OPT85", cod23: "ELE23", nombre: "1 materia electiva de cualquier orientación, carrera o facultad de la UBA", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "OPT85", cod23: "ELE23", nombre: "1 materia electiva de cualquier orientación, carrera o facultad de la UBA", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEMSOC", cod23: "SEMSOC", nombre: "1 Seminario Regular de la orientación Sociocultural", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEMSOC", cod23: "SEMSOC", nombre: "1 Seminario Regular de la orientación Sociocultural", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEMSOC", cod23: "SEMSOC", nombre: "1 Seminario Regular de la orientación Sociocultural", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },

      // Profesorado
      { cod85: "DIDGEN", cod23: "DIDGEN", nombre: "Didáctica General", nombreCorto: "Did. General", nombreSiglas: "DIGEN", ciclo: "Profesorado", electividad: "", area: "Departamento de Ciencias de la Educación", correlatividad: "" },
      { cod85: "7127", cod23: "17051", nombre: "DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA", nombreCorto: "Did. Esp. y Pract. de Ens.", nombreSiglas: "DIDES", ciclo: "Profesorado", electividad: "", area: "", correlatividad: "" }
    ]

    // Plan 1985 - Profesorado Arqueología
    const materiasProfesorado1985Arqueo: MateriaDelPlan[] = [
      // Ciclo Común
      { cod85: "0730", cod23: "17004", nombre: "ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA)", nombreCorto: "", nombreSiglas: "SIST1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "", nombre: "Historia Social General", nombreCorto: "", nombreSiglas: "HSG", ciclo: "Ciclo Común", electividad: "", area: "Departamento de Historia", correlatividad: "" },
      { cod85: "0732", cod23: "17008", nombre: "FUNDAMENTOS DE PREHISTORIA", nombreCorto: "", nombreSiglas: "FUND", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0733", cod23: "17002", nombre: "HISTORIA DE LA TEORÍA ANTROPOLÓGICA", nombreCorto: "", nombreSiglas: "HTA", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0734", cod23: "17013", nombre: "ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA", nombreCorto: "", nombreSiglas: "LING", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0735", cod23: "17011", nombre: "SISTEMAS SOCIOCULTURALES DE AMÉRICA I (CAZADORES, RECOLECTORES, AGRICULTORES INCIPIENTES)", nombreCorto: "", nombreSiglas: "SOCIO1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0736", cod23: "17005", nombre: "ANTROPOLOGÍA SISTEMÁTICA II (ANTROPOLOGÍA ECONÓMICA)", nombreCorto: "", nombreSiglas: "SIST2", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0737", cod23: "17017", nombre: "MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA", nombreCorto: "", nombreSiglas: "CUANTSOC", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA", nombreCorto: "", nombreSiglas: "BIO", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0739", cod23: "17006", nombre: "ANTROPOLOGÍA SISTEMÁTICA III (SISTEMAS SIMBÓLICOS)", nombreCorto: "", nombreSiglas: "SIST3", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0740", cod23: "17012", nombre: "FOLKLORE GENERAL", nombreCorto: "", nombreSiglas: "FOLK", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },

      // Ciclo Orientación Arqueología
      { cod85: "0748", cod23: "17040", nombre: "TEORÍA ARQUEOLÓGICA CONTEMPORÁNEA", nombreCorto: "", nombreSiglas: "TACARQ", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0721", cod23: "17042", nombre: "METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA", nombreCorto: "", nombreSiglas: "METARQ", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0750", cod23: "17034", nombre: "PREHISTORIA DEL VIEJO MUNDO", nombreCorto: "", nombreSiglas: "PVM", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0751", cod23: "17035", nombre: "PREHISTORIA AMERICANA Y ARGENTINA I (CULTURAS DE CAZADORES - RECOLECTORES)", nombreCorto: "", nombreSiglas: "PAA1", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0752", cod23: "17039", nombre: "GEOLOGÍA GENERAL Y GEOMORFOLOGÍA DEL CUARTARIO", nombreCorto: "", nombreSiglas: "GEO", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0712", cod23: "17036", nombre: "PREHISTORIA AMERICANA Y ARGENTINA II (CULTURAS AGRO-ALFARERAS)", nombreCorto: "", nombreSiglas: "PAA2", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0753", cod23: "17041", nombre: "MODELOS Y MÉTODOS DE ANÁLISIS EN ECONOMÍA PREHISTÓRICA", nombreCorto: "", nombreSiglas: "MODMET", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0722", cod23: "17038", nombre: "ERGOLOGÍA Y TECNOLOGÍA", nombreCorto: "", nombreSiglas: "ERG", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0754", cod23: "17037", nombre: "ARQUEOLOGÍA ARGENTINA", nombreCorto: "", nombreSiglas: "ARQARG", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "OPT85", cod23: "ELE23", nombre: "1 materia electiva de cualquier orientación, carrera o facultad de la UBA", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEMARQ", cod23: "SEMARQ", nombre: "1 Seminario Regular de la orientación en Arqueología", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },

      // Profesorado
      { cod85: "DIDGEN", cod23: "DIDGEN", nombre: "Didáctica General", nombreCorto: "Did. General", nombreSiglas: "DIGEN", ciclo: "Profesorado", electividad: "", area: "Departamento de Ciencias de la Educación", correlatividad: "" },
      { cod85: "7127", cod23: "17051", nombre: "DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA", nombreCorto: "Did. Esp. y Pract. de Ens.", nombreSiglas: "DIDES", ciclo: "Profesorado", electividad: "", area: "", correlatividad: "" }
    ]

    // Plan 1985 - Licenciatura Sociocultural
    const materiasLicenciatura1985Socio: MateriaDelPlan[] = [
      // Ciclo Común
      { cod85: "0730", cod23: "17004", nombre: "ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA)", nombreCorto: "", nombreSiglas: "SIST1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "", nombre: "Historia Social General", nombreCorto: "", nombreSiglas: "HSG", ciclo: "Ciclo Común", electividad: "", area: "Departamento de Historia", correlatividad: "" },
      { cod85: "0732", cod23: "17008", nombre: "FUNDAMENTOS DE PREHISTORIA", nombreCorto: "", nombreSiglas: "FUND", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0733", cod23: "17002", nombre: "HISTORIA DE LA TEORÍA ANTROPOLÓGICA", nombreCorto: "", nombreSiglas: "HTA", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0734", cod23: "17013", nombre: "ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA", nombreCorto: "", nombreSiglas: "LING", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0735", cod23: "17011", nombre: "SISTEMAS SOCIOCULTURALES DE AMÉRICA I (CAZADORES, RECOLECTORES, AGRICULTORES INCIPIENTES)", nombreCorto: "", nombreSiglas: "SOCIO1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0736", cod23: "17005", nombre: "ANTROPOLOGÍA SISTEMÁTICA II (ANTROPOLOGÍA ECONÓMICA)", nombreCorto: "", nombreSiglas: "SIST2", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0737", cod23: "17017", nombre: "MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA", nombreCorto: "", nombreSiglas: "CUANTSOC", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA", nombreCorto: "", nombreSiglas: "BIO", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0739", cod23: "17006", nombre: "ANTROPOLOGÍA SISTEMÁTICA III (SISTEMAS SIMBÓLICOS)", nombreCorto: "", nombreSiglas: "SIST3", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0740", cod23: "17012", nombre: "FOLKLORE GENERAL", nombreCorto: "", nombreSiglas: "FOLK", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },

      // Ciclo Orientación Sociocultural
      { cod85: "0741", cod23: "17010", nombre: "SISTEMAS SOCIOCULTURALES DE AMÉRICA II (AGRICULTORES MEDIOS Y SOCIEDADES ESTATALES)", nombreCorto: "", nombreSiglas: "SOCIO2", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0742", cod23: "17003", nombre: "TEORÍAS ANTROPOLÓGICAS CONTEMPORÁNEAS", nombreCorto: "", nombreSiglas: "TAC", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0743", cod23: "17001", nombre: "EPISTEMOLOGÍA Y MÉTODOS DE INVESTIGACIÓN SOCIAL", nombreCorto: "", nombreSiglas: "EPIST", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0744", cod23: "17016", nombre: "METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN DE CAMPO", nombreCorto: "", nombreSiglas: "METSOC", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "0757", cod23: "17015", nombre: "PSICOLOGÍA GENERAL", nombreCorto: "", nombreSiglas: "PSIGEN", ciclo: "Ciclo Orientación Sociocultural", electividad: "Elección A", area: "", correlatividad: "" },
      { cod85: "0758", cod23: "17015", nombre: "PSICOLOGÍA EVOLUTIVA", nombreCorto: "", nombreSiglas: "PSIEV", ciclo: "Ciclo Orientación Sociocultural", electividad: "Elección A", area: "Departamento de Ciencias de la Educación", correlatividad: "" },
      { cod85: "0745", cod23: "17014", nombre: "TEORÍA SOCIOLÓGICA", nombreCorto: "", nombreSiglas: "TSOC", ciclo: "Ciclo Orientación Sociocultural", electividad: "Elección B", area: "", correlatividad: "" },
      { cod85: "SOCED", cod23: "SOCED", nombre: "Sociología de la Educación", nombreCorto: "", nombreSiglas: "SOCED", ciclo: "Ciclo Orientación Sociocultural", electividad: "Elección B", area: "Departamento de Ciencias de la Educación", correlatividad: "" },
      { cod85: "OPT85", cod23: "ELE23", nombre: "1 materia electiva de cualquier orientación, carrera o facultad de la UBA", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "OPT85", cod23: "ELE23", nombre: "1 materia electiva de cualquier orientación, carrera o facultad de la UBA", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEMSOC", cod23: "SEMSOC",nombre: "1 Seminario Regular de la orientación Sociocultural", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEMSOC", cod23: "SEMSOC", nombre: "1 Seminario Regular de la orientación Sociocultural", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEMSOC", cod23: "SEMSOC", nombre: "1 Seminario Regular de la orientación Sociocultural", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Sociocultural", electividad: "", area: "", correlatividad: "" },

      // Licenciatura Sociocultural
      { cod85: "0746", cod23: "17033", nombre: "SEMINARIO DE INVESTIGACIÓN ANUAL (ORIENTACIÓN SOCIOCULTURAL)", nombreCorto: "", nombreSiglas: "SIASOC", ciclo: "Licenciatura Sociocultural", electividad: "", area: "", correlatividad: "" }
    ]

    // Plan 1985 - Licenciatura Arqueología
    const materiasLicenciatura1985Arqueo: MateriaDelPlan[] = [
      // Ciclo Común
      { cod85: "0730", cod23: "17004", nombre: "ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA)", nombreCorto: "", nombreSiglas: "SIST1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "", cod23: "", nombre: "Historia Social General", nombreCorto: "", nombreSiglas: "HSG", ciclo: "Ciclo Común", electividad: "", area: "Departamento de Historia", correlatividad: "" },
      { cod85: "0732", cod23: "17008", nombre: "FUNDAMENTOS DE PREHISTORIA", nombreCorto: "", nombreSiglas: "FUND", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0733", cod23: "17002", nombre: "HISTORIA DE LA TEORÍA ANTROPOLÓGICA", nombreCorto: "", nombreSiglas: "HTA", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0734", cod23: "17013", nombre: "ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA", nombreCorto: "", nombreSiglas: "LING", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0735", cod23: "17011", nombre: "SISTEMAS SOCIOCULTURALES DE AMÉRICA I (CAZADORES, RECOLECTORES, AGRICULTORES INCIPIENTES)", nombreCorto: "", nombreSiglas: "SOCIO1", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0736", cod23: "17005", nombre: "ANTROPOLOGÍA SISTEMÁTICA II (ANTROPOLOGÍA ECONÓMICA)", nombreCorto: "", nombreSiglas: "SIST2", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0737", cod23: "17017", nombre: "MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA", nombreCorto: "", nombreSiglas: "CUANTSOC", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0738", cod23: "17007", nombre: "ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA", nombreCorto: "", nombreSiglas: "BIO", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0739", cod23: "17006", nombre: "ANTROPOLOGÍA SISTEMÁTICA III (SISTEMAS SIMBÓLICOS)", nombreCorto: "", nombreSiglas: "SIST3", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },
      { cod85: "0740", cod23: "17012", nombre: "FOLKLORE GENERAL", nombreCorto: "", nombreSiglas: "FOLK", ciclo: "Ciclo Común", electividad: "", area: "", correlatividad: "" },

      // Ciclo Orientación Arqueología
      { cod85: "0748", cod23: "17040", nombre: "TEORÍA ARQUEOLÓGICA CONTEMPORÁNEA", nombreCorto: "", nombreSiglas: "TACARQ", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0721", cod23: "17042", nombre: "METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA", nombreCorto: "", nombreSiglas: "METARQ", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0750", cod23: "17034", nombre: "PREHISTORIA DEL VIEJO MUNDO", nombreCorto: "", nombreSiglas: "PVM", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0751", cod23: "17035", nombre: "PREHISTORIA AMERICANA Y ARGENTINA I (CULTURAS DE CAZADORES - RECOLECTORES)", nombreCorto: "", nombreSiglas: "PAA1", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0752", cod23: "17039", nombre: "GEOLOGÍA GENERAL Y GEOMORFOLOGÍA DEL CUARTARIO", nombreCorto: "", nombreSiglas: "GEO", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0712", cod23: "17036", nombre: "PREHISTORIA AMERICANA Y ARGENTINA II (CULTURAS AGRO-ALFARERAS)", nombreCorto: "", nombreSiglas: "PAA2", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0753", cod23: "17041", nombre: "MODELOS Y MÉTODOS DE ANÁLISIS EN ECONOMÍA PREHISTÓRICA", nombreCorto: "", nombreSiglas: "MODMET", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0722", cod23: "17038", nombre: "ERGOLOGÍA Y TECNOLOGÍA", nombreCorto: "", nombreSiglas: "ERG", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "0754", cod23: "17037", nombre: "ARQUEOLOGÍA ARGENTINA", nombreCorto: "", nombreSiglas: "ARQARG", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "OPT85", cod23: "ELE23", nombre: "1 materia electiva de cualquier orientación, carrera o facultad de la UBA", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },
      { cod85: "SEMARQ", cod23: "SEMARQ", nombre: "1 Seminario Regular de la orientación en Arqueología", nombreCorto: "", nombreSiglas: "", ciclo: "Ciclo Orientación Arqueología", electividad: "", area: "", correlatividad: "" },

      // Licenciatura Arqueología
      { cod85: "0755", cod23: "17048", nombre: "SEMINARIO DE INVESTIGACIÓN EN ARQUEOLOGÍA", nombreCorto: "", nombreSiglas: "SIAARQ", ciclo: "Licenciatura Arqueología", electividad: "", area: "", correlatividad: "" }
    ]

    if (planSeleccionado === "2023") {
      if (orientacionSeleccionada === "profesorado") {
        setMaterias(materiasProfesorado2023)
      } else if (orientacionSeleccionada === "sociocultural") {
        setMaterias(materiasLicSocio2023)
      } else {
        setMaterias(materiasLicArqueo2023)
      }
    } else {
      if (orientacionSeleccionada === "profesorado") {
        // Para 1985 profesorado, usar orientacionPlan1985
        if (orientacionPlan1985 === "arqueologia") {
          setMaterias(materiasProfesorado1985Arqueo)
        } else {
          setMaterias(materiasProfesorado1985Socio)
        }
      } else if (orientacionSeleccionada === "sociocultural") {
        setMaterias(materiasLicenciatura1985Socio)
      } else {
        setMaterias(materiasLicenciatura1985Arqueo)
      }
    }
  }, [planSeleccionado, orientacionSeleccionada, orientacionPlan1985])

  // Función para convertir a sentence case respetando números romanos
  const toSentenceCase = (str: string) => {
    // Primero convertir todo a minúsculas
    let result = str.toLowerCase()

    // Capitalizar la primera letra
    result = result.charAt(0).toUpperCase() + result.slice(1)

    // Encontrar y corregir números romanos (I, II, III, IV, V, etc.)
    result = result.replace(/\b(i{1,3}|iv|v|vi{0,3}|ix|x|xi{0,3}|xiv|xv|xvi{0,3}|xix|xx)\b/g, (match) => {
      return match.toUpperCase()
    })

    return result
  }

  // Función para obtener materias por ciclo (preservando orden del CSV)
  const getMateriasByCiclo = (ciclo: string) => {
    let filteredMaterias = []
    if (planSeleccionado === "2023") {
      if (orientacionSeleccionada === "profesorado") {
        filteredMaterias = materias.filter(materia => materia.ciclo.includes(ciclo))
      } else {
        const orientacionSuffix = orientacionSeleccionada === "arqueologia" ? "Arqueología" : "Sociocultural"
        filteredMaterias = materias.filter(materia => 
          materia.ciclo.includes(ciclo) && 
          materia.ciclo.includes(orientacionSuffix)
        )
      }
    } else {
      // Plan 1985
      filteredMaterias = materias.filter(materia => materia.ciclo.includes(ciclo))
    }
    // Mantener el orden original del CSV
    return filteredMaterias
  }

  // Función para obtener materias por área temática (solo para sociocultural 2023) - preservando orden CSV
  const getMateriasByArea = (area: string) => {
    return materias.filter(materia => 
      materia.ciclo.includes("CFO") && 
      materia.area === area &&
      materia.electividad.includes("Elección B")
    )
  }

  // Función para obtener materias electivas de arqueología - preservando orden CSV
  const getMateriasElectivasArqueologia = () => {
    return materias.filter(materia => 
      materia.ciclo.includes("CFO") && 
      materia.electividad.includes("Elección A")
    )
  }

  // Función para renderizar una materia con colores alternados
  const renderMateria = (materia: MateriaDelPlan, index: number) => {
    const isVariable = materia.electividad === "Variable" || 
                      materia.nombre.toLowerCase().includes("seminario") ||
                      materia.nombre.toLowerCase().includes("materia electiva")

    const contenido = planSeleccionado === "2023" ? getContenidoMinimo(materia.cod23) : null

    if (!isVariable && contenido && planSeleccionado === "2023") {
      return (
        <div key={`${materia.cod23}-${index}`} className={`py-2 px-3 rounded relative group ${
          index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
        }`}>
          <span className="text-sm text-gray-900 leading-relaxed cursor-help">
            {toSentenceCase(materia.nombre)}
          </span>

          {/* Tooltip */}
          <div className="absolute left-0 top-full mt-2 w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <h4 className="font-bold text-sm text-[#1c2554] mb-2">
              {materia.nombre}
            </h4>
            <div className="text-xs text-gray-700 leading-relaxed max-h-48 overflow-y-auto">
              {contenido.contenido}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div key={`${materia.cod23}-${index}`} className={`py-2 px-3 rounded ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-blue-50'
      }`}>
        <span className="text-sm text-gray-900 leading-relaxed">
          {toSentenceCase(materia.nombre)}
        </span>
      </div>
    )
  }

  const getTituloOrientacion = () => {
    if (planSeleccionado === "2023") {
      if (orientacionSeleccionada === "profesorado") return "Profesorado"
      if (orientacionSeleccionada === "sociocultural") return "Lic. Sociocultural"
      return "Lic. Arqueología"
    } else {
      if (orientacionSeleccionada === "profesorado") return "Profesorado"
      if (orientacionSeleccionada === "sociocultural") return "Lic. Sociocultural"
      return "Lic. Arqueología"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header principal */}
      <header className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2"></div>
            <div className="col-span-8 text-center relative">
              <h1 className="text-6xl font-bold text-uba-primary mb-4">Ciencias Antropológicas</h1>
              <div className="flex justify-end">
                <img
                  src="/images/uba-filo-header.png"
                  alt="UBA Filo - Facultad de Filosofía y Letras"
                  className="h-8"
                />
              </div>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </header>

      {/* Barra de navegación */}
      <nav className="bg-uba-primary border-t-4 border-uba-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">

            {/* Menú hamburguesa para móviles */}
            <MobileNav>
              <div className="flex flex-col space-y-4">
                <a href="/" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                  Ver oferta horaria
                </a>
                <a href="/planes-estudio" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                  Planes de estudio
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <a href="https://filo.uba.ar" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">filo.uba.ar</a>
                  <a href="https://campus.filo.uba.ar/" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">Campus Virtual</a>
                  <a href="https://suiganew.filo.uba.ar/" className="text-uba-primary hover:text-uba-secondary font-medium transition-all duration-200">Inscripciones - SUIGA</a>
                </div>
              </div>
            </MobileNav>

            {/* Menú para pantallas grandes */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="/" className="bg-uba-secondary text-white px-4 py-2 rounded-lg hover:bg-uba-secondary/90 transition-all duration-200 flex items-center gap-2">
                Ver oferta horaria
              </a>
            </div>
            <div className="hidden lg:flex space-x-8">
              <a href="https://filo.uba.ar" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">filo.uba.ar</a>
              <span className="text-white">|</span>
              <a href="https://campus.filo.uba.ar/" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">Campus Virtual</a>
              <span className="text-white">|</span>
              <a href="https://suiganew.filo.uba.ar/" className="text-white hover:text-uba-secondary hover:font-bold hover:text-base text-sm transition-all duration-200">Inscripciones - SUIGA</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <main className="py-8">
          {/* Selector de plan de estudios */}
          <div className="bg-[#46bfb0]/15 border-[#46bfb0]/40 rounded-xl border p-4 mb-8">
            <h2 className="text-xl font-bold text-[#1c2554] mb-6">Seleccionar plan de estudios</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
              {/* Plan selector */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-xs font-semibold text-uba-primary mb-2">Plan</h4>
                <div className="flex items-center justify-center p-2 bg-[#1c2554] text-white rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${planSeleccionado === "1985" ? "font-bold" : "opacity-70"}`}>
                      1985
                    </span>
                    <Switch
                      checked={planSeleccionado === "2023"}
                      onCheckedChange={(checked) => setPlanSeleccionado(checked ? "2023" : "1985")}
                      className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600 scale-75"
                    />
                    <span className={`text-xs ${planSeleccionado === "2023" ? "font-bold" : "opacity-70"}`}>
                      2023
                    </span>
                  </div>
                </div>
              </div>

              {/* Carrera */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-xs font-semibold text-uba-primary mb-2">Carrera</h4>
                <div className="flex items-center justify-center p-2 bg-[#1c2554] text-white rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${orientacionSeleccionada === "profesorado" ? "font-bold" : "opacity-70"}`}>
                      Profesorado
                    </span>
                    <Switch
                      checked={orientacionSeleccionada !== "profesorado"}
                      onCheckedChange={(checked) => setOrientacionSeleccionada(checked ? "sociocultural" : "profesorado")}
                      className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600 scale-75"
                    />
                    <span className={`text-xs ${orientacionSeleccionada !== "profesorado" ? "font-bold" : "opacity-70"}`}>
                      Licenciatura
                    </span>
                  </div>
                </div>
              </div>

              {/* Orientación */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-xs font-semibold text-uba-primary mb-2">Orientación</h4>
                <div className="flex items-center justify-center p-2 bg-[#1c2554] text-white rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${
                      (orientacionSeleccionada === "profesorado" && planSeleccionado === "2023")
                        ? "opacity-30" 
                        : (orientacionSeleccionada === "profesorado" && planSeleccionado === "1985")
                          ? (orientacionPlan1985 === "arqueologia" ? "font-bold" : "opacity-70")
                          : orientacionSeleccionada === "arqueologia" ? "font-bold" : "opacity-70"
                    }`}>
                      Arqueología
                    </span>
                    <Switch
                      checked={
                        orientacionSeleccionada === "profesorado" && planSeleccionado === "1985" 
                          ? orientacionPlan1985 === "sociocultural"
                          : orientacionSeleccionada === "sociocultural"
                      }
                      onCheckedChange={(checked) => {
                        if (orientacionSeleccionada === "profesorado" && planSeleccionado === "1985") {
                          setOrientacionPlan1985(checked ? "sociocultural" : "arqueologia")
                        } else if (!(orientacionSeleccionada === "profesorado" && planSeleccionado === "2023")) {
                          setOrientacionSeleccionada(checked ? "sociocultural" : "arqueologia")
                        }
                      }}
                      disabled={orientacionSeleccionada === "profesorado" && planSeleccionado === "2023"}
                      className="data-[state=checked]:bg-[#46bfb0] data-[state=unchecked]:bg-gray-600 scale-75 disabled:opacity-30"
                    />
                    <span className={`text-xs ${
                      (orientacionSeleccionada === "profesorado" && planSeleccionado === "2023")
                        ? "opacity-30" 
                        : (orientacionSeleccionada === "profesorado" && planSeleccionado === "1985")
                          ? (orientacionPlan1985 === "sociocultural" ? "font-bold" : "opacity-70")
                          : orientacionSeleccionada === "sociocultural" ? "font-bold" : "opacity-70"
                    }`}>
                      Sociocultural
                    </span>
                  </div>
                </div>
                {(orientacionSeleccionada === "profesorado" && planSeleccionado === "2023") && (
                  <p className="text-xs text-gray-500 mt-2">
                    Solo aplica para Licenciatura en plan 2023
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Título del plan seleccionado */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#1c2554]">
              Plan {planSeleccionado} - {getTituloOrientacion()} - Orientación en {
                planSeleccionado === "2023" 
                  ? (orientacionSeleccionada === "profesorado" ? "General" :
                     orientacionSeleccionada === "sociocultural" ? "Antropología Sociocultural" : "Arqueología")
                  : (orientacionSeleccionada === "profesorado" 
                      ? (orientacionPlan1985 === "sociocultural" ? "Antropología Sociocultural" : "Arqueología")
                      : orientacionSeleccionada === "sociocultural" ? "Antropología Sociocultural" : "Arqueología")
              }
            </h3>
          </div>

          {planSeleccionado === "2023" ? (
            <div className="space-y-6">
              {orientacionSeleccionada === "profesorado" ? (
                <>
                  {/* Plan 2023 Profesorado */}
                  <div className="bg-gray-50 border border-gray-300 rounded-lg">
                    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                      <h2 className="text-lg font-bold text-gray-800">
                        Ciclo de Formación General (CFG) - Profesorado 2023
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFG").filter(m => !m.correlatividad && !m.electividad).map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Materias con correlatividad */}
                  <div className="bg-gray-50 border border-gray-300 rounded-lg">
                    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                      <h2 className="text-lg font-bold text-gray-800">
                        Materias con Correlatividades
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-sm font-medium text-blue-700 italic mb-3">
                          • Correlatividad: Al menos 5 materias del CFG
                        </div>
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFG").filter(m => m.correlatividad === "Al menos 5 materias del CFG" && !m.electividad).map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-sm font-medium text-blue-700 italic mb-3">
                          • Correlatividad: Al menos 10 materias del CFG
                        </div>
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFG").filter(m => m.correlatividad === "Al menos 10 materias del CFG").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Elección A - Orientaciones */}
                  <div className="bg-gray-50 border border-gray-300 rounded-lg">
                    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                      <h2 className="text-lg font-bold text-gray-800">
                        Elección A - 5 materias según orientación
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-sm font-medium text-blue-700 italic mb-3">
                          • Licenciatura Sociocultural
                        </div>
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFG").filter(m => m.area === "Licenciatura Sociocultural").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-sm font-medium text-blue-700 italic mb-3">
                          • Licenciatura Arqueología
                        </div>
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFG").filter(m => m.area === "Licenciatura Arqueología").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CFE - Formación Específica */}
                  <div className="bg-gray-50 border border-gray-300 rounded-lg">
                    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                      <h2 className="text-lg font-bold text-gray-800">
                        Ciclo de Formación Específica (CFE) - Profesorado
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFE").filter(m => !m.electividad).map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-sm font-medium text-blue-700 italic mb-3">
                          • Elección B - Departamento de Ciencias de la Educación
                        </div>
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFE").filter(m => m.electividad === "Elección B").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Plan 2023 Licenciaturas */}
                  <div className="bg-gray-50 border border-gray-300 rounded-lg">
                    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                      <h2 className="text-lg font-bold text-gray-800">
                        Ciclo de Formación General (CFG)
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFG").map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ciclo de Formación Orientada (CFO) */}
                  <div className="bg-gray-50 border border-gray-300 rounded-lg">
                    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                      <h2 className="text-lg font-bold text-gray-800">
                        Ciclo de Formación Orientada (CFO)
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">

                      {/* Materias básicas del CFO */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="space-y-1">
                          {getMateriasByCiclo("CFO").filter(materia => 
                            !materia.electividad || 
                            materia.electividad === "Variable"
                          ).map((materia, index) => renderMateria(materia, index))}
                        </div>
                      </div>

                      {/* Correlatividad específica según orientación */}
                      {orientacionSeleccionada === "sociocultural" ? (
                        <>
                          {/* Correlatividad: Al menos 5 materias del CFG */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Correlatividad: Al menos 5 materias del CFG
                            </div>
                            <div className="space-y-1">
                              {getMateriasByCiclo("CFO").filter(materia => 
                                materia.correlatividad === "Al menos 5 materias del CFG"
                              ).map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Correlatividad: Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Correlatividad: Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
                            </div>
                            <div className="space-y-1">
                              {getMateriasByCiclo("CFO").filter(materia => 
                                materia.correlatividad === "Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología"
                              ).map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </div>
                        </>
                      )}

                      {orientacionSeleccionada === "sociocultural" ? (
                        <>
                          {/* Correlatividad: Al menos 10 materias del CFG */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Correlatividad: Al menos 10 materias del CFG
                            </div>
                            <div className="space-y-1">
                              {getMateriasByCiclo("CFO").filter(materia => 
                                materia.correlatividad === "Al menos 10 materias del CFG"
                              ).map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Correlatividad específica para arqueología */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Correlatividad: Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología y Metodología y Técnicas de Inv. Arqueológica
                            </div>
                            <div className="space-y-1">
                              {getMateriasByCiclo("CFO").filter(materia => 
                                materia.correlatividad.includes("Metodología y Técnicas de Inv. Arqueológica")
                              ).map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </div>
                        </>
                      )}

                      {orientacionSeleccionada === "sociocultural" ? (
                        <>
                          {/* Una materia a elegir entre */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Una materia a elegir entre:
                            </div>
                            <div className="space-y-1">
                              {getMateriasByCiclo("CFO").filter(materia => 
                                materia.electividad === "Elección A, 1 materia"
                              ).map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </div>

                          {/* Materia electiva */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="space-y-1">
                              {getMateriasByCiclo("CFO").filter(materia => 
                                materia.nombre.includes("materia electiva")
                              ).map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Dos materias a elegir entre (Arqueología) */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Correlatividad: Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías
                            </div>
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Dos materias a elegir entre:
                            </div>
                            <div className="space-y-1">
                              {getMateriasElectivasArqueologia().map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </div>
                        </>
                      )}

                      {orientacionSeleccionada === "sociocultural" && (
                        /* Dos materias a elegir dentro de la misma área temática */
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="text-sm font-medium text-blue-700 italic mb-4">
                            • Dos materias a elegir dentro de la misma área temática:
                          </div>

                          {/* Antropología histórica y memoria */}
                          <div className="mb-4">
                            <div className="font-medium text-blue-700 mb-2 text-sm underline">
                              Antropología histórica y memoria
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <div className="space-y-1">
                                {getMateriasByArea("Antropología histórica y memoria").map((materia, index) => renderMateria(materia, index))}
                              </div>
                            </div>
                          </div>

                          {/* Procesos culturales, ideología y poder */}
                          <div className="mb-4">
                            <div className="font-medium text-blue-700 mb-2 text-sm underline">
                              Procesos culturales, ideología y poder
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <div className="space-y-1">
                                {getMateriasByArea("Procesos culturales, ideología y poder").map((materia, index) => renderMateria(materia, index))}
                              </div>
                            </div>
                          </div>

                          {/* Procesos políticos, instituciones y prácticas */}
                          <div className="mb-4">
                            <div className="font-medium text-blue-700 mb-2 text-sm underline">
                              Procesos políticos, instituciones y prácticas
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <div className="space-y-1">
                                {getMateriasByArea("Procesos políticos, instituciones y prácticas").map((materia, index) => renderMateria(materia, index))}
                              </div>
                            </div>
                          </div>

                          {/* Procesos socioeconómicos */}
                          <div className="mb-4">
                            <div className="font-medium text-blue-700 mb-2 text-sm underline">
                              Procesos socioeconómicos: producción, reproducción y transformación social
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <div className="space-y-1">
                                {getMateriasByArea("Procesos socioeconómicos: producción, reproducción y transformación social").map((materia, index) => renderMateria(materia, index))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Seminario de investigación */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        {orientacionSeleccionada === "sociocultural" ? (
                          <>
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Correlatividad: Al menos 10 materias del CFG, incluyendo Metodología e Investigación Antropológica
                            </div>
                            <div className="space-y-1">
                              {getMateriasByCiclo("CFO").filter(materia => 
                                materia.correlatividad.includes("METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA")
                              ).map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm font-medium text-blue-700 italic mb-3">
                              • Correlatividad: Al menos 10 materias aprobadas en total, incluyendo Metodología y Técnicas de Inv. Arqueológica, Teorías Arqueológicas Contemporáneas y Arqueología Argentina
                            </div>
                            <div className="space-y-1">
                              {getMateriasByCiclo("CFO").filter(materia => 
                                materia.correlatividad.includes("Teorías Arqueológicas Contemporáneas")
                              ).map((materia, index) => renderMateria(materia, index))}
                            </div>
                          </>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Idiomas */}
                  <div className="bg-gray-50 border border-gray-300 rounded-lg">
                    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                      <h2 className="text-lg font-bold text-gray-800">
                        Idiomas
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="space-y-1">
                          <div className="py-2 px-3 rounded bg-gray-50">
                            <span className="text-sm text-gray-900 leading-relaxed">Tres niveles de un idioma anglosajón</span>
                          </div>
                          <div className="py-2 px-3 rounded bg-blue-50">
                            <span className="text-sm text-gray-900 leading-relaxed">Tres niveles de un idioma latino</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Plan 1985 */}
              <div className="bg-gray-50 border border-gray-300 rounded-lg">
                <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                  <h2 className="text-lg font-bold text-gray-800">
                    Plan de Estudios 1985 - {getTituloOrientacion()}
                  </h2>
                </div>
                <div className="p-6 space-y-4">

                  {/* Ciclo Común */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 italic mb-3">
                      • Ciclo Común
                    </div>
                    <div className="space-y-1">
                      {getMateriasByCiclo("Ciclo Común").map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>

                  {/* Ciclo de Orientación */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 italic mb-3">
                      • Ciclo de Orientación {orientacionSeleccionada === "arqueologia" ? "Arqueología" : "Sociocultural"}
                    </div>
                    <div className="space-y-1">
                      {getMateriasByCiclo("Ciclo Orientación").map((materia, index) => renderMateria(materia, index))}
                    </div>
                  </div>

                  {/* Específico según carrera */}
                  {orientacionSeleccionada === "profesorado" && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-medium text-blue-700 italic mb-3">
                        • Profesorado
                      </div>
                      <div className="space-y-1">
                        {getMateriasByCiclo("Profesorado").map((materia, index) => renderMateria(materia, index))}
                      </div>
                    </div>
                  )}

                  {orientacionSeleccionada === "sociocultural" && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-medium text-blue-700 italic mb-3">
                        • Licenciatura Sociocultural
                      </div>
                      <div className="space-y-1">
                        {getMateriasByCiclo("Licenciatura Sociocultural").map((materia, index) => renderMateria(materia, index))}
                      </div>
                    </div>
                  )}

                  {orientacionSeleccionada === "arqueologia" && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-medium text-blue-700 italic mb-3">
                        • Licenciatura Arqueología
                      </div>
                      <div className="space-y-1">
                        {getMateriasByCiclo("Licenciatura Arqueología").map((materia, index) => renderMateria(materia, index))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Idiomas para Plan 1985 */}
              <div className="bg-gray-50 border border-gray-300 rounded-lg">
                <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                  <h2 className="text-lg font-bold text-gray-800">
                    Idiomas
                  </h2>
                </div>
                <div className="p-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-1">
                      <div className="py-2 px-3 rounded bg-gray-50">
                        <span className="text-sm text-gray-900 leading-relaxed">Tres niveles de un idioma anglosajón</span>
                      </div>
                      <div className="py-2 px-3 rounded bg-blue-50">
                        <span className="text-sm text-gray-900 leading-relaxed">Tres niveles de un idioma latino</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}