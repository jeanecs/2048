export const moveRowLeft = (row) => {
  let filteredRow = row.filter(num => num !== 0);
  // 

  for (let i = 0; i < filteredRow.length - 1; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      filteredRow[i] *= 2;
      filteredRow[i + 1] = 0;
    }
  }

  let newRow = filteredRow.filter(num => num !== 0);
  while (newRow.length < 4) {
    newRow.push(0);
  }
  return newRow;
};

// This function finds all 0s and picks one at random
export const addRandomTile = (grid) => {
  const emptyCells = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 0) emptyCells.push({ r, c });
    });
  });

  if (emptyCells.length === 0) return grid; // Board is full

  const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newGrid = grid.map(row => [...row]); // Deep copy
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newGrid;
};

// Reverse every row (needed for moving Right)
const reverseGrid = (grid) => grid.map(row => [...row].reverse());

// Swap rows and columns (needed for moving Up/Down)
const rotateLeft = (grid) => {
  const size = grid.length;
  let newGrid = Array(size).fill().map(() => Array(size).fill(0));
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      newGrid[size - 1 - c][r] = grid[r][c];
    }
  }
  return newGrid;
};

const rotateRight = (grid) => {
  const size = grid.length;
  let newGrid = Array(size).fill().map(() => Array(size).fill(0));
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      newGrid[c][size - 1 - r] = grid[r][c];
    }
  }
  return newGrid;
};


export const moveGrid = (grid, direction) => {
  let tempGrid = grid.map(row => [...row]); // Deep copy to keep state immutable

  if (direction === 'LEFT') {
    tempGrid = tempGrid.map(row => moveRowLeft(row));
  } 
  else if (direction === 'RIGHT') {
    tempGrid = reverseGrid(tempGrid);
    tempGrid = tempGrid.map(row => moveRowLeft(row));
    tempGrid = reverseGrid(tempGrid);
  } 
  else if (direction === 'UP') {
    tempGrid = rotateLeft(tempGrid);
    tempGrid = tempGrid.map(row => moveRowLeft(row));
    tempGrid = rotateRight(tempGrid);
  } 
  else if (direction === 'DOWN') {
    tempGrid = rotateRight(tempGrid);
    tempGrid = tempGrid.map(row => moveRowLeft(row));
    tempGrid = rotateLeft(tempGrid);
  }

  return tempGrid;
};