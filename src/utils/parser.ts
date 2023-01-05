export function parseText(text: string): number[][] {
  const parsed: number[][] = [];
  const lines = text.split("\n");
  if (lines.length != 9) {
    throw "input must have 9 rows";
  }
  for (const line of lines) {
    const numStrings = line.split(",");
    if (numStrings.length != 9) {
      throw "each row must have 9 columns";
    }
    const newLine: number[] = [];
    for (const numString of numStrings) {
      // empty string or whitespace only string will be converted to 0
      const newNum = Number(numString.trim());
      if (isNaN(newNum)) {
        throw `${numString} is not a valid number (must be between 0 and 9 inclusive)`;
      }
      if (newNum < 0 || newNum > 9) {
        throw `${newNum} is not a valid number (must be between 0 and 9 inclusive)`;
      }
      newLine.push(newNum);
    }
    parsed.push(newLine);
  }
  return parsed;
}

export function matrixToString(matrix: number[][]): string {
  let result: string[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      result.push(matrix[row][col].toString());
      if (col < 8) {
        result.push(",");
      }
    }
    result.push("\n");
  }
  return result.join("");
}
