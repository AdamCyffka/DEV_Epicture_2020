import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Loading from '../views/Loading';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Result from '../views/Result';
import Upload from '../views/Upload';
import Welcome from '../views/Welcome';
import Login from '../views/Login';

const BottomTab = createMaterialBottomTabNavigator();

function BottomTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
      }}
      shifting={true}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-camera" color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person" color={color} size={25} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();

export default class AppContainer extends React.Component {
  render () {
    return (
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1e3f83',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name="Loading"
          options={{headerShown: false}}
          component={Loading}
        />
        <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={Welcome}
        />
        <Stack.Screen
          name="Login"
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#191970',
            },
            headerTintColor: '#fff',
            }}
          component={Login}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={BottomTabs}
        />
        <Stack.Screen
          name="Result"
          options={{
            title: 'Search result',
            headerStyle: {
              backgroundColor: '#191970',
            },
            headerTintColor: '#fff',
            }}
          component={Result}
        />
      </Stack.Navigator>
    );
  }
}