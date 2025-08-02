// White pieces
import wP from '../assets/wP.png'
import wR from '../assets/wR.png'
import wN from '../assets/wN.png'
import wB from '../assets/wB.png'
import wQ from '../assets/wQ.png'
import wK from '../assets/wK.png'

// Black pieces
import bP from '../assets/bP.png'
import bR from '../assets/bR.png'
import bN from '../assets/bN.png'
import bB from '../assets/bB.png'
import bQ from '../assets/bQ.png'
import bK from '../assets/bK.png'

// FEN piece character to piece type mapping
const fenToPieceType: { [key: string]: ChessPiece['type'] } = {
    'p': 'pawn', 'r': 'rook', 'n': 'knight', 'b': 'bishop', 'q': 'queen', 'k': 'king',
    'P': 'pawn', 'R': 'rook', 'N': 'knight', 'B': 'bishop', 'Q': 'queen', 'K': 'king'
};

// Parse FEN string to ChessPiece array
export function parseFEN(fen: string): ChessPiece[] {
    const pieces: ChessPiece[] = [];
    const boardPart = fen.split(' ')[0]; // Get only the board part of FEN
    const rows = boardPart.split('/');
    
    let pieceCounter: { [key: string]: number } = {
        'wP': 0, 'wR': 0, 'wN': 0, 'wB': 0, 'wQ': 0, 'wK': 0,
        'bP': 0, 'bR': 0, 'bN': 0, 'bB': 0, 'bQ': 0, 'bK': 0
    };

    rows.forEach((row, rowIndex) => {
        let colIndex = 0;
        for (let char of row) {
            if (/\d/.test(char)) {
                // Skip empty squares
                colIndex += parseInt(char);
            } else if (fenToPieceType[char]) {
                const color = char === char.toLowerCase() ? 'black' : 'white';
                const type = fenToPieceType[char];
                const pieceKey = color === 'white' ? `w${char.toUpperCase()}` : `b${char.toUpperCase()}`;
                
                pieceCounter[pieceKey]++;
                const id = `${pieceKey}${pieceCounter[pieceKey]}`;
                
                pieces.push({
                    id,
                    type,
                    color,
                    position: { row: rowIndex, col: colIndex }
                });
                colIndex++;
            }
        }
    });

    return pieces;
}

export const defaultPieceMap = {
    wp: wP,
    wr: wR,
    wn: wN,
    wb: wB,
    wq: wQ,
    wk: wK,
    bp: bP,
    br: bR,
    bn: bN,
    bb: bB,
    bq: bQ,
    bk: bK
}

export function getPieceImage(pieceKey: string, customPieces?: any) {
    if (customPieces && customPieces[pieceKey]) {
        return customPieces[pieceKey];
    }
    return defaultPieceMap[pieceKey as keyof typeof defaultPieceMap];
}