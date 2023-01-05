export function isValidInput(input: number[][]): boolean {
  // check shape of input
  if (input.length != 9) {
    return false;
  }
  for (let row = 0; row < input.length; row++) {
    if (input[row].length != 9) {
      return false;
    }
  }

  // check each row for duplicates
  for (let row = 0; row < 9; row++) {
    const foundNums = new Set();
    for (let col = 0; col < 9; col++) {
      const num = input[row][col];
      if (num >= 1 && num <= 9) {
        if (foundNums.has(num)) {
          return false;
        }
        foundNums.add(num);
      }
    }
  }

  // check each column for duplicates
  for (let col = 0; col < 9; col++) {
    const foundNums = new Set();
    for (let row = 0; row < 9; row++) {
      const num = input[row][col];
      if (num >= 1 && num <= 9) {
        if (foundNums.has(num)) {
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

export function isValidSolution(matrix: number[][]): boolean {
  // check shape of matrix
  if (matrix.length != 9) {
    return false;
  }
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row].length != 9) {
      return false;
    }
  }

  // check each row
  for (let row = 0; row < 9; row++) {
    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let col = 0; col < 9; col++) {
      const num = matrix[row][col];
      if (num < 1 || num > 9) {
        return false;
      }
      counts[num]++;
    }
    for (let i = 1; i <= 9; i++) {
      if (counts[i] != 1) {
        return false;
      }
    }
  }

  // check each column
  for (let col = 0; col < 9; col++) {
    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let row = 0; row < 9; row++) {
      const num = matrix[row][col];
      counts[num]++;
    }
    for (let i = 1; i <= 9; i++) {
      if (counts[i] != 1) {
        return false;
      }
    }
  }

  // check each subgrid
  for (let subgridRow = 0; subgridRow < 3; subgridRow++) {
    for (let subgridCol = 0; subgridCol < 3; subgridCol++) {
      const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let row = subgridRow * 3; row < (subgridRow + 1) * 3; row++) {
        for (let col = subgridCol * 3; col < (subgridCol + 1) * 3; col++) {
          const num = matrix[row][col];
          counts[num]++;
        }
      }
      for (let i = 1; i <= 9; i++) {
        if (counts[i] != 1) {
          return false;
        }
      }
    }
  }

  return true;
}
