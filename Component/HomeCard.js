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

{
  /* Home Card Component */
}
const HomeCard = ({header, rm, content, end, color, marginR}) => {
  return (
    <View style={{alignItems: 'center', flex: 1, width: wp('100%')}}>
      <View
        style={{
          height: 210,
          width: wp('80%'),
          flex: 1,
          position: 'relative',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              height: 201,
              width: wp('80%'),
              borderRadius: 15,
              justifyContent: 'center',
              backgroundColor: color,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 7,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}>
              {header}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 30,
                color: 'white',
              }}>
              {rm}
              {content}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}>
              {end}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeCard;
