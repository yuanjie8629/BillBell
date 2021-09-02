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

  let updateAllStates = (titles, categorys, amounts) => {
    setTitle(titles);
    setCategory(categorys);
    setAmount(amounts);
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
              res.Amount
            );
          } else {
            alert('Bill Not Found!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateBill = () => {
    console.log(inputBillId, title, category, amount);

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
db.transaction((tx) => {
      tx.executeSql(
        'UPDATE Bill set Title=?, Category=? , Amount=? where ID=?',
        [title, category, amount, inputBillId],
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
            <Text>Category</Text>
            <Picker
              selectedValue={category}
              style={styles.text}
              onValueChange={(category) => setCategory(category)}
            >
            <Picker.Item label="" value=""/>
            <Picker.Item label="School" value="school" color="black"/>
            <Picker.Item label="Entertainment" value="entertainment"/>
            </Picker>
          </View>
              <Mytextinput
                value={amount.toString()}
                placeholder="Enter Amount"
                onChangeText={
                  (amount) => setAmount(amount)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
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
    width: 300,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    paddingVertical:10,
  },

  button: {
    borderRadius: 10,
    paddingVertical: 14,
    width: 200,
    backgroundColor: 'blue',
  },

  buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 16,
      textAlign: 'center',
  },

  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    paddingVertical: 35,
  },

  showdate: {
    borderBottomWidth: 1,
    width: 280,
    margin: 5,
  },
});
export default UpdateBill;