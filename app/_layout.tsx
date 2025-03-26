import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const auth = getAuth();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  const checkUser = async() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in');
        console.log('--------------------------------------------------------------------------------');
        setIsLoggedIn(true);
        navigation.navigate('(tabs)' as unknown as never);
      } else {
        console.log('User is not signed in');
        console.log('--------------------------------------------------------------------------------');
        setIsLoggedIn(false);
      }
    });
  }

  useEffect(() => {
    checkUser()
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  // if (!loaded || isLoggedIn === null) {
  //   // Wait until fonts are loaded and login state is determined
  //   return null;
  // }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(login)/index" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
