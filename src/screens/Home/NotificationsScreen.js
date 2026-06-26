import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

const notifications = [
  {
    id: '1',
    message: '❤️ Ali liked your post',
  },
  {
    id: '2',
    message: '💬 Ahmed commented on your post',
  },
  {
    id: '3',
    message: '👤 Wahid started following you',
  },
  {
    id: '4',
    message: '🔥 Your post is trending',
  },
];

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.message}>
              {item.message}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingTop: 15,
  },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 12,
    padding: 18,
  },

  message: {
    fontSize: 15,
  },
});