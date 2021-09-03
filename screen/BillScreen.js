import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, SafeAreaView, Text, View, StatusBar, StyleSheet, Dimensions, Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { DatabaseConnection } from '../database/Connection';

const totalWidth = Dimensions.get("screen").width;
const db = DatabaseConnection.getConnection();

const ViewAllBills = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Bill',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={styles.bill}>
        <TouchableOpacity
          underlayColor={'#cccccc'}
          onPress={ () => {
            navigation.navigate('BillDetail', {
              id: item.ID,
              headerTitle: item.Title,
            })
          }}
        >
          <View style={{flexDirection: 'row', paddingTop: 10,}}>
            <Text style={styles.billtitle}>{item.Title}</Text>
            <Text style={styles.billamount}>RM{item.Amount.toFixed(2)}</Text>
          </View>
          <Text style={styles.billcategory}>{item.Category}</Text>
          <Text style={styles.billdate}>{item.Date}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> 
          Bills
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={ true }
            renderItem={({ item }) => listItemView(item)}
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
      backgroundColor: "#fff",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  
    header: {
      backgroundColor: "#FF9B9B",
      height: 60,
    },
  
    title: {
      color: "#fff",
      paddingTop: 10,
      paddingLeft: 50,
      fontSize: 25,
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
      position: 'absolute',
    },

    billcategory: {
      color: 'gray',
      fontSize: 18,
      paddingLeft: 10,

    },

    billamount: {
      color: 'black',
      fontSize: 25,
      flex: 1,
      textAlign: 'right',
    },

    billdate: {
      color: 'gray',
      fontSize: 18,
      paddingLeft: 10,

    },

    bill: {
      borderWidth: 1,
      borderColor: 'lightgray',
    },



  });

  