import React from 'react';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useIsFocused, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import Home from '../views/Home'
import Search from '../views/Search'

const BottomTab = createBottomTabNavigator()

export const BottomNavigator = () => {
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
        name='Search'
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name='search' color={color} size={25} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}