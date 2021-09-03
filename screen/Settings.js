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

const username = 'Kai Seow';

//Setting Button Component
const SettingOption = ({ title, color }) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        borderBottomWidth: 0.2,
        height: hp('7%'),
      }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: wp('5%') }}>
        <Text
          style={{
            flex: 1,
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'left',
            color: color,
          }}>
          {title}
        </Text>
        <Image
          source={require('../assets/right-arrow.png')}
          style={{
            height: 15,
            width: 15,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'left' }}>
          Settings
        </Text>
      </View>

      <View style={styles.settingHeaderContainer}>
        <Text style={styles.settingHeader}>Profile</Text>
      </View>

      <View
        style={{
          height: hp('15%'),
          flexDirection: 'row',
          alignItems:'center',
          justifyContent: 'center',
        }}>
        
        <View style={{ justifyContent: 'center', alignItems: 'center', width: wp('60%') }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: hp('2%'),
            }}>
            Welcome
          </Text>
          <Text
            style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 22 }}>
            {username}
          </Text>
        </View>
      </View>

      <View style={styles.settingHeaderContainer}>
        <Text style={styles.settingHeader}>General Settings</Text>
      </View>

      <View>
        <ScrollView scrollEventThrottle={16}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <SettingOption title="Log Out" color="#FF4242" />
              <SettingOption title="Clear OnBoarding Screen Async" color="#FF4242" />
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      <View>
        <View style={styles.settingHeaderContainer}>
          <Text style={styles.settingHeader}>Info</Text>
        </View>

        <SettingOption title="About Us" />
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
