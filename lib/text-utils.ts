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
    .replace(/\b\w/g, (char) => char.toUpperCase())
    // Preservar números romanos comunes
    .replace(/\b(I|Ii|II|Iii|III|Iv|IV|V|Vi|VI|Vii|VII|Viii|VIII|Ix|IX|X|Xi|XI|Xii|XII)\b/gi, (match) => match.toUpperCase())
    // Manejar artículos y preposiciones
    .replace(/\b(de|del|la|las|los|el|en|y|a|con|por|para|desde|hasta|sobre|bajo|ante|tras|durante|mediante|según|sin|so|como|entre|hacia|contra)\b/gi, 
      (word, offset, str) => {
        // Si es la primera palabra de la cadena, mantener mayúscula
        if (offset === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
        return word.toLowerCase()
      })
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