import 'react-native-gesture-handler';
import * as React from 'react';
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

import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* incomplete App function */}
      {/* Change to HomeScreen OR SettingScreen to see the screen */}
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Padding to prevent content overlap with status bar
  },
});
