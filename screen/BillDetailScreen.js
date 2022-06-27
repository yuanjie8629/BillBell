import React, {Component} from 'react';
import {
  Alert,
  TouchableHighlight,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';

type Props = {};
export default class BillDetailScreen extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      billId: props.route.params.id,
      bill: '',
    };

    this._query = this._query.bind(this);

    this.db = SQLite.openDatabase({
      name: 'billsdb',
      createFromLocation: '~db.sqlite',
    });
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
              bill: results.rows.item(0),
            });
          }
        },
      );
    });
  }

  _delete() {
    Alert.alert(
      'Confirm Deletion',
      'Delete `' + this.state.bill.Title + '`?',
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: () => {
            this.db.transaction(tx => {
              tx.executeSql('DELETE FROM Bill WHERE ID = ?', [
                this.state.billId,
              ]);
            });
            this.props.navigation.navigate('Bill');
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    let bill = this.state.bill;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/left-arrow.png')}
                style={styles.backIcon}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Bill Details</Text>
        </View>
        <View style={styles.categorySection}>
          <LinearGradient
            colors={['#5f2c82', '#49a09d']}
            style={styles.categoryIcon}>
            <Image
              source={require('../assets/dollar.png')}
              style={{width: 35, height: 35, tintColor: 'white'}}
            />
          </LinearGradient>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{bill.Category}</Text>
            <Text style={styles.categoryDetail}>{bill.Title}</Text>
          </View>
        </View>
        <View style={styles.billTimeSection}>
          <Image
            source={require('../assets/clock.png')}
            style={styles.clockIcon}
            color="gray"
          />
          <View style={styles.billContainer}>
            <Text style={styles.bill}>RM{Number(bill.Amount).toFixed(2)}</Text>
            <Text style={styles.dueDate}>By {bill.Date}</Text>
          </View>
        </View>
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderColor: 'lightgray',
              borderWidth: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('Edit', {
                id: bill.ID,
                headerTitle: bill.Title,
              });
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/edit.png')}
                style={{
                  width: 50,
                  height: 50,
                  tintColor: '#FF9b9b',
                  marginBottom: 15,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                color: 'gray',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 5,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, borderColor: 'lightgray', borderWidth: 0.2}}
            onPress={() => this._delete()}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/delete.png')}
                style={{
                  width: 50,
                  height: 50,
                  tintColor: '#FF9b9b',
                  marginBottom: 15,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                color: 'gray',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 5,
              }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  backIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    width: 28,
    height: 28,
    tintColor: 'white',
  },

  categorySection: {
    borderBottomColor: 'gray',
    height: '16%',
    borderBottomWidth: 0.4,
    flexDirection: 'row',
  },

  categoryIcon: {
    top: '5%',
    left: '16%',
    height: '60%',
    width: '18%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryContainer: {
    top: '5%',
    left: '30%',
  },

  category: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  categoryDetail: {
    opacity: 0.5,
    fontSize: 20,
    top: '10%',
    textTransform: 'capitalize',
  },

  billTimeSection: {
    borderBottomColor: 'gray',
    height: '13%',
    borderBottomWidth: 0.4,
    flexDirection: 'row',
  },

  billContainer: {
    top: '3%',
    left: '40%',
  },

  clockIcon: {
    alignSelf: 'center',
    left: '20%',
    width: 45,
    height: 45,
    tintColor: 'grey',
  },

  bill: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  dueDate: {
    opacity: 0.5,
    fontSize: 18,
    top: '10%',
  },

  payIn: {
    borderLeftWidth: 0.4,
    borderColor: 'gray',
    width: '65%',
    justifyContent: 'center',
  },

  actionSection: {
    borderWidth: 0.4,
    borderColor: 'gray',
    top: '40%',
    height: 130,
    flexDirection: 'row',
  },
});
