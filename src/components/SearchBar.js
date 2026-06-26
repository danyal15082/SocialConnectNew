import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const SearchBar = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search users..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },

  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 18,
    height: 50,
    fontSize: 16,
  },
});