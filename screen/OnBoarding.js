import * as React from 'react';
import useState, { Component } from 'react';
import {
  Button,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Animated,
  Image,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');
const bgs = ['#FF9B9B', '#DDBEFE', '#B98EFF', '#FF9B9B'];
const DATA = [
  {
    key: '3571572',
    title: 'Hi there!',
    description: 'Welcome to Bill Manager! Your personal bill managing app',
    image: 'https://image.flaticon.com/icons/png/512/4161/4161781.png',
    num: '1',
  },
  {
    key: '3571747',
    title: 'Record your spending',
    description:
      'With Bill Manager, you will be able to keep track of your daily spending easily',
    image: 'https://image.flaticon.com/icons/png/512/2942/2942269.png',
    num: '2',
  },
  {
    key: '3571680',
    title: 'Manage your bills',
    description:
      'You will be alerted for your upcomming bills and pending bills',
    image: 'https://image.flaticon.com/icons/png/512/951/951764.png',
    num: '3',
  },
  {
    key: '3571603',
    title: 'View Statistics',
    description: 'Instant statistical view on your monthly spending and bills',
    image: 'https://image.flaticon.com/icons/png/512/921/921591.png',
    num: '4',
  },
];

const setOnboarding = async () => {
  try {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
    console.log('Viewed onboarding');
  } catch (err) {
    console.log('Error @setItem: ', err);
  }
};

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 50, flexDirection: 'row' }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 0.9, 0.5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#a6f4f4',
              opacity,
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

function Boardingbutton({ num}){
  const navigation = useNavigation();
  if (num == 4) {
    return (
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            
          }}>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#e6e6e6' : '#f2f2f2' },
              styles.bbutton,
            ]} 
            onPress={() =>  {setOnboarding; navigation.push('Login')}}> 
            <Text style={styles.text}>Let's get started</Text>
            <Image
              source={require('../assets/right-arrow.png')}
              style={{ marginLeft: 15, width: 20, height: 20 }}
            /> 
            
          </Pressable>
        </View>
      </View>
      
    );
  }
  return null;
}

export default function Onboarding() {
  const navigation = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }}>
              <View
                style={{
                  flex: 0.7,
                  //backgroundColor: 'blue',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: 30,
                    marginBottom: 10,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '300',
                    fontSize: 18,
                    marginBottom: 30,
                  }}>
                  {item.description}
                </Text>

                <Boardingbutton num={item.num} />
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Padding to prevent content overlap with status bar
    alignItems: 'center',
    justifyContent: 'center',
  },

  bbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    width: width * 0.6,
    height: 50,
    marginTop: 40,
    flexDirection: 'row',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#333333',
  },
});
