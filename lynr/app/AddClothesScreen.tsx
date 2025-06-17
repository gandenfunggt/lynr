import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadData } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/api';
import { createClothingItem } from '../src/graphql/mutations';
import { Ionicons } from '@expo/vector-icons';

import type { StackNavigationProp } from '@react-navigation/stack';

type AddClothesScreenProps = {
  navigation: StackNavigationProp<any>;
};

const client = generateClient();

export default function AddClothesScreen({ navigation }: AddClothesScreenProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('top'); // or 'bottom'
  const [size, setSize] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Photo library permission is required to select an image.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } catch (err) {
      const errorMessage =
        err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string'
          ? (err as any).message
          : JSON.stringify(err);
      Alert.alert('Image picker error', errorMessage);
      console.log('Image picker error:', err);
    }
  };

  const handleSubmit = async () => {
    if (!name || !type || !size || !image) {
      Alert.alert('Please fill all fields and select a photo.');
      return;
    }
    setUploading(true);
    try {
      // Prepare file for upload
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = `${Date.now()}_${name.replace(/\s/g, '_')}.jpg`;

      console.log('Uploading image:', filename, blob);

      // Upload image to S3 using uploadData
      const { result } = await uploadData({
        path: `public/${filename}`,
        data: blob,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${
                  Math.round((transferredBytes / totalBytes) * 100)
                } %`
              );
            }
          }
        }
      });

      //console.log('Path from Response: ', result.path);

      // Save metadata to API using the new client
      console.log('Saving to API:', { name, type, size, imageKey: filename });

      await client.graphql({
        query: createClothingItem,
        variables: {
          input: {
            name,
            type,
            size,
            imageKey: filename,
          }
        }
      }).then(res => console.log('API result:', res));

      Alert.alert('Success', 'Clothing item added!');
      setName('');
      setType('top');
      setSize('');
      setImage(null);
      navigation.goBack();
    } catch (err) {
      let errorMessage = 'An error occurred';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
        errorMessage = (err as any).message;
      } else {
        errorMessage = JSON.stringify(err);
      }
      Alert.alert('Error', errorMessage);
    }
    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
      <Ionicons name="arrow-back" size={28} color="#222" />
      </TouchableOpacity>
      <Text style={styles.header}>Add Clothing Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'top' && styles.typeSelected]}
          onPress={() => setType('top')}
        >
          <Text style={[styles.typeText, type === 'top' && { color: '#fff' }]}>Top</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'bottom' && styles.typeSelected]}
          onPress={() => setType('bottom')}
        >
          <Text style={[styles.typeText, type === 'bottom' && { color: '#fff' }]}>Bottom</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Size"
        value={size}
        onChangeText={setSize}
      />
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Take Photo</Text>
        )}
      </TouchableOpacity>
      {uploading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, alignSelf: 'center', marginTop: 60 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16,
  },
  typeRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  typeButton: {
    padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginHorizontal: 8,
    backgroundColor: '#f0f0f0',
  },
  typeSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  typeText: { color: '#222', fontWeight: 'bold' },
  imagePicker: {
    width: 160, height: 160, borderRadius: 12, backgroundColor: '#f0f0f0',
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 24,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  imageText: { color: '#888' },
    backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
});