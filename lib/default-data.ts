
import { toStartCase } from "./text-utils"

// Default horarios data
export const defaultHorariosCSV = `Marca temporal,Dirección de correo electrónico,Tipo de asignatura,Título del seminario,Cátedra del seminario,Orientación del seminario,Título de la asignatura anual,Cátedra de asignatura anual,Modalidad de cursada de la asignatura anual,Título de materia cuatrimestral,Cátedra de la materia,Modalidad de aprobación de la materia,Modalidad de cursada de la materia,Título de materia optativa/electiva,Cátedra de la materia optativa/electiva,Orientación (materia optativa/electiva),Modalidad de cursada (materia optativa/electiva),Teórico 1 - Día,Teórico 1 - horario inicio,Teórico 1 - horario finalización,¿Agregar otra clase de teóricos?,Indicar relación entre los dos horarios de teóricos,Teórico 2 - Día,Teórico 2 - horario inicio,Teórico 2 - horario finalización,¿Agregar clases de teórico-prácticos?,Teórico-Práctico 1 - Día,Teórico-Práctico 1 - horario inicio,Teórico-Práctico 1 - horario finalización,¿Agregar clases de teórico-prácticos?,Indicar relación entre los dos horarios de teórico-prácticos,Teórico-Práctico 2 - Día,Teórico-Práctico 2 - horario inicio,Teórico-Práctico 2 - horario finalización,¿Agregar clases de prácticos?,Práctico 1 - Día,Práctico 1 - horario inicio,Práctico 1 - horario finalización,¿Agregar más clases de prácticos?,Práctico 2 - Día,Práctico 2 - horario inicio,Práctico 2 - horario finalización,¿Agregar más clases de prácticos?,Práctico 3 - Día,Práctico 3 - horario inicio,Práctico 3 - horario finalización,¿Agregar más clases de prácticos?,Práctico 4 - Día,Práctico 4 - horario inicio,Práctico 4 - horario finalización,¿Agregar más clases de prácticos?,Práctico 5 - Día,Práctico 5 - horario inicio,Práctico 5 - horario finalización,¿Agregar más clases de prácticos?,Práctico 6 - Día,Práctico 6 - horario inicio,Práctico 6 - horario finalización,¿Agregar más clases de prácticos?,Práctico 7 - Día,Práctico 7 - horario inicio,Práctico 7 - horario finalización,¿Agregar más clases de prácticos?,Práctico 8 - Día,Práctico 8 - horario inicio,Práctico 8 - horario finalización,"De ser necesario indicar aclaraciones (lugar de cursada, horario especial, modalidades particulares, etc.)",Modalidad de aprobación (materia optativa/electiva),Modalidad de cursada del seminario
19/06/2025 13:39:42,antoniodovalb@gmail.com,Materia cuatrimestral regular,,,,,,,ANTROPOLOGÍA BIOLÓGICA,Avena,Exámen Final,Presencial,,,,,Lunes,8,12,"No, pasar directamente a prácticos",,,,,,,,,,,,,,,,,Martes,10,12,"Sí, agregar más clases de prácticos",Miércoles,14,16,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,Se cursa en el Museo Etnográfico.,,
19/06/2025 13:40:23,antoniodovalb@gmail.com,Seminario regular,Antropología del Trabajo,Palermo,Virtual,,,,,,,,,,,,,,,,,,,,,Miércoles,16,20,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
19/06/2025 13:41:54,antoniodovalb@gmail.com,Materia o seminario anual,,,,DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA,Lischetti,"Presencial, con 30% de virtualidad asincrónica",,,,,,,,,Miércoles,18,22,Agregar otro teórico,"Los horarios corresponden a dos clases teóricas alternativas, los estudiantes deben elegir una",Viernes,10,14,"Sí, pasar a agregar teórico-prácticos",Miércoles,12,14,"No, pasar directamente a prácticos",,,,,,Viernes,8,10,"Sí, agregar más clases de prácticos",Sábado,8,10,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,"Durante el segundo cuatrimestre, se informarán oportunamente los horarios de los talleres",,
19/06/2025 13:50:48,antoniodovalb@gmail.com,Materia cuatrimestral optativa/electiva,,,,,,,,,,,Problemáticas contemporáneas del Estado,Balbi,Promoción Directa,Presencial,Jueves,16,20,"No, pasar directamente a prácticos",,,,,,,,,,,,,,,Miércoles,8,10,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
19/06/2025 19:23:15,antoniodovalb@gmail.com,Materia cuatrimestral regular,,,,,,,PUEBLOS INDÍGENAS AMERICANOS,Lenton,Exámen Final,Presencial,,,,,Lunes,14,16,Agregar otro teórico,Los horarios corresponden a un mismo teórico dividido en dos,Sábado,14,18,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
19/06/2025 19:24:31,antoniodovalb@gmail.com,Materia cuatrimestral regular,,,,,,,TEORÍAS DE LA SUBJETIVIDAD,Pérez,Exámen Final,Presencial,,,,,Viernes,8,12,Agregar otro teórico,"Los horarios corresponden a dos clases teóricas alternativas, los estudiantes deben elegir una",Miércoles,12,16,"No, pasar directamente a prácticos",,,,,,,,,,Miércoles,10,12,"Sí, agregar más clases de prácticos",Viernes,18,20,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,,,
23/06/2025 17:12:32,antoniodovalb@gmail.com,Materia cuatrimestral regular,,,,,,,PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA,Balbi,Promoción Directa,Presencial,,,,,Miércoles,16,20,"No, pasar directamente a prácticos",,,,,,,,,,,,,,,Miércoles,14,16,"Sí, agregar más clases de prácticos",Miércoles,20,22,"Sí, agregar más clases de prácticos",Miércoles,20,22,"Sí, agregar más clases de prácticos",Martes,18,20,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,
23/06/2025 17:14:48,antoniodovalb@gmail.com,Materia cuatrimestral regular,,,,,,,HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I,Roca,Exámen Final,Presencial,,,,,Jueves,16,20,"No, pasar directamente a prácticos",,,,,,,,,,,,,,,Jueves,14,16,"Sí, agregar más clases de prácticos",Jueves,14,16,"Sí, agregar más clases de prácticos",Jueves,20,22,"Sí, agregar más clases de prácticos",Jueves,20,22,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,
23/06/2025 17:16:09,antoniodovalb@gmail.com,Materia cuatrimestral regular,,,,,,,INTRODUCCIÓN A LA ARQUEOLOGÍA,Lanza/Pineau,Exámen Final,Presencial,,,,,Martes,10,12,Agregar otro teórico,Los horarios corresponden a un mismo teórico dividido en dos,Jueves,10,12,"No, pasar directamente a prácticos",,,,,,,,,,Martes,12,14,"Sí, agregar más clases de prácticos",Jueves,12,14,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,,,
23/06/2025 17:18:10,antoniodovalb@gmail.com,Materia cuatrimestral regular,,,,,,,PUEBLOS INDÍGENAS AMERICANOS,Lenton,Promoción Directa,Presencial,,,,,Miércoles,10,14,Agregar otro teórico,"Los horarios corresponden a dos clases teóricas alternativas, los estudiantes deben elegir una",Jueves,16,20,"No, pasar directamente a prácticos",,,,,,,,,,Miércoles,8,10,"Sí, agregar más clases de prácticos",Miércoles,14,16,"Sí, agregar más clases de prácticos",Jueves,14,16,"Sí, agregar más clases de prácticos",Jueves,20,22,"Sí, agregar más clases de prácticos",Viernes,18,20,"No, finalizar carga de horarios",,,,,,,,,,,,,,
23/06/2025 17:19:30,antoniodovalb@gmail.com,Seminario regular,Problemas de Parentesco en Antropología,Sendon / Smietniasky,Sociocultural,,,,,,,,,,,,,,,,,,,,,Jueves,10,14,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Virtual
23/06/2025 17:21:52,antoniodovalb@gmail.com,Materia cuatrimestral regular,,,,,,,GEOLOGÍA PARA ARQUEÓLOGOS,Pérez,Exámen Final,"Presencial, con 30% de virtualidad asincrónica",,,,,Martes,18,22,"No, pasar directamente a prácticos",,,,,,,,,,,,,,,Miércoles,10,14,"Sí, agregar más clases de prácticos",Jueves,18,22,"No, finalizar carga de horarios",,,,,,,,,,,,,,,,,,,,,,,,Se cursa en el Museo Etnográfico J. B. Ambrosetti.,,`

// Default plan data
export const defaultPlanesCSV = {
  "1985-profesorado-sociocultural": `Cod85,Cod23,Nom85,Nom85_corto,Nom85_siglas,Ciclo85,Electividad85,Area85,Correlatividad85
0730,17004,ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA),,SIST1,Ciclo Común,,,
,,Historia Social General,,HSG,Ciclo Común,,Departamento de Historia,
0732,17008,FUNDAMENTOS DE PREHISTORIA,,FUND,Ciclo Común,,,
0733,17002,HISTORIA DE LA TEORÍA ANTROPOLÓGICA,,HTA,Ciclo Común,,,
0734,17013,ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA,,LING,Ciclo Común,,,
0735,17011,"SISTEMAS SOCIOCULTURALES DE AMÉRICA I (CAZADORES, RECOLECTORES, AGRICULTORES INCIPIENTES)",,SOCIO1,Ciclo Común,,,
0736,17005,ANTROPOLOGÍA SISTEMÁTICA II (ANTROPOLOGÍA ECONÓMICA),,SIST2,Ciclo Común,,,
0737,17017,MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA,,CUANTSOC,Ciclo Común,,,
0738,17007,ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA,,BIO,Ciclo Común,,,
0739,17006,ANTROPOLOGÍA SISTEMÁTICA III (SISTEMAS SIMBÓLICOS),,SIST3,Ciclo Común,,,
0740,17012,FOLKLORE GENERAL,,FOLK,Ciclo Común,,,
0741,17010,SISTEMAS SOCIOCULTURALES DE AMÉRICA II (AGRICULTORES MEDIOS Y SOCIEDADES ESTATALES),,SOCIO2,Ciclo Orientación Sociocultural,,,
0742,17003,TEORÍAS ANTROPOLÓGICAS CONTEMPORÁNEAS,,TAC,Ciclo Orientación Sociocultural,,,
0743,17001,EPISTEMOLOGÍA Y MÉTODOS DE INVESTIGACIÓN SOCIAL,,EPIST,Ciclo Orientación Sociocultural,,,
0744,17016,METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN DE CAMPO,,METSOC,Ciclo Orientación Sociocultural,,,
0757,17015,PSICOLOGÍA GENERAL,,PSIGEN,Ciclo Orientación Sociocultural,Elección A,,
0758,17015,PSICOLOGÍA EVOLUTIVA,,PSIEV,Ciclo Orientación Sociocultural,Elección A,Departamento de Ciencias de la Educación,
0745,17014,TEORÍA SOCIOLÓGICA,,TSOC,Ciclo Orientación Sociocultural,Elección B,,
,,Sociología de la Educación,,SOCED,Ciclo Orientación Sociocultural,Elección B,Departamento de Ciencias de la Educación,
,,"1 materia electiva de cualquier orientación, carrera o facultad de la UBA",,,Ciclo Orientación Sociocultural,,,
,,"1 materia electiva de cualquier orientación, carrera o facultad de la UBA",,,Ciclo Orientación Sociocultural,,,
,,1 Seminario Regular de la orientación Sociocultural,,,Ciclo Orientación Sociocultural,,,
,,1 Seminario Regular de la orientación Sociocultural,,,Ciclo Orientación Sociocultural,,,
,,1 Seminario Regular de la orientación Sociocultural,,,Ciclo Orientación Sociocultural,,,
,17050,Didáctica General,Did. General,DIGEN,Profesorado,,Departamento de Ciencias de la Educación,
7127,17051,DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA,Did. Esp. y Pract. de Ens.,DIDES,Profesorado,,,`,

  "1985-profesorado-arqueologia": `Cod85,Cod23,Nom85,Nom85_corto,Nom85_siglas,Ciclo85,Electividad85,Area85,Correlatividad85
0730,17004,ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA),,SIST1,Ciclo Común,,,
,,Historia Social General,,HSG,Ciclo Común,,Departamento de Historia,
0732,17008,FUNDAMENTOS DE PREHISTORIA,,FUND,Ciclo Común,,,
0733,17002,HISTORIA DE LA TEORÍA ANTROPOLÓGICA,,HTA,Ciclo Común,,,
0734,17013,ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA,,LING,Ciclo Común,,,
0735,17011,"SISTEMAS SOCIOCULTURALES DE AMÉRICA I (CAZADORES, RECOLECTORES, AGRICULTORES INCIPIENTES)",,SOCIO1,Ciclo Común,,,
0736,17005,ANTROPOLOGÍA SISTEMÁTICA II (ANTROPOLOGÍA ECONÓMICA),,SIST2,Ciclo Común,,,
0737,17017,MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA,,CUANTSOC,Ciclo Común,,,
0738,17007,ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA,,BIO,Ciclo Común,,,
0739,17006,ANTROPOLOGÍA SISTEMÁTICA III (SISTEMAS SIMBÓLICOS),,SIST3,Ciclo Común,,,
0740,17012,FOLKLORE GENERAL,,FOLK,Ciclo Común,,,
0748,17040,TEORÍA ARQUEOLÓGICA CONTEMPORÁNEA,,TACARQ,Ciclo Orientación Arqueología,,,
0721,17042,METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA,,METARQ,Ciclo Orientación Arqueología,,,
0750,17034,PREHISTORIA DEL VIEJO MUNDO,,PVM,Ciclo Orientación Arqueología,,,
0751,17035,PREHISTORIA AMERICANA Y ARGENTINA I (CULTURAS DE CAZADORES - RECOLECTORES),,PAA1,Ciclo Orientación Arqueología,,,
0752,17039,GEOLOGÍA GENERAL Y GEOMORFOLOGÍA  DEL CUARTARIO,,GEO,Ciclo Orientación Arqueología,,,
0712,17036,PREHISTORIA AMERICANA Y ARGENTINA II (CULTURAS AGRO-ALFARERAS),,PAA2,Ciclo Orientación Arqueología,,,
0753,17041,MODELOS Y MÉTODOS DE ANÁLISIS EN ECONOMÍA PREHISTÓRICA,,MODMET,Ciclo Orientación Arqueología,,,
0722,17038,ERGOLOGÍA Y TECNOLOGÍA,,ERG,Ciclo Orientación Arqueología,,,
0754,17037,ARQUEOLOGÍA ARGENTINA,,ARQARG,Ciclo Orientación Arqueología,,,
,,"1 materia electiva de cualquier orientación, carrera o facultad de la UBA						",,,Ciclo Orientación Arqueología,,,
,,1 Seminario Regular de la orientación en Arqueología,,,Ciclo Orientación Arqueología,,,
,17050,Didáctica General,Did. General,DIGEN,Profesorado,,Departamento de Ciencias de la Educación,
7127,17051,DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA,Did. Esp. y Pract. de Ens.,DIDES,Profesorado,,,`,

  "1985-licenciatura-sociocultural": `Cod85,Cod23,Nom85,Nom85_corto,Nom85_siglas,Ciclo85,Electividad85,Area85,Correlatividad85
0730,17004,ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA),,SIST1,Ciclo Común,,,
,,Historia Social General,,HSG,Ciclo Común,,Departamento de Historia,
0732,17008,FUNDAMENTOS DE PREHISTORIA,,FUND,Ciclo Común,,,
0733,17002,HISTORIA DE LA TEORÍA ANTROPOLÓGICA,,HTA,Ciclo Común,,,
0734,17013,ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA,,LING,Ciclo Común,,,
0735,17011,"SISTEMAS SOCIOCULTURALES DE AMÉRICA I (CAZADORES, RECOLECTORES, AGRICULTORES INCIPIENTES)",,SOCIO1,Ciclo Común,,,
0736,17005,ANTROPOLOGÍA SISTEMÁTICA II (ANTROPOLOGÍA ECONÓMICA),,SIST2,Ciclo Común,,,
0737,17017,MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA,,CUANTSOC,Ciclo Común,,,
0738,17007,ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA,,BIO,Ciclo Común,,,
0739,17006,ANTROPOLOGÍA SISTEMÁTICA III (SISTEMAS SIMBÓLICOS),,SIST3,Ciclo Común,,,
0740,17012,FOLKLORE GENERAL,,FOLK,Ciclo Común,,,
0741,17010,SISTEMAS SOCIOCULTURALES DE AMÉRICA II (AGRICULTORES MEDIOS Y SOCIEDADES ESTATALES),,SOCIO2,Ciclo Orientación Sociocultural,,,
0742,17003,TEORÍAS ANTROPOLÓGICAS CONTEMPORÁNEAS,,TAC,Ciclo Orientación Sociocultural,,,
0743,17001,EPISTEMOLOGÍA Y MÉTODOS DE INVESTIGACIÓN SOCIAL,,EPIST,Ciclo Orientación Sociocultural,,,
0744,17016,METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN DE CAMPO,,METSOC,Ciclo Orientación Sociocultural,,,
0757,17015,PSICOLOGÍA GENERAL,,PSIGEN,Ciclo Orientación Sociocultural,Elección A,,
0758,17015,PSICOLOGÍA EVOLUTIVA,,PSIEV,Ciclo Orientación Sociocultural,Elección A,Departamento de Ciencias de la Educación,
0745,17014,TEORÍA SOCIOLÓGICA,,TSOC,Ciclo Orientación Sociocultural,Elección B,,
,,Sociología de la Educación,,SOCED,Ciclo Orientación Sociocultural,Elección B,Departamento de Ciencias de la Educación,
,,"1 materia electiva de cualquier orientación, carrera o facultad de la UBA",,,Ciclo Orientación Sociocultural,,,
,,"1 materia electiva de cualquier orientación, carrera o facultad de la UBA",,,Ciclo Orientación Sociocultural,,,
,,1 Seminario Regular de la orientación Sociocultural,,,Ciclo Orientación Sociocultural,,,
,,1 Seminario Regular de la orientación Sociocultural,,,Ciclo Orientación Sociocultural,,,
,,1 Seminario Regular de la orientación Sociocultural,,,Ciclo Orientación Sociocultural,,,
0746,17033,SEMINARIO DE INVESTIGACIÓN ANUAL (ORIENTACIÓN SOCIOCULTURAL),,SIASOC,Licenciatura Sociocultural,,,`,

  "1985-licenciatura-arqueologia": `Cod85,Cod23,Nom85,Nom85_corto,Nom85_siglas,Ciclo85,Electividad85,Area85,Correlatividad85
0730,17004,ANTROPOLOGÍA SISTEMÁTICA I (ORGANIZACIÓN SOCIAL Y POLÍTICA),,SIST1,Ciclo Común,,,
,,Historia Social General,,HSG,Ciclo Común,,Departamento de Historia,
0732,17008,FUNDAMENTOS DE PREHISTORIA,,FUND,Ciclo Común,,,
0733,17002,HISTORIA DE LA TEORÍA ANTROPOLÓGICA,,HTA,Ciclo Común,,,
0734,17013,ELEMENTOS DE LINGÜÍSTICA Y SEMIÓTICA,,LING,Ciclo Común,,,
0735,17011,"SISTEMAS SOCIOCULTURALES DE AMÉRICA I (CAZADORES, RECOLECTORES, AGRICULTORES INCIPIENTES)",,SOCIO1,Ciclo Común,,,
0736,17005,ANTROPOLOGÍA SISTEMÁTICA II (ANTROPOLOGÍA ECONÓMICA),,SIST2,Ciclo Común,,,
0737,17017,MÉTODOS CUANTITATIVOS EN ANTROPOLOGÍA,,CUANTSOC,Ciclo Común,,,
0738,17007,ANTROPOLOGÍA BIOLÓGICA Y PALEOANTROPOLOGÍA,,BIO,Ciclo Común,,,
0739,17006,ANTROPOLOGÍA SISTEMÁTICA III (SISTEMAS SIMBÓLICOS),,SIST3,Ciclo Común,,,
0740,17012,FOLKLORE GENERAL,,FOLK,Ciclo Común,,,
0748,17040,TEORÍA ARQUEOLÓGICA CONTEMPORÁNEA,,TACARQ,Ciclo Orientación Arqueología,,,
0721,17042,METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA,,METARQ,Ciclo Orientación Arqueología,,,
0750,17034,PREHISTORIA DEL VIEJO MUNDO,,PVM,Ciclo Orientación Arqueología,,,
0751,17035,PREHISTORIA AMERICANA Y ARGENTINA I (CULTURAS DE CAZADORES - RECOLECTORES),,PAA1,Ciclo Orientación Arqueología,,,
0752,17039,GEOLOGÍA GENERAL Y GEOMORFOLOGÍA  DEL CUARTARIO,,GEO,Ciclo Orientación Arqueología,,,
0712,17036,PREHISTORIA AMERICANA Y ARGENTINA II (CULTURAS AGRO-ALFARERAS),,PAA2,Ciclo Orientación Arqueología,,,
0753,17041,MODELOS Y MÉTODOS DE ANÁLISIS EN ECONOMÍA PREHISTÓRICA,,MODMET,Ciclo Orientación Arqueología,,,
0722,17038,ERGOLOGÍA Y TECNOLOGÍA,,ERG,Ciclo Orientación Arqueología,,,
0754,17037,ARQUEOLOGÍA ARGENTINA,,ARQARG,Ciclo Orientación Arqueología,,,
,,"1 materia electiva de cualquier orientación, carrera o facultad de la UBA						",,,Ciclo Orientación Arqueología,,,
,,1 Seminario Regular de la orientación en Arqueología,,,Ciclo Orientación Arqueología,,,
0755,17048,SEMINARIO DE INVESTIGACIÓN EN ARQUEOLOGÍA,,SIAARQ,Licenciatura Arqueología,,,`,

  "2023-profesorado": `Cod85,Cod23,Nom23,Nom23_corto,Nom23_siglas,Ciclo23,Electividad23,Area23,Correlatividad23
0743,17001,EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES,Epistemo,EPIS,Ciclo de Formación General (CFG) Profesorado,,,
0733,17002,HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I,Historia y Teoría 1,HTA1,Ciclo de Formación General (CFG) Profesorado,,,
0742,17003,HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II,Historia y Teoría 2,HTA2,Ciclo de Formación General (CFG) Profesorado,,,
0730,17004,PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA,P. A. Soc. y Pol.,PASYP,Ciclo de Formación General (CFG) Profesorado,,,
0736,17005,PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA,P. A. Económica,PAE,Ciclo de Formación General (CFG) Profesorado,,,
0739,17006,PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA,P. Antrop. Simbólica,PASIM,Ciclo de Formación General (CFG) Profesorado,,,
0738,17007,ANTROPOLOGÍA BIOLÓGICA,Antrop. Biológica,ABIO,Ciclo de Formación General (CFG) Profesorado,,,
0732,17008,INTRODUCCIÓN A LA ARQUEOLOGÍA,Intro. Arqueo.,IARQ,Ciclo de Formación General (CFG) Profesorado,,,
,17009,"ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD",Arqueo. Leg. y Com.,ALC,Ciclo de Formación General (CFG) Profesorado,,,
,,1 Seminario de Prácticas Socioeducativas Territorializadas (PST),,,Ciclo de Formación General (CFG) Profesorado,Variable,,
,17022,AMÉRICA EN CONTEXTO,Am. en Contexto,AEC,Ciclo de Formación General (CFG) Profesorado,,,Al menos 5 materias del CFG
,17049,METODOLOGÍA DE LA INVESTIGACIÓN ANTROPOLÓGICA EN EDUCACIÓN,Met. Antrop. Educación,METED,Ciclo de Formación General (CFG) Profesorado,,,Al menos 5 materias del CFG
0741,17010,"SOCIEDADES, CULTURAS Y ESTADOS EN AMÉRICA PREHISPÁNICA Y COLONIAL",S. C. y E. en Am. Prehisp.,SCEAP,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Sociocultural,Al menos 5 materias del CFG
0734,17013,ANTROPOLOGÍA LINGÜÍSTICA,Antrop. Lingüística,ALING,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Sociocultural,Al menos 5 materias del CFG
0740,17012,"PROCESOS CULTURALES, FOLKLORE Y PRÁCTICAS SUBALTERNAS",Proc. Cult. Folkore y P. Sub.,PCFPS,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Sociocultural,Al menos 5 materias del CFG
0745,17014,TEORÍA SOCIAL,Teoría Social,TSOC,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Sociocultural,Al menos 5 materias del CFG
"0757, 0758",17015,TEORÍAS DE LA SUBJETIVIDAD,T. de la Subjetividad,TSUBJ,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Sociocultural,Al menos 5 materias del CFG
0735,17011,PUEBLOS INDÍGENAS AMERICANOS,P. Ind. Americanos,PIA,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Sociocultural,Al menos 5 materias del CFG
0751,17035,ARQUEOLOGÍA AMERICANA Y ARGENTINA I,Arqueo. Am y Arg. I,ARQAM1,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Arqueología,Al menos 5 materias del CFG
0712,17036,ARQUEOLOGÍA AMERICANA Y ARGENTINA II,Arqueo. Am y Arg. II,ARQAM2,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Arqueología,Al menos 5 materias del CFG
0754,17037,ARQUEOLOGÍA ARGENTINA,Arqueo. Argentina,ARQARG,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Arqueología,Al menos 5 materias del CFG
0750,17034,"ARQUEOLOGÍA DE ÁFRICA, EURASIA Y OCEANÍA",Arqueo. de Af. Eura. y Oc.,ARQAEO,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Arqueología,Al menos 5 materias del CFG
0721,17042,METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA,Met. Arqueo.,MTARQ,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Arqueología,Al menos 5 materias del CFG
0722,17038,MATERIALES ARQUEOLÓGICOS Y SUS TECNOLOGÍAS,Mat. Arqueo. y sus Tec.,MAT,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Arqueología,Al menos 5 materias del CFG
0752,17039,GEOLOGÍA PARA ARQUEÓLOGOS,Geo. para Arqueo.,GPA,Ciclo de Formación General (CFG) Profesorado,"Elección A, 5 materias",Licenciatura Arqueología,Al menos 5 materias del CFG
,17029,ANTROPOLOGÍA Y EDUCACIÓN,Antrop. y Educación,AYE,Ciclo de Formación General (CFG) Profesorado,,,Al menos 10 materias del CFG
,17050,ANTROPOLOGÍA Y CONOCIMIENTO,Antrop. y Conocimiento,AYC,Ciclo de Formación General (CFG) Profesorado,,,Al menos 10 materias del CFG
,,Seminario de Educación Sexual Integral,Sem. ESI,ESI,Ciclo de Formación Específica (CFE) Profesorado,,,Al menos 10 materias del CFG
,,Didáctica General,Did. General,DIGEN,Ciclo de Formación Específica (CFE) Profesorado,,,Al menos 10 materias del CFG
7127,17051,DIDÁCTICA ESPECIAL Y PRÁCTICAS DE LA ENSEÑANZA,Did. Esp. y Pract. de Ens.,DIDES,Ciclo de Formación Específica (CFE) Profesorado,,,Al menos 10 materias del CFG
,17052,EXPERIENCIAS SOCIOEDUCATIVAS SITUADAS,Exp. Socioed. Stiuadas,ESS,Ciclo de Formación Específica (CFE) Profesorado,,,Al menos 10 materias del CFG
,,Historia Social General de la Educación,,,Ciclo de Formación Específica (CFE) Profesorado,Elección B,Departamento de Ciencias de la Educación,Al menos 10 materias del CFG
,,Historia de la Educación Argentina,,,Ciclo de Formación Específica (CFE) Profesorado,Elección B,Departamento de Ciencias de la Educación,Al menos 10 materias del CFG
,,Política Educacional,,,Ciclo de Formación Específica (CFE) Profesorado,Elección B,Departamento de Ciencias de la Educación,Al menos 10 materias del CFG
,,Sociología de la Educación,,,Ciclo de Formación Específica (CFE) Profesorado,Elección B,Departamento de Ciencias de la Educación,Al menos 10 materias del CFG`,

  "2023-licenciatura-arqueologia": `Cod85,Cod23,Nom23,Nom23_corto,Nom23_siglas,Ciclo23,Electividad23,Area23,Correlatividad23
0743,17001,EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES,Epistemo,EPIS,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
0733,17002,HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I,Historia y Teoría 1,HTA1,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
0742,17003,HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II,Historia y Teoría 2,HTA2,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
0730,17004,PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA,P. A. Soc. y Pol.,PASYP,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
0736,17005,PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA,P. A. Económica,PAE,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
0739,17006,PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA,P. Antrop. Simbólica,PASIM,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
0738,17007,ANTROPOLOGÍA BIOLÓGICA,Antrop. Biológica,ABIO,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
0732,17008,INTRODUCCIÓN A LA ARQUEOLOGÍA,Intro. Arqueo.,IARQ,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
,17009,"ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD",Arqueo. Leg. y Com.,ALC,Ciclo de Formación General (CFG) Licenciatura Arqueología,,,
,,1 Seminario de Prácticas Socioeducativas Territorializadas (PST),,,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,Variable,,
0750,17034,"ARQUEOLOGÍA DE ÁFRICA, EURASIA Y OCEANÍA",Arqueo. de Af. Eura. y Oc.,ARQAEO,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0751,17035,ARQUEOLOGÍA AMERICANA Y ARGENTINA I,Arqueo. Am y Arg. I,ARQAM1,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0712,17036,ARQUEOLOGÍA AMERICANA Y ARGENTINA II,Arqueo. Am y Arg. II,ARQAM2,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0754,17037,ARQUEOLOGÍA ARGENTINA,Arqueo. Argentina,ARQARG,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0722,17038,MATERIALES ARQUEOLÓGICOS Y SUS TECNOLOGÍAS,Mat. Arqueo. y sus Tec.,MAT,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0752,17039,GEOLOGÍA PARA ARQUEÓLOGOS,Geo. para Arqueo.,GPA,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0748,17040,TEORÍAS ARQUEOLÓGICAS CONTEMPORÁNEAS,T. Arqueo. Contemp.,TARQC,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0753,17041,MODELOS Y MÉTODOS DE ANÁLISIS EN ARQUEOLOGÍA,Mod. y Met. Arqueo.,MYM,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0721,17042,METODOLOGÍA Y TÉCNICAS DE LA INVESTIGACIÓN ARQUEOLÓGICA,Met. Arqueo.,MTARQ,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología
0737,17043,MÉTODOS CUANTITATIVOS EN ARQUEOLOGÍA,Met. Cuanti. Arqueo.,MCARQ,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología y Metodología y Técnicas de Inv. Arqueológica
,,1 Seminario Regular de la orientación en Arqueología,,,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,Variable,,Al menos 5 materias cursadas del CFG incluyendo Introducción a la Arqueología y Metodología y Técnicas de Inv. Arqueológica
,17044,EJERCICIO PROFESIONAL DE LA ARQUEOLOGÍA,Ej. Profesional Arqueo.,EPARQ,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,"Elección A, 2 materias",,"Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías"
,17045,MATERIALES BIOLÓGICOS EN ARQUEOLOGÍA,Mat. Bio. en Arqueo.,MBA,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,"Elección A, 2 materias",,"Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías"
,17046,ARQUEOLOGÍA DE TIEMPOS MODERNOS,Arq. de T. Modernos,ATM,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,"Elección A, 2 materias",,"Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías"
,17047,ESTUDIOS INTERDISCIPLINARIOS EN ARQUEOLOGÍA,Est. Interdisciplinarios Arq.,EIARQ,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,"Elección A, 2 materias",,"Al menos 10 materias cursadas en total, incluyendo Métodos cuantitativos en Arqueología y Materiales Arqueológicos y sus Tecnologías"
0755,17048,"SEMINARIO DE INVESTIGACIÓN EN ARQUEOLOGÍA, TRABAJO DE CAMPO Y LABORATORIO",Sem. Inv. Arqueo.,SIARQ,Ciclo de Formación Orientada (CFO) Licenciatura Arqueología,,,"Al menos 10 materias aprobadas en total, incluyendo Metodología y Técnicas de Inv. Arqueológica, Teorías Arqueológicas Contemporáneas y Arqueología Argentina"`,

  "2023-licenciatura-sociocultural": `Cod85,Cod23,Nom23,Nom23_corto,Nom23_siglas,Ciclo23,Electividad23,Area23,Correlatividad23
0743,17001,EPISTEMOLOGÍA DE LAS CIENCIAS SOCIALES,Epistemo,EPIS,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
0733,17002,HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA I,Historia y Teoría 1,HTA1,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
0742,17003,HISTORIA Y TEORÍA DE LA ANTROPOLOGÍA II,Historia y Teoría 2,HTA2,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
0730,17004,PROBLEMAS DE ANTROPOLOGÍA SOCIAL Y POLÍTICA,P. A. Soc. y Pol.,PASYP,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
0736,17005,PROBLEMAS DE ANTROPOLOGÍA ECONÓMICA,P. A. Económica,PAE,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
0739,17006,PROBLEMAS DE ANTROPOLOGÍA SIMBÓLICA,P. Antrop. Simbólica,PASIM,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
0738,17007,ANTROPOLOGÍA BIOLÓGICA,Antrop. Biológica,ABIO,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
0732,17008,INTRODUCCIÓN A LA ARQUEOLOGÍA,Intro. Arqueo.,IARQ,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
,17009,"ARQUEOLOGÍA, LEGISLACIÓN Y COMUNIDAD",Arqueo. Leg. y Com.,ALC,Ciclo de Formación General (CFG) Licenciatura Sociocultural,,,
,,1 Seminario de Prácticas Socioeducativas Territorializadas (PST),,,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,Variable,,
0741,17010,"SOCIEDADES, CULTURAS Y ESTADOS EN AMÉRICA PREHISPÁNICA Y COLONIAL",S. C. y E. en Am. Prehisp.,SCEAP,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,Al menos 5 materias del CFG
0735,17011,PUEBLOS INDÍGENAS AMERICANOS,P. Ind. Americanos,PIA,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,Al menos 5 materias del CFG
0740,17012,"PROCESOS CULTURALES, FOLKLORE Y PRÁCTICAS SUBALTERNAS",Proc. Cult. Folkore y P. Sub.,PCFPS,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,Al menos 5 materias del CFG
0734,17013,ANTROPOLOGÍA LINGÜÍSTICA,Antrop. Lingüística,ALING,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,Al menos 5 materias del CFG
0745,17014,TEORÍA SOCIAL,Teoría Social,TSOC,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,Al menos 5 materias del CFG
"0757, 0758",17015,TEORÍAS DE LA SUBJETIVIDAD,T. de la Subjetividad,TSUBJ,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,Al menos 5 materias del CFG
,,1 Seminario regular de Antropología Sociocultural,,,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,Variable,,
0744,17016,METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA,Met. e Inv. Antrop.,MIA,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,Al menos 10 materias del CFG
0737,17017,ENFOQUE CUANTITATIVO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL,Enf. Cuantitativo,CUANT,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección A, 1 materia",,Al menos 10 materias del CFG
,17018,EJERCICIO PROFESIONAL DE LA ANTROPOLOGÍA SOCIOCULTURAL,Ej. Profesional Socio.,EPAS,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección A, 1 materia",,Al menos 10 materias del CFG
,,"1 materia electiva de cualquier orientación, carrera o facultad de la UBA",,,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,
,17019,"CONQUISTAS, RESISTENCIAS Y MEMORIAS INDÍGENAS",Conq. Res. y Mem. Ind.,CRMI,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área",Antropología histórica y memoria,Al menos 10 materias del CFG
,17020,PUEBLOS INDÍGENAS Y ESTADOS,P. Ind. y Estados,PIE,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área",Antropología histórica y memoria,Al menos 10 materias del CFG
,17021,ANTROPOLOGÍAS LATINOAMERICANAS,A. Latinoamericanas,ALAT,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área",Antropología histórica y memoria,Al menos 10 materias del CFG
,17022,AMÉRICA EN CONTEXTO,Am. en Contexto,AEC,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área",Antropología histórica y memoria,Al menos 10 materias del CFG
,17023,"CAPITALISMO ACTUAL, TRABAJO Y TRABAJADORES",Cap. Trab. y Trabajadores,CATT,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos culturales, ideología y poder",Al menos 10 materias del CFG
,17024,CONFIGURACIONES SOCIOAMBIENTALES Y TERRITORIALES EN EL ESPACIO URBANO Y RURAL,Conf. Soc. y Terr.,SOCTER,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos culturales, ideología y poder",Al menos 10 materias del CFG
,17025,RELACIONES DE GÉNERO Y ORGANIZACIÓN SOCIAL DE LOS CUIDADOS,Rel. de Género y Cuidados,RGEN,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos culturales, ideología y poder",Al menos 10 materias del CFG
,17026,ANTROPOLOGÍA DEL ESTADO Y LAS POLÍTICAS PÚBLICAS,A. del Estado y Pol. Pub.,AEST,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos políticos, instituciones y prácticas",Al menos 10 materias del CFG
,17027,SUJETOS SOCIALES Y POLÍTICOS EN PERSPECTIVA ANTROPOLÓGICA,Suj. Soc. y Pol.,SUJ,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos políticos, instituciones y prácticas",Al menos 10 materias del CFG
,17028,ABORDAJES ANTROPOLÓGICOS DE LA SALUD Y LAS BIOCIENCIAS,Salud y Biociencias,SALUD,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos políticos, instituciones y prácticas",Al menos 10 materias del CFG
,17029,ANTROPOLOGÍA Y EDUCACIÓN,Antrop. y Educación,AYE,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos políticos, instituciones y prácticas",Al menos 10 materias del CFG
,17030,DINÁMICAS CONTEMPORÁNEAS DEL CAMPO DE LA CULTURA,D. Cont. en el C. de la Cult.,CULT,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos socioeconómicos: producción, reproducción y transformación social",Al menos 10 materias del CFG
,17031,"DISCURSO, IMAGEN Y ALTERIDAD",Disc. Im. y Alteridad,DIA,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos socioeconómicos: producción, reproducción y transformación social",Al menos 10 materias del CFG
,17032,"RELIGIONES, MITOS Y RITUALES EN LA MODERNIDAD",Relig. Mitos y Rituales,RIT,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,"Elección B, 2 materias de la misma área","Procesos socioeconómicos: producción, reproducción y transformación social",Al menos 10 materias del CFG
0746,17033,SEMINARIO DE INVESTIGACIÓN EN ANTROPOLOGÍA SOCIOCULTURAL,Sem. Inv. Antrop. Socio.,SIASOC,Ciclo de Formación Orientada (CFO) Licenciatura Sociocultural,,,"Al menos 10 materias del CFG, incluyendo METODOLOGÍA E INVESTIGACIÓN ANTROPOLÓGICA"`
}

export interface MateriaDelPlan {
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

export interface PlanDeEstudios {
  año: string
  titulo: string
  orientacion: string
  materias: MateriaDelPlan[]
}

export function initializeDefaultData() {
  // Initialize horarios if not exists
  const existingHorarios = localStorage.getItem("horarios-antropologia")
  if (!existingHorarios) {
    const defaultPeriodoInfo = {
      año: new Date().getFullYear().toString(),
      periodo: "1C"
    }
    
    const asignaturas = processDefaultHorariosCSV()
    
    localStorage.setItem("horarios-antropologia", JSON.stringify({
      asignaturas,
      periodo: defaultPeriodoInfo
    }))
  }

  // Initialize planes if not exists
  const existingPlanes = localStorage.getItem("planes-estudios-antropologia")
  if (!existingPlanes) {
    const planesData = processDefaultPlanesCSV()
    localStorage.setItem("planes-estudios-antropologia", JSON.stringify(planesData))
  }
}

function processDefaultHorariosCSV() {
  const lines = defaultHorariosCSV.split("\n").filter((line) => line.trim())
  
  // Función para parsear CSV
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }

  const headers = parseCSVLine(lines[0])
  const asignaturas: any[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    while (values.length < headers.length) {
      values.push("")
    }

    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ""
    })

    // Determine assignment type and name
    let materia = ""
    let tipoAsignatura = ""
    let modalidadAprobacion = ""
    let modalidadCursada = ""
    let orientacion = ""

    if (row["Tipo de asignatura"] === "Seminario regular") {
      materia = row["Título del seminario"]?.trim() || ""
      tipoAsignatura = "Seminario regular"
      modalidadCursada = row["Modalidad de cursada del seminario"] || "Presencial"
      orientacion = row["Orientación del seminario"] || ""
      modalidadAprobacion = "Trabajo final"
    } else if (row["Tipo de asignatura"] === "Materia o seminario anual") {
      materia = row["Título de la asignatura anual"]?.trim() || ""
      tipoAsignatura = "Materia anual"
      modalidadCursada = row["Modalidad de cursada de la asignatura anual"] || "Presencial"
      modalidadAprobacion = "Trabajo final"
    } else if (row["Tipo de asignatura"] === "Materia cuatrimestral regular") {
      materia = row["Título de materia cuatrimestral"]?.trim() || ""
      tipoAsignatura = "Materia regular"
      modalidadAprobacion = row["Modalidad de aprobación de la materia"] === "Promoción Directa" ? "Promoción directa" : "Examen final"
      modalidadCursada = row["Modalidad de cursada de la materia"] || "Presencial"
    } else if (row["Tipo de asignatura"] === "Materia cuatrimestral optativa/electiva") {
      materia = row["Título de materia optativa/electiva"]?.trim() || ""
      tipoAsignatura = "Materia optativa/electiva"
      modalidadAprobacion = row["Modalidad de aprobación (materia optativa/electiva)"] === "Promoción Directa" ? "Promoción directa" : "Examen final"
      modalidadCursada = row["Modalidad de cursada (materia optativa/electiva)"] || "Presencial"
      orientacion = row["Orientación (materia optativa/electiva)"] || ""
    }

    if (!materia) continue

    const catedra = row["Cátedra del seminario"] || row["Cátedra de asignatura anual"] || row["Cátedra de la materia"] || row["Cátedra de la materia optativa/electiva"] || ""

    // Process classes
    const clases: any[] = []

    // Theoretical classes
    if (row["Teórico 1 - Día"]) {
      clases.push({
        tipo: "Teórico",
        dia: row["Teórico 1 - Día"],
        horaInicio: row["Teórico 1 - horario inicio"],
        horaFin: row["Teórico 1 - horario finalización"]
      })
    }

    if (row["Teórico 2 - Día"]) {
      clases.push({
        tipo: "Teórico",
        dia: row["Teórico 2 - Día"],
        horaInicio: row["Teórico 2 - horario inicio"],
        horaFin: row["Teórico 2 - horario finalización"]
      })
    }

    // Theoretical-practical classes
    if (row["Teórico-Práctico 1 - Día"]) {
      clases.push({
        tipo: "Teórico-Práctico",
        dia: row["Teórico-Práctico 1 - Día"],
        horaInicio: row["Teórico-Práctico 1 - horario inicio"],
        horaFin: row["Teórico-Práctico 1 - horario finalización"]
      })
    }

    if (row["Teórico-Práctico 2 - Día"]) {
      clases.push({
        tipo: "Teórico-Práctico",
        dia: row["Teórico-Práctico 2 - Día"],
        horaInicio: row["Teórico-Práctico 2 - horario inicio"],
        horaFin: row["Teórico-Práctico 2 - horario finalización"]
      })
    }

    // Practical classes
    for (let j = 1; j <= 8; j++) {
      const dia = row[`Práctico ${j} - Día`]
      if (dia) {
        clases.push({
          tipo: "Práctico",
          dia: dia,
          horaInicio: row[`Práctico ${j} - horario inicio`],
          horaFin: row[`Práctico ${j} - horario finalización`]
        })
      }
    }

    asignaturas.push({
      id: `${materia.toLowerCase().replace(/\s+/g, "-")}-${catedra.toLowerCase().replace(/\s+/g, "-")}`,
      materia: toStartCase(materia),
      catedra: toStartCase(catedra),
      tipoAsignatura,
      modalidadAprobacion,
      modalidadCursada,
      orientacion,
      aclaraciones: row["De ser necesario indicar aclaraciones (lugar de cursada, horario especial, modalidades particulares, etc.)"] || "",
      clases
    })
  }

  return asignaturas
}

function processDefaultPlanesCSV(): PlanDeEstudios[] {
  const planes: PlanDeEstudios[] = []

  // Process each plan
  const planConfigs = [
    { key: "1985-profesorado-sociocultural", año: "1985", orientacion: "Profesorado - Orientación Sociocultural" },
    { key: "1985-profesorado-arqueologia", año: "1985", orientacion: "Profesorado - Orientación Arqueología" },
    { key: "1985-licenciatura-sociocultural", año: "1985", orientacion: "Licenciatura en Antropología Sociocultural" },
    { key: "1985-licenciatura-arqueologia", año: "1985", orientacion: "Licenciatura en Arqueología" },
    { key: "2023-profesorado", año: "2023", orientacion: "Profesorado" },
    { key: "2023-licenciatura-arqueologia", año: "2023", orientacion: "Licenciatura en Arqueología" },
    { key: "2023-licenciatura-sociocultural", año: "2023", orientacion: "Licenciatura en Antropología Sociocultural" }
  ]

  for (const config of planConfigs) {
    const csvData = defaultPlanesCSV[config.key as keyof typeof defaultPlanesCSV]
    if (csvData) {
      const materias = processPlanCSV(csvData, config.año)
      planes.push({
        año: config.año,
        titulo: `Plan ${config.año}`,
        orientacion: config.orientacion,
        materias
      })
    }
  }

  return planes
}

function processPlanCSV(csvData: string, año: string): MateriaDelPlan[] {
  const lines = csvData.split("\n").filter((line) => line.trim())
  
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }

  const headers = parseCSVLine(lines[0])
  const materias: MateriaDelPlan[] = []

  const expectedHeaders = año === "1985" 
    ? ["Cod85", "Cod23", "Nom85", "Nom85_corto", "Nom85_siglas", "Ciclo85", "Electividad85", "Area85", "Correlatividad85"]
    : ["Cod85", "Cod23", "Nom23", "Nom23_corto", "Nom23_siglas", "Ciclo23", "Electividad23", "Area23", "Correlatividad23"]

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    while (values.length < headers.length) {
      values.push("")
    }

    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ""
    })

    const nombreField = año === "1985" ? "Nom85" : "Nom23"
    const nombre = row[nombreField]?.trim()
    if (!nombre) continue

    const nombreCortoField = año === "1985" ? "Nom85_corto" : "Nom23_corto"
    const nombreSiglasField = año === "1985" ? "Nom85_siglas" : "Nom23_siglas"
    const cicloField = año === "1985" ? "Ciclo85" : "Ciclo23"
    const electividadField = año === "1985" ? "Electividad85" : "Electividad23"
    const areaField = año === "1985" ? "Area85" : "Area23"
    const correlatividadField = año === "1985" ? "Correlatividad85" : "Correlatividad23"

    materias.push({
      cod85: row["Cod85"]?.trim() || "",
      cod23: row["Cod23"]?.trim() || "",
      nombre: toStartCase(nombre),
      nombreCorto: row[nombreCortoField]?.trim() || "",
      nombreSiglas: row[nombreSiglasField]?.trim() || "",
      ciclo: row[cicloField]?.trim() || "",
      electividad: row[electividadField]?.trim() || "",
      area: row[areaField]?.trim() || "",
      correlatividad: row[correlatividadField]?.trim() || "",
    })
  }

  return materias
}
