import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'; // make sure this path is correct
import AsyncStorage from '@react-native-async-storage/async-storage';

import { withAuthenticator } from '@aws-amplify/ui-react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';

import SignOutButton from './app/SignOutButton';
import HomeScreen from "./app/HomeScreen";
import ClosetScreen from "./app/ClosetScreen";
import PlaceholderScreen from './app/PlaceholderScreen';

Amplify.configure({
  ...awsconfig,
  storage: AsyncStorage,
});

const Tab = createBottomTabNavigator();
enableScreens();


function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Placeholder" component={PlaceholderScreen} />
          <Tab.Screen name="Add Clothes" component={ClosetScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default withAuthenticator(App);
