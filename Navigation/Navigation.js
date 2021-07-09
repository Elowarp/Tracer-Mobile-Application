import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Components/Home';
import AddSpot from '../Components/AddSpot';

const Stack = createStackNavigator();

function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Carte" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Ajouter un spot" component={AddSpot} />
    </Stack.Navigator>
    );
  
}

export default MyStack