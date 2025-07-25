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

export const normalizarTexto = (texto: string): string => {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export const extraerApellidos = (catedra: string): string => {
  // Separar por "/"
  const partes = catedra.split('/').map(part => part.trim())
  
  // Excepciones para nombres de doble apellido
  const excepciones = ["Cristian Favier Dubois"]
  
  const apellidos = partes.map(nombre => {
    // Verificar si es una excepción
    const excepcion = excepciones.find(exc => nombre.includes(exc))
    if (excepcion) {
      // Para "Cristian Favier Dubois", devolver "Favier Dubois"
      if (excepcion === "Cristian Favier Dubois") {
        return "Favier Dubois"
      }
    }
    
    // Para casos normales, tomar la última palabra
    const palabras = nombre.split(' ')
    return palabras[palabras.length - 1]
  })
  
  return apellidos.join(' / ')
}