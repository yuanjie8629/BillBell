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
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeCard from '../Component/HomeCard';
import ProgressBarHome from '../Component/ProgressBar';

const db = SQLite.openDatabase({
  name: 'billsdb',
  createFromLocation: '~db.sqlite',
});

export default function App({navigation}) {
  let [billUtilitySpent, setbillUtilitySpent] = useState((0).toFixed(2));
  let [dailySpent, setdailySpent] = useState((0).toFixed(2));
  let [transportTravelSpent, settransportTravelSpent] = useState(
    (0).toFixed(2),
  );
  let [othersSpent, setothersSpent] = useState((0).toFixed(2));

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      navigation.addListener('focus', () => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM Bill WHERE Category="Bill & Utility"',
            [],
            (tx, results) => {
              console.log(results.rows.raw());
              var spent = 0;
              for (let i = 0; i < results.rows.length; i++) {
                spent = spent + results.rows.item(i).Amount;
              }
              setbillUtilitySpent(spent.toFixed(2));
            },
          );

          tx.executeSql(
            'SELECT * FROM Bill WHERE Category IN ("Drink & Dine", "Shopping", "Grocery")',
            [],
            (tx, results) => {
              console.log(results.rows.raw());
              var spent2 = 0;
              for (let i = 0; i < results.rows.length; i++) {
                spent2 = spent2 + results.rows.item(i).Amount;
              }
              setdailySpent(spent2.toFixed(2));
            },
          );

          tx.executeSql(
            'SELECT * FROM Bill WHERE Category="Transport & Travel"',
            [],
            (tx, results) => {
              console.log(results.rows.raw());
              var spent3 = 0;
              for (let i = 0; i < results.rows.length; i++) {
                spent3 = spent3 + results.rows.item(i).Amount;
              }
              settransportTravelSpent(spent3.toFixed(2));
            },
          );

          tx.executeSql(
            'SELECT * FROM Bill WHERE Category IN ("Others", "Education", "Health & Fitness", "Personal Care")',
            [],
            (tx, results) => {
              console.log(results.rows.raw());
              var spent4 = 0;
              for (let i = 0; i < results.rows.length; i++) {
                spent4 = spent4 + results.rows.item(i).Amount;
              }
              setothersSpent(spent4.toFixed(2));
            },
          );
        });
      });
    }
  });

  let totalSpent = (
    Number(billUtilitySpent) +
    Number(dailySpent) +
    Number(transportTravelSpent) +
    Number(othersSpent)
  ).toFixed(2); // total amount spent

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.welcome}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Welcome!</Text>
        </View>
      </View>

      <View style={{height: hp('35%')}}>
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
            <View style={{flex: 1, paddingTop: 20}}>
              <View style={{height: 210}}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled>
                  <HomeCard
                    header="You have spent"
                    rm="RM"
                    content={totalSpent}
                    color="#56ccf2"
                    marginR="7%"
                  />
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* End of Home Page Card Horizontal Scroll*/}
      </View>

      <View style={{height: hp('45%')}}>
        {/* Start of home progress bar*/}
        <View style={{paddingTop: hp('3%')}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            Breakdown of your spending
          </Text>
        </View>

        <View style={styles.homeProgressBarContainer}>
          <View style={styles.progressBar}>
            <ProgressBarHome
              step={billUtilitySpent}
              height={20}
              name={'Bill & Utility'}
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
              step={othersSpent}
              height={20}
              name={'Others'}
              color={'#f46b45'}
            />
          </View>
        </View>
        {/* End of progress bar container*/}
      </View>
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
    height: hp('8%'),
  },

  homeProgressBarContainer: {
    marginHorizontal: wp('10%'),
    height: 400,
    marginTop: hp('2%'),
  },

  progressBar: {
    marginTop: 20,
  },
});
