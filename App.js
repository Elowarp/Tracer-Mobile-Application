//Import libs
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux"
import Store from './Store/configureStore'


import { NavigationContainer } from '@react-navigation/native';


import Navigation from './Navigation/Navigation'

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer >
        <Navigation />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
