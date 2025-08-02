interface ChessPiece {
    id: string;
    type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
    color: 'white' | 'black';
    position: { row: number; col: number };
}

interface PiecesBoardProps extends BoardProps {
    fen?: string;
    piecesImage?: {
        wp?: ImageSourcePropType;
        wr?: ImageSourcePropType;
        wn?: ImageSourcePropType;
        wb?: ImageSourcePropType;
        wq?: ImageSourcePropType;
        wk?: ImageSourcePropType;
        bp?: ImageSourcePropType;
        br?: ImageSourcePropType;
        bn?: ImageSourcePropType;
        bb?: ImageSourcePropType;
        bq?: ImageSourcePropType;
        bk?: ImageSourcePropType;
    };
}