import { useState } from "react";
import "./App.css";

const ROWS = 9;

function parseText(text: string): number[][] {
  const parsed: number[][] = [];
  const lines = text.split("\n");
  if (lines.length != ROWS) {
    throw `must have ${ROWS} rows`;
  }
  for (const line of lines) {
    const numStrings = line.split(",");
    if (numStrings.length != ROWS) {
      throw `each row must have ${ROWS} columns`;
    }
    const newLine: number[] = [];
    for (const numString of numStrings) {
      // empty string or whitespace only string will be converted to 0
      const newNum = Number(numString.trim());
      if (isNaN(newNum)) {
        throw `${numString} is not a number`;
      }
      if (newNum < 0 || newNum > 9) {
        throw `${newNum} is not a valid number (must be between 0 and ${ROWS} inclusive)`;
      }
      newLine.push(newNum);
    }
    parsed.push(newLine);
  }
  return parsed;
}

function isValidInput(input: number[][]): boolean {
  // check shape of input
  if (input.length != ROWS) {
    return false;
  }
  for (let row = 0; row < input.length; row++) {
    if (input[row].length != ROWS) {
      return false;
    }
  }

  // check each row for duplicates
  for (let row = 0; row < ROWS; row++) {
    const foundNums = new Set();
    for (let col = 0; col < ROWS; col++) {
      const num = input[row][col];
      if (num >= 1 && num <= 9) {
        if (foundNums.has(num)) {
          console.log("failed row check");
          return false;
        }
        foundNums.add(num);
      }
    }
  }

  // check each column for duplicates
  for (let col = 0; col < ROWS; col++) {
    const foundNums = new Set();
    for (let row = 0; row < ROWS; row++) {
      const num = input[row][col];
      if (num >= 1 && num <= 9) {
        if (foundNums.has(num)) {
          console.log("failed col check");
          return false;
        }
        foundNums.add(num);
      }
    }
  }

  // check each subgrid for duplicates
  for (let subgridRow = 0; subgridRow < 3; subgridRow++) {
    for (let subgridCol = 0; subgridCol < 3; subgridCol++) {
      const foundNums = new Set();
      for (let row = subgridRow * 3; row < (subgridRow + 1) * 3; row++) {
        for (let col = subgridCol * 3; col < (subgridCol + 1) * 3; col++) {
          const num = input[row][col];
          if (num >= 1 && num <= 9) {
            if (foundNums.has(num)) {
              console.log("failed subgrid check");
              return false;
            }
            foundNums.add(num);
          }
        }
      }
    }
  }

  return true;
}

function App() {
  // const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  // let parsed: number[][] | null = null;
  function test(input: string) {
    try {
      let parsed = parseText(input);
      console.log(parsed);
      if (error) {
        setError("");
      }
      setIsValid(isValidInput(parsed));
    } catch (error) {
      setError(error as string);
      console.log(error);
    }
  }

  return (
    <>
      <p>Each row on new line</p>
      <p>For each row, separate values by comma</p>
      <p>Use 0 or space or nothing to represent empty cell</p>
      <textarea
        rows={10}
        cols={20}
        onChange={(e) => {
          test(e.target.value);
        }}
      ></textarea>
      <pre>{error}</pre>
      <pre>{isValid ? "Input is valid" : "Input is NOT valid"}</pre>
    </>
  );
}

export default App;
