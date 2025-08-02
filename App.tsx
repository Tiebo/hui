import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import BoardDemo from './examples/BoardDemo';
import PiecesDemo from './examples/PiecesDemo';
import InteractiveDemo from './examples/InteractiveDemo';

type DemoScreen = 'menu' | 'board' | 'pieces' | 'interactive';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<DemoScreen>('menu');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'board':
        return <BoardDemo />;
      case 'pieces':
        return <PiecesDemo />;
      case 'interactive':
        return <InteractiveDemo />;
      default:
        return (
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Chess Kit Demos</Text>
            <Text style={styles.subtitle}>Select a demo to explore</Text>
            
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.menuContainer}>
              <View style={styles.demoCard}>
                <Text style={styles.demoTitle}>Chess Board</Text>
                <Text style={styles.demoDescription}>Basic chess board with customizable theme and coordinates</Text>
                <Button title="View Demo" onPress={() => setCurrentScreen('board')} />
              </View>

              <View style={styles.demoCard}>
                <Text style={styles.demoTitle}>Chess Pieces</Text>
                <Text style={styles.demoDescription}>Chess board with pieces using FEN notation</Text>
                <Button title="View Demo" onPress={() => setCurrentScreen('pieces')} />
              </View>

              <View style={styles.demoCard}>
                <Text style={styles.demoTitle}>Interactive Demo</Text>
                <Text style={styles.demoDescription}>Switch between board and pieces view with controls</Text>
                <Button title="View Demo" onPress={() => setCurrentScreen('interactive')} />
              </View>
            </ScrollView>
          </View>
        );
    }
  };

  if (currentScreen !== 'menu') {
    return (
      <View style={styles.fullScreenContainer}>
        <View style={styles.header}>
          <Button title="← Back to Menu" onPress={() => setCurrentScreen('menu')} />
        </View>
        {renderScreen()}
      </View>
    );
  }

  return renderScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  menuContainer: {
    flexGrow: 1,
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  demoCard: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  demoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});
