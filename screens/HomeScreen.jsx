import { View, Text, Button, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import UserLocationContext  from '../context/UserLocationContex';



export default function HomeScreen() {
    
    const {location,setLocation}=useContext(UserLocationContext)
    const {user}=useUser()
    
  return location?.latitude&&(
    <View style={{marginTop:40,flex:1,position:'relative'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={{uri:user?.imageUrl}}
        style={{width: 45, height: 45, borderRadius: 99, zIndex: 10}} />
        <Text style={{fontSize:36,padding:2,marginLeft:'5%'}}>Hospital Nearby</Text>
        </View>

      <MapView style={styles.map} provider={PROVIDER_GOOGLE} showsUserLocation={true} 
      region={{
        latitude:location.latitude,
        longitude:location.longitude,
        latitudeDelta:0.0422,
        longitudeDelta:0.0421
      }}>
        
      </MapView>
      
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });