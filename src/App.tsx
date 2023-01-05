import { useState } from "react";
import "./App.css";
import { matrixToString, parseText } from "./utils/parser";
import { solveSudoku } from "./utils/solver";
import { isValidInput, isValidSolution } from "./utils/validation";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [solution, setSolution] = useState("");

  function test(input: string): void {
    try {
      let matrix = parseText(input); // throws error if parse fails
      if (errorMessage) {
        setErrorMessage("");
      }
      if (isValidInput(matrix)) {
        setIsValid(true);
        const executionStart = Date.now();
        solveSudoku(matrix);
        const executionEnd = Date.now();
        setSolution(
          isValidSolution(matrix)
            ? `(solved in ${executionEnd - executionStart} ms)\n\n` +
                matrixToString(matrix)
            : "Could not solve"
        );
      } else {
        setIsValid(false);
        setSolution("");
      }
    } catch (error) {
      setErrorMessage(error as string);
      setSolution("");
    }
  }

  return (
    <>
      <h1>Sudoku Solver</h1>
      <h2>Instructions</h2>
      <p>
        Type each row on new line
        <br />
        For each row, separate values by comma
        <br />
        Use 0 (zero) or space or nothing to represent empty cell
      </p>
      <textarea
        rows={10}
        cols={20}
        onChange={(e) => {
          test(e.target.value);
        }}
      ></textarea>
      <pre>{errorMessage}</pre>
      <pre>{isValid ? "Input is valid" : "Input is NOT valid"}</pre>
      {solution && (
        <>
          <h2>Solution</h2>
          <pre>{solution}</pre>
        </>
      )}
    </>
  );
}

export default App;
