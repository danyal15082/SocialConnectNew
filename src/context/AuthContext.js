import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

import auth from '@react-native-firebase/auth';

import {
  login as firebaseLogin,
  signup as firebaseSignup,
  logout as firebaseLogout,
  forgotPassword as firebaseForgotPassword,
} from '../services/authService';

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe =
      auth().onAuthStateChanged(currentUser => {
        setUser(currentUser);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  const login = (email, password) =>
    firebaseLogin(email, password);

  const signup = (name, email, password) =>
    firebaseSignup(name, email, password);

  const logout = () =>
    firebaseLogout();

  const forgotPassword = email =>
    firebaseForgotPassword(email);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        forgotPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;