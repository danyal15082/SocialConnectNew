import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';

import useLike from '../hooks/useLike';
import {PostsContext} from '../context/PostsContext';
import {AuthContext} from '../context/AuthContext';

const PostCard = ({item, navigation}) => {
  const {deletePost, updatePost} = useContext(PostsContext);
  const {user} = useContext(AuthContext) || {};
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(item.content || '');
  const {
    liked,
    likes,
    toggleLike,
  } = useLike(item.likes || 0);

  const handleDelete = () => {
    Alert.alert('Delete post', 'Remove this post from your feed?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => deletePost(item.id)},
    ]);
  };

  const handleSaveEdit = () => {
    if (!draft.trim()) {
      Alert.alert('Error', 'Post content cannot be empty.');
      return;
    }

    updatePost(item.id, draft.trim());
    setIsEditing(false);
  };

  const isOwner = user?.uid && item.authorId === user.uid;

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
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            multiline
            style={styles.editInput}
          />
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.content}>{item.content}</Text>
      )}

      {item.attachment?.uri ? (
        <View style={styles.attachmentPreviewCard}>
          {item.attachment.type?.startsWith('image') ? (
            <Image
              source={{uri: item.attachment.uri}}
              style={styles.attachmentImage}
            />
          ) : (
            <Text style={styles.attachmentText}>
              Attached: {item.attachment.fileName || 'Media file'}
            </Text>
          )}
        </View>
      ) : null}

      {/* Like Count */}
      <View style={styles.likeContainer}>
        <Text style={styles.likeCount}>
          ❤️ {likes} Likes
        </Text>
      </View>

      {/* Actions */}
      {isOwner ? (
        <View style={styles.ownerActions}>
          <TouchableOpacity style={styles.ownerActionButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.ownerActionText}>✏️ Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ownerActionButton} onPress={handleDelete}>
            <Text style={styles.ownerActionText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      ) : null}

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

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('Messages', {
              userName: item.user,
              userId: item.authorId || item.id,
            })
          }>
          <Text style={styles.actionText}>
            ✉️ Message
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

  editContainer: {
    marginBottom: 12,
  },

  editInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    color: '#111827',
  },

  editActions: {
    flexDirection: 'row',
    marginTop: 8,
  },

  saveButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  cancelButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  cancelButtonText: {
    color: '#111827',
    fontWeight: '600',
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

  attachmentPreviewCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },

  attachmentImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },

  attachmentText: {
    color: '#374151',
    fontSize: 14,
    paddingVertical: 12,
  },

  ownerActions: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
  },

  ownerActionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 999,
    marginRight: 8,
  },

  ownerActionText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
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