import React,{useEffect} from "react";
import { Text, View, TextInput, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator } from "./StackNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from '@expo/vector-icons';
import AddScreen from "./screen/Add";
import HomeScreen from "./screen/Home";
import UpdateBill from "./screen/Edit";
import SettingsScreen from "./screen/Settings";
import UpdateBills from './screen/Edit';
import ViewAllBills from "./screen/BillScreen";
import LoginScreen  from "./screen/LoginScreen";
import OnBoarding from "./screen/OnBoarding";
import RegisterScreen from "./screen/RegisterScreen";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBR_GBvYlqhx7GbAvcX1QGVPsrdywEJnUU",
  authDomain: "bill-bell.firebaseapp.com",
  databaseURL: "https://bill-bell-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bill-bell",
  storageBucket: "bill-bell.appspot.com",
  messagingSenderId: "429962336892",
  appId: "1:429962336892:web:fe3e6e8f5ac97ef9ca87f9",
  measurementId: "G-QS3PPRQ789"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
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
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                }}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? '#FF9b9b' : 'gray'}></FontAwesome5>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name={'ViewBill'}
          component={MainStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                }}>
                <FontAwesome5
                  name="clipboard-list"
                  size={20}
                  color={focused ? '#FF9b9b' : 'gray'}></FontAwesome5>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name={'Add'}
          component={AddScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: '#FF9b9b',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: Platform.OS == 'android' ? 50 : 30,
                }}>
                <Image
                  source={require('./assets/plus.png')}
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: 'white',
                  }}></Image>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name={'Edit'}
          component={UpdateBill}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                }}>
                <FontAwesome5
                  name="edit"
                  size={20}
                  color={focused ? '#FF9b9b' : 'gray'}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name={'Settings'}
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                }}>
                <FontAwesome5
                  name="cog"
                  size={20}
                  color={focused ? '#FF9b9b' : 'gray'}
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
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={Main}  options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
    
});