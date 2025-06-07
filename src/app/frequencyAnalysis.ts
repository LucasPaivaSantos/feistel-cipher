export interface LetterFrequency {
  letter: string;
  count: number;
  percentage: number;
}

export interface FrequencyAnalysisResult {
  letters: LetterFrequency[];
  totalLetters: number;
}

export function analyzeLetterFrequency(text: string): FrequencyAnalysisResult {
  const letterCount: { [key: string]: number } = {};

  //caracteres que são a mesma letra devem ser considerados iguais
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (const letter of alphabet) {
    letterCount[letter] = 0;
  }

  let totalLetters = 0;

  for (const char of text.toUpperCase()) {
    if (char >= "A" && char <= "Z") {
      letterCount[char]++;
      totalLetters++;
    }
  }

  const letters: LetterFrequency[] = Object.entries(letterCount)
    .map(([letter, count]) => ({
      letter,
      count,
      percentage: totalLetters > 0 ? (count / totalLetters) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    letters,
    totalLetters,
  };
}
