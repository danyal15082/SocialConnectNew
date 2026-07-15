import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import {AuthContext} from '../context/AuthContext';
import useFollow from '../hooks/useFollow';

const UserCard = ({user}) => {
  const {user: currentUser} = useContext(AuthContext) || {};
  const {isFollowing, loading, toggleFollow} = useFollow({
    initialState: false,
    followerId: currentUser?.uid,
    followingId: user?.id,
  });

  return (
    <View style={styles.card}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>
            {user.name}
          </Text>

          <Text style={styles.username}>
            @{user.username}
          </Text>

          {user.bio ? (
            <Text style={styles.bio}>
              {user.bio}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Follow Button */}
      <TouchableOpacity
        style={[
          styles.button,
          isFollowing && styles.followingButton,
        ]}
        onPress={toggleFollow}
        disabled={loading || !currentUser?.uid}>
        <Text
          style={[
            styles.buttonText,
            isFollowing &&
              styles.followingText,
          ]}>
          {loading ? 'Please wait' : isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 15,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  username: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },

  bio: {
    marginTop: 5,
    fontSize: 13,
    color: '#4B5563',
  },

  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 25,
    minWidth: 95,
    alignItems: 'center',
  },

  followingButton: {
    backgroundColor: '#E5E7EB',
  },

  buttonText: {
    color: Colors.white,
    fontWeight: '600',
  },

  followingText: {
    color: '#111827',
  },
});