import React, {useEffect} from 'react';
import {Text, View, TextInput, StyleSheet, Image} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator} from './StackNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import AddScreen from './screen/Add';
import HomeScreen from './screen/Home';
import UpdateBill from './screen/Edit';
import SettingsScreen from './screen/Settings';
import UpdateBills from './screen/Edit';
import ViewAllBills from './screen/BillScreen';
import LoginScreen from './screen/LoginScreen';
import OnBoarding from './screen/OnBoarding';
import RegisterScreen from './screen/RegisterScreen';
import firebase from '@react-native-firebase/app';
import BillDetailScreen from './screen/BillDetailScreen';
import About from './screen/AboutUs';

const firebaseConfig = {
  apiKey: 'AIzaSyBR_GBvYlqhx7GbAvcX1QGVPsrdywEJnUU',
  authDomain: 'bill-bell.firebaseapp.com',
  databaseURL:
    'https://bill-bell-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'bill-bell',
  storageBucket: 'bill-bell.appspot.com',
  messagingSenderId: '429962336892',
  appId: '1:429962336892:web:fe3e6e8f5ac97ef9ca87f9',
  measurementId: 'G-QS3PPRQ789',
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          bottom: Platform.OS == 'android' ? 15 : 20,
          left: 15,
          right: 15,
          borderRadius: 15,
        },
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                position: 'absolute',
                top: 15,
              }}>
              <Image
                source={require('./assets/home.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#FF9b9b' : 'gray',
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'ViewBill'}
        component={MainStackNavigator}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                position: 'absolute',
                top: 15,
              }}>
              <Image
                source={require('./assets/clipboard-list.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#FF9b9b' : 'gray',
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Add'}
        component={AddScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                width: 65,
                height: 65,
                backgroundColor: '#FF9b9b',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS == 'android' ? 30 : 20,
              }}>
              <Image
                source={require('./assets/plus.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: 'white',
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'About'}
        component={About}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                position: 'absolute',
                top: 15,
              }}>
              <Image
                source={require('./assets/qm.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#FF9b9b' : 'gray',
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                position: 'absolute',
                top: 15,
              }}>
              <Image
                source={require('./assets/cog.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#FF9b9b' : 'gray',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
