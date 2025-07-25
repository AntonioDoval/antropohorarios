export const toStartCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // Lista de números romanos a preservar
      const numerosRomanos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      // Si la palabra es un número romano, lo preservamos.
      if (numerosRomanos.includes(word.toUpperCase())) {
        return word.toUpperCase();
      }
      // Artículos y preposiciones que van en minúscula (excepto si es la primera palabra)
      const articulos = ['de', 'del', 'la', 'las', 'los', 'el', 'en', 'y', 'a', 'con', 'por', 'para', 'desde', 'hasta', 'sobre', 'bajo', 'ante', 'tras', 'durante', 'mediante', 'según', 'sin', 'so', 'como', 'entre', 'hacia', 'contra']
      
      // Si es la primera palabra o no es un artículo/preposición, capitalizar
      if (index === 0 || !articulos.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      
      return word
    })
    .join(' ')
}

export const extraerApellidos = (catedra: string): string => {
  // Separar por "/"
  const partes = catedra.split('/').map(part => part.trim())
  
  // Procesar cada parte
  const apellidos = partes.map(nombre => {
    // Excepción para Cristian Favier Dubois
    if (nombre.includes("Cristian Favier Dubois")) {
      return "Favier Dubois"
    }
    
    // Para otros casos, tomar la última palabra
    const palabras = nombre.split(' ')
    return palabras[palabras.length - 1]
  })

  return apellidos.join(' / ')
}

export const normalizarTexto = (texto: string): string => {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}