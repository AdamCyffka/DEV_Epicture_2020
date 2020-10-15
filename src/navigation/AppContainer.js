import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Settings from '../views/Settings'
import Loading from '../views/Loading'
import Home from '../views/Home'
import Profile from '../views/Profile'
import Result from '../views/Result'
import Upload from '../views/Upload'
import Welcome from '../views/Welcome'
import Login from '../views/Login'

const BottomTab = createBottomTabNavigator()

function BottomTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        style: {
          backgroundColor: '#17202A'
      },
        showLabel: false,
        activeTintColor: '#1ea1f1',
        inactiveTintColor: '#ffffff'
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Upload'
        component={Upload}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color, size }) => (
            <Icon name='cloud-upload' color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={25} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

const Stack = createStackNavigator()

export default class AppContainer extends React.Component {
  render () {
    return (
      <Stack.Navigator
        initialRouteName='Loading'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1e3f83',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name='Settings'
          options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#16202b',
            },
            headerTintColor: '#ffffff',
            }}
          component={Settings}
        />
        <Stack.Screen
          name='Loading'
          options={{headerShown: false}}
          component={Loading}
        />
        <Stack.Screen
          name='Welcome'
          options={{headerShown: false}}
          component={Welcome}
        />
        <Stack.Screen
          name='Login'
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#16202b',
            },
            headerTintColor: '#ffffff',
            }}
          component={Login}
        />
        <Stack.Screen
          name='Home'
          options={{headerShown: false}}
          component={BottomTabs}
        />
        <Stack.Screen
          name='Result'
          options={{
            title: 'Search result',
            headerStyle: {
              backgroundColor: '#16202b',
            },
            headerTintColor: '#ffffff',
            }}
          component={Result}
        />
      </Stack.Navigator>
    )
  }
}