import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import SearchBar from '../../components/SearchBar';
import UserCard from '../../components/UserCard';

import Colors from '../../constants/Colors';
import useSearch from '../../hooks/useSearch';

const users = [
  {
  id: '1',
  name: 'Wahid Rehman',
  username: 'wahid',
  bio: 'React Native Developer',
},
{
  id: '2',
  name: 'Kamran Afzal',
  username: 'kamran',
  bio: 'Software Engineer',
},
{
  id: '3',
  name: 'Ali Khan',
  username: 'ali',
  bio: 'Flutter Developer',
},
{
  id: '4',
  name: 'Ahmed',
  username: 'ahmed',
  bio: 'UI/UX Designer',
},
{
  id: '5',
  name: 'Sarah',
  username: 'sarah',
  bio: 'Content Creator',
},
];

const SearchScreen = () => {
  const {
    searchText,
    setSearchText,
    filteredUsers,
  } = useSearch(users);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Search
      </Text>

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.subHeading}>
        {filteredUsers.length} Users Found
      </Text>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <UserCard user={item} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No users found.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    color: Colors.primary,
  },

  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#374151',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#6B7280',
  },
});