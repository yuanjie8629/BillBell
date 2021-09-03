
import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import {
  InputWithLabel,
  PickerWithLabel,
  AppButton,
} from '../UI'
import { AntDesign, Ionicons, SimpleLineIcons, MaterialIcons, Entypo} from '@expo/vector-icons';
import { DatabaseConnection } from '../database/Connection';
import { SafeAreaView } from 'react-native-safe-area-context';

let categorydata = require('../categorydata');
const db = DatabaseConnection.getConnection();
type Props = {};
export default class Edit extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      billId: props.route.params.id,
      title: '',
      category: '',
      amount: '',
      date: '',
    };

    this._query = this._query.bind(this);
    this._update = this._update.bind(this);
  }
  
   componentDidMount() {
    this._query();
  }

  _query() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM bill WHERE ID = ?', [this.state.billId], (tx, results) => {
        if(results.rows.length) {
          this.setState({
            title: results.rows.item(0).Title,
            category: results.rows.item(0).Category,
            amount: results.rows.item(0).Amount,
            date: results.rows.item(0).Date,
          })
        }
      })
    });
  }

  _update() {
    db.transaction((tx) => {
      tx.executeSql('UPDATE Bill SET Title=?,Category=?,Amount=?, Date=? WHERE ID=?', [
        this.state.title,
        this.state.category,
        this.state.amount,
        this.state.date,
        this.state.billId
      ]);
    });

    this.props.navigation.goBack();
  }


  render() {
    let bill = this.state.bill;

    return (
      <SafeAreaView style={styles.container1}>
         <View style={styles.header}>
            <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
              <View>
                <AntDesign style={styles.backIcon} name="left" size={30} color="#fff" />
              </View>
            </TouchableHighlight>
            <Text style={styles.title}>Edit</Text>
          </View>
        <ScrollView style={styles.container2}>
          <InputWithLabel style={styles.input}
            label={'Title'}
            value={this.state.title}
            onChangeText={(title) => {this.setState({title})}}
            orientation={'vertical'}
          />
          <PickerWithLabel style={styles.picker}
            label={'Category'}
            items={categorydata.categories}
            mode={'dialog'}
            value={this.state.category}
            onValueChange={(itemValue) => {this.setState({category: itemValue})
            }}
            
            orientation={'vertical'}
            textStyle={{fontSize: 24}}
          />
          <InputWithLabel style={styles.input}
            label={'Amount'}
            value={this.state.amount}
            onChangeText={(amount) => {this.setState({amount})}}
            orientation={'vertical'}
          />
          <InputWithLabel style={styles.input}
            label={'Date'}
            value={this.state.date}
            onChangeText={(date) => {this.setState({date})}}
            orientation={'vertical'}
          />
          <AppButton style={styles.button}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }, 

  container2: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#FF9B9B',
    height: '8%',
    flexDirection: "row",
  },

  title: {
    color: '#fff',
    top: '3%',
    left: '90%',
    fontSize: 25,
    fontWeight: 'bold',
  },

  output: {
    fontSize: 24,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
});