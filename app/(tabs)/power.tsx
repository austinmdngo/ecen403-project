import { StyleSheet, Image, Platform } from 'react-native';

import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView2 from '@/components/ParallaxScrollView2';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// Define the ChartData type
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}


export default function TabTwoScreen() {
  // data variable
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [totalData1, setTotalData1] = useState(0);
  const [totalData2, setTotalData2] = useState(0);

  // function to fetch data from the database, currently simulating data
  useEffect(() => {
    const fetchData = async () => {
      const newData1 = [
        {name: '0:00', value: Math.random() * 70},
        {name: '3:00', value: Math.random() * 10},
        {name: '6:00', value: Math.random() * 10},
        {name: '9:00', value: Math.random() * 100},
        {name: '12:00', value: Math.random() * 10},
        {name: '15:00', value: Math.random() * 10},
        {name: '18:00', value: Math.random() * 100},
        {name: '21:00', value: Math.random() * 100},
        {name: '24:00', value: Math.random() * 100},
      ];

      const newData2 = [
        {name: '0:00', value: Math.random() * 35},
        {name: '3:00', value: Math.random() * 5},
        {name: '6:00', value: Math.random() * 5},
        {name: '9:00', value: Math.random() * 50},
        {name: '12:00', value: Math.random() * 5},
        {name: '15:00', value: Math.random() * 5},
        {name: '18:00', value: Math.random() * 50},
        {name: '21:00', value: Math.random() * 50},
        {name: '24:00', value: Math.random() * 50},
      ];

      const total1 = newData1.reduce((sum, item) =>sum + item.value, 0);
      const total2 = newData2.reduce((sum, item) =>sum + item.value, 0);

      setTotalData1(total1);
      setTotalData2(total2);

      // Transform the data into the format required by the chart
      const transformedData = {
        labels: newData1.map((item) => item.name),
        datasets: [
          {
            data: newData1.map((item) => item.value),
            color: (opacity = 0) => `rgba(255, 0, 0, ${opacity})`,
            area: true,
            stack: 'total'
          },

          {
            data: newData2.map((item) => item.value),
            color: (opacity = 0) => `rgba(60, 179, 113, ${opacity})`,
            area: true,
            stack: 'total'
          },
        ],
      };

      setData(transformedData);
    };
    
    // Simulate fetching data every 2 seconds
    const intervalId = setInterval(fetchData, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    
      <ParallaxScrollView2
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <Image
            source={require('@/assets/images/concept403.png')}
            style={styles.reactLogo}
          />
        }>
          <View>
            {/* Line Chart */}
            <LineChart
              data={data}
              width={screenWidth}
              height={300}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 20,
                  paddingLeft: 50,
                  paddingBottom: 50,
                },
              }}
              bezier
              style={styles.testStyle}
            />
            {/* Totals Display */}
            <View style={styles.totalsContainer}>
              <Text style={styles.totalText}>Power Used: {totalData2.toFixed(2)} Watts</Text>
              <Text style={styles.totalText}>Power Saved: {(totalData1 - totalData2).toFixed(2)} Watts</Text>
            </View>
          </View>
      </ParallaxScrollView2>
    
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
  testStyle: {
    height: 300,
    width: screenWidth,
    left: 0,
  },
  totalsContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  totalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});

// function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
//   return <Circle cx={x} cy={y} r={8} color={"grey"} opacity={0.8} />;
// }
