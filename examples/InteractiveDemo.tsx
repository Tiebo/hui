import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import InteractiveBoard from '../src/components/chess-kit/chessboard/InteractiveBoard';

export default function InteractiveDemo() {
  const theme: BoardTheme = {
    light: 'rgb(192, 212, 224)',
    dark: 'rgb(75, 144, 177)',
    selected: 'rgb(170, 132, 230)',
    boardColor: 'rgb(94, 94, 94)',
  }
  const [size, setSize] = useState(300);
  const [showBoard, setShowBoard] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [coordinatePosition, setCoordinatePosition] = useState<'outside' | 'inside'>('inside');
  const [flipped, setFlipped] = useState(false);

  return (
    <View style={styles.container}>
      <InteractiveBoard />
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  controls: {
    gap: 10,
  },
});