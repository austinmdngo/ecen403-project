import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, Button, Pressable, Text } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [sliderValueTemp, setSliderValueTemp] = useState(0);
  const [sliderValueBrightness, setSliderValueBrightness] = useState(0);
  const [offOnPress, setOffOnPress] = useState(0);

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
        <ThemedText type="title">Context-Aware Lighting Control</ThemedText>
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
});
