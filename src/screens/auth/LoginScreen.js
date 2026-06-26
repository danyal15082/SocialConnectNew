import React, {useContext} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import {AuthContext} from '../../context/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const handleLogin = async values => {
    try {
      await login(values.email.trim(), values.password);

      // No navigation here.
      // AppNavigator will automatically switch
      // to AppStack after Firebase login succeeds.
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
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
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {touched.email && errors.email ? (
              <Text style={styles.error}>
                {errors.email}
              </Text>
            ) : null}

            <CustomInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
            />

            {touched.password && errors.password ? (
              <Text style={styles.error}>
                {errors.password}
              </Text>
            ) : null}

            <CustomButton
              title="Login"
              onPress={handleSubmit}
            />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ForgotPassword')
              }>
              <Text style={styles.link}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Signup')
              }>
              <Text style={styles.link}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F4F6F8',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  error: {
    color: '#EF4444',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13,
  },

  link: {
    textAlign: 'center',
    color: '#2563EB',
    marginTop: 15,
    fontWeight: '600',
  },
});