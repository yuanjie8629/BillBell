import React, {Component} from 'react';
import {Alert, TouchableHighlight, SafeAreaView, Text, View, StyleSheet, Platform, StatusBar, TouchableOpacity} from 'react-native';
import { AntDesign, Ionicons, SimpleLineIcons, MaterialIcons, Entypo} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DatabaseConnection } from '../database/Connection';

const db = DatabaseConnection.getConnection();
type Props = {};
export default class BillDetailScreen extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      billId: props.route.params.id,
      bill: "",
    };

    this._query = this._query.bind(this);
  }
  
   componentDidMount() {
    this._query();
  }

  _query() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Bill WHERE ID = ?', [this.state.billId], (tx, results) => {
        if(results.rows.length) {
          this.setState({
            bill: results.rows.item(0),
          })
        }
      })
    });
  }

  _delete() {
    Alert.alert('Confirm Deletion', 'Delete `'+ this.state.bill.Title +'`?', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM Bill WHERE ID = ?', [this.state.billId])
          });
          this.props.navigation.goBack();
        },
      },
    ], { cancelable: false });
  }

    render () {
      let bill = this.state.bill;

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
              <View>
                <AntDesign style={styles.backIcon} name="left" size={30} color="#fff" />
              </View>
            </TouchableHighlight>
            <Text style={styles.title}>Bill Details</Text>
          </View>
          <View style={styles.categorySection}>
              <LinearGradient colors={['#5f2c82', '#49a09d']} style={styles.categoryIcon}>
                  <SimpleLineIcons name="graduation" size={50} color="#fff" />
              </LinearGradient>
              <View style={styles.categoryContainer}>
                  <Text style={styles.category}>
                      {bill.Category}
                  </Text>
                  <Text style={styles.categoryDetail}>
                      {bill.Title}
                  </Text>
              </View>
          </View>
          <View style={styles.billTimeSection}>
              <AntDesign style={styles.clockIcon} name="clockcircleo" size={50} color="gray" />
              <View style={styles.billContainer}>
                  <Text style={styles.bill}>
                      RM{bill.Amount}
                  </Text>
                  <Text style={styles.dueDate}>
                      By 20 July 2021
                  </Text>
              </View>
             <View style={{flex:1, alignItems: 'flex-end', justifyContent: 'center',}}>
                  <View style={styles.payIn}>
                      <Text style={{fontSize:18, alignSelf:'center', color: 'gray'}}>
                          7
                      </Text>
                      <Text style={{fontSize:18, alignSelf:'center', color: 'gray'}}>
                          days to pay
                      </Text>
                  </View>
              </View>
          </View>
          <View style={styles.actionSection}>
             <TouchableOpacity 
              style={{flex:1 ,  borderColor:'lightgray', borderWidth:0.2, padding: 15, justifyContent: 'center', alignItems: 'center',}}
              onPress={ () => {
                this.props.navigation.navigate('Edit', {
                  id: bill.ID,
                  headerTitle: bill.Title,
                })
              }}
            >
                    <Entypo name="edit" size={60} color="#FF9B9B" />
                    <Text style={{fontSize:18, color: 'gray',}}>
                        Edit
                    </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{flex: 1,  borderColor:'lightgray', borderWidth:0.2, padding: 15, justifyContent: 'center', alignItems: 'center',}}
                onPress={() => this._delete()}
              >
                    <MaterialIcons name="delete" size={60} color="#FF9B9B" />
                    <Text style={{fontSize:18, color: 'gray',}}>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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

  backIcon: {
    top: '3.5%',
    left: '30%',
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
  },

  categoryDetail: {
    opacity: 0.5,
    fontSize: 20,
    top: '10%',
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
    top: '5%',
    left: '20%',
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
