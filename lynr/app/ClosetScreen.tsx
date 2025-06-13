import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';

const tops = [
  { id: 1, uri: 'https://via.placeholder.com/200x200?text=Top+1' },
  { id: 2, uri: 'https://via.placeholder.com/200x200?text=Top+2' },
];
const bottoms = [
  { id: 1, uri: 'https://via.placeholder.com/200x200?text=Bottom+1' },
  { id: 2, uri: 'https://via.placeholder.com/200x200?text=Bottom+2' },
];

export default function ClosetScreen() {
  const navigation = useNavigation();
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  const handleSwipe = (type: 'top' | 'bottom', direction: 'left' | 'right') => {
    if (type === 'top') {
      setTopIndex((prev) =>
        direction === 'right'
          ? (prev + 1) % tops.length
          : (prev - 1 + tops.length) % tops.length
      );
    } else {
      setBottomIndex((prev) =>
        direction === 'right'
          ? (prev + 1) % bottoms.length
          : (prev - 1 + bottoms.length) % bottoms.length
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Closet</Text>
      <View style={styles.outfitContainer}>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            if (nativeEvent.translationX > 50) handleSwipe('top', 'left');
            if (nativeEvent.translationX < -50) handleSwipe('top', 'right');
          }}
        >
          <View style={styles.clothingBox}>
            <Image source={{ uri: tops[topIndex].uri }} style={styles.image} />
          </View>
        </PanGestureHandler>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            if (nativeEvent.translationX > 50) handleSwipe('bottom', 'left');
            if (nativeEvent.translationX < -50) handleSwipe('bottom', 'right');
          }}
        >
          <View style={styles.clothingBox}>
            <Image source={{ uri: bottoms[bottomIndex].uri }} style={styles.image} />
          </View>
        </PanGestureHandler>
      </View>
      <TouchableOpacity
        style={styles.fab}
        //onPress={() => navigation.navigate('Add Clothes')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 10,
    alignSelf: 'center',
  },
  outfitContainer: {
    //flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  clothingBox: {
    width: 220,
    height: 290,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});