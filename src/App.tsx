import { useMemo, useRef, useState } from "react";
import "./App.css";
import { matrixToString, parseText } from "./utils/parser";
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

// incremented every time the textarea input changes
let userInputCounter = 0;

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // run solveSudoku() in a separate web worker thread
  const worker: Worker = useMemo(
    () =>
      new Worker(new URL("./worker.ts", import.meta.url), {
        type: "module",
      }),
    []
  );

  // web worker posts a message when it has finished running solveSudoku()
  worker.onmessage = (
    e: MessageEvent<{
      executionTime: number;
      matrix: number[][];
      counter: number;
    }>
  ) => {
    const { executionTime, matrix, counter } = e.data;
    if (counter !== userInputCounter) return; // user has changed the input
    setIsSolving(false);
    setSolution(
      isValidSolution(matrix)
        ? `Solution (solved in ${executionTime} ms):\n\n` +
            matrixToString(matrix)
        : "Could not solve :("
    );
  };

  function handleChange(input: string) {
    userInputCounter++;
    setSolution("");
    setIsSolving(false);
    setIsValid(false);
    let matrix: number[][];
    try {
      matrix = parseText(input);
    } catch (err) {
      setErrorMessage(err as string);
      return;
    }
    setErrorMessage("");
    if (isValidInput(matrix)) {
      setIsValid(true);
      setIsSolving(true);
      worker.postMessage({ matrix, counter: userInputCounter });
    }
  }

  return (
    <>
      <h1>Sudoku Solver</h1>
      <h2>Instructions</h2>
      <p>
        Type each row on a new line
        <br />
        For each row, separate values using commas
        <br />
        Use 0 (zero) or space or nothing to represent an empty cell
      </p>
      <button
        onClick={() => {
          if (textAreaRef.current) {
            textAreaRef.current.value = SAMPLE_INPUT;
            handleChange(textAreaRef.current.value);
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
          handleChange(e.target.value);
        }}
        ref={textAreaRef}
      ></textarea>
      <pre>{isValid ? "Input is valid" : "Input is NOT valid"}</pre>
      <pre>{errorMessage}</pre>
      <pre>{isSolving && "solving..."}</pre>
      <pre>{solution}</pre>
    </>
  );
}

export default App;
