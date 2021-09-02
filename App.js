import React,{useEffect} from "react";
import { Text, View, TextInput, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddScreen from "./screen/Add";
import HomeScreen from "./screen/Home";
import AlertScreen from "./screen/Delete";
import SettingsScreen from "./screen/Edit";
import StatisticScreen from "./screen/Test";




const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                   name={
                     focused
                      ? 'home'
                      : 'home-outline'
                   }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Settings') {
              return (
                <Ionicons
                  name={
                    focused 
                    ? 'ios-settings' 
                    : 'ios-settings-outline'}
                  size={size}
                  color={color}
                />
              );
            }else if (route.name === 'Add') {
              return (
                <Ionicons
                  name={
                    focused 
                    ? 'add-circle-sharp' 
                    : 'add-circle-outline'}
                  size={60}
                  color={color}
                />
              );
            }else if (route.name === 'Statistic') {
              return (
                <Ionicons
                  name={
                    focused 
                    ? 'bar-chart' 
                    : 'bar-chart-outline'}
                  size={size}
                  color={color}
                />
              );
            }else if (route.name === 'Alert') {
              return (
                <Ionicons
                  name={
                    focused 
                    ? 'md-alert-circle' 
                    : 'md-alert-circle-outline'}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          showLabel:false,
          activeTintColor: 'blue',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Statistic" component={StatisticScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Alert" component={AlertScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    
});

