import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabThreeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Help Page</ThemedText>
      </ThemedView>
      <ThemedText>Below are the steps to help you set up our system:</ThemedText>
      <Collapsible title="Step 1:">
        <ThemedText>
        Ensure the system is plugged into a power outlet and verify that the device is powered on (e.g., check for an indicator light).
        </ThemedText>
      </Collapsible>
      <Collapsible title="Step 2:">
        <ThemedText>
          Follow on-screen instructions to connect the system to a Wi-Fi network. Enter Wi-Fi credentials or use an automatic setup option if available.
          Confirm successful connection before proceeding.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Step 3:">
        <ThemedText>
          Place the motion sensor at the entrance of the room or area to be monitored. Ensure it is positioned at a height that allows for optimal detection of movement.
          Place the camera in a location that provides a clear view of the monitored area. Adjust the camera angle as needed to capture the desired field of view.
          Place the ambient light sensor in a location that you will be in.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Step 4:">
        <ThemedText>
          Choose how the system should adjust lighting throughout the day.
          Set brightness preferences based on detected motion and ambient light levels.
          This step can be done through the app or on the device itself.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Step 5:">
        <ThemedText>
          Enable notifications for detected movement.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Step 6:">
        <ThemedText>
          Run a test to ensure all sensors and automation features work correctly.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
