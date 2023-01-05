import { matrixToString } from "./parser";

const RECURSION_LIMIT = 2_000_000;

export function solveSudoku(board: number[][]) {
  const count = [0];
  traverse(board, 0, 0, count);
  return board;
}

function traverse(
  board: number[][],
  row: number,
  col: number,
  count: number[]
): boolean {
  if (count[0] > RECURSION_LIMIT) {
    return false;
  }
  count[0]++;
  if (row > 8) {
    return true;
  }
  const nextRow = col === 8 ? row + 1 : row;
  const nextCol = col === 8 ? 0 : col + 1;
  if (board[row][col] != 0) {
    return traverse(board, nextRow, nextCol, count);
  }
  for (let num = 1; num <= 9; num++) {
    if (canPlace(board, row, col, num)) {
      board[row][col] = num;
      if (traverse(board, nextRow, nextCol, count)) {
        return true;
      }
      board[row][col] = 0;
    }
  }
  return false;
}

function canPlace(
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) {
      return false;
    }
  }
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) {
      return false;
    }
  }
  const subgridRow = Math.floor(row / 3);
  const subgridCol = Math.floor(col / 3);
  for (let r = subgridRow * 3; r < (subgridRow + 1) * 3; r++) {
    for (let c = subgridCol * 3; c < (subgridCol + 1) * 3; c++) {
      if (board[r][c] === num) {
        return false;
      }
    }
  }
  return true;
}
