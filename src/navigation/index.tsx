import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Book} from '../types';
import {HomePage, SearchPage} from '../screen';

type NavigationStackType = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Detail: {book: Book};
};

const Stack = createStackNavigator<NavigationStackType>();

function NavigationStack() {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="Cart" component={HomePage} />
      <Stack.Screen name="Detail" component={HomePage} />
    </Stack.Navigator>
  );
}

export const Navigator = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};

export default Navigator;
