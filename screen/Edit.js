import React, {useState, Component, PureComponent} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  Image,
} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../Component/UI';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import SQLite from 'react-native-sqlite-storage';

let categorydata = require('../Component/categorydata');

type Props = {};
export default class Edit extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      billId: props.route.params.id,
      title: '',
      category: '',
      amount: '',
      date: '',
    };

    this.db = SQLite.openDatabase({
      name: 'billsdb',
      createFromLocation: '~db.sqlite',
    });

    this._query = this._query.bind(this);
    this._update = this._update.bind(this);
  }

  componentDidMount() {
    this._query();
  }

  _query() {
    this.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Bill WHERE ID = ?',
        [this.state.billId],
        (tx, results) => {
          if (results.rows.length) {
            this.setState({
              title: results.rows.item(0).Title,
              category: results.rows.item(0).Category,
              amount: results.rows.item(0).Amount.toFixed(2).toString(),
              date: results.rows.item(0).Date,
            });
          }
        },
      );
    });
  }

  _update() {
    this.db.transaction(tx => {
      tx.executeSql(
        'UPDATE Bill SET Title=?,Category=?,Amount=?, Date=? WHERE ID=?',
        [
          this.state.title,
          this.state.category,
          this.state.amount,
          this.state.date,
          this.state.billId,
        ],
      );
    });

    this.props.navigation.navigate('Bill');
  }

  render() {
    let bill = this.state.bill;
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flex: 1, justifyContent: 'center'}}>
            <Image
              source={require('../assets/left-arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Edit</Text>
        </View>
        <ScrollView style={styles.container2}>
          <InputWithLabel
            style={styles.input}
            label={'Title'}
            value={this.state.title}
            onChangeText={title => {
              this.setState({title});
            }}
            orientation={'vertical'}
          />
          <View style={styles.box}>
            <Text style={{fontWeight: 'bold', fontSize: 18, paddingTop: 20}}>
              Category
            </Text>
            <Picker
              selectedValue={this.state.category}
              style={styles.text}
              onValueChange={itemValue => this.setState({category: itemValue})}>
              <Picker.Item
                label="Select New Category"
                value=""
                enabled={false}
              />
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
          <InputWithLabel
            style={styles.input}
            label={'Amount'}
            value={this.state.amount}
            onChangeText={amount => {
              this.setState({amount});
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            style={styles.input}
            label={'Date'}
            value={this.state.date}
            onChangeText={date => {
              this.setState({date});
            }}
            orientation={'vertical'}
          />
          <AppButton
            style={styles.button}
            title={'Save'}
            theme={'primary'}
            onPress={this._update}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container2: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  backIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    width: 28,
    height: 28,
    tintColor: 'white',
  },

  header: {
    backgroundColor: '#FF9B9B',
    height: '8%',
    flexDirection: 'row',
  },

  title: {
    color: '#fff',
    paddingLeft: 30,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  text: {
    width: 300,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
  },

  box: {
    paddingVertical: 10,
  },
});
