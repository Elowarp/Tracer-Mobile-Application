//Import libs
import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux"
import Store from './Store/configureStore'
import * as Location from 'expo-location';

//Import views
import Home from './Components/Home'
import Test from './Components/Test'



export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //Getting the user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
      }

       let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      })();
  }, []);

  return (
    <Provider store={Store}>
      <Home style={styles.container} location={location}/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
