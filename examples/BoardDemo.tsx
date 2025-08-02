import { Button, StyleSheet, Text, View } from 'react-native';
import BoardBackground from '../src/components/chess-kit/board/Board';
import { useState } from 'react';

export default function BoardDemo() {
  const theme: BoardTheme = {
    light: 'rgb(192, 212, 224)',
    dark: 'rgb(75, 144, 177)',
    selected: 'rgb(170, 132, 230)',
    boardColor: 'rgb(94, 94, 94)',
  }
  const [size, setSize] = useState(300);
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [coordinatePosition, setCoordinatePosition] = useState<'outside' | 'inside'>('inside');
  const [flipped, setFlipped] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chess Board Demo</Text>
      <BoardBackground 
        size={size} 
        theme={theme} 
        showCoordinates={showCoordinates} 
        coordinatePosition={coordinatePosition} 
        flipped={flipped} 
      />
      <View style={styles.controls}>
        <Button title="Toggle Coordinates" onPress={() => setShowCoordinates(!showCoordinates)} />
        <Button title={`Position: ${coordinatePosition}`} onPress={() => setCoordinatePosition(coordinatePosition === 'outside' ? 'inside' : 'outside')} />
        <Button title={`Board: ${flipped ? 'Flipped' : 'Normal'}`} onPress={() => setFlipped(!flipped)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  controls: {
    gap: 10,
  },
});