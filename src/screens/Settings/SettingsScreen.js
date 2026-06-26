import React, {useContext} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {AuthContext} from '../../context/AuthContext';

const SettingsScreen = () => {
  const {logout} = useContext(AuthContext);

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>

      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          showMessage(
            'Account',
            'Manage your account information. This feature will be available soon.',
          )
        }>
        <Text style={styles.text}>👤 Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          showMessage(
            'Privacy',
            'Privacy settings will be available soon.',
          )
        }>
        <Text style={styles.text}>🔒 Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          showMessage(
            'Notifications',
            'Notification settings will be available soon.',
          )
        }>
        <Text style={styles.text}>🔔 Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          showMessage(
            'Help & Support',
            'Contact support at support@socialconnect.com',
          )
        }>
        <Text style={styles.text}>❓ Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          showMessage(
            'About',
            'Social Connect\nVersion 1.0.0\nBuilt with React Native & Firebase.',
          )
        }>
        <Text style={styles.text}>ℹ️ About</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={1}>
        <Text style={styles.versionTitle}>Version</Text>
        <Text style={styles.versionText}>1.0.0</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logout}
        onPress={handleLogout}>
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  versionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 5,
  },

  versionText: {
    fontSize: 14,
    color: '#6B7280',
  },

  logout: {
    backgroundColor: '#EF4444',
    padding: 18,
    borderRadius: 14,
    marginTop: 25,
    marginBottom: 40,
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});