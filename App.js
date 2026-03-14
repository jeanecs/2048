import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, SafeAreaView, Button } from 'react-native';
import { moveRowLeft, addRandomTile } from './utils/gameLogic';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CELL_SIZE = (SCREEN_WIDTH - 40) / 4; // 40 is total padding

export default function App() {
  // A simple 4x4 initial state
  const [grid, setGrid] = useState(() => {
    let initialGrid = Array(4).fill().map(() => Array(4).fill(0));
    initialGrid = addRandomTile(initialGrid);
    return addRandomTile(initialGrid);
  });

  const handleMoveLeft = () => {
    // 1. Calculate new grid by moving every row left
    const newGrid = grid.map(row => moveRowLeft(row));

    // 2. Only add a tile if the board actually changed
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      setGrid(addRandomTile(newGrid));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>2048 Clone</Text>
      
      <View style={styles.board}>
        {grid.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((cell, c) => (
              <View key={c} style={[styles.cell, { backgroundColor: getCellColor(cell) }]}>
                <Text style={styles.cellText}>{cell !== 0 ? cell : ''}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.controls}>
        <Button title="Move Left" onPress={handleMoveLeft} color="#8f7a66" />
      </View>
    </SafeAreaView>
  );
}

const getCellColor = (val) => {
  switch(val) {
    case 2: return '#eee4da';
    case 4: return '#ede0c8';
    case 8: return '#f2b179';
    default: return '#cdc1b4';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8ef', alignItems: 'center', justifyContent: 'center' },
  board: { backgroundColor: '#bbada0', padding: 5, borderRadius: 5 },
  row: { flexDirection: 'row' },
  cell: { width: CELL_SIZE - 10, height: CELL_SIZE - 10, margin: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 3 },
  cellText: { fontSize: 24, fontWeight: 'bold', color: '#776e65' }
});