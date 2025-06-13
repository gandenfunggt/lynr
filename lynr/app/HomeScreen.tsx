import React from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export default function HomeScreen() {
  const { user } = useAuthenticator();

  return (
    <ImageBackground
      source={require('../assets/homescreen_background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.welcome}>
        Welcome To Your Closet
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 8,
  },
});