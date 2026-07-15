import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import CreatePostScreen from '../screens/Home/CreatePostScreen';
import CommentsScreen from '../screens/Home/CommentsScreen';
import NotificationsScreen from '../screens/Home/NotificationsScreen';
import MessagesScreen from '../screens/Home/MessagesScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />

      
<Stack.Screen
  name="CreatePost"
  component={CreatePostScreen}
/>

<Stack.Screen
  name="Comments"
  component={CommentsScreen}
/>


<Stack.Screen
  name="Notifications"
  component={NotificationsScreen}
/>

<Stack.Screen
  name="Messages"
  component={MessagesScreen}
  options={{title: 'Messages'}}
/>
    </Stack.Navigator>
  );
};

export default AppStack;