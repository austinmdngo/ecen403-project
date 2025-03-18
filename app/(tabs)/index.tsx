import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, Button } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [sliderValue, setSliderValue] = useState(0);

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
        <ThemedText type="subtitle">Temperature Slider</ThemedText>
        <ThemedText>{sliderValue}</ThemedText>
        <Slider style={{ width: '100%', height: 40 }} 
          minimumValue={0} 
          maximumValue={100}
          onValueChange={(value) => setSliderValue(value)}
          step={1}
          value={sliderValue}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <Button title="On" onPress={() => <Button title="Off"/>}/>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
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
});
