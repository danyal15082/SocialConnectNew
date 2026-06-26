import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import {AuthContext} from '../../context/AuthContext';

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPasswordScreen = () => {

  const {forgotPassword} = useContext(AuthContext);

  const handleReset = async values => {

    try {

      await forgotPassword(values.email.trim());

      Alert.alert(
        'Success',
        'Password reset email sent successfully.'
      );

    } catch (error) {

      Alert.alert(
        'Error',
        error.message,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Forgot Password
      </Text>

      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotSchema}
        onSubmit={handleReset}>

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
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />

            {touched.email && errors.email &&
              <Text style={styles.error}>
                {errors.email}
              </Text>
            }

            <CustomButton
              title="Send Reset Link"
              onPress={handleSubmit}
            />

          </>
        )}

      </Formik>

    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

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
    marginBottom: 10,
    marginLeft: 5,
  },
});