import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {AuthContext} from '../../context/AuthContext';
import {sendMessage, subscribeToConversation} from '../../services/messageService';

const MessagesScreen = ({route, navigation}) => {
  const {user} = useContext(AuthContext) || {};
  const {userName = 'Friend', userId} = route?.params || {};
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToConversation({
      senderId: user?.uid,
      receiverId: userId,
      onUpdate: setMessages,
    });

    return () => unsubscribe();
  }, [user?.uid, userId]);

  const handleSend = async () => {
    if (!input.trim()) {
      return;
    }

    setLoading(true);
    try {
      await sendMessage({
        senderId: user?.uid,
        receiverId: userId,
        text: input,
      });
      setInput('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userName}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => {
          const isMine = item.senderId === user?.uid;
          return (
            <View style={[styles.bubble, isMine ? styles.mine : styles.theirs]}>
              <Text style={styles.bubbleText}>{item.text}</Text>
            </View>
          );
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}>
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message"
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
            <Text style={styles.sendText}>{loading ? '...' : 'Send'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F6FA'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  back: {fontSize: 24, marginRight: 12},
  headerTitle: {fontSize: 18, fontWeight: '700', color: '#111827'},
  list: {padding: 16, flexGrow: 1},
  bubble: {maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 10},
  mine: {alignSelf: 'flex-end', backgroundColor: '#2563EB'},
  theirs: {alignSelf: 'flex-start', backgroundColor: '#FFFFFF'},
  bubbleText: {color: '#111827'},
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    backgroundColor: '#F9FAFB',
  },
  sendButton: {backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20},
  sendText: {color: '#FFFFFF', fontWeight: '700'},
});
