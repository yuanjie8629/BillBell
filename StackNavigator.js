import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BillScreen from './screen/BillScreen';
import BillDetailScreen from './screen/BillDetailScreen';
import Edit from './screen/Edit';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Bill" component={BillScreen} />
      <Stack.Screen name="BillDetail" component={BillDetailScreen} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator};
