import { Button, StyleSheet, Text, View } from 'react-native';
import BoardBackground from '../src/components/chess-kit/board/Board';
import PiecesBoard from '../src/components/chess-kit/chessboard/PiecesBoard';
import { useState } from 'react';

import bK from '../assets/chesspieces/figmachess/figma_chess_bk.png'

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
      <Text style={styles.title}>Interactive Chess Demo</Text>
      <Text style={styles.subtitle}>Switch between board and pieces view</Text>
      
      {showBoard ?
        <BoardBackground size={size} theme={theme} showCoordinates={showCoordinates} coordinatePosition={coordinatePosition} flipped={flipped} />
        :
        <PiecesBoard size={size} theme={theme} fen="8/ppppRppp/8/8/8/8/PPPPPkPP/RNBQKBNR w KQkq - 0 1" piecesImage={{
          bk: bK,
        }} showCoordinates={showCoordinates} coordinatePosition={coordinatePosition} flipped={flipped} />}

      <View style={styles.controls}>
        <Button title={showBoard ? "Show Pieces" : "Show Board"} onPress={() => setShowBoard(!showBoard)} />
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