import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Platform,
  BackHandler,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SettingOption from '../Component/SettingOption';

export default function About() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'left'}}>
          Info
        </Text>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#ED5e5d',
            borderRadius: 10,
            elevation: 3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>
            About the home screen
          </Text>
          <Image
            source={require('../assets/down-arrow.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: '#fff',
              left: 150,
            }}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            padding: 20,
          }}>
          <Text style={{fontSize: 15, paddingBottom: 10}}>
            The home screen will display four category of spending as below:
          </Text>
          <Text
            style={{fontSize: 15, paddingHorizontal: 10, fontWeight: 'bold'}}>
            Bills & Utilities
          </Text>
          <Text
            style={{fontSize: 15, paddingHorizontal: 10, fontWeight: 'bold'}}>
            Daily :{' '}
            <Text
              style={{fontWeight: 'normal', color: '#333333', fontSize: 13}}>
              Includes drink&dine / grocery / shopping
            </Text>
          </Text>
          <Text
            style={{fontSize: 15, paddingHorizontal: 10, fontWeight: 'bold'}}>
            Transport & Travel
          </Text>
          <Text
            style={{fontSize: 15, paddingHorizontal: 10, fontWeight: 'bold'}}>
            Others :{' '}
            <Text
              style={{fontWeight: 'normal', color: '#333333', fontSize: 13}}>
              Includes education / health&fitness / personal care / others
            </Text>
          </Text>
        </View>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#ED5e5d',
            borderRadius: 10,
            elevation: 3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>
            Adding Bills
          </Text>
          <Image
            source={require('../assets/down-arrow.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: '#fff',
              left: 230,
            }}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 15}}>
            Bills can be added by navigating to the middle option in bottom nav
            bar
          </Text>
        </View>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#ED5e5d',
            borderRadius: 10,
            elevation: 3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>
            Managing Bills
          </Text>
          <Image
            source={require('../assets/down-arrow.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: '#fff',
              left: 210,
            }}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 15}}>
            Navigate to second option on nav bar to view and manage the bills
            recorded
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  pageHeader: {
    paddingLeft: wp('5%'),
    paddingBottom: hp('2%'),
    height: hp('10%'),
    justifyContent: 'flex-end',
  },

  settingHeaderContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    height: hp('3%'),
    justifyContent: 'center',
  },

  settingHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});
