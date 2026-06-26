import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Colors from '../../constants/Colors';
import AppStrings from '../../constants/AppStrings';

import PostCard from '../../components/PostCard';
import {PostsContext} from '../../context/PostsContext';

const HomeScreen = ({navigation}) => {

  const {posts} = useContext(PostsContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <PostCard
            item={item}
            navigation={navigation}
          />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <Text style={styles.heading}>
                {AppStrings.appName}
              </Text>

              <TouchableOpacity
                style={styles.notificationBtn}
                onPress={() =>
                  navigation.navigate('Notifications')
                }>
                <Text style={styles.notificationIcon}>
                  🔔
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.createPost}
              onPress={() =>
                navigation.navigate('CreatePost')
              }>
              <Text style={styles.createPostText}>
                {AppStrings.createPost}
              </Text>
            </TouchableOpacity>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },

  notificationBtn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  notificationIcon: {
    fontSize: 22,
  },

  createPost: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  createPostText: {
    color: '#888',
    fontSize: 16,
  },
});