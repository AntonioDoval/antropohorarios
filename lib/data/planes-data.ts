
import { MateriaDelPlan, PlanType, OrientacionType } from "../types/planes"
import { 
  materiasProfesorado2023, 
  materiasLicenciaturaSociocultural2023, 
  materiasLicenciaturaArqueologia2023 
} from "./planes-data-2023"
import { 
  materiasProfesoradoSociocultural1985, 
  materiasProfesoradoArqueologia1985, 
  materiasLicenciaturaSociocultural1985, 
  materiasLicenciaturaArqueologia1985 
} from "./planes-data-1985"

export const getMateriasPorSeleccion = (
  plan: PlanType,
  orientacion: OrientacionType,
  orientacionPlan1985: "sociocultural" | "arqueologia"
): MateriaDelPlan[] => {
  if (plan === "2023") {
    switch (orientacion) {
      case "profesorado":
        return materiasProfesorado2023
      case "sociocultural":
        return materiasLicenciaturaSociocultural2023
      case "arqueologia":
        return materiasLicenciaturaArqueologia2023
      default:
        return []
    }
  } else if (plan === "1985") {
    switch (orientacion) {
      case "profesorado":
        return orientacionPlan1985 === "sociocultural" 
          ? materiasProfesoradoSociocultural1985 
          : materiasProfesoradoArqueologia1985
      case "sociocultural":
        return materiasLicenciaturaSociocultural1985
      case "arqueologia":
        return materiasLicenciaturaArqueologia1985
      default:
        return []
    }
  }
  
  return []
}

// Exportar todas las materias también para uso directo
export {
  materiasProfesorado2023,
  materiasLicenciaturaSociocultural2023,
  materiasLicenciaturaArqueologia2023,
  materiasProfesoradoSociocultural1985,
  materiasProfesoradoArqueologia1985,
  materiasLicenciaturaSociocultural1985,
  materiasLicenciaturaArqueologia1985
}
