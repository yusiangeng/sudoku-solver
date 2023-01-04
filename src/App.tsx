import { useState } from "react";
import "./App.css";

const ROWS = 3;

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
  for (let row = 0; row < input.length; row++) {
    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let col = 0; col < input.length; col++) {
      const num = input[row][col];
      counts[num]++;
    }
    for (let i = 1; i <= 9; i++) {
      if (counts[i] > 1) {
        console.log("failed row check");
        return false;
      }
    }
  }

  // check each column for duplicates
  for (let col = 0; col < input.length; col++) {
    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let row = 0; row < input.length; row++) {
      const num = input[row][col];
      counts[num]++;
    }
    for (let i = 1; i <= 9; i++) {
      if (counts[i] > 1) {
        console.log("failed col check");
        return false;
      }
    }
  }

  // check each subgrid for duplicates

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
      <textarea
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
