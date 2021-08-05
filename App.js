import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function AddScreen() {
  const [selectedValue, setSelectedValue] = useState("java");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  
  return (
    <View style={styles.container}>
      <View>
      <TextInput
        style={styles.title} 
        placeholder='Tile...'
        />
      </View>
      <View>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Category" value="0" color="#FF0000"/>
        <Picker.Item label="School" value="school" color="black"/>
        <Picker.Item label="Entertainment" value="entertainment"/>
      </Picker>
    </View>
    <View>
      <Text>MYR</Text>
      <TextInput
        style={styles.amount} 
        keyboardType='numeric'
        placeholder='Amount'
        />
    </View>
    <View>
      <Text>Calender</Text>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
    </View>
    
  );
}

function StatisticScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Statistic!</Text>
    </View>
  );
}

function AlertScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Alert!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

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
  title: {
    width: 200,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
  },

  amount: {
    width: 200,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
  },

  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
});

