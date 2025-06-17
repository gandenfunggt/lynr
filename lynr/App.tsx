import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from './amplifyconfiguration.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import HomeScreen from "./app/HomeScreen";
import ClosetScreen from "./app/ClosetScreen";
import PlaceholderScreen from './app/PlaceholderScreen';
import AddClothesScreen from './app/AddClothesScreen';

Amplify.configure({
  ...awsconfig,
  storage: AsyncStorage,
  API: {
    GraphQL: {
      endpoint: 'https://u7545k2fk5hnle4rtnivauprqu.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-v7rojzajwrh6bo5nekdj6alzni'
    }
  }
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
enableScreens();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Placeholder" component={PlaceholderScreen} />
      <Tab.Screen name="Closet Screen" component={ClosetScreen} />
    </Tab.Navigator>
  );
}

export type RootStackParamList = {
  MainTabs: undefined;
  'Add Clothes': undefined;
};

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="Add Clothes" component={AddClothesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default withAuthenticator(App);
