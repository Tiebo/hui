interface BoardTheme {
    light?: string;
    dark?: string;
    selected?: string;
    boardColor?: string;
}

interface BoardProps {
    size?: number;
    theme?: BoardTheme;
    showCoordinates?: boolean;
    coordinatePosition?: 'outside' | 'inside';
    coordinateStyle?: {
        fontSize?: number;
        color?: string;
        backgroundColor?: string;
    };
    flipped?: boolean;
}