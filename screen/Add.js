import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { DatabaseConnection } from '../database/Connection';


const db = DatabaseConnection.getConnection();

function AddScreen({ navigation }) {
    // let [dates, setDates] = useState('');
    let [title, setTitle] = useState('');
    let [category, setCategory] = useState('');
    let [amount, setAmount] = useState('');
  
    let new_bill = () => {
      console.log(title, category, amount);
  
      /*if (!dates) {
        alert('Please fill in the date!');
        return;
      }*/
      if (!title) {
        alert('Please fill in the bill title !');
        return;
      }
      if (!category) {
        alert('Please select the category');
        return;
      }
      if (!amount) {
        alert('Please fill in the amount !');
        return;
      }
  
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO Bill (Title, Category, Amount) VALUES (?,?,?)',
          [title, category, amount],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Successfully Add Bill !!!',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Error trying to add bill !!!');
          }
        );
      });
    };
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatePicker = () => {
      showMode('date');
      console.log(date);
    };
  
    
    return (
      <View style={styles.container}>
        <View style={styles.box}>
        <Text>Title</Text>
        <TextInput
          style={styles.text} 
          placeholder='Title...'
          onChangeText={(title) => setTitle(title)}
          />
        </View>
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
        <View style={styles.box}>
          <Text>MYR</Text>
          <TextInput
            style={styles.text} 
            keyboardType='numeric'
            placeholder='Amount'
            onChangeText={(amount) => setAmount(amount)}
          />
        </View>
        <View style={styles.box}>
          <Text>Calender</Text>
          <View style={styles.calendar}>
            <Text style={styles.showdate}>{date.toDateString().replace(/^\S+\s/,'')}</Text>
            <Ionicons
                name={'ios-calendar'} 
                size={30}
                onPress={showDatePicker} />
                {show && (<DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />)}
          </View>
        </View>
        <View style={styles.box}>
            <TouchableOpacity onPress={new_bill}>
                <View style={styles.button} >
                    <Text style={styles.buttonText} >Add bill</Text>
                </View>
            </TouchableOpacity>           
        </View>
      </View>
      
    );
  }


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

export default AddScreen;