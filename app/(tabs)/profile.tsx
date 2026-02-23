import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { getUser, updateUser, updateUserImage } from '../../services/userService';
import { User } from '../../types/user';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useFocusEffect(
    useCallback(() => {
      const currentUser = getUser();
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.name);
      }
    }, [])
  );

  const handleSave = () => {
    if (name.trim()) {
      const success = updateUser(name.trim());
      if (success) {
        setUser(prev => prev ? { ...prev, name: name.trim() } : prev);
        Alert.alert('Berhasil', 'Profil berhasil diperbarui!');
      } else {
        Alert.alert('Error', 'Gagal memperbarui profil.');
      }
    }
  };

  const handlePickImage = () => {
    Alert.alert('Foto Profil', 'Pilih sumber foto', [
      {
        text: 'Kamera',
        onPress: pickFromCamera,
      },
      {
        text: 'Galeri',
        onPress: pickFromGallery,
      },
      { text: 'Batal', style: 'cancel' },
    ]);
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin Diperlukan', 'Izin galeri diperlukan untuk memilih foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0].uri) {
      saveImage(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin Diperlukan', 'Izin kamera diperlukan untuk mengambil foto.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0].uri) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = (uri: string) => {
    const success = updateUserImage(uri);
    if (success) {
      setUser(prev => prev ? { ...prev, image: uri } : prev);
    } else {
      Alert.alert('Error', 'Gagal menyimpan foto profil.');
    }
  };

  const getInitials = (n: string) =>
    n
      .split(' ')
      .map(w => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Profil</Text>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={handlePickImage} style={styles.avatarWrapper}>
          {user?.image ? (
            <Image source={{ uri: user.image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>
                {user?.name ? getInitials(user.name) : '?'}
              </Text>
            </View>
          )}
          <View style={styles.editBadge}>
            <IconButton icon="pencil" size={20} />
          </View>
        </TouchableOpacity>
        <Text style={styles.avatarHint}>Tap untuk ganti foto</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          label="Nama"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Simpan Perubahan
        </Button>
      </View>
    </View>
  );
}

const AVATAR_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: '#0aafff',
  },
  avatarPlaceholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#0aafff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#0aafff',
  },
  avatarInitials: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  editBadgeText: {
    fontSize: 14,
  },
  avatarHint: {
    marginTop: 8,
    color: '#aaa',
    fontSize: 12,
  },
  content: {
    marginTop: 10,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#0aafff',
  },
});
