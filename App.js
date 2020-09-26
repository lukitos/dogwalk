import 'react-native-gesture-handler';
import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import ThemeContext from './src/utils/ThemeContext';
import { DogwalkContextProvider } from './src/context/DogwalkContext';

// Screens
import OwnerTabScreen from './src/screens/OwnerTabScreen';
import WalkerTabScreen from './src/screens/WalkerTabScreen';

const App: () => React$Node = () => {
  const [username, updateUsername] = useState('');

  useEffect(() => {
      checkUser(); 
  }, []);

  async function checkUser() {
      user = await Auth.currentAuthenticatedUser();
      // console.log('App user attributes: ', user.attributes);
      // console.log('App user name: ', user.username);
      updateUsername(user.username);
  }

  if (username.includes('owner')) {
    return (
      <DogwalkContextProvider>
        <OwnerTabScreen user={username} />
      </DogwalkContextProvider>
    );
  } else {
    return (
      <DogwalkContextProvider>
        <WalkerTabScreen />
      </DogwalkContextProvider>
    );
  }
};

export default withAuthenticator(App);
