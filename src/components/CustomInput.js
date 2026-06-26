import React from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  multiline,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      style={[
        styles.input,
        multiline && styles.multiline,
      ]}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },

  multiline: {
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
});