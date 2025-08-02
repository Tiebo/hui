import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import PiecesBoard from './PiecesBoard'

export default function InteractiveBoard({ enabledGestures = true, enabledClickMove = true, fen, piecesImage, size, theme, showCoordinates, coordinatePosition, flipped }: InteractiveBoardProps) {

    const AnimatedPiecesBoard = Animated.createAnimatedComponent(PiecesBoard)
    return (
        <View>
           
        </View>
    )
}

const styles = StyleSheet.create({})