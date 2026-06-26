import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import useLike from '../hooks/useLike';

const PostCard = ({item, navigation}) => {
  const {
    liked,
    likes,
    toggleLike,
  } = useLike(item.likes || 0);

  return (
    <View style={styles.postCard}>
      {/* Header */}
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.user.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.userName}>
            {item.user}
          </Text>

         <Text style={styles.time}>
  🕒 {item.time}
</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.content}>
        {item.content}
      </Text>

      {/* Like Count */}
      <View style={styles.likeContainer}>
        <Text style={styles.likeCount}>
          ❤️ {likes} Likes
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={toggleLike}>
          <Text
            style={[
              styles.actionText,
              liked && styles.likedText,
            ]}>
            {liked ? '❤️ Liked' : '🤍 Like'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('Comments')
          }>
          <Text style={styles.actionText}>
            💬 Comment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  time: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },

  content: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },

  likeContainer: {
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
    paddingTop: 10,
    paddingBottom: 8,
  },

  likeCount: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
    paddingTop: 12,
  },

  actionButton: {
    flex: 1,
    alignItems: 'center',
  },

  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },

  likedText: {
    color: '#E11D48',
  },
});