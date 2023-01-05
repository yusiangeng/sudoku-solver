import { useRef, useState } from "react";
import "./App.css";
import { matrixToString, parseText } from "./utils/parser";
import { solveSudoku } from "./utils/solver";
import { isValidInput, isValidSolution } from "./utils/validation";

const SAMPLE_INPUT =
  "8, , , , , , , , \n" +
  " , ,3,6, , , , , \n" +
  " ,7, , ,9, ,2, , \n" +
  " ,5, , , ,7, , , \n" +
  " , , , ,4,5,7, , \n" +
  " , , ,1, , , ,3, \n" +
  " , ,1, , , , ,6,8\n" +
  " , ,8,5, , , ,1, \n" +
  " ,9, , , , ,4, , ";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [solution, setSolution] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
      setErrorMessage("Parse failed: " + (error as string));
      setIsValid(false);
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
      <button
        onClick={() => {
          if (textAreaRef.current) {
            textAreaRef.current.value = SAMPLE_INPUT;
            test(textAreaRef.current.value);
          }
        }}
      >
        Fill with sample input
      </button>
      <br />
      <textarea
        rows={10}
        cols={20}
        onChange={(e) => {
          test(e.target.value);
        }}
        ref={textAreaRef}
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
