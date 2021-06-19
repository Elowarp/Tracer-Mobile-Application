//Import libs
import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './Components/Home'

export default function App() {
  return (
    <Home style={styles.container}/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
