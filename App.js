import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './app/screen/LoginScreen/LoginScreen';
import { ClerkProvider } from '@clerk/clerk-expo';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [loaded, error] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-semibold': require('./assets/fonts/Outfit-SemiBold.ttf'),

  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
   <ClerkProvider 
   tokenCache={tokenCache}
   publishableKey={'pk_test_ZW5hYmxpbmctcmFtLTI1LmNsZXJrLmFjY291bnRzLmRldiQ'}>
    <View style={styles.container}>
    <SignedIn>
        <Text>Hello</Text>
      </SignedIn>
      <SignedOut>
          <LoginScreen />
      </SignedOut>
    </View>
  </ClerkProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
});
