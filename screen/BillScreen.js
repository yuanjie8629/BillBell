import React, {useState, useEffect} from 'react';
import {
  Alert,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SQLite from 'react-native-sqlite-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const db = SQLite.openDatabase({
  name: 'billsdb',
  createFromLocation: '~db.sqlite',
});

const totalWidth = Dimensions.get('screen').width;

const ViewAllBills = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Bill', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
      });
    });
  }, []);

  let listItemView = item => {
    return (
      <View key={item.user_id} style={styles.bill}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          underlayColor={'#cccccc'}
          onPress={() => {
            navigation.navigate('BillDetail', {
              id: item.ID,
              headerTitle: item.Title,
            });
          }}>
          <View style={{flex: 0.9, paddingBottom: 3}}>
            <Text style={styles.billtitle}>{item.Title}</Text>
            <Text style={styles.billcategory}>{item.Category}</Text>
            <Text style={styles.billdate}>Due date {item.Date}</Text>
          </View>
          <View style={{justifyContent: 'flex-end', flex: 0.6}}>
            <Text style={styles.billamount}>RM{item.Amount.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bills</Text>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <FlatList
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllBills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: hp('9.6%'),
  },

  header: {
    backgroundColor: '#FF9B9B',
    height: 60,
    justifyContent: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 25,
    paddingLeft: 30,
    fontWeight: 'bold',
  },

  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',
  },

  billid: {
    color: 'black',
    fontSize: 25,
  },

  billtitle: {
    color: 'black',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
    textTransform: 'capitalize',
  },

  billcategory: {
    color: 'gray',
    fontSize: 13,
    paddingLeft: 10,
    textTransform: 'capitalize',
  },

  billamount: {
    color: 'black',
    fontSize: 25,
    paddingBottom: 3,
  },

  billdate: {
    color: 'gray',
    fontSize: 13,
    paddingLeft: 10,
  },

  bill: {
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});
