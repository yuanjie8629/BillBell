import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import Mytextinput from '../Component/Mytextinput';
import Mybutton from '../Component/Mybutton';
import { DatabaseConnection } from '../database/Connection';
const db = DatabaseConnection.getConnection();

const UpdateBill = ({ navigation }) => {
  let [inputBillId, setInputBillId] = useState('');
  let [title, setTitle] = useState('');
  let [category, setCategory] = useState('');
  let [amount, setAmount] = useState('');
  let [dates, setDates] = useState('');

  let updateAllStates = (titles, categorys, amounts, datess) => {
    setTitle(titles);
    setCategory(categorys);
    setAmount(amounts);
    setDates(datess)
  };

  let searchBill = () => {
    console.log(inputBillId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Bill where ID = ?',
        [inputBillId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.Title,
              res.Category,
              res.Amount,
              res.Date
            );
          } else {
            alert('Bill Not Found!');
            updateAllStates('', '', '', '');
          }
        }
      );
    });
  };
  let updateBill = () => {
    console.log(inputBillId, title, category, amount, dates);

    if (!inputBillId) {
      alert('Please enter the Id!');
      return;
    }
    if (!title) {
      alert('Please enter the Title !');
      return;
    }
    if (!category) {
      alert('Please enter the Category !');
      return;
    }
    if (!amount) {
      alert('Please enter the Amount !');
      return;
    }
    if (!dates) {
      alert('Please enter the Date !');
      return;
    }
db.transaction((tx) => {
      tx.executeSql(
        'UPDATE Bill set Title=?, Category=? , Amount=? , Date=? where ID=?',
        [title, category, amount, dates, inputBillId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Bill updated successfully !!',
              [
                {
                  text: 'Ok',
                  onPress: () => console.log("gfagagfag"),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error updating bill');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
              <Mytextinput
                placeholder="Enter Bill ID"
                style={{ padding: 10 }}
                keyboardType='numeric'
                onChangeText={
                  (inputBillId) => setInputBillId(inputBillId)
                }
              />
              <Mybutton
                title="Search Bill"
                customClick={searchBill}
                
              />
              <Mytextinput
                placeholder="Enter Title"
                value={title}
                style={{ padding: 10 }}
                onChangeText={
                  (title) => setTitle(title)
                }
              />
            <View style={styles.box}>
            <Text style={styles.text}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(category) => setCategory(category)}
            >
            <Picker.Item label="" value=""/>
            <Picker.Item label="Bills & Utility" value="bills" color="black"/>
            <Picker.Item label="Transport & Travel" value="transport"/>
            <Picker.Item label="Education" value="education"/>
            <Picker.Item label="[Daily] Drink & Dine / Grocery / Shopping" value="daily"/>
            <Picker.Item label="Health & Fitness" value="health"/>
            <Picker.Item label="Personal Care" value="personalcare"/>
            <Picker.Item label="Others" value="others"/>
            </Picker>
            </View>
              <Mytextinput
                value={amount.toString()}
                placeholder="Enter Amount"
                onChangeText={
                  (amount) => setAmount(amount)
                }
                keyboardType='numeric'
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                value={dates.toString()}
                placeholder="Enter Date"
                onChangeText={
                  (dates) => setDates(dates)
                }
                keyboardType='numeric'
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Update Bill"
                customClick={updateBill}
              />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    height: 40,
    margin: 12,
    fontSize:17,
    color: '#f20cdb',
  },

  box: {
    padding:1,
    justifyContent: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: -35,
  },

});
export default UpdateBill;