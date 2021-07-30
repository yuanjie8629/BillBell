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

const userName = 'Kai Seow'; // username <-
const balance = 2364.21; // balance available <-

const pendingBillAmount = 3; // number of pending bills <-

const month = 'JULY'; // current month <-
const budgetStatus = 'Is looking good so far!'; // overall budget status (good / warning- near limit / overspent)

const billUtilitySpent = 101.2; //total spending for utility & bills category <-
const dailySpent = 159.76; // total spending for daily category ( ) <-
const transportTravelSpent = 120.6; // total spending for transport & travel category <-
const others = 207.1; // addition of excluded category in home screen <-

const totalSpent =
  billUtilitySpent + dailySpent + transportTravelSpent + others; // total amount spent

{
  /* Home Card Component */
}
const HomeCard = ({ header, rm, content, end, color, marginR }) => {
  return (
    <View style={{ alignItems: 'center', flex: 1, width: wp('100%') }}>
      <View
        style={{
          height: 210,
          width: wp('80%'),
          flex: 1,
          position: 'relative',
        }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 201,
              width: wp('80%'),
              borderRadius: 15,
              justifyContent: 'center',
              backgroundColor: color,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
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

{
  /* ProgressBar component*/
}
const ProgressBarHome = ({ step, height, name, color }) => {
  const [width, setWidth] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;
  const steps = totalSpent;

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
      <View style={{ flexDirection: 'row' }}>
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
        onLayout={(e) => {
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

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.welcome}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
            Welcome Back!
          </Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{userName}</Text>
        </View>
        <View style={styles.balance}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Balance:</Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>RM {balance}</Text>
        </View>
      </View>

      <View style={{ height: hp('35%') }}>
        <View>
          <Text
            style={{
              paddingLeft: wp('5%'),
              paddingTop: 20,
              fontWeight: 'bold',
            }}>
            Insights
          </Text>
        </View>

        {/* Start of Home Page Card Horizontal Scroll*/}
        <View>
          <ScrollView scrollEventThrottle={16}>
            <View style={{ flex: 1, paddingTop: 20 }}>
              <View style={{ height: 210 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled>
                  <HomeCard
                    header="You have spent"
                    rm="RM"
                    content={totalSpent}
                    end="So far this month"
                    color="#56ccf2"
                    marginR="7%"
                  />

                  <HomeCard
                    header="You have"
                    content={pendingBillAmount}
                    end="Pending Bills"
                    color="#8ca6db"
                    marginR="7%"
                  />

                  <HomeCard
                    header="Your budget for"
                    content={month}
                    end={budgetStatus}
                    color="#bfe6ba"
                    marginR="22%"
                  />
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* End of Home Page Card Horizontal Scroll*/}
      </View>

      <View style={{ height: hp('45%') }}>
        {/* Start of home progress bar*/}
        <View style={{ paddingTop: hp('3%') }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Breakdown of your spending this month
          </Text>
        </View>

        <View style={styles.homeProgressBarContainer}>
          <View style={styles.progressBar}>
            <ProgressBarHome
              step={billUtilitySpent}
              height={20}
              name={'Bills & Utilities'}
              color={'#49eea9'}
            />
          </View>

          <View style={styles.progressBar}>
            <ProgressBarHome
              step={dailySpent}
              height={20}
              name={'Daily'}
              color={'#00dbde'}
            />
          </View>

          <View style={styles.progressBar}>
            <ProgressBarHome
              step={transportTravelSpent}
              height={20}
              name={'Transport & Travel'}
              color={'#3f5efb'}
            />
          </View>

          <View style={styles.progressBar}>
            <ProgressBarHome
              step={others}
              height={20}
              name={'Others'}
              color={'#f46b45'}
            />
          </View>
        </View>
        {/* End of progress bar container*/}
      </View>

      {/* Dummy Bottom Nav Bar*/}
      <View style={styles.dummyNav}>
        <Text style={{ textAlign: 'center', color: 'white' }}>
          Add Nav Bar Here
        </Text>
      </View>

      {/* Add to app.json
      
        "androidNavigationBar": {
     
        Determines to show or hide bottom navigation bar.
        "true" to show, "false" to hide.
        If set to false, status bar will also be hide. As it's a general rule to hide both status bar and navigation bar on Android developer official docs.
      
        "visible": BOOLEAN,
    
        Configure the navigation bar icons to have light or dark color.
        Valid values: "light-content", "dark-content".
    
        "barStyle": STRING,

        
        Configuration for android navigation bar.
        6 character long hex color string, eg: "#000000"
    
        "backgroundColor": STRING
        }
      For Same Color Native Navigation Bar*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  welcome: {
    paddingLeft: wp('5%'),
    flex: 2,
  },

  balance: {
    paddingRight: wp('5%'),
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  top: {
    flexDirection: 'row',
    paddingTop: 20,
    height: hp('10%'),
  },

  homeProgressBarContainer: {
    marginHorizontal: wp('10%'),
    height: 400,
    marginTop: hp('2%'),
  },

  progressBar: {
    marginTop: 20,
  },

  dummyNav: {
    height: hp('10%'),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FF9b9b',
    justifyContent: 'center',
  },
});
