import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, SafeAreaView, Button } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { addRandomTile, moveGrid } from './utils/gameLogic';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CELL_SIZE = (SCREEN_WIDTH - 40) / 4; // 40 is total padding

export default function App() {
  // A simple 4x4 initial state
  const [grid, setGrid] = useState(() => {
    let initialGrid = Array(4).fill().map(() => Array(4).fill(0));
    initialGrid = addRandomTile(initialGrid);
    return addRandomTile(initialGrid);
  });

    const handleMove = (direction) => {
    const newGrid = moveGrid(grid, direction);

    // Simple way to check if two arrays are identical
    const isChanged = JSON.stringify(newGrid) !== JSON.stringify(grid);

    if (isChanged) {
      setGrid(addRandomTile(newGrid));
    }
  };

  const swipeGesture = Gesture.Pan()
  .onEnd((event) => {
    const { translationX, translationY } = event;

    // Determine if the swipe was horizontal or vertical
    if (Math.abs(translationX) > Math.abs(translationY)) {
      // Horizontal Swipe
      if (translationX > 50) {
        handleMove('RIGHT');
      } else if (translationX < -50) {
        handleMove('LEFT');
      }
    } else {
      // Vertical Swipe
      if (translationY > 50) {
        handleMove('DOWN');
      } else if (translationY < -50) {
        handleMove('UP');
      }
    }
  })
  .runOnJS(true);




  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>2048 Clone</Text>
      
      <GestureDetector gesture={swipeGesture}>
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
      </GestureDetector>

      <View style={styles.controls}>
        <Button title="↑" onPress={() => handleMove('UP')} />
        <View style={{ flexDirection: 'row' }}>
          <Button title="←" onPress={() => handleMove('LEFT')} />
          <Button title="→" onPress={() => handleMove('RIGHT')} />
        </View>
        <Button title="↓" onPress={() => handleMove('DOWN')} />
      </View>
    </SafeAreaView>
    </GestureHandlerRootView>
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