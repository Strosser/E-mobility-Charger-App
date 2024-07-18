import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store';


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({strategy: "oauth_google"})
    const onPress=async()=>{
        try {
            const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow();
      
            if (createdSessionId) {
              setActive({ session: createdSessionId });
            } else {
            }
          } catch (err) {
            console.error("OAuth error", err);
          }
        }
    
  return (
    <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    }}>
        <Image source={require('../../../assets/images/logo.png')}
            style={styles.logoImage}
        />
        <Image source={require('../../../assets/images/charging.png')}
            style={styles.bgImage}
        />
        <View style={{padding:20}}>
            <Text style={styles.heading}>Your new Ultimate EV station finder App</Text>
            <Text style={styles.desc}>Find your EV charging station next to you and trip so much more in just one click!</Text>
            <TouchableOpacity style={styles.button}
                onPress={onPress}>
                <Text style={{color: Colors.WHITE, textAlign: 'center', fontFamily: 'outfit', fontSize: 17}}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    logoImage:{
        width: 200,
        height: 40,
        objectFit: 'contain',
    },
    bgImage: {
        width: '100%',
        height: 270,
        marginTop: 20,
        objectFit: 'cover',
    },
    heading: {
        fontSize: 25,
        fontFamily: 'outfit-semibold',
        textAlign: 'center',
        marginTop: 20,
    },
    desc: {
        fontSize: 18,
        fontFamily: 'outfit',
        marginTop: 15,
        textAlign: 'center',
        color: Colors.GRAY,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        display: 'flex',
        borderRadius: 35,
        marginBottom: 15,
        marginTop: 50,
    }
})