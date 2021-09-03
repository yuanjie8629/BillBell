import * as React from 'react';
import { Component } from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons';
import firebase from 'firebase';
const { width, height } = Dimensions.get('screen');

const setLogin = async () => {
  try {
    await AsyncStorage.setItem('@', 'true');
    console.log('Logged in');
  } catch (err) {
    console.log('Error @setItem: ', err);
  }
};

const clearLogin = async () => {
  try {
    await AsyncStorage.removeItem('@loggedIn');
    console.log('Logged out');
  } catch (err) {
    console.log('Error @clearLogin: ', err);
  }
};

const clearOnboarding = async () => {
  try {
    await AsyncStorage.removeItem('@viewedOnboarding');
    console.log('Reset onboarding');
  } catch (err) {
    console.log('Error @clearOnboarding: ', err);
  }
};

export default function(props) {
  const navigation = useNavigation();
  return <Login {...props} navigation={navigation} />;
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password:''
    }

    this.onLogin = this.onLogin.bind(this)
  }

  onLogin() {
    if (this.state.email == '' || this.state.password == ''){
      alert("Please enter both email and password.",)
    }
    else {
      firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then((result) => {
         alert("Successfully Login.",
        [
          {text: 'ok', onPress: this.props.navigation.push('Main')}
        ]);
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          alert("Invalid username or Password");
        }
        else {
          alert(error)
        }
      })
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
        <View style={{ width: width, justifyContent: 'center' }}>
          <Text
            style={{ fontWeight: 'bold', fontSize: 25, alignSelf: 'center' }}>
            Let's sign you in
          </Text>
          <Text style={{ fontSize: 15, alignSelf: 'center' }}>
            Welcome to Bill Bell
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.7,
            height: 40,
            marginHorizontal: 55,
            marginTop: 50,
            borderRadius: 23,
            paddingHorizontal: 10,
            backgroundColor: 'lightgrey',
            paddingVertical: 2,
          }}>
          <Image
            source={require('../assets/mail.png')}
            style={{ width: 20, height: 20 }}
          />
          <TextInput
            placeholder="Email"
            onChangeText = {(email) => this.setState({email})}
            value={this.state.email}
            style={{ paddingHorizontal: 10, width: width / 2 }}
          />
        </View>

        <View
          style={{
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
          }}>
          <Image
            source={require('../assets/padlock.png')}
            style={{ width: 20, height: 20 }}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            onChangeText = {(password) => this.setState({password})}
            value={this.state.password}
            style={{ paddingHorizontal: 10, width: width / 2 }}
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#e6e6e6' : '#ffb7c5' },
              styles.bbutton,
            ]}  onPress={this.onLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Or</Text>
        </View>

        <View>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#e06258' : 'grey' },
              styles.bbutton,
            ]} onPress={() => this.props.navigation.push("Main")}>
            <Text style={styles.buttonTextThirdParty}>Continue with Guest</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 40, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold'}}>New user?<Text style={styles.registerLink} onPress={() => this.props.navigation.push('Register')}>Register Now</Text></Text>
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
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#333333'
  },
  buttonTextThirdParty: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff'
  },
  registerLink: {
    fontWeight: 'bold', 
    textDecorationLine: 'underline',
    color: 'grey'
  }
});

