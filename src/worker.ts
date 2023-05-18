import { solveSudoku } from "./utils/solver";

// Note: MessageEvent.data is passed as a copy, not by reference
self.onmessage = (e: MessageEvent<{ matrix: number[][]; counter: number }>) => {
  const { matrix, counter } = e.data;
  const startTime = Date.now();
  solveSudoku(matrix);
  const executionTime = Date.now() - startTime;
  self.postMessage({
    executionTime,
    matrix,
    counter,
  });
};
