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

      // Manejar números romanos al final de palabras
      if (word.match(/^.*(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/)) {
        const base = word.slice(0, -word.match(/(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/)?.[0].length || 0)
        const roman = word.match(/(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/)?.[0].toUpperCase() || ""
        return base.charAt(0).toUpperCase() + base.slice(1) + roman
      }

      return index === 0 || !lowercaseWords.includes(word) ? word.charAt(0).toUpperCase() + word.slice(1) : word
    })
    .join(" ")
}
