import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Posts from '../views/Posts'
import Favorites from '../views/Favorites'
import Comments from '../views/Comments'

const Tab = createMaterialTopTabNavigator()

export default function TopTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#1ea1f1',
        inactiveTintColor: '#3f4e59',
        style: {
          backgroundColor: '#17202A'
        }
      }}
    >
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Comments" component={Comments} />
    </Tab.Navigator>
  )
}