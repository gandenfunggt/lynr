import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

// Only subscribe to user updates to optimize re-renders
const userSelector = (context: any) => [context.user];

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);

  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user.username}! Click here to sign out!
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    padding: 16,
    fontSize: 18,
  },
});

export default SignOutButton;
