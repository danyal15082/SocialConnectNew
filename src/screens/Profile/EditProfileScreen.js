import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';

const EditProfileScreen = ({navigation}) => {
  const user = auth().currentUser;

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');

 useEffect(() => {
  if (!user) return;

  setFullName(user.displayName || '');
}, [user]);

  const handleSave = async () => {
    try {
      await user.updateProfile({
        displayName: fullName,
      });

      await auth().currentUser.reload();

      Alert.alert(
        'Success',
        'Profile updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {fullName
              ? fullName.charAt(0).toUpperCase()
              : 'U'}
          </Text>
        </View>

        <TouchableOpacity style={styles.changePhotoBtn}>
          <Text style={styles.changePhotoText}>
            Change Photo
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Full Name</Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        placeholder="Full Name"
      />

      <Text style={styles.label}>Email</Text>

      <TextInput
        value={user?.email || ''}
        editable={false}
        style={styles.input}
      />

      <Text style={styles.label}>Bio</Text>

      <TextInput
        value={bio}
        onChangeText={setBio}
        style={[styles.input, styles.bioInput]}
        multiline
      />

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}>
        <Text style={styles.saveBtnText}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFF',
    fontSize: 42,
    fontWeight: 'bold',
  },

  changePhotoBtn: {
    marginTop: 15,
  },

  changePhotoText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  bioInput: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 15,
  },

  saveBtn: {
    backgroundColor: '#2563EB',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },

  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});