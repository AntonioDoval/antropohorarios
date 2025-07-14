import { MateriaDelPlan } from "../types/planes"

// Importar datos del plan 2023
export { 
  materiasProfesorado2023,
  materiasLicenciaturaSociocultural2023,
  materiasLicenciaturaArqueologia2023 
} from "./planes-data-2023"

// Importar datos del plan 1985
export { 
  materiasProfesoradoSociocultural1985,
  materiasProfesoradoArqueologia1985,
  materiasLicenciaturaSociocultural1985,
  materiasLicenciaturaArqueologia1985 
} from "./planes-data-1985"

// Función para obtener los datos según la selección
export const getMateriasPorSeleccion = (
  plan: "2023" | "1985",
  orientacion: "profesorado" | "sociocultural" | "arqueologia",
  orientacionPlan1985?: "sociocultural" | "arqueologia"
): MateriaDelPlan[] => {
  if (plan === "2023") {
    if (orientacion === "profesorado") {
      return materiasProfesorado2023
    } else if (orientacion === "sociocultural") {
      return materiasLicenciaturaSociocultural2023
    } else {
      return materiasLicenciaturaArqueologia2023
    }
  } else {
    if (orientacion === "profesorado") {
      return orientacionPlan1985 === "sociocultural" 
        ? materiasProfesoradoSociocultural1985
        : materiasProfesoradoArqueologia1985
    } else if (orientacion === "sociocultural") {
      return materiasLicenciaturaSociocultural1985
    } else {
      return materiasLicenciaturaArqueologia1985
    }
  }
}