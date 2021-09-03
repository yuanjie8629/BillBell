import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from '../Component/Mytextinput';
import Mybutton from '../Component/Mybutton';
import { DatabaseConnection } from '../database/Connection';

const db = DatabaseConnection.getConnection();

const DeleteBill = ({ navigation }) => {
  let [inputBillId, setInputBillId] = useState('');

  let deleteBill = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM Bill where ID=?',
        [inputBillId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Bill deleted successfully !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
                
              ],
              { cancelable: false },
            );
          } else {
            alert('Please enter a valid bill id. !');
          }
        }
      );
    });
};

function deleteconfirm(){
    Alert.alert(
      'Please confirm delete',
      'Double confirm !',
      [
        {
          text: 'Yes',
          onPress: () => DeleteBill,
        },
        {
          text: 'No',
        },
        
      ],
      { cancelable: false },
    );
}
return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            keyboardType='numeric'
            placeholder="Enter Bill ID"
            onChangeText={
              (inputBillId) => setInputBillId(inputBillId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Bill" customClick={DeleteBill} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteBill;