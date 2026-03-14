export const moveRowLeft = (row) => {
  let filteredRow = row.filter(num => num !== 0);

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