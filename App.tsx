import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import {AuthProvider} from './src/context/AuthContext';
import {PostsProvider} from './src/context/PostsContext';

export default function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <AppNavigator />
      </PostsProvider>
    </AuthProvider>
  );
}