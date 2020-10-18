import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import I18n from '../i18n/locales'
import Posts from '../views/Posts'
import Favorites from '../views/Favorites'
import Comments from '../views/Comments'
import Informations from '../views/Informations'

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
      <Tab.Screen name={I18n.t('profile.posts')} component={Posts} />
      <Tab.Screen name={I18n.t('profile.favorites')} component={Favorites} />
      <Tab.Screen name={I18n.t('profile.comments')} component={Comments} />
      <Tab.Screen name={I18n.t('profile.informations')} component={Informations} />
    </Tab.Navigator>
  )
}