import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import OwnerHomeScreen from './OwnerHomeScreen';
import JobListScreen from './JobListScreen';
import JobDetailScreen from './JobDetailScreen';
import JobCreate from './JobCreate';
import JobMapScreen from './JobMapScreen';
import DogListScreen from './DogListScreen';
import DogDetailScreen from './DogDetailScreen';
import DogCreateScreen from './DogCreateScreen';
import DogSuccessScreen from './DogSuccessScreen';

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

const JobStack = createStackNavigator();
const JobStackScreen = () => {
  return (
    <JobStack.Navigator initialRouteName="JobList">
      <JobStack.Screen name="JobList" component={JobListScreen} options={{ title: 'Job Profiles' }} />
      <JobStack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Profile' }} />
      <JobStack.Screen name="JobMap" component={JobMapScreen} options={{ title: 'Map' }} />
      <DogStack.Screen name="DogSuccess" component={DogSuccessScreen} options={{ title: 'Success' }} />
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
    </DogStack.Navigator>
  );
}

const OwnerTabScreen = (props) => {
  console.log('OwnerTabScreen props', props);

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
        {/* <Tab.Screen 
          name="Post" 
          component={PostStackScreen} 
          options={{
            tabBarLabel: 'Post',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-thick" color={color} size={size} />
            ),
          }}
        /> */}
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
}

export default OwnerTabScreen;