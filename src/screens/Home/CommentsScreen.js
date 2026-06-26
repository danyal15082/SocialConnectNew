import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const CommentsScreen = () => {
  const [comment, setComment] = useState('');

  const [comments, setComments] = useState([
    {
      id: '1',
      user: 'Ali',
      comment: 'Amazing project!',
    },
    {
      id: '2',
      user: 'Ahmed',
      comment: 'Looks great 🔥',
    },
    {
      id: '3',
      user: 'Wahid',
      comment: 'Keep it up!',
    },
  ]);

  const sendComment = () => {
    if (!comment.trim()) {
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      user: 'You',
      comment: comment.trim(),
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  const renderItem = ({item}) => (
    <View style={styles.commentCard}>
      <Text style={styles.user}>
        {item.user}
      </Text>

      <Text style={styles.comment}>
        {item.comment}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>

      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write a comment..."
          placeholderTextColor="#999"
          style={styles.input}
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendComment}>
          <Text style={styles.sendText}>
            Send
          </Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  commentCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },

  user: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
    color: '#111827',
  },

  comment: {
    color: '#444',
    fontSize: 15,
    lineHeight: 22,
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },

  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
  },

  sendBtn: {
    backgroundColor: '#2563EB',
    marginLeft: 10,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  sendText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});