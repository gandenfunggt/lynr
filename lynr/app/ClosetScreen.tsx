import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../src/graphql/queries';
import { getProperties, getUrl } from 'aws-amplify/storage';

const client = generateClient();

export default function ClosetScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [tops, setTops] = useState<any[]>([]);
  const [bottoms, setBottoms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClothingItems() {
      try {
        const response = await client.graphql({
          query: queries.listClothingItems
        });
        const items = response.data.listClothingItems.items;

        const topsWithImages: any[] = [];
        const bottomsWithImages: any[] = [];
        await Promise.all(items.map(async (item: any) => {
          try {
            const s3Path = `public/${item.imageKey}`;
            await getProperties({ path: s3Path });
            const { url } = await getUrl({ path: s3Path });
            // Ensure url is a primitive string
            const obj = { id: item.id, uri: url.toString() };
            if (item.type === 'top') topsWithImages.push(obj);
            if (item.type === 'bottom') bottomsWithImages.push(obj);
          } catch {
            // File does not exist, skip this item
          }
        }));

        setTops(topsWithImages);
        setBottoms(bottomsWithImages);
        setLoading(false);
      } catch (err) {
        console.log('Error fetching clothing items:', err);
        setLoading(false);
      }
    }
    fetchClothingItems();
  }, []);

  // Reset indices if arrays change and index is out of bounds
  useEffect(() => {
    if (topIndex >= tops.length) setTopIndex(0);
  }, [tops]);
  useEffect(() => {
    if (bottomIndex >= bottoms.length) setBottomIndex(0);
  }, [bottoms]);

  const handleSwipe = (type: 'top' | 'bottom', direction: 'left' | 'right') => {
    if (type === 'top' && tops.length > 0) {
      setTopIndex((prev) =>
        direction === 'right'
          ? (prev + 1) % tops.length
          : (prev - 1 + tops.length) % tops.length
      );
    } else if (type === 'bottom' && bottoms.length > 0) {
      setBottomIndex((prev) =>
        direction === 'right'
          ? (prev + 1) % bottoms.length
          : (prev - 1 + bottoms.length) % bottoms.length
      );
    }
  };

  // Get the current URIs as primitive strings (they were objects before and wouldn't render)
  const topUri = tops[topIndex]?.uri?.toString();
  const bottomUri = bottoms[bottomIndex]?.uri?.toString();

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
          <View
            style={styles.clothingBox}
            key={topUri || 'empty-top'}
          >
            {loading ? (
              <Text>Loading...</Text>
            ) : tops.length > 0 && topUri ? (
              <Image
                source={{ uri: topUri }}
                style={styles.image}
              />
            ) : (
              <Text>No top image available</Text>
            )}
          </View>
        </PanGestureHandler>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            if (nativeEvent.translationX > 50) handleSwipe('bottom', 'left');
            if (nativeEvent.translationX < -50) handleSwipe('bottom', 'right');
          }}
        >
          <View
            style={styles.clothingBox}
            key={bottomUri || 'empty-bottom'}
          >
            {loading ? (
              <Text>Loading...</Text>
            ) : bottoms.length > 0 && bottomUri ? (
              <Image
                source={{ uri: bottomUri }}
                style={styles.image}
              />
            ) : (
              <Text>No bottom image available</Text>
            )}
          </View>
        </PanGestureHandler>
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add Clothes')}
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
    borderWidth: 2, // for debugging
    borderColor: 'red', // for debugging
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