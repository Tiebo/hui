import { FlatList, View, Text } from "react-native";
import { memo, useMemo, useCallback } from "react";

const board = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
];
const defaultTheme: BoardTheme = {
  light: 'rgb(192, 212, 224)',
  dark: 'rgb(75, 144, 177)',
  boardColor: 'rgb(94, 94, 94)',
}
const createFlatBoard = (flipped: boolean) => {
  if (flipped) {
    return board.slice().reverse().map(row => row.slice().reverse()).flat();
  }
  return board.flat();
};

const Square = memo(({ size, theme, col }: { size: number, theme: BoardTheme, col: number }) => {
  const squareSize = size / 8;
  const squareStyle = useMemo(() => ({
    width: squareSize,
    height: squareSize,
    backgroundColor: col % 2 === 0 ? theme.light : theme.dark,
  }), [squareSize, theme.light, theme.dark, col]);

  return <View style={squareStyle} />;
});

export default function BoardBackground({ size = 300, theme = defaultTheme, showCoordinates = false, coordinatePosition = 'outside', coordinateStyle, flipped = false }: BoardProps) {
  const coordinateSize = showCoordinates ? Math.max(size * 0.04, 16) : 0;
  const boardSize = size - (showCoordinates && coordinatePosition === 'outside' ? coordinateSize * 2 : 0);
  
  const flatBoard = useMemo(() => createFlatBoard(flipped), [flipped]);
  
  const containerStyle = useMemo(() => ({
    width: size,
    height: size,
    position: 'relative' as const,
  }), [size]);

  const boardStyle = useMemo(() => ({
    width: boardSize,
    height: boardSize,
    borderWidth: 1,
    borderColor: theme.boardColor,
    backgroundColor: theme.light,
    marginLeft: showCoordinates && coordinatePosition === 'outside' ? coordinateSize : 0,
    marginTop: showCoordinates && coordinatePosition === 'outside' ? coordinateSize : 0,
  }), [boardSize, theme.boardColor, theme.light, showCoordinates, coordinateSize]);

  const defaultCoordinateStyle = useMemo(() => ({
    fontSize: coordinateSize * 0.6,
    color: theme.boardColor || '#000',
    backgroundColor: 'transparent',
    ...coordinateStyle
  }), [coordinateSize, theme.boardColor, coordinateStyle]);

  const renderItem = useCallback(({ item }: { item: number }) =>
    <Square size={boardSize} theme={theme} col={item} />,
    [boardSize, theme]
  );

  const keyExtractor = useCallback((_: number, index: number) => index.toString(), []);

  // 文件和排坐标
  const files = flipped ? ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = flipped ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['8', '7', '6', '5', '4', '3', '2', '1'];

  const renderCoordinates = () => {
    if (!showCoordinates) return null;
    
    const squareSize = boardSize / 8;
    const isOutside = coordinatePosition === 'outside';
    
    return (
      <>
        {/* 底部文件坐标 (a-h) */}
        <View style={{
          position: 'absolute',
          bottom: isOutside ? 0 : coordinateSize,
          left: isOutside ? coordinateSize : 0,
          width: boardSize,
          height: coordinateSize,
          flexDirection: 'row',
        }}>
          {files.map((file) => (
            <View key={file} style={{
              width: squareSize,
              height: isOutside ? coordinateSize : squareSize,
              justifyContent: isOutside ? 'center' : 'flex-end',
              alignItems: isOutside ? 'center' : 'flex-start',
              paddingLeft: isOutside ? 0 : 6,
              paddingBottom: isOutside ? 0 : 6,
            }}>
              <Text style={defaultCoordinateStyle}>{file}</Text>
            </View>
          ))}
        </View>
        
        {/* 左侧排坐标 (1-8) */}
        <View style={{
          position: 'absolute',
          top: isOutside ? coordinateSize : 0,
          width: coordinateSize,
          height: boardSize,
          flexDirection: 'column',
        }}>
          {ranks.map((rank) => (
            <View key={rank} style={{
              width: isOutside ? coordinateSize : squareSize,
              height: squareSize,
              justifyContent: isOutside ? 'center' : 'flex-start',
              alignItems: isOutside ? 'center' : 'flex-start',
              paddingTop: isOutside ? 0 : 6,
              paddingLeft: isOutside ? 0 : 6,
            }}>
              <Text style={defaultCoordinateStyle}>{rank}</Text>
            </View>
          ))}
        </View>
      </>
    );
  };

  return (
    <View style={containerStyle}>
      <View style={boardStyle}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={flatBoard}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={8}
        />
      </View>
      {renderCoordinates()}
    </View>
  );
}