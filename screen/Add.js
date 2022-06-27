import React, {useState, Component} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  NativeModules,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import SQLite from 'react-native-sqlite-storage';
const {width, height} = Dimensions.get('screen');

const db = SQLite.openDatabase({
  name: 'billsdb',
  createFromLocation: '~db.sqlite',
});

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function AddScreen({navigation}) {
  let [title, setTitle] = useState('');
  let [category, setCategory] = useState('');
  let [amount, setAmount] = useState('');
  let [dates, setDates] = useState('');

  let new_bill = () => {
    console.log(title, category, amount, dates);
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
    if (!dates) {
      alert('Please fill in the date !');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Bill(Title, Category, Amount, Date) VALUES (?,?,?,?)',
        [title, category, amount, dates],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Successfully Add Bill !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ],
              {cancelable: false},
            );
          } else alert('Error trying to add bill !!!');
        },
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

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
    console.log(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 30}}>
        <Text style={{fontWeight: 'bold'}}>Title</Text>
        <View
          style={{
            backgroundColor: '#dedede',
            borderRadius: 30,
            width: width * 0.8,
            paddingHorizontal: 10,
            elevation: 3,
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.9,
            shadowRadius: 1,
          }}>
          <TextInput
            placeholder="Title..."
            onChangeText={title => setTitle(title)}
          />
        </View>
      </View>

      <View style={{marginTop: 30}}>
        <Text style={{fontWeight: 'bold'}}>Category</Text>
        <View
          style={{
            backgroundColor: '#dedede',
            borderRadius: 30,
            width: width * 0.8,
            paddingHorizontal: 10,
            elevation: 3,
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.9,
            shadowRadius: 1,
          }}>
          <Picker
            selectedValue={category}
            onValueChange={category => setCategory(category)}>
            <Picker.Item label="Select Category:" value="" enabled={false} />
            <Picker.Item
              label="Bill & Utility"
              value="Bill & Utility"
              color="black"
            />
            <Picker.Item
              label="Transport & Travel"
              value="Transport & Travel"
            />
            <Picker.Item label="Education" value="Education" />
            <Picker.Item label="Drink & Dine" value="Drink & Dine" />
            <Picker.Item label="Grocery" value="Grocery" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Health & Fitness" value="Health & Fitness" />
            <Picker.Item label="Personal Care" value="Personal Care" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>
      </View>

      <View style={{marginTop: 30}}>
        <Text style={{fontWeight: 'bold'}}>MYR</Text>
        <View
          style={{
            backgroundColor: '#dedede',
            borderRadius: 30,
            width: width * 0.8,
            paddingHorizontal: 10,
            elevation: 3,
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.9,
            shadowRadius: 1,
          }}>
          <TextInput
            keyboardType="numeric"
            placeholder="Amount"
            onChangeText={amount => setAmount(amount)}
          />
        </View>
      </View>

      <View style={{paddingTop: 20, paddingBottom: 20}}>
        <Text style={{fontWeight: 'bold'}}>Calender</Text>
        <View style={styles.calendar}>
          <View
            style={{
              backgroundColor: '#dedede',
              borderRadius: 20,
              width: width * 0.65,
              paddingHorizontal: 10,
              elevation: 3,
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.9,
              shadowRadius: 1,
              marginRight: 30,
            }}>
            <Text style={styles.showdate}>{formatDate(date)}</Text>
          </View>
          <TouchableOpacity onPress={showDatePicker}>
            <Image
              style={{width: 30, height: 30, bottom: 1}}
              source={require('../assets/calendar.png')}
            />
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                //onChangeText={(dates) => setDates(dates)}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={{fontWeight: 'bold'}}>Date</Text>
        <View
          style={{
            backgroundColor: '#dedede',
            borderRadius: 30,
            width: width * 0.8,
            paddingHorizontal: 10,
            elevation: 3,
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.9,
            shadowRadius: 1,
          }}>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter date above"
            onChangeText={dates => setDates(dates)}
          />
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={new_bill}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add bill</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  button: {
    borderRadius: 25,
    paddingVertical: 14,
    width: 200,
    backgroundColor: '#ff9b9b',
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
  },

  showdate: {
    width: 280,
    margin: 5,
  },
});

export default AddScreen;
