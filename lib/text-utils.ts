export function toStartCase(text: string): string {
  if (!text) return ""

  return text
    .toLowerCase()
    .split(" ")
    .map((word, index, array) => {
      // Mantener artículos y preposiciones en minúscula si no son la primera palabra
      const lowercaseWords = [
        "de",
        "del",
        "la",
        "las",
        "el",
        "los",
        "en",
        "a",
        "al",
        "y",
        "e",
        "o",
        "u",
        "con",
        "por",
        "para",
        "sin",
      ]

      // Manejar números romanos completos (como palabras independientes)
      if (word.match(/^(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/)) {
        return word.toUpperCase()
      }

      // Manejar números romanos al final de palabras
      if (word.match(/^.+(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/)) {
        const romanMatch = word.match(/(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/)
        if (romanMatch) {
          const base = word.slice(0, -romanMatch[0].length)
          const roman = romanMatch[0].toUpperCase()
          return base.charAt(0).toUpperCase() + base.slice(1) + roman
        }
      }

      return index === 0 || !lowercaseWords.includes(word) ? word.charAt(0).toUpperCase() + word.slice(1) : word
    })
    .join(" ")
}
