import { Button, StyleSheet, Text, View } from 'react-native';
import PiecesBoard from '../src/components/chess-kit/chessboard/PiecesBoard';
import { useState } from 'react';

import bK from '../assets/chesspieces/figmachess/figma_chess_bk.png'

export default function PiecesDemo() {
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
  const [fen, setFen] = useState("8/ppppRppp/8/8/8/8/PPPPPkPP/RNBQKBNR w KQkq - 0 1");

  const changeFen = () => {
    const fens = [
      "8/ppppRppp/8/8/8/8/PPPPPkPP/RNBQKBNR w KQkq - 0 1",
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4"
    ];
    const currentIndex = fens.indexOf(fen);
    const nextIndex = (currentIndex + 1) % fens.length;
    setFen(fens[nextIndex]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chess Pieces Demo</Text>
      <PiecesBoard 
        size={size} 
        theme={theme} 
        fen={fen}
        piecesImage={{
          bk: bK,
        }}
        showCoordinates={showCoordinates} 
        coordinatePosition={coordinatePosition} 
        flipped={flipped} 
      />
      <View style={styles.controls}>
        <Button title="Change Position" onPress={changeFen} />
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