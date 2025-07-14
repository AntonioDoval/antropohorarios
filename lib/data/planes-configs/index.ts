
export { configuracionProfesorado2023 } from './profesorado-2023'
export { configuracionLicSociocultural2023 } from './licenciatura-sociocultural-2023'
export { configuracionLicArqueologia2023 } from './licenciatura-arqueologia-2023'
export { configuracionProfSociocultural1985 } from './profesorado-sociocultural-1985'
export { configuracionProfArqueologia1985 } from './profesorado-arqueologia-1985'
export { configuracionLicSociocultural1985 } from './licenciatura-sociocultural-1985'
export { configuracionLicArqueologia1985 } from './licenciatura-arqueologia-1985'

import { ConfiguracionPlan } from '../planes-config'
import { PlanType, OrientacionType } from '../../types/planes'
import { configuracionProfesorado2023 } from './profesorado-2023'
import { configuracionLicSociocultural2023 } from './licenciatura-sociocultural-2023'
import { configuracionLicArqueologia2023 } from './licenciatura-arqueologia-2023'
import { configuracionProfSociocultural1985 } from './profesorado-sociocultural-1985'
import { configuracionProfArqueologia1985 } from './profesorado-arqueologia-1985'
import { configuracionLicSociocultural1985 } from './licenciatura-sociocultural-1985'
import { configuracionLicArqueologia1985 } from './licenciatura-arqueologia-1985'

export const getConfiguracionPlan = (plan: PlanType, orientacion: OrientacionType, orientacion1985?: "sociocultural" | "arqueologia"): ConfiguracionPlan => {
  if (plan === "2023") {
    switch (orientacion) {
      case "profesorado":
        return configuracionProfesorado2023
      case "sociocultural":
        return configuracionLicSociocultural2023
      case "arqueologia":
        return configuracionLicArqueologia2023
      default:
        return configuracionProfesorado2023
    }
  } else {
    // Plan 1985
    if (orientacion === "profesorado") {
      if (orientacion1985 === "arqueologia") {
        return configuracionProfArqueologia1985
      } else {
        return configuracionProfSociocultural1985
      }
    } else if (orientacion === "sociocultural") {
      return configuracionLicSociocultural1985
    } else if (orientacion === "arqueologia") {
      return configuracionLicArqueologia1985
    } else {
      return configuracionProfSociocultural1985
    }
  }
}
