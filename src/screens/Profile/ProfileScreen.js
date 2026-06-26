import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {AuthContext} from '../../context/AuthContext';
import {PostsContext} from '../../context/PostsContext';

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext) || {};
  const {posts = []} = useContext(PostsContext) || {};

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
              if (logout) {
                await logout();
              }
            } catch (error) {
              Alert.alert(
                'Logout Failed',
                error.message,
              );
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>

        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>
            {(user?.displayName || user?.email || 'S')
              .charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>
          {user?.displayName || 'Social Connect User'}
        </Text>

        <Text style={styles.bio}>
          {user?.email || 'React Native Developer'}
        </Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditProfile')
          }>
          <Text style={styles.editButtonText}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>
            Logout
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {posts.length}
          </Text>
          <Text style={styles.statLabel}>
            Posts
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            530
          </Text>
          <Text style={styles.statLabel}>
            Followers
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            410
          </Text>
          <Text style={styles.statLabel}>
            Following
          </Text>
        </View>

      </View>

      <Text style={styles.sectionTitle}>
        Recent Posts
      </Text>

      {posts.length === 0 ? (
        <View style={styles.postCard}>
          <Text style={styles.postText}>
            No posts yet.
          </Text>
        </View>
      ) : (
        posts.slice(0, 5).map(post => (
          <View
            key={post.id || Math.random().toString()}
            style={styles.postCard}>
            <Text style={styles.postText}>
              {post.content || 'No content available'}
            </Text>
          </View>
        ))
      )}

    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#A020F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },

  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 18,
    color: '#111827',
  },

  bio: {
    color: '#6B7280',
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
  },

  editButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    marginTop: 10,
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#6B7280',
    fontSize: 16,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 15,
    color: '#111827',
  },

  postCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },

  postText: {
    fontSize: 16,
    color: '#374151',
  },
});