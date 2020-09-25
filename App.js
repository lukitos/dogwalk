import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import ThemeContext from './src/utils/ThemeContext';

// Screens
import OwnerTabScreen from './src/screens/OwnerTabScreen';
import WalkerTabScreen from './src/screens/WalkerTabScreen';

const App: () => React$Node = () => {
  const [username, updateUsername] = useState('');

  useEffect(() => {
      checkUser(); 
  });

  async function checkUser() {
      const user = await Auth.currentAuthenticatedUser();
      // console.log('App user attributes: ', user.attributes);
      // console.log('App user name: ', user.username);
      updateUsername(user.username);
  }

  if (username.includes('owner')) {
    return <OwnerTabScreen />
  } else {
    return <WalkerTabScreen />
  }
};

export default withAuthenticator(App);
