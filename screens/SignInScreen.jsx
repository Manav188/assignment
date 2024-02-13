import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import {Ionicons} from '@expo/vector-icons'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../hooks/warmUpBrowser';

WebBrowser.maybeCompleteAuthSession();
const SignInScreen = () => {
    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
        
        <View style={styles.container}>
             <Text style={styles.welcomeText}>Welcome to App</Text>
            <Text style={{textAlign:'center',
        marginTop:80,fontSize:20}}>Login/Signup</Text>
            <TouchableOpacity style={{padding:10,
        margin:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'blue'
}} onPress={onPress}
            >
                <Ionicons name="logo-google" size={24}
             color="white" style={{marginRight:10}} />

            
                <Text style={{color:'white'}}>Sign In with Google</Text>
            </TouchableOpacity>
            
        
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:60,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        height:'100%'
    ,
    },
    welcomeText:{
        paddingTop:60,
        fontSize:35,
        textAlign:'center',
        fontWeight:'bold' 
    },
    
})


export default SignInScreen