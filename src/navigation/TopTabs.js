import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Posts from '../views/Posts';
import Favorites from '../views/Favorites';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}