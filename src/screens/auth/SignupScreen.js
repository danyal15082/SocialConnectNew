import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import {AuthContext} from '../../context/AuthContext';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignupScreen = ({navigation}) => {
  const {signup} = useContext(AuthContext);

  const handleSignup = async values => {
    try {
      await signup(
        values.name.trim(),
        values.email.trim(),
        values.password,
      );

      Alert.alert(
        'Success',
        'Account created successfully!',
      );

      // AppNavigator will automatically switch to AppStack
      // because Firebase user is now logged in.
    } catch (error) {
      Alert.alert(
        'Signup Failed',
        error.message,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <CustomInput
              placeholder="Full Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />

            {touched.name && errors.name && (
              <Text style={styles.error}>
                {errors.name}
              </Text>
            )}

            <CustomInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />

            {touched.email && errors.email && (
              <Text style={styles.error}>
                {errors.email}
              </Text>
            )}

            <CustomInput
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />

            {touched.password && errors.password && (
              <Text style={styles.error}>
                {errors.password}
              </Text>
            )}

            <CustomInput
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />

            {touched.confirmPassword &&
              errors.confirmPassword && (
                <Text style={styles.error}>
                  {errors.confirmPassword}
                </Text>
              )}

            <CustomButton
              title="Sign Up"
              onPress={handleSubmit}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F4F6F8',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },

  error: {
    color: '#EF4444',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },

  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#2563EB',
    fontWeight: '600',
  },
});