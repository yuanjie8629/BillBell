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

//Setting Button Component
const SettingOption = ({title, color}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        borderBottomWidth: 0.2,
        height: hp('7%'),
      }}>
      <View style={{flexDirection: 'row', paddingHorizontal: wp('5%')}}>
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
          source={require('../assets/next.png')}
          style={{
            height: 15,
            width: 15,
          }}
        />
      </View>
    </View>
  );
};

export default SettingOption;
