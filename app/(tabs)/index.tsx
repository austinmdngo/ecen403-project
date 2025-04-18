import { Image, StyleSheet, Platform, Touchable, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, Button, Pressable, Text } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { db } from "../(component)/api/firebase";
import { auth } from "../(component)/api/firebase";
import { Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const screenWidth = Dimensions.get('window').width;

export default function MainScreen() {
  const [sliderValueTemp, setSliderValueTemp] = useState(0);
  const [sliderValueBrightness, setSliderValueBrightness] = useState(0);
  const [offOnPress, setOffOnPress] = useState(0);
  const [userInfo, setUserInfo] = useState<any | undefined>(null);
  const [userName, setUserName] = useState<any | undefined>(null);
  const navigation = useNavigation();
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user); // Set the user object
        console.log("User logged in:", user.uid);
      } else {
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const getData = async () => {
      if (!userInfo) {
        console.log("User info not available");
        return; // Ensure userInfo is available
      }
      try {
        const docRef = doc(db, "users", userInfo.uid); // Assuming userInfo contains uid
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserName(data.Name); // Set userName from Firestore
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
  
  useEffect(() => {
    if (userInfo) {
      getData();
    }
  }, [userInfo]);

  const handleSignOut = async () => {
    await auth.signOut();
    navigation.navigate('(component)/(auth)/login' as unknown as never);

  };

  const Modal = () => {
    Alert.alert(
      "Auth App",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel", // Optional: Adds a "cancel" style to the button
        },
        {
          text: "Logout",
          onPress: handleSignOut, // Calls the handleSignOut function
        },
      ]
    );
  };


  let textlog = '';
  if (offOnPress % 2 == 1){
    textlog = 'ON';
  } else if (offOnPress % 2 == 0){
    textlog = 'OFF';
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/concept403.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome, {userName || "User"}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Temperature Controller</ThemedText>
        <ThemedText>{sliderValueTemp}</ThemedText>
        <Slider style={{ width: '100%', height: 40 }} 
          minimumValue={0} 
          maximumValue={100}
          onValueChange={(value) => setSliderValueTemp(value)}
          step={1}
          value={sliderValueTemp}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">ON/OFF Switch</ThemedText>
        <SafeAreaProvider>
          <SafeAreaView>
            <Pressable
              onPress={() => {
                setOffOnPress(current => current + 1);
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'rgb(56, 58, 60)' : 'black',
                },
                ]}>
              {({pressed}) => (
                <ThemedText type="defaultSemiBold">{pressed ? 'Pressed!' : 'ON/OFF Button'}</ThemedText>
              )}
            </Pressable>
            <ThemedText type="defaultSemiBold">{textlog}</ThemedText>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Brightness Controller</ThemedText>
        <ThemedText>{sliderValueBrightness}</ThemedText>
        <Slider style={{ width: '100%', height: 40 }} 
          minimumValue={0} 
          maximumValue={100}
          onValueChange={(value) => setSliderValueBrightness(value)}
          step={1}
          value={sliderValueBrightness}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Modes</ThemedText>
        <Pressable
          onPress={() => {
            setSliderValueBrightness(30);
            setSliderValueTemp(90);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(56, 58, 60)' : 'black',
            },
            ]}>
          {({pressed}) => (
            <ThemedText type="defaultSemiBold">{pressed ? 'Pressed!' : 'Movie Night'}</ThemedText>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            setSliderValueBrightness(70);
            setSliderValueTemp(50);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(56, 58, 60)' : 'black',
            },
            ]}>
          {({pressed}) => (
            <ThemedText type="defaultSemiBold">{pressed ? 'Pressed!' : 'Work'}</ThemedText>
          )}
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Sign Out</ThemedText>
          <TouchableOpacity style={styles.button} onPress={Modal}>
            <ThemedText type="defaultSemiBold">Sign Out</ThemedText>
          </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: screenWidth,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    margin: 8,
    borderColor: "#000000",
    borderWidth: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    marginTop: 30,
  },
});
