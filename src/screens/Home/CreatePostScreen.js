import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import Colors from '../../constants/Colors';
import {PostsContext} from '../../context/PostsContext';

const MAX_CHARACTERS = 500;

const CreatePostScreen = ({navigation}) => {
  const [post, setPost] = useState('');

  const {addPost} = useContext(PostsContext);

  const handlePost = () => {
    if (post.trim().length === 0) {
      Alert.alert('Error', 'Please write something.');
      return;
    }

    addPost(post.trim());

    setPost('');

    Alert.alert('Success', 'Post created successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        <Text style={styles.heading}>Create Post</Text>

        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>K</Text>
          </View>

          <View>
            <Text style={styles.name}>Kamran Afzal</Text>
            <Text style={styles.subtitle}>
              Share something with your friends
            </Text>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#888"
          multiline
          maxLength={MAX_CHARACTERS}
          value={post}
          onChangeText={setPost}
        />

        <Text style={styles.counter}>
          {post.length} / {MAX_CHARACTERS}
        </Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionText}>📷 Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionText}>🎥 Video</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionText}>😊 Feeling</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionText}>📍 Location</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handlePost}
          disabled={post.trim().length === 0}
          style={[
            styles.postButton,
            post.trim().length === 0 &&
              styles.disabledButton,
          ]}>
          <Text style={styles.postButtonText}>
            Post
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  avatarText: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: 'bold',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },

  subtitle: {
    color: Colors.gray,
    marginTop: 3,
  },

  input: {
    minHeight: 220,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 18,
    fontSize: 17,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  counter: {
    textAlign: 'right',
    marginHorizontal: 25,
    marginTop: 8,
    color: Colors.gray,
  },

  actionsContainer: {
    marginTop: 25,
    marginHorizontal: 20,
  },

  actionCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },

  postButton: {
    backgroundColor: Colors.primary,
    margin: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  disabledButton: {
    backgroundColor: '#BFC7D5',
  },

  postButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
});