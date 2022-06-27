import 'react-native-gesture-handler';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
let limit = 7000;
const ProgressBarHome = ({step, height, name, color}) => {
  const [width, setWidth] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;
  const steps = limit;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            paddingBottom: 2,
            fontWeight: 'bold',
            flex: 1,
            paddingLeft: 5,
          }}>
          {name}
        </Text>
        <Text
          style={{
            paddingBottom: 2,
            alginItems: 'flex-end',
            fontSize: 10,
            paddingRight: 10,
          }}>
          {step}
        </Text>
      </View>
      <View
        onLayout={e => {
          const newWidth = e.nativeEvent.layout.width;

          setWidth(newWidth);
        }}
        style={{
          height,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: height,
          overflow: 'hidden',
        }}>
        <Animated.View
          style={{
            height,
            borderRadius: height,
            backgroundColor: color,

            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
      </View>
    </>
  );
};
{
  /* ^^^ Progress Bar Component ^^^ */
}

export default ProgressBarHome;
