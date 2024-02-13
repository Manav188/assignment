import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import { ClerkProvider } from '@clerk/clerk-expo';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import * as Location from 'expo-location';
import { useEffect, useState ,useContext} from 'react';
import UserLocationContext from './context/UserLocationContex'


export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  return (
    <ClerkProvider publishableKey='pk_test_Z2VudGxlLWNhdGZpc2gtMjguY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <UserLocationContext.Provider value={{location,setLocation}}>
      <SignedIn>
        <HomeScreen/>
      </SignedIn>
      <SignedOut>
        <SignInScreen/>
      </SignedOut>
      </UserLocationContext.Provider>
    </ClerkProvider>
  );
}

