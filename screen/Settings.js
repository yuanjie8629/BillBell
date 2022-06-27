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
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import About from './AboutUs';

const username = 'Kai Seow';

export default function Settings() {
  const navigation = useNavigation();
  const OnSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('Successfully Logout!', [
          {text: 'ok', onPress: navigation.navigate('OnBoarding')},
        ]);
      })
      .catch(error => {
        // if (error.code === 'auth/no-current-user') {
        //   alert('Failed! No Logged In Account Found.');
        // } else {
        //   console.log(error);
        // }
        navigation.navigate('OnBoarding');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'left'}}>
          Settings
        </Text>
      </View>

      <View style={styles.settingHeaderContainer}>
        <Text style={styles.settingHeader}>General Settings</Text>
      </View>

      <View>
        <ScrollView scrollEventThrottle={16}>
          <View style={{flex: 1, height: hp('21%')}}>
            <ScrollView>
              <TouchableOpacity onPress={OnSignOut}>
                <SettingOption title="Log Out" color="#FF4242" />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      <View>
        <View style={styles.settingHeaderContainer}>
          <Text style={styles.settingHeader}>About us</Text>
        </View>

        <View style={{alignSelf: 'center', paddingTop: 10}}>
          <Text>This assignment is done by members group 27</Text>
        </View>

        <View style={{paddingHorizontal: 55, paddingTop: 20}}>
          <Text style={{fontWeight: 'bold'}}>Leader:</Text>
          <Text>Ng Jia Yong</Text>
        </View>

        <View style={{paddingHorizontal: 55, paddingTop: 20}}>
          <Text style={{fontWeight: 'bold'}}>Members:</Text>
          <Text>Tan Yuan Jie</Text>
          <Text>Lean Wei Liang</Text>
          <Text>Seow Kai Sheng</Text>
          <Text>Tong Jun Hou</Text>
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
