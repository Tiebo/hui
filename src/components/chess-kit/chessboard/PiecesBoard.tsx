import { Image, View } from 'react-native'
import React, { memo, useMemo } from 'react'
import BoardBackground from '../board/Board'
import { getPieceImage, parseFEN } from './pieces/constants'

// Default starting position FEN
const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const Piece = memo(({ piece, size, piecesImage, showCoordinates, coordinatePosition, flipped }: { piece: ChessPiece; size: number; piecesImage?: any; showCoordinates?: boolean; coordinatePosition?: 'outside' | 'inside'; flipped?: boolean }) => {
    const coordinateSize = showCoordinates ? Math.max(size * 0.04, 16) : 0;
    const boardSize = size - (showCoordinates && coordinatePosition === 'outside' ? coordinateSize * 2 : 0);
    const squareSize = boardSize / 8;
    const pieceStyle = useMemo(() => {
        const row = flipped ? 7 - piece.position.row : piece.position.row;
        const col = flipped ? 7 - piece.position.col : piece.position.col;
        
        return {
            position: 'absolute' as const,
            left: (showCoordinates && coordinatePosition === 'outside' ? coordinateSize : 0) + col * squareSize,
            top: (showCoordinates && coordinatePosition === 'outside' ? coordinateSize : 0) + row * squareSize,
            width: squareSize,
            height: squareSize,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        };
    }, [piece.position.col, piece.position.row, squareSize, showCoordinates, coordinatePosition, coordinateSize, flipped]);

    const pieceImageSource = useMemo(() => {
        const pieceKey = `${piece.color.slice(0, 1).toLowerCase()}${piece.type.slice(0, 1).toLowerCase()}`;
        return getPieceImage(pieceKey, piecesImage);
    }, [piece.color, piece.type, piecesImage]);

    const imageStyle = useMemo(() => ({
        width: squareSize * 0.8,
        height: squareSize * 0.8,
    }), [squareSize]);

    return (
        <View style={pieceStyle}>
            <Image source={pieceImageSource} style={imageStyle} />
        </View>
    );
});

export default function PiecesBoard({ fen, piecesImage, size = 300, theme, showCoordinates = false, coordinatePosition = 'outside', coordinateStyle, flipped = false }: PiecesBoardProps) {
    const containerStyle = useMemo(() => ({
        position: 'relative' as const,
        width: size,
        height: size,
    }), [size]);

    // Parse FEN to get pieces, fallback to default FEN if not provided
    const pieces = useMemo(() => {
        return parseFEN(fen || DEFAULT_FEN);
    }, [fen]);

    return (
        <View style={containerStyle}>
            <BoardBackground
                size={size}
                theme={theme}
                showCoordinates={showCoordinates}
                coordinatePosition={coordinatePosition}
                coordinateStyle={coordinateStyle}
                flipped={flipped}
            />
            {pieces.map(piece => (
                <Piece key={piece.id} piece={piece} size={size} piecesImage={piecesImage} showCoordinates={showCoordinates} coordinatePosition={coordinatePosition} flipped={flipped} />
            ))}
        </View>
    )
}

