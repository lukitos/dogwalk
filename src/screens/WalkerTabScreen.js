import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WalkerHomeScreen from './WalkerHomeScreen';
import JobListScreen from './JobListScreen';
import JobDetailScreen from './JobDetailScreen';

const Tab = createBottomTabNavigator();
const WalkerStack = createStackNavigator();

const HomeWalkerStackScreen = () => {
  return (
    <WalkerStack.Navigator initialRouteName="WalkerHome">
      <WalkerStack.Screen name="WalkerHome" component={WalkerHomeScreen} options={{ title: 'Home' }} />
      <WalkerStack.Screen name="JobList" component={JobListScreen} options={{ title: 'Job Profiles' }} />
      <WalkerStack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Profile' }} />
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

const WalkerTabScreen = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="HomeWalker">
                <Tab.Screen 
                    name="HomeWalker" 
                    component={HomeWalkerStackScreen} 
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
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default WalkerTabScreen;