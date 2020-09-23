import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withAuthenticator } from 'aws-amplify-react-native'

// Screens
import OwnerHomeScreen from './src/screens/OwnerHomeScreen';
import WalkerHomeScreen from './src/screens/WalkerHomeScreen';
import JobListScreen from './src/screens/JobListScreen';
import JobDetailScreen from './src/screens/JobDetailScreen';
import JobCreate from './src/screens/JobCreate';
import DogListScreen from './src/screens/DogListScreen';
import DogDetailScreen from './src/screens/DogDetailScreen';
import DogCreateScreen from './src/screens/DogCreateScreen';
import DogSuccessScreen from './src/screens/DogSuccessScreen';

const Tab = createBottomTabNavigator();

const OwnerStack = createStackNavigator();
const HomeOwnerStackScreen = () => {
  return (
    <OwnerStack.Navigator initialRouteName="OwnerHome">
      <OwnerStack.Screen name="OwnerHome" component={OwnerHomeScreen} options={{ title: 'Home' }} />
      <OwnerStack.Screen name="JobList" component={JobListScreen} options={{ title: 'Job Profiles' }} />
      <OwnerStack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Profile' }} />
      <OwnerStack.Screen name="DogList" component={DogListScreen} options={{ title: 'Dog Profiles' }} />
      <OwnerStack.Screen name="DogDetail" component={DogDetailScreen} options={{ title: 'Dog Profile' }} />
    </OwnerStack.Navigator>
  );
}

const WalkerStack = createStackNavigator();
const HomeWalkerStackScreen = () => {
  return (
    <WalkerStack.Navigator initialRouteName="WalkerHome">
      <WalkerStack.Screen name="WalkerHome" component={WalkerHomeScreen} options={{ title: 'Home' }} />
      <WalkerStack.Screen name="JobList" component={JobListScreen} options={{ title: 'Job Profiles' }} />
      <WalkerStack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Profile' }} />
      <WalkerStack.Screen name="DogList" component={DogListScreen} options={{ title: 'Dog Profiles' }} />
      <WalkerStack.Screen name="DogDetail" component={DogDetailScreen} options={{ title: 'Dog Profile' }} />
    </WalkerStack.Navigator>
  );
}

const JobStack = createStackNavigator();
const JobStackScreen = () => {
  return (
    <JobStack.Navigator initialRouteName="JobList">
      <JobStack.Screen name="JobList" component={JobListScreen} options={{ title: 'Job Profiles' }} />
      <JobStack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Profile' }} />
    </JobStack.Navigator>
  );
}

const PostStack = createStackNavigator();
const PostStackScreen = () => {
  return (
    <JobStack.Navigator>
      <JobStack.Screen name="JobCreate" component={JobCreate} options={{ title: 'New Job Profile' }} />
    </JobStack.Navigator>
  );
}

const DogStack = createStackNavigator();
const DogStackScreen = () => {
  return (
    <DogStack.Navigator initialRouteName="WalkerHome">
      <DogStack.Screen name="DogList" component={DogListScreen} options={{ title: 'Dog Profiles' }} />
      <DogStack.Screen name="DogDetail" component={DogDetailScreen} options={{ title: 'Dog Profile' }} />
      <DogStack.Screen name="DogCreate" component={DogCreateScreen} options={{ title: 'Dog Profile' }} />
      <DogStack.Screen name="DogSuccess" component={DogSuccessScreen} options={{ title: 'Success' }} />
    </DogStack.Navigator>
  );
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HomeOwner">
        <Tab.Screen 
          name="HomeOwner" 
          component={HomeOwnerStackScreen} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Jobs" 
          component={JobStackScreen} 
          options={{
            tabBarLabel: 'Jobs',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="walk" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Post" 
          component={PostStackScreen} 
          options={{
            tabBarLabel: 'Post',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-thick" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Dogs" 
          component={DogStackScreen} 
          options={{
            tabBarLabel: 'Dogs',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="dog-side" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default withAuthenticator(App)