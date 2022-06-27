import * as React from 'react';
import {Component} from 'react';
import {
  Button,
  View,
  StatusBar,
  Platform,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const {width, height} = Dimensions.get('screen');

export default function (props) {
  const navigation = useNavigation();
  return <Register {...props} navigation={navigation} />;
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    };
    this.onRegister = this.onRegister.bind(this);
  }

  onRegister() {
    if (
      this.state.username == '' ||
      this.state.email == '' ||
      this.state.password == '' ||
      this.state.confirmPassword == ''
    ) {
      alert('Please fill up all information');
    } else if (this.state.confirmPassword != this.state.password) {
      alert('Please make sure your passwords match.');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(result => {
          firebase
            .app()
            .database(
              'https://bill-bell-default-rtdb.asia-southeast1.firebasedatabase.app/',
            )
            .ref('users/' + this.state.username)
            .set({
              email: this.state.email,
              password: this.state.password,
            });
          alert('Successfully Register.', '', [
            {text: 'ok', onPress: this.props.navigation.push('Login')},
          ]);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('Email alreeady exists. Please try another email.');
          } else if (error.code === 'auth/weak-password') {
            alert('Password should be at least 6 characters.');
          } else if (error.code === 'auth/invalid-email') {
            alert('Please enter valid email.');
          } else {
            alert(error);
          }
        });
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            width: width,
            height: height / 4,
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/payment.png')}
            style={{
              width: width * 0.4,
              height: width * 0.4,
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{width: width, justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 25, alignSelf: 'center'}}>
            Let's get started!
          </Text>
          <Text
            style={{
              fontSize: 15,
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}>
            Please enter your details
          </Text>
        </View>
        <View style={styles.inputField}>
          <Image
            source={require('../assets/user.png')}
            style={{width: 20, height: 20}}
          />
          <TextInput
            placeholder="Username"
            onChangeText={username => this.setState({username})}
            value={this.state.username}
            style={{paddingHorizontal: 10, width: width / 2}}
          />
        </View>
        <View style={styles.inputField}>
          <Image
            source={require('../assets/mail.png')}
            style={{width: 20, height: 20}}
          />
          <TextInput
            placeholder="Email"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            style={{paddingHorizontal: 10, width: width / 2}}
          />
        </View>

        <View style={styles.inputField}>
          <Image
            source={require('../assets/padlock.png')}
            style={{width: 20, height: 20}}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            style={{paddingHorizontal: 10, width: width / 2}}
          />
        </View>
        <View style={styles.inputField}>
          <Image
            source={require('../assets/padlock.png')}
            style={{width: 20, height: 20}}
          />
          <TextInput
            secureTextEntry
            placeholder="Confirm password"
            onChangeText={confirmPassword => this.setState({confirmPassword})}
            value={this.state.confirmPassword}
            style={{paddingHorizontal: 10, width: width / 2}}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: 40}}>
          <Pressable
            style={({pressed}) => [
              {backgroundColor: pressed ? '#e6e6e6' : '#ffb7c5'},
              styles.bbutton,
            ]}
            onPress={this.onRegister}>
            <Text style={styles.buttonText}>Register Now</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Padding to prevent content overlap with status bar
    alignItems: 'center',
  },
  bbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    width: width * 0.7,
    height: 45,
    flexDirection: 'row',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.7,
    height: 40,
    marginHorizontal: 55,
    marginTop: 15,
    borderRadius: 23,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    paddingVertical: 2,
  },
});
